import React from "react";
import {
  startOfDay,
  differenceInMinutes,
  format,
  isToday
} from "date-fns";

export default function CalendarDay({
  events,
  onSlotClick,
  onEventClick,
  selectedDate
}) {

  const dayStart = startOfDay(selectedDate);
  const hours = Array.from({ length: 24 }, (_, h) => h);

  const todayEvents = events.filter(
    (ev) => new Date(ev.start).toDateString() === dayStart.toDateString()
  );

  function EventBlock({ ev }) {
    const s = new Date(ev.start);
    const e = new Date(ev.end);

    const fromTop = differenceInMinutes(s, dayStart);
    const height = Math.max(20, differenceInMinutes(e, s));
    const pxPerMin = (24 * 64) / (24 * 60);

    return (
      <div
        onClick={() => onEventClick(ev)}
        style={{
          top: fromTop * pxPerMin,
          height: height * pxPerMin,
          background: ev.color
        }}
        className="absolute left-2 right-2 z-20 text-xs sm:text-sm text-white p-2 rounded-md shadow hover:opacity-90"
      >
        {ev.title}
      </div>
    );
  }

  return (
    <div className="calendar-card p-3 sm:p-4 dark:bg-[#1f1f1f]">

      <div className="text-lg sm:text-xl font-semibold mb-3">
        {isToday(selectedDate) ? (
          <div className="bg-googleBlue text-white px-3 py-1 rounded-full inline-block shadow">
            {format(selectedDate, "EEEE, MMM d")}
          </div>
        ) : (
          <span className="dark:text-white">{format(selectedDate, "EEEE, MMM d")}</span>
        )}
      </div>

      <div className="flex">

        <div className="w-10 sm:w-20 pr-1 sm:pr-2 max-sm:text-[10px]">
          {hours.map((h) => (
            <div key={h} className="h-16 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              {String(h).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        <div className="flex-1 border rounded-lg p-1 sm:p-2 relative bg-slate-50 dark:bg-[#111] border-slate-200 dark:border-slate-700">
          <div style={{ height: 24 * 64 }} className="relative">
            {todayEvents.map((ev) => (
              <EventBlock key={ev._id} ev={ev} />
            ))}
          </div>

          <div
            className="absolute inset-0"
            onDoubleClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const y = e.clientY - rect.top;
              const mins = Math.round((y / (24 * 64)) * 1440);
              const d = new Date(dayStart);
              d.setHours(0, mins);
              onSlotClick(d);
            }}
          ></div>
        </div>

      </div>
    </div>
  );
}