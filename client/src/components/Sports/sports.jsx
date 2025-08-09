import { useEffect, useState } from "react";
import SportsCard from "./sportsCard";
import "./sports.css";

export default function Sports() {
  const [sportData, setSportData] = useState([]);

  useEffect(() => {
    const handleSports = async () => {
      try {
        const response = await fetch("http://localhost:1010/api/sports", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Fetched data:", data);
        setSportData(data);
      } catch (error) {
        console.error(error);
      }
    };
    handleSports();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="sportContainer">
          {sportData.map((sport) => (
            <SportsCard
              key={sport.id}
              sportId={sport.id}
              picture={sport.image}
              name={sport.name}
              description={sport.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}
