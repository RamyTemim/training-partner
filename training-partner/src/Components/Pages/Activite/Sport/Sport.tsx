import { useState } from "react";
import "./Sport.css";

interface Sport {
  id: number;
  name: string;
}

const sports: Sport[] = [
  { id: 1, name: "Escalade" },
  { id: 2, name: "Musculation" },
  { id: 3, name: "Course à pied" }
];

const SportsList: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const handleSportClick = (sport: Sport) => {
    setSelectedSport(sport);
  };

  return (
    <div className="listeSport">
      <h2>Sports</h2>
      <ul>
        {sports.map((sport) => (
          <li
            key={sport.id}
            onClick={() => handleSportClick(sport)}
            className={selectedSport === sport ? "selected" : ""}
          >
            {sport.name}
          </li>
        ))}
      </ul>
      {selectedSport && (
        <p>Sport sélectionné : {selectedSport.name}</p>
      )}
      </div>
  );
};

export default SportsList;
