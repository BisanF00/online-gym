import { Link } from "react-router-dom";
import "../styles/notFound.css";
import { BiError } from "react-icons/bi";
import { IoArrowBackSharp } from "react-icons/io5";

export default function NotFound() {
  return (
      <div className="notFoundContainer">
        <h1 className="error"><BiError /> 404</h1>
        <p className="pageNotFound">
          Oops! The page you're looking for does not exist
        </p>
        <Link to="/home" className="backToHome"><IoArrowBackSharp /> Back To Home</Link>
      </div>
  );
}