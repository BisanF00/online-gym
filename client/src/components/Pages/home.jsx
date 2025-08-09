import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <div className="overlay">
          <div className="main-content">
            <h2>Push Your Limits</h2>
            <h1 className="highlight">Powerful Training</h1>
            <p>
              Join us to transform your body and mind. Discover personalized
              workouts, track progress, and get motivated every day.
            </p>
            <div className="hero-buttons">
              <button
                className="home-btn home-btn-primary"
                onClick={() => navigate("/sports")}
              >
                Start Your Journey
              </button>
              <button
                className="home-btn home-btn-outline"
                onClick={() => (navigate("/about"))}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
