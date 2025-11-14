import React, { useState, useEffect } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarMonth from "./components/CalendarMonth";
import CalendarWeek from "./components/CalendarWeek";
import CalendarDay from "./components/CalendarDay";
import EventSidePanel from "./components/EventSidePanel";

import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./api";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";

export default function App() {
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    let s, e;

    if (view === "month") {
      s = startOfMonth(selectedDate);
      e = endOfMonth(selectedDate);
    } else if (view === "week") {
      s = startOfWeek(selectedDate);
      e = endOfWeek(selectedDate);
    } else {
      s = startOfDay(selectedDate);
      e = endOfDay(selectedDate);
    }

    fetchEvents(s, e)
      .then(setEvents)
      .catch(console.error);
  }, [selectedDate, view]);

  const openCreate = (start) =>
    setModalData({
      title: "",
      start,
      end: start,
      description: "",
      color: "#1a73e8",
    });

  const save = async (data) => {
    if (data._id) {
      const updated = await updateEvent(data._id, data);
      setEvents((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    } else {
      const created = await createEvent(data);
      setEvents((prev) => [...prev, created]);
    }
    setModalData(null);
  };

  const remove = async (id) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((ev) => ev._id !== id));
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-6">
      <div className="max-w-7xl mx-auto">

        <CalendarHeader
          view={view}
          setView={setView}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="mt-6">
          {view === "month" && (
            <CalendarMonth
              events={events}
              onDayClick={openCreate}
              onEventClick={(ev) => setModalData(ev)}
              selectedDate={selectedDate}
            />
          )}

          {view === "week" && (
            <CalendarWeek
              events={events}
              onSlotClick={openCreate}
              onEventClick={(ev) => setModalData(ev)}
              selectedDate={selectedDate}
            />
          )}

          {view === "day" && (
            <CalendarDay
              events={events}
              onSlotClick={openCreate}
              onEventClick={(ev) => setModalData(ev)}
              selectedDate={selectedDate}
            />
          )}
        </div>
      </div>

      {modalData && (
        <EventSidePanel
          data={modalData}
          onClose={() => setModalData(null)}
          onSave={save}
          onDelete={remove}
        />
      )}
    </div>
  );
}
