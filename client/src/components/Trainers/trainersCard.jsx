import "./trainers.css";

export default function TrainersCard({
  picture,
  name,
  description,
  specialty,
  gender,
}) {
  return (
    <div className="trainerCard">
      <img src={picture} alt={name} className="trainerImg"></img>
      <h3 className="trainerName">{name}</h3>
      <div className="trainersInfo">
        <p>Specialty : {specialty}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
