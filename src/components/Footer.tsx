import React from "react"; 
 function Footer() {
  return (
    <footer className="relative mt-12 sm:mt-20 backdrop-blur-md bg-black/20 border-t border-white/10 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-orange-200/60 text-xs sm:text-sm">
          © 2025 Restaurante Estudiantil - UPTC
        </p>
      </div>
    </footer>
  );
}
export default React.memo(Footer);