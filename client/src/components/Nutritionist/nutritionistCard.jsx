import "./nutritionist.css";

export default function NutritionistCard({ picture, name, description }) {
  return (
    <div className="nutritionistCard">
      <img src={picture} alt={name} className="nutritionistImg"></img>
      <h3 className="nutritionistName">{name}</h3>
      <p className="nutritionistDescription">{description}</p>
    </div>
  );
}
