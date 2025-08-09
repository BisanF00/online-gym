import { useEffect, useState } from "react";
import "./trainers.css";
import TrainersCard from "./trainersCard";

export default function Trainers() {
  const [trainerData, setTrainerData] = useState([]);
  const [searchTrainer, setSearchTrainer] = useState("");
  const [filteredTrainer, setFilteredTrainer] = useState([]);

  useEffect(() => {
    const handleTrainers = async () => {
      try {
        const response = await fetch("http://localhost:1010/api/coaches", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Fetched data:", data);
        setTrainerData(data);
      } catch (error) {
        console.error(error);
      }
    };
    handleTrainers();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTrainer(search);

    const filteredItems = trainerData.filter((trainer) =>
      trainer.specialty.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTrainer(filteredItems);
  };

  return (
    <>
      <div className="wrapperTrainer">
        <div className="searchSpecialty">
          <label htmlFor="specialty">Search By Specialty :</label>
          <input
            id="specialty"
            type="text"
            value={searchTrainer}
            onChange={handleSearch}
            placeholder="Type to search"
          />
        </div>

        <div className="trainerContainer">
          {(searchTrainer.length > 0 ? filteredTrainer : trainerData).map(
            (trainer) => (
              <TrainersCard
                key={trainer.id}
                picture={trainer.image_url}
                name={trainer.name}
                specialty={trainer.specialty}
                description={trainer.description}
                trainer={trainer}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
