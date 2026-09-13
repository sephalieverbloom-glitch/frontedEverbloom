import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronRight } from "lucide-react";
import ArrowFillButton from "./ui/arrow-fill-button";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "MENU", path: "/menu" },
  { label: "GALLERY", path: "/gallery" },
  { label: "CONTACT", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6 lg:px-10 flex justify-center">
        <nav
          className={`w-full max-w-5xl transition-all duration-300 rounded-full px-4 sm:px-7 py-2 sm:py-2.5 flex items-center justify-between ${scrolled ? "glass-nav-white-scrolled" : "glass-nav-white"
            }`}
        >
          {/* Brand Logo & Name */}

          <Link
            to="/"
            className="flex items-center shrink-0 group h-9 overflow-visible"
          >
            <img
              src="https://res.cloudinary.com/p2gsrga3/image/upload/v1789146458/MYLOGO.png"
              alt="Everbloom"
              className="h-9 sm:h-10 w-auto object-contain scale-[3] origin-left transition-transform"
            />
          </Link>



          {/* Desktop Nav Links (Visible on Large Screens) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-display text-[13px] tracking-[0.15em] font-bold transition-colors duration-200 uppercase relative py-1 ${active
                    ? "text-[#c88242]"
                    : "text-[#4a3b32] hover:text-[#1c1109]"
                    }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c88242] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Book Table Button & Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:inline-flex">
              <ArrowFillButton
                btnText="BOOK TABLE"
                href="/booking"
                bgColor="#1c1109"
                textColor="#ffffff"
                fillBgColor="#c88242"
                fillTextColor="#ffffff"
                className="!text-[12px] sm:!text-[13px] tracking-[0.14em] uppercase font-display font-extrabold !shadow-sm"
              />
            </div>

            {/* Mobile & Tablet Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-[#1c1109] hover:bg-black/5 active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#c88242]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile & Tablet Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md pt-20 px-4 pb-6 flex flex-col justify-center items-center animate-fade-in-down lg:hidden">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-2xl flex flex-col justify-between w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-[#f0e6dc] mb-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://res.cloudinary.com/p2gsrga3/image/upload/v1789147635/logo.png"
                    alt="Everbloom"
                    className="h-9 w-auto object-contain"
                  />
                  <div>
                    <span className="font-serif font-bold text-sm tracking-[0.2em] uppercase text-[#1c1109] block">
                      EVERBLOOM
                    </span>
                    <span className="text-[10px] text-[#6b5c54]">Bhubaneswar, Odisha</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#1c1109] hover:bg-[#f0e6dc] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 font-display text-[13px] font-extrabold tracking-[0.14em] uppercase rounded-2xl transition-all flex items-center justify-between ${active
                        ? "bg-[#1c1109] text-white shadow-md"
                        : "text-[#3d2e26] hover:bg-[#faf7f2]"
                        }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${active ? "text-[#c88242]" : "text-gray-400"}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#f0e6dc] flex flex-col gap-3 mt-4">
              <div onClick={() => setMobileOpen(false)} className="w-full flex justify-center">
                <ArrowFillButton
                  btnText="BOOK A TABLE"
                  href="/booking"
                  bgColor="#c88242"
                  textColor="#ffffff"
                  fillBgColor="#2b1810"
                  fillTextColor="#ffffff"
                  className="!w-full !h-12 !text-[13px] tracking-[0.14em] uppercase font-display font-extrabold"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#6b5c54] px-1">
                <span>1:00 PM – 10:15 PM</span>
                <a href="tel:09437164578" className="font-bold text-[#1c1109] hover:underline">
                  094371 64578
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
