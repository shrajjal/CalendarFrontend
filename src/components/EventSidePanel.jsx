import React, { useState } from "react";

export default function EventSidePanel({ data, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(data.title || "");
  const [start, setStart] = useState(
    new Date(data.start).toISOString().slice(0, 16)
  );
  const [end, setEnd] = useState(
    new Date(data.end).toISOString().slice(0, 16)
  );
  const [description, setDescription] = useState(data.description || "");
  const [color, setColor] = useState(data.color || "#1a73e8");

  const saveEvent = () => {
    onSave({
      ...data,
      title,
      start: new Date(start),
      end: new Date(end),
      description,
      color,
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-30 
        bg-black/40 backdrop-blur-sm 
        flex justify-end
        animate-fadeIn
      "
      onClick={onClose}
    >
      <div
        className="
          w-full sm:w-[380px] h-full
          bg-white dark:bg-[#1a1a1a]
          border-l border-slate-200 dark:border-slate-700
          shadow-2xl
          p-5 sm:p-6
          animate-slideIn
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            {data._id ? "Edit Event" : "New Event"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-300 text-xl hover:text-black dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* TITLE */}
        <label className="text-sm text-slate-600 dark:text-slate-300">
          Title
        </label>
        <input
          type="text"
          className="
            w-full mt-1 mb-4 p-2 rounded-lg 
            border border-slate-300 dark:border-slate-600
            bg-white dark:bg-[#2a2a2a]
            text-slate-800 dark:text-white
            outline-none focus:ring-2 focus:ring-googleBlue
          "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* START TIME */}
        <label className="text-sm text-slate-600 dark:text-slate-300">
          Start
        </label>
        <input
          type="datetime-local"
          className="
            w-full mt-1 mb-4 p-2 rounded-lg 
            border border-slate-300 dark:border-slate-600
            bg-white dark:bg-[#2a2a2a]
            text-slate-800 dark:text-white
            outline-none focus:ring-2 focus:ring-googleBlue
          "
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        {/* END TIME */}
        <label className="text-sm text-slate-600 dark:text-slate-300">
          End
        </label>
        <input
          type="datetime-local"
          className="
            w-full mt-1 mb-4 p-2 rounded-lg 
            border border-slate-300 dark:border-slate-600
            bg-white dark:bg-[#2a2a2a]
            text-slate-800 dark:text-white
            outline-none focus:ring-2 focus:ring-googleBlue
          "
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        {/* COLOR PICKER */}
        <label className="text-sm text-slate-600 dark:text-slate-300">
          Color
        </label>
        <input
          type="color"
          className="w-14 h-10 mt-1 mb-4 p-1 rounded border border-slate-300 dark:border-slate-600"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        {/* DESCRIPTION */}
        <label className="text-sm text-slate-600 dark:text-slate-300">
          Description
        </label>
        <textarea
          className="
            w-full mt-1 mb-6 p-3 rounded-lg 
            border border-slate-300 dark:border-slate-600
            bg-white dark:bg-[#2a2a2a]
            text-slate-800 dark:text-white
            outline-none min-h-[80px]
            focus:ring-2 focus:ring-googleBlue
          "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ACTION BUTTONS */}
        <div className="mt-auto flex justify-between">
          {data._id && (
            <button
              onClick={() => onDelete(data._id)}
              className="
                px-4 py-2 rounded-lg bg-red-500 text-white 
                hover:bg-red-600 transition shadow
              "
            >
              Delete
            </button>
          )}

          <button
            onClick={saveEvent}
            className="
              flex-1 ml-3 px-4 py-2 rounded-lg
              bg-googleBlue text-white 
              hover:bg-blue-600 transition shadow
            "
          >
            Save
          </button>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        .animate-slideIn {
          animation: slideIn 0.25s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeInBg 0.25s ease-out;
        }
        @keyframes fadeInBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
