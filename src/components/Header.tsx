import { ChefHat, Sparkles } from "lucide-react";
import React from "react";

function Header() {
  return (
    <header className="relative backdrop-blur-md bg-white/5 border-b border-white/10 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 drop-shadow-2xl" />
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-orange-400 drop-shadow-lg">
              Menú del Día
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);