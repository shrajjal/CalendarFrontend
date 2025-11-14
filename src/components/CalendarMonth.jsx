import React from "react";
import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  isToday
} from "date-fns";

export default function CalendarMonth({ events, onDayClick, onEventClick, selectedDate }) {

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const start = startOfWeek(monthStart);
  const end = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start, end });

  const byDay = {};
  events.forEach(ev => {
    const key = new Date(ev.start).toDateString();
    if (!byDay[key]) byDay[key] = [];
    byDay[key].push(ev);
  });

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-3 max-sm:hidden">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="text-sm font-semibold text-center text-slate-600 dark:text-slate-300">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 sm:gap-3">
        {days.map((day) => {
          const key = day.toDateString();
          const list = byDay[key] || [];
          const inMonth = day.getMonth() === monthStart.getMonth();

          return (
            <div
              key={key}
              className={`
                p-2 sm:p-3 rounded-xl border cursor-pointer transition
                ${inMonth
                  ? "bg-white dark:bg-[#1f1f1f] border-slate-300 dark:border-slate-700"
                  : "bg-slate-100 dark:bg-[#111] text-slate-400 dark:text-slate-500"
                }
                hover:bg-softBlue dark:hover:bg-[#242424]
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm sm:text-base font-semibold">
                  {isToday(day) ? (
                    <div className="w-7 h-7 rounded-full bg-googleBlue text-white flex items-center justify-center">
                      {format(day, "d")}
                    </div>
                  ) : (
                    <div className="text-slate-800 dark:text-white">{format(day, "d")}</div>
                  )}
                </div>

                <button
                  onClick={() => onDayClick(day)}
                  className="text-xs px-1 rounded hover:bg-slate-200 dark:hover:bg-[#2e2e2e]"
                >
                  +
                </button>
              </div>

              <div className="space-y-1">
                {list.slice(0, 2).map((ev) => (
                  <div
                    key={ev._id}
                    onClick={() => onEventClick(ev)}
                    className="event-pill truncate text-xs sm:text-sm"
                    style={{ background: ev.color }}
                  >
                    {ev.title}
                  </div>
                ))}

                {list.length > 2 && (
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    +{list.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}