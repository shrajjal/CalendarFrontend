import React from "react";
import {
  startOfWeek,
  addDays,
  startOfDay,
  differenceInMinutes,
  format,
  isToday
} from "date-fns";

export default function CalendarWeek({
  events,
  onSlotClick,
  onEventClick,
  selectedDate
}) {

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const byDay = {};
  days.forEach((d) => (byDay[d.toDateString()] = []));
  events.forEach((ev) => {
    const k = new Date(ev.start).toDateString();
    if (byDay[k]) byDay[k].push(ev);
  });

  const hours = Array.from({ length: 24 }, (_, h) => h);

  function EventBlock({ ev, dayStart }) {
    const start = new Date(ev.start);
    const end = new Date(ev.end);

    const fromTop = differenceInMinutes(start, dayStart);
    const height = Math.max(20, differenceInMinutes(end, start));
    const pxPerMin = (24 * 64) / (24 * 60);

    return (
      <div
        onClick={() => onEventClick(ev)}
        style={{
          top: fromTop * pxPerMin,
          height: height * pxPerMin,
          background: ev.color
        }}
        className="absolute left-1 right-1 z-20 rounded-md p-1 text-xs text-white shadow hover:opacity-90"
      >
        {ev.title}
      </div>
    );
  }

  return (
    <div className="calendar-card p-2 sm:p-4 dark:bg-[#1f1f1f]">
      <div className="flex">

        <div className="w-10 sm:w-16 text-right pr-1 sm:pr-2 max-sm:text-[10px]">
          {hours.map((h) => (
            <div key={h} className="h-16 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              {String(h).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((day) => (
            <div
              key={day}
              className="border rounded-lg p-1 sm:p-2 relative bg-slate-50 dark:bg-[#111] dark:border-slate-700"
            >

              <div className="text-xs sm:text-sm font-medium mb-1">
                {isToday(day) ? (
                  <div className="bg-googleBlue text-white px-2 py-1 rounded-full inline-block text-xs sm:text-sm">
                    {format(day, "EEE d")}
                  </div>
                ) : (
                  <span className="dark:text-white text-slate-700">
                    {format(day, "EEE d")}
                  </span>
                )}
              </div>

              <div style={{ height: 24 * 64 }} className="relative">
                {byDay[day.toDateString()].map((ev) => (
                  <EventBlock key={ev._id} ev={ev} dayStart={startOfDay(day)} />
                ))}
              </div>

              <div
                className="absolute inset-0"
                onDoubleClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const y = e.clientY - rect.top;
                  const mins = Math.round((y / (24 * 64)) * 1440);
                  const d = new Date(day);
                  d.setHours(0, mins);
                  onSlotClick(d);
                }}
              ></div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}