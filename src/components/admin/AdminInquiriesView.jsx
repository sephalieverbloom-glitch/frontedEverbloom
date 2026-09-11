import { useState } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Trash2,
  CheckCircle,
  Clock,
  Send,
  ExternalLink,
} from "lucide-react";

export default function AdminInquiriesView({
  contacts = [],
  onUpdateStatus,
  onDeleteContact,
  isLoading = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredContacts = contacts.filter((c) => {
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded3] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6b5c54] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by guest name, email, query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#faf7f2] border border-[#e8ded3] text-xs text-[#2b1810] focus:outline-none focus:border-[#c88242]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          {["ALL", "new", "read", "replied"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? "bg-[#2b1810] text-white shadow-sm"
                  : "bg-[#faf7f2] text-[#6b5c54] hover:bg-[#e8ded3]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards Feed */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-[#6b5c54]">Loading messages...</div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#e8ded3]">
          <MessageSquare className="w-12 h-12 text-[#c88242]/30 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-normal text-[#1c1109]">No messages found</h3>
          <p className="text-xs text-[#6b5c54] mt-1">
            Customer inquiries and notes will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((c) => {
            const contactId = c._id || c.id;
            return (
              <div
                key={contactId}
                className="bg-white rounded-3xl border border-[#e8ded3] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e8ded3] mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#c88242]/15 text-[#c88242] flex items-center justify-center font-bold text-xs">
                        {c.name ? c.name.charAt(0).toUpperCase() : "G"}
                      </div>
                      <div>
                        <span className="font-serif text-base font-normal text-[#1c1109]">
                          {c.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs">
                          <a
                            href={`mailto:${c.email}`}
                            className="text-[#c88242] hover:underline font-semibold flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            {c.email}
                          </a>
                          {c.phone && <span className="text-[#6b5c54]">· {c.phone}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#6b5c54] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(c.createdAt).toLocaleString()}
                      </span>

                      <select
                        value={c.status || "new"}
                        onChange={(e) => onUpdateStatus(contactId, e.target.value)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border focus:outline-none ${
                          c.status === "replied"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : c.status === "read"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Content */}
                  <p className="text-xs text-[#2b1810] bg-[#faf7f2] p-4 rounded-2xl border border-[#e8ded3] leading-relaxed whitespace-pre-wrap">
                    "{c.message}"
                  </p>
                </div>

                {/* Bottom action buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-[#6b5c54]">
                    Subject: <span className="font-bold text-[#2b1810]">{c.subject || "General Inquiry"}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${c.email}?subject=Everbloom Café - Response to your inquiry&body=Dear ${c.name},%0D%0A%0D%0AThank you for contacting Everbloom Café...`}
                      className="btn-caramel px-4 py-1.5 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      Reply via Email
                    </a>

                    <button
                      onClick={() => onDeleteContact(c)}
                      className="p-2 rounded-xl border border-[#e8ded3] hover:border-red-300 text-[#6b5c54] hover:text-red-600 bg-white transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
