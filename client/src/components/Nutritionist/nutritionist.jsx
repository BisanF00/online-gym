import { useEffect, useState } from "react";
import "./nutritionist.css";
import NutritionistCard from "./nutritionistCard";

export default function Nutritionist() {
  const [nutritionistData, setNutritionistData] = useState([]);

  useEffect(() => {
    const handleNutritionist = async () => {
      try {
        const response = await fetch("http://localhost:1010/api/nutritionist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Fetched data:", data);
        setNutritionistData(data);
      } catch (error) {
        console.error(error);
      }
    };
    handleNutritionist();
  }, []);

  return (
    <>
      <div className="nutritionistWrapper">
        <div className="nutritionistContainer">
          {nutritionistData.map((nutritionist) => (
            <NutritionistCard
              key={nutritionist.id}
              picture={nutritionist.image}
              name={nutritionist.name}
              description={nutritionist.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}