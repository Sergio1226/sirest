import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";
import { es } from "date-fns/locale";

interface Props {
  selected: Date;
  setSelected: (date: Date) => void;
}

export default function CalendarSingle({ selected, setSelected }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const format = (date: Date) => {
    return date.toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className=" w-full" ref={wrapperRef}>
      <div
        onClick={() => setOpen(!open)}
        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl sm:rounded-2xl text-white cursor-pointer flex items-center justify-between  duration-300 hover:border-white/60 font-medium hover:shadow-2xl hover:shadow-orange-300/20  hover:bg-white/5"
      >
        <span>
          {selected ? format(selected || new Date()) : "Seleccione una fecha"}
        </span>
        <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {open && (
        <div className="absolute top-full -left-[24px] sm:left-0 right-0 mt-2 p-4 sm:p-6 bg-white rounded-2xl shadow-2xl z-50 w-fit backdrop-blur-md">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setSelected(date || new Date());
              setOpen(false);
            }}
            modifiersClassNames={{
              selected: "bg-orange-500 text-white rounded-full",
              today: "text-orange-600 font-bold",
            }}
            styles={{
              caption: { color: "#1f2937", fontWeight: "600" },
              day: { color: "#374151" },
              nav_button: { color: "#f97316" },
              head_cell: { color: "#f97316", fontWeight: "600" },
            }}
            locale={es}
          />
        </div>
      )}
    </div>
  );
}
