import { useState } from "react";
import Header from "../components/Header";
import SearchMenu from "../components/SearchMenu";
import Footer from "../components/Footer";
import ShowMenu from "../components/ShowMenu";
import Holder from "../components/MenuHolder";
import type { MenuData } from "../utils/Types";

export default function RestaurantMenu() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState<string>("2");
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dateSearched, setDateSearched] = useState<Date | null>(null);

  const fetchMenu = async (): Promise<void> => {
    if (!selectedDate) {
      setError("Por favor selecciona una fecha");
      return;
    }

    setLoading(true);
    setError(null);
    if (
      dateSearched &&
      selectedDate.toDateString() === dateSearched.toDateString()
    ) {
      return;
    }

    try {
      const date = new Date(selectedDate);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const response = await fetch(
        `https://my-first-worker.sergiocalderon1226.workers.dev/api/getMenu?month=${month}&day=${day}&type=${mealType}`
      );
      const data: { tasks: MenuData } = await response.json();
      if (!response.ok || data.tasks === null) {
        throw new Error("Menu no disponible para esta fecha");
      }
      setDateSearched(selectedDate);
      setMenuData(data.tasks);
    } catch (err) {
      const errorMessage: string = "Menu no disponible para esta fecha";
      setError(errorMessage);
      setMenuData(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      <Header />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:pt-12">
        <SearchMenu
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          mealType={mealType}
          setMealType={setMealType}
          fetchMenu={fetchMenu}
          loading={loading}
          error={error}
          setError={setError}
        />

        {menuData && <ShowMenu menuData={menuData} />}

        {!menuData && <Holder />}
      </main>
      <Footer />
    </div>
  );
}
