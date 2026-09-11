import { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  Users,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Filter,
  ExternalLink,
} from "lucide-react";

export default function AdminReservationsView({
  reservations = [],
  onUpdateStatus,
  onDeleteReservation,
  isLoading = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL"); // "ALL" | "TODAY" | specific date

  const todayStr = new Date().toISOString().split("T")[0];

  const filteredReservations = reservations.filter((r) => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;

    const matchesSearch =
      !searchQuery ||
      r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone?.includes(searchQuery);

    const matchesDate =
      dateFilter === "ALL" ||
      (dateFilter === "TODAY" && r.date === todayStr) ||
      (dateFilter !== "ALL" && dateFilter !== "TODAY" && r.date === dateFilter);

    return matchesStatus && matchesSearch && matchesDate;
  });

  const getWhatsAppConfirmationUrl = (r) => {
    // Strip non-digits and ensure country code
    let phoneClean = r.phone.replace(/[^0-9]/g, "");
    if (phoneClean.length === 10) phoneClean = "91" + phoneClean;

    const text = `Hello ${r.name}! ☕ Greetings from Everbloom Café, Bhubaneswar.%0A%0AWe are pleased to confirm your table reservation:%0A📅 Date: ${r.date}%0A⏰ Time: ${r.time}%0A👥 Party Size: ${r.guests} Guests%0A${r.notes ? `📝 Note: ${r.notes}%0A` : ""}%0AWe look forward to hosting you for an exquisite dining experience! Please reply to this message if you have any questions or changes.`;

    return `https://wa.me/${phoneClean}?text=${text}`;
  };

  const statusColors = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
    seated: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded3] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#6b5c54] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by guest name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] focus:outline-none focus:border-[#c88242]"
            />
          </div>

          {/* Quick Date Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDateFilter("ALL")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                dateFilter === "ALL"
                  ? "bg-[#2b1810] text-white"
                  : "bg-[#faf7f2] text-[#6b5c54] hover:bg-[#e8ded3]"
              }`}
            >
              All Dates
            </button>
            <button
              onClick={() => setDateFilter("TODAY")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                dateFilter === "TODAY"
                  ? "bg-[#c88242] text-white"
                  : "bg-[#faf7f2] text-[#6b5c54] hover:bg-[#e8ded3]"
              }`}
            >
              Today's Bookings
            </button>
          </div>
        </div>

        {/* Status Tab Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#e8ded3]/60 text-xs">
          {["ALL", "pending", "confirmed", "seated", "completed", "cancelled"].map((st) => {
            const count =
              st === "ALL"
                ? reservations.length
                : reservations.filter((r) => r.status === st).length;

            const isSelected = statusFilter === st;

            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isSelected
                    ? "bg-[#2b1810] text-white shadow-sm"
                    : "bg-[#faf7f2] text-[#6b5c54] hover:bg-[#e8ded3]"
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Reservations Table */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-[#6b5c54]">
          Loading reservations...
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#e8ded3]">
          <Calendar className="w-12 h-12 text-[#c88242]/30 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-normal text-[#1c1109]">No reservations found</h3>
          <p className="text-xs text-[#6b5c54] mt-1">
            There are currently no table bookings matching this filter.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#e8ded3] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#e8ded3] bg-[#faf7f2] text-[10px] uppercase tracking-wider text-[#6b5c54] font-bold">
                  <th className="py-4 px-6">Guest Info</th>
                  <th className="py-4 px-4">Reservation Slot</th>
                  <th className="py-4 px-4">Guests</th>
                  <th className="py-4 px-4">Special Notes</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Direct Contact</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8ded3]">
                {filteredReservations.map((r) => {
                  const resId = r._id || r.id;
                  const isToday = r.date === todayStr;

                  return (
                    <tr key={resId} className="hover:bg-[#faf7f2]/50 transition-colors">
                      {/* Guest Name & Phone */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-sm text-[#1c1109]">{r.name}</div>
                        <a
                          href={`tel:${r.phone}`}
                          className="text-[11px] text-[#c88242] hover:underline font-semibold flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          {r.phone}
                        </a>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-[#1c1109]">
                          <span>{r.date}</span>
                          {isToday && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                              TODAY
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#6b5c54] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {r.time}
                        </span>
                      </td>

                      {/* Guests */}
                      <td className="py-4 px-4">
                        <span className="font-semibold px-2.5 py-1 rounded-full bg-[#faf7f2] border border-[#e8ded3] text-[11px]">
                          {r.guests} {r.guests === 1 ? "Guest" : "Guests"}
                        </span>
                      </td>

                      {/* Notes */}
                      <td className="py-4 px-4 text-[11px] text-[#6b5c54] max-w-xs truncate">
                        {r.notes ? `"${r.notes}"` : "None"}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={r.status}
                          onChange={(e) => onUpdateStatus(resId, e.target.value)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border focus:outline-none ${
                            statusColors[r.status] || statusColors.pending
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="seated">Seated</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Direct WhatsApp & Call Buttons */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={getWhatsAppConfirmationUrl(r)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1 text-[11px] font-bold"
                            title="Send WhatsApp confirmation message to guest"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${r.phone}`}
                            className="p-2 rounded-xl border border-[#e8ded3] hover:border-[#c88242] text-[#6b5c54] hover:text-[#c88242] bg-white transition-colors"
                            title="Call Guest"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Delete */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => onDeleteReservation(r)}
                          className="p-2 rounded-xl border border-[#e8ded3] hover:border-red-300 text-[#6b5c54] hover:text-red-600 bg-white transition-colors"
                          title="Delete Reservation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
