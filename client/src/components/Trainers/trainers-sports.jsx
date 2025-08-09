import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import TrainersCard from "./trainersCard";
import { useEffect, useState } from "react";
import "./trainers.css";

export default function SportsAndTrainers() {
  const [trainerData, setTrainerData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { sportId } = location.state || {};

  useEffect(() => {
    const handleSportTrainers = async () => {
      try {
        const response = await fetch(
          `http://localhost:1010/api/sports/${sportId}/trainers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Fetched data:", data);
        setTrainerData(data);
      } catch (error) {
        console.error(error);
      }
    };
    handleSportTrainers();
  }, [sportId]);

  return (
    <>
      <button className="backBtn" onClick={() => navigate("/sports")}>
        <IoArrowBackSharp /> Back
      </button>
      <div className="trainerContainer">
        {trainerData.map((trainer) => (
          <TrainersCard
            key={trainer.id}
            picture={trainer.image_url}
            name={trainer.name}
            specialty={trainer.specialty}
            description={trainer.description}
          />
        ))}
      </div>
    </>
  );
}
