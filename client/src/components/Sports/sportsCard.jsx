import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sports.css";

export default function SportsCard({ sportId, picture, name, description }) {
  const [isHidden, setIsHidden] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="sportCard">
      <img src={picture} alt={name} className="sportImg"></img>
      <h3 className="sportName">{name}</h3>
      <p
        className="sportDescription"
        style={{ display: isHidden ? "block" : "none" }}
      >
        {description}
      </p>
      <div className="button-container">
        <button className="showBtn" onClick={() => setIsHidden(!isHidden)}>
          Details
        </button>
        <button
          className="showBtn"
          onClick={() =>
            navigate("/sports/coaches", { state: { sportId: sportId } })
          }
        >
          Show Coaches
        </button>
      </div>
    </div>
  );
}
