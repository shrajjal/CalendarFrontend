import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths } from "date-fns";

export default function CalendarHeader({ view, setView, selectedDate, setSelectedDate }) {
  
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Apply dark or light mode to <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <div className="flex items-center justify-between">
      
      <div>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Google Calendar Clone
        </div>

        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {format(selectedDate, "MMMM yyyy")}
        </h1>
      </div>

      <div className="flex items-center space-x-3">

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="
            px-4 py-2 rounded-lg
            bg-white dark:bg-black
            border border-slate-300 dark:border-slate-700
            text-slate-700 dark:text-slate-200
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition
          "
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Navigation */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
            className="px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-white"
          >
            ◀
          </button>

          <button 
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 calendar-card dark:text-white"
          >
            Today
          </button>

          <button 
            onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
            className="px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-white"
          >
            ▶
          </button>
        </div>

        {/* View Buttons */}
        <div className="inline-flex items-center bg-white dark:bg-black calendar-card px-2 py-1 rounded-xl shadow-sm">
          {["month", "week", "day"].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={
                "px-4 py-2 rounded-lg font-medium transition-all " +
                (view === item
                  ? "bg-googleBlue text-white shadow-lg"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700")
              }
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
