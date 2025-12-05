import { Calendar, Sparkles } from "lucide-react";
import type { MenuData } from "../utils/Types";
import React from "react";

 const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      Sopa: "🍲",
      Proteínico: "🥩",
      "Farináceo No. 1": "🍚",
      "Farináceo No. 2": "🥔",
      "Verdura o Grano": "🌽",
      Ensalada: "🥗",
      Bebida: "🥤",
      Postre: "🍰",
    };
    return icons[category] || "🍽️";
  };

  const getCategoryColor =(category: string): string => {
    const colors: Record<string, string> = {
      Sopa: "from-orange-400 to-orange-600",
      Proteínico: "from-red-400 to-red-600",
      "Farináceo No. 1": "from-yellow-400 to-yellow-600",
      "Farináceo No. 2": "from-amber-400 to-amber-600",
      "Verdura o Grano": "from-green-400 to-green-600",
      Ensalada: "from-emerald-400 to-emerald-600",
      Bebida: "from-blue-400 to-blue-600",
      Postre: "from-pink-400 to-pink-600",
    };
    return colors[category] || "from-gray-400 to-gray-600";
  };

    const isMobile = window.innerWidth < 768;

const CardItem = React.memo(function CardItem({ item, index }: { item: MenuData["detallesMenus"][0]; index: number }) {
  return (
    <div
      key={item.id}
      style={{ animationDelay: `${index * 50}ms` }}
      className={`group   bg-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-white/20  transition-colors transition-transform transition-shadow  duration-500    ${
        !isMobile && "hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl "
      }`}
    >
      <div className=" flex items-start gap-3 sm:gap-4 cursor-default">
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getCategoryColor(
              item.tiposProducto.nombreTipoProducto
            )} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg  transition-transform duration-300 ${
              isMobile && "group-hover:scale-110"
            } `}
          >
            {getCategoryIcon(item.tiposProducto.nombreTipoProducto)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-orange-300 text-xs mb-1 sm:mb-2 uppercase tracking-wider">
            {item.tiposProducto.nombreTipoProducto}
          </h4>
          <p className="text-white font-semibold text-sm sm:text-base md:text-lg leading-tight break-words">
            {item.descripcionIngrediente.trim()}
          </p>
        </div>
      </div>
    </div>
  );
});

interface Props {
  menuData: MenuData;
}

export default function ShowMenu({ menuData }: Props) {

  return (
    <div className=" bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in z-0">
      <div className=" bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-6 sm:p-8 md:p-10 overflow-hidden z-[0]">
        <div className="">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 " />
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white  break-words">
              {menuData.descripcionMenu}
            </h3>
          </div>
          <p className="text-orange-100 text-sm sm:text-base md:text-lg font-semibold mb-2 break-words">
            📍 {menuData.restaurantes.nombreRestaurante}
          </p>
          <p className="text-orange-100/90 text-xs sm:text-sm md:text-base flex items-center gap-2 flex-wrap">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="break-words">
              {new Date(menuData.fechaProgramada).toLocaleDateString("es-CO", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {menuData.detallesMenus.map((item, index) => (
            <CardItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
