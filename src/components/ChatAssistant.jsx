import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

// Intelligent client-side response helper for cafe questions
function getCafeReply(query) {
  const q = query.toLowerCase();

  if (q.includes("owner") || q.includes("founder") || q.includes("who owns") || q.includes("sephali") || q.includes("swain")) {
    return "Everbloom Café is lovingly owned and founded by Sephali Swain, created as a botanical coffee and culinary sanctuary in Bhubaneswar!";
  }
  if (q.includes("start") || q.includes("opening") || q.includes("founded") || q.includes("established") || q.includes("date") || q.includes("since")) {
    return "Everbloom Café was established on June 27, 2025 (27/06/2025) in Kalinga Nagar, Bhubaneswar.";
  }
  if (q.includes("email") || q.includes("mail")) {
    return "You can email Everbloom Café at everbloombbsr@gmail.com for inquiries, collaborations, and events.";
  }
  if (q.includes("location") || q.includes("where") || q.includes("address") || q.includes("kalinga")) {
    return "Everbloom Café is located at K-8/796, Near Sum Ultimate Medicare, K8 Kalinga Nagar, Bhubaneswar, Odisha 751029. We're easily accessible with convenient parking!";
  }
  if (q.includes("time") || q.includes("timing") || q.includes("open") || q.includes("hour") || q.includes("close")) {
    return "We are open 7 days a week from 1:00 PM to 10:15 PM. Perfect for late lunches, evening hangouts, and dinners!";
  }
  if (q.includes("menu") || q.includes("food") || q.includes("eat") || q.includes("dish") || q.includes("special")) {
    return "Our top specials include the Everbloom Berry Blossom Cooler, Crispy Peri-Peri Chicken Wrap, Wood-Fired Margherita Pizza, Classic Aglio Olio Pasta, and Blueberry Baked Cheesecake! Check our Menu tab for the full list.";
  }
  if (q.includes("coffee") || q.includes("brew") || q.includes("frappe") || q.includes("latte") || q.includes("cappuccino")) {
    return "We serve handcrafted Arabica coffee including Artisanal Cappuccinos, Hazelnut Frappes, Classic Cold Brews, and Belgian Hot Chocolate!";
  }
  if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("expensive") || q.includes("cheap")) {
    return "Everbloom is very pocket-friendly! The average cost is ₹200–₹400 per person. Dishes range from ₹150 to ₹360.";
  }
  if (q.includes("outdoor") || q.includes("patio") || q.includes("garden") || q.includes("pet") || q.includes("ac") || q.includes("indoor")) {
    return "We have both a cozy climate-controlled Indoor AC Lounge with our signature flower mural and a lush Nature Garden Patio with fairy lights that is open-air and pet-friendly!";
  }
  if (q.includes("contact") || q.includes("phone") || q.includes("call") || q.includes("number") || q.includes("whatsapp")) {
    return "You can call us directly or chat on WhatsApp at +91 94371 64578 or +91 97787 95952, or email us at everbloombbsr@gmail.com. We'd love to assist you!";
  }
  if (q.includes("wifi") || q.includes("work") || q.includes("study") || q.includes("laptop")) {
    return "Yes! We provide high-speed complimentary WiFi and comfortable seating zones ideal for remote work, study sessions, and reading.";
  }
  if (q.includes("book") || q.includes("reserve") || q.includes("table") || q.includes("party") || q.includes("birthday")) {
    return "For table bookings or birthday party arrangements, please reach out to us at +91 94371 64578 / +91 97787 95952 or drop a note on our Booking or Contact page!";
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("namaste")) {
    return "Hello there! Welcome to Everbloom Café. How can I brighten your day? Feel free to ask about our location, artisanal coffee, gourmet wraps, or timings!";
  }

  return "Thank you for asking! We are located in Kalinga Nagar, Bhubaneswar, open daily from 1 PM to 11 PM. You can explore our Menu page or contact us at +91 94371 64578 / +91 97787 95952 (everbloombbsr@gmail.com) for quick assistance.";
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! Welcome to Everbloom Café. How can I help you today? Ask about our location, artisanal coffees, wraps, pizzas, or timings!",
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const userMsg = (textToSend || input).trim();
    if (!userMsg || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getCafeReply(userMsg);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setIsTyping(false);
    }, 450);
  };

  const quickPills = [
    "Where are you located?",
    "What are your cafe timings?",
    "What are the best coffee brews?",
    "Do you have outdoor seating?",
  ];

  return (
    <>
      {/* Mobile Dark Backdrop when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden animate-fadeIn"
        />
      )}

      {/* Floating Toggle Button (Hidden when open on mobile to prevent overlap) */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-tr from-[#c88242] to-amber-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 ${
          open ? "max-sm:hidden" : ""
        }`}
        title="Chat with Everbloom AI"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Responsive Chat Window */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 max-sm:h-[85vh] max-sm:rounded-t-[2rem] sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[380px] sm:h-[540px] z-50 bg-white shadow-2xl border border-[#e8ded3] sm:rounded-3xl overflow-hidden animate-fadeIn flex flex-col transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1c1109] via-[#2c1910] to-[#1c1109] px-5 py-4 flex items-center justify-between shrink-0 border-b border-white/10 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#c88242] to-amber-400 flex items-center justify-center text-white shadow-md shadow-[#c88242]/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-white font-serif text-sm font-bold tracking-tight">
                  Everbloom Assistant
                </p>
                <p className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open Daily · 1 PM – 11 PM</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#faf7f2] overscroll-contain"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-[#2b1810] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-sm">
                    <Bot className="w-3.5 h-3.5 text-[#e29b5a]" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#2b1810] text-white rounded-br-none font-medium"
                      : "bg-white text-[#2b1810] rounded-bl-none border border-[#e8ded3]/80 font-normal"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-[#c88242] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-sm">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-[#2b1810] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-[#e29b5a]" />
                </div>
                <div className="bg-white px-4 py-2.5 rounded-2xl rounded-bl-none border border-[#e8ded3] text-xs shadow-sm flex items-center gap-1.5">
                  <span className="text-[#c88242] font-semibold text-[11px]">Everbloom is typing</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c88242] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c88242] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c88242] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Question Pills (Scrollable with hidden scrollbar) */}
          <div className="px-3 py-2 bg-[#f5ede4] border-t border-[#e8ded3] flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0">
            {quickPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pill)}
                className="whitespace-nowrap px-3.5 py-1.5 bg-white hover:bg-[#2b1810] hover:text-white border border-[#e8ded3] rounded-full text-[11px] font-semibold text-[#4a3b32] transition-all shrink-0 shadow-sm active:scale-95"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-3.5 bg-white border-t border-[#e8ded3] shrink-0"
          >
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about coffee, wraps, location..."
                className="flex-1 px-4 py-2.5 rounded-full border border-[#e8ded3] bg-[#faf7f2] text-xs text-[#2b1810] font-medium focus:outline-none focus:border-[#c88242] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c88242] to-amber-500 text-white flex items-center justify-center disabled:opacity-40 transition-all shadow-md active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
