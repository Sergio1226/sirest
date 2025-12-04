import { useState } from "react";
import { Calendar, Coffee, Utensils, Sparkles, Clock, X } from "lucide-react";
import Header from "../components/Header";
import CalendarSingle from "../components/Calendar";
import Footer from "../components/Footer";

interface TipoProducto {
  estadoTipoProducto: number;
  id: number;
  nombreTipoProducto: string;
}

interface DetalleMenu {
  id: number;
  descripcionIngrediente: string;
  tiposProducto: TipoProducto;
}

interface Restaurante {
  codigoLugar: number;
  id: number;
  nombreRestaurante: string;
}

interface TipoConsumo {
  estadoTipoConsumo: number;
  id: number;
  ntipoConsumo: string;
}

interface MenuData {
  id: number;
  descripcionMenu: string;
  fechaProgramada: number;
  estadoMenu: number;
  idTerceroNutricion: number;
  restaurantes: Restaurante;
  tiposConsumo: TipoConsumo;
  detallesMenus: DetalleMenu[];
}

export default function RestaurantMenu() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState<string>("2");
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async (): Promise<void> => {
    if (!selectedDate) {
      setError("Por favor selecciona una fecha");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const date = new Date(selectedDate);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const response = await fetch(
        `https://my-first-worker.sergiocalderon1226.workers.dev/api/getMenu?month=${month}&day=${day}&type=${mealType}`
      );
      const data: { tasks: MenuData } = await response.json();
      console.log(data);

      if (!response.ok || data.tasks === null) {
        throw new Error("No hay menú disponible para esta fecha");
      }
      setMenuData(data.tasks);
    } catch (err) {
      const errorMessage: string = "Error de conexion";
      setError(errorMessage);
      setMenuData(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  const getCategoryColor = (category: string): string => {
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

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      <Header />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:pt-12">
        <div className="backdrop-blur-2xl bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/20 hover:border-white/30 transition-all duration-500">
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
                  className={`relative cursor-pointer flex-1 px-3 sm:px-5 py-2  rounded-xl sm:rounded-2xl font-bold  transform transition-all hover:scale-105 overflow-hidden  shadow-md ${
                    mealType === "2"
                      ? " text-white shadow-2xl    back-1"
                      : " backdrop-blur-xl text-white/70  border-white/20"
                  }`}
                >
                  <Utensils className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1" />
                  <span className="text-xs sm:text-sm">Almuerzo</span>
                  <div className="absolute btn-1 bg-gradient-to-br from-orange-500 to-amber-600 w-full h-full inset-0 rounded-xl sm:rounded-2xl z-[-1] "></div>
                </button>
                <button
                  onClick={() => setMealType("3")}
                  className={`relative flex-1 px-3 sm:px-5 py-3 rounded-xl sm:rounded-2xl font-bold  transform hover:scale-105 cursor-pointer  transition-all overflow-hidden shadow-md ${
                    mealType === "3"
                      ? " text-white shadow-2xl   back-2"
                      : " backdrop-blur-xl text-white/70    border-white/20"
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

          {/* <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-red-500/20 backdrop-blur-xl border-2 border-red-400/50 text-red-100 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base animate-inc">
            {error}
          </div> */}
          <div
            className={` flex bg-red-500/20 backdrop-blur-xl   text-red-100 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base mt-4 transition-all duration-100 justify-between items-center 
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

        {menuData && (
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
                    {new Date(menuData.fechaProgramada).toLocaleDateString(
                      "es-CO",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {menuData.detallesMenus.map((item, index) => (
                  <div
                    key={item.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="group   bg-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-white/20 transition-all duration-500 hover:border-white/40 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20"
                  >
                    <div className=" flex items-start gap-3 sm:gap-4 cursor-default">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getCategoryColor(
                            item.tiposProducto.nombreTipoProducto
                          )} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 `}
                        >
                          {getCategoryIcon(
                            item.tiposProducto.nombreTipoProducto
                          )}
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
                ))}
              </div>
            </div>
          </div>
        )}

        {!menuData && (
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
        )}
      </main>
      <Footer />

      <style>{`
      .btn-1{
        transition:translate 0.5s ease-in-out; 
        translate:calc(100% + 8px) 0px;
      }
        
      .back-1 div{
          transition:translate 0.5s ease-in-out; 
        translate:0px 0px;
      }

      .btn-2{
        transition:translate 0.5s ease-in-out; 
        translate:calc(-100% - 8px) 0px;
      }
        
      .back-2 div{
          transition:translate 0.5s ease-in-out; 
        translate:0px 0px;
      }

        @keyframes inc {
          from {
            height:0;
          }
          to {
            height:100%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
