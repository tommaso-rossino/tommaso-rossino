export function Footer() {
  return (
    <footer className="relative py-8 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-sm border-t border-white/10 text-center">
      <p className="text-white/50 text-sm">
        &copy; {new Date().getFullYear()} Tommaso Rossino. All rights reserved.
      </p>
    </footer>
  );
}
