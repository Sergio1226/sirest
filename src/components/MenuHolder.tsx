import { Utensils } from "lucide-react";
export default function Holder() {
  return (
    <div className=" bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-12 sm:p-16 md:p-20 text-center border border-white/20 animate-fade-in">
      <div className=" inline-block mb-6 sm:mb-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50  z-0">
          <Utensils className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
        </div>
      </div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
        ¿Qué hay para comer?
      </h3>
      <p className="text-orange-200/80 text-base sm:text-lg md:text-xl max-w-md mx-auto">
        Selecciona una fecha y tipo de servicio para ver el menu
      </p>
    </div>
  );
}
