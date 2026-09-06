export default function AboutHero() {
  return (
    <section className="relative min-h-[46vh] sm:min-h-[50vh] overflow-hidden bg-[#1a0f0b] flex items-center justify-center pt-32 sm:pt-36 pb-16 sm:pb-20">
      <img
        src="/MYHERO/myheroimg.png"
        alt="Everbloom Café Floral Mural"
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] filter brightness-[0.80] contrast-[1.05]"
      />
      {/* Luminous Warm Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-[#180e0a]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(18,10,7,0.5)_80%,rgba(18,10,7,0.8)_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-rose-500/15 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/25 text-[11px] sm:text-xs font-bold text-amber-200 tracking-wider uppercase mb-3.5 shadow-lg">
          🌸 Our Journey &amp; Floral Passion
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-3 drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
          Welcome to{" "}
          <span className="italic font-serif bg-gradient-to-r from-[#ffe4c4] via-[#ff9e7d] to-[#f472b6] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(251,158,125,0.7)]">
            Everbloom
          </span>
        </h1>
        <p className="text-white/95 text-xs sm:text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Where good food and good mood bloom together in Kalinga Nagar, Bhubaneswar.
        </p>
      </div>
    </section>
  );
}
