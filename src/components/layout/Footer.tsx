export function Footer() {
  return (
    <footer className="relative py-12 px-6 sm:px-8 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-serif font-bold text-[#5a5550] text-sm">
          Tommaso Rossino
        </span>
        <p className="text-[#5a5550] text-xs tracking-wide">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
