import React, { useState } from "react";
import "./Calendrier.css";
import { startOfWeek, addDays } from "date-fns";

interface CalendrierProps {
  dateDebut?: Date;
}

const Calendrier: React.FC<CalendrierProps> = ({ dateDebut = new Date() }) => {
  const [currentDate, setCurrentDate] = useState(dateDebut);

  const getWeekStartDate = (date: Date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    return monday;
  };

  const weekDays = [...Array(7)].map((_, index) =>
    addDays(getWeekStartDate(currentDate), index)
  );

  return (
    <div className="calendrier">
      <div className="calendrier-header">
        <button id="previous" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
          {"<"}
        </button>
        <div className="dateSemaine" >Semaine du{getWeekStartDate(currentDate).toLocaleDateString()}</div>
        <button id="next" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
          {">"}
        </button>
      </div>
      <div className="calendrier-contenu">
        {weekDays.map((day) => (
          <div key={day.toISOString()}>{day.getDate()}</div>
        ))}
      </div>
    </div>
  );
};

export default Calendrier;
