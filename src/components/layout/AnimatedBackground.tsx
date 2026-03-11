export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Large blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-blob-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-[0.08] animate-blob-delayed-2" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-move" />

      {/* Particles */}
      <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-twinkle" />
      <div className="absolute top-[30%] right-[20%] w-1 h-1 bg-purple-400/40 rounded-full animate-twinkle-delayed" />
      <div className="absolute bottom-[25%] left-[25%] w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-twinkle-delayed-2" />
      <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-purple-300/30 rounded-full animate-twinkle-delayed-3" />
    </div>
  );
}
