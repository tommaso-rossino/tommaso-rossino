export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0c0c0c]" />
      {/* Subtle warm gradient wash */}
      <div className="absolute top-0 right-0 w-[60vw] h-[50vh] bg-[#c8553d] rounded-full blur-[200px] opacity-[0.03]" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#c8553d] rounded-full blur-[180px] opacity-[0.02]" />
    </div>
  );
}
