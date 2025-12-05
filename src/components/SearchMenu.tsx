import { Calendar, Coffee, Clock, Utensils, X } from "lucide-react";
import CalendarSingle from "./Calendar";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  mealType: string;
  setMealType: (type: string) => void;
  fetchMenu: () => Promise<void>;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}
export default function SearchMenu({
  selectedDate,
  setSelectedDate,
  mealType,
  setMealType,
  fetchMenu,
  loading,
  error,
  setError,
}: Props) {
  return (
    <div className="backdrop-blur-2xl bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/20 hover:border-white/30  duration-500">
      <div className="flex items-center gap-3 mb-6 sm:mb-8 relative w-fit px-2">
        <div
          className="p-2 sm:p-3  bg-gradient-to-br from-orange-500 to-amber-600
               shadow-md z-0 rounded-xl sm:rounded-full"
        >
          <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white cursor-default">
          Consulta el menu
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="relative flex flex-col ">
          <label className="block text-xs sm:text-sm font-bold text-orange-200 mb-2 sm:mb-3 uppercase tracking-wide ">
            Selecciona la Fecha
          </label>
          <div className="flex  flex-1"></div>
          <CalendarSingle
            selected={selectedDate}
            setSelected={setSelectedDate}
          />
        </div>

        <div className="group items-center">
          <label className="block text-xs sm:text-sm font-bold text-orange-200 mb-2 sm:mb-3 uppercase tracking-wide ">
            Tipo de Servicio
          </label>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setMealType("2")}
              className={`relative backdrop-blur-md cursor-pointer flex-1 px-3 sm:px-5 py-2  rounded-xl sm:rounded-2xl font-bold   transition-transform transition-bg hover:scale-105 overflow-hidden  shadow-md ${
                mealType === "2"
                  ? " text-white shadow-2xl    back-1"
                  : "  text-white/70  border-white/20"
              }`}
            >
              <Utensils className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1" />
              <span className="text-xs sm:text-sm">Almuerzo</span>
              <div className="absolute btn-1 bg-gradient-to-br from-orange-500 to-amber-600 w-full h-full inset-0 rounded-xl sm:rounded-2xl z-[-1] "></div>
            </button>
            <button
              onClick={() => setMealType("3")}
              className={`relative backdrop-blur-md flex-1 px-3 sm:px-5 py-3 rounded-xl sm:rounded-2xl font-bold  transform hover:scale-105 cursor-pointer  transition-transform transition-bg overflow-hidden shadow-md ${
                mealType === "3"
                  ? " text-white shadow-2xl   back-2"
                  : "  text-white/70    border-white/20"
              }`}
            >
              <Coffee className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1" />
              <span className="text-xs sm:text-sm">Cena</span>
              <div className="absolute btn-2 bg-gradient-to-br from-orange-500 to-amber-600 w-full h-full inset-0  rounded-xl sm:rounded-2xl z-[-1] "></div>
            </button>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={fetchMenu}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform   disabled:transform-none cursor-pointer ${
              !loading &&
              "active:scale-95 hover:shadow-2xl hover:scale-105 hover:shadow-orange-500/20"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Buscando...
              </span>
            ) : (
              "Buscar Menú"
            )}
          </button>
        </div>
      </div>

      <div
        className={` flex bg-red-500/20 backdrop-blur-md   text-red-100 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base mt-4 transition-all duration-100 justify-between items-center 
            overflow-hidden ${
              error
                ? " border-2 h-full sm:mt-6 p-4 sm:p-5 border-red-400/50 "
                : "h-0 "
            }`}
      >
        {error}
        {error && (
          <X
            className="text-red-500 w-6 h-6 sm:w-8 sm:h-8  hover:scale-110 cursor-pointer transition-transform active:scale-90 "
            onClick={() => setError("")}
          />
        )}
      </div>
    </div>
  );
}
