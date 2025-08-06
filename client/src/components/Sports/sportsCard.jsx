import "./sports.css";

export default function SportsCard ({picture, name, description}) {
return (
  <div className="sportCard">
    <img src={picture} alt={name} className="sportImg"></img>
      <h3 className="sportName">{name}</h3>
      <p className="sportDescription">{description}</p>
  </div>
)
}