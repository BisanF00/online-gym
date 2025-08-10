import "../styles/about.css";
import fitnessCoaching from "../images/Fitness-coaching.jpg";
import nutritionAdvice from "../images/Nutrition-advice.png";
import coachlyTeam from "../images/Coachly-team.jpg";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-container">
      <section className="about-section">
        <div className="about-text">
          <h2>About Coachly</h2>
          <p>
            Coachly is your ultimate platform for personalized fitness and
            nutrition. Whether you are looking for a trainer to guide your
            workouts or a nutritionist to create a meal plan, Coachly connects
            you with the right experts to reach your goals faster.
          </p>
        </div>
        <div className="about-image">
          <img src={fitnessCoaching} alt="Fitness coaching" />
        </div>
      </section>

      <section className="about-section reverse">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            We aim to make expert coaching accessible to everyone. From workout
            plans to healthy recipes, we ensure that you have all the tools you
            need to succeed, right at your fingertips.
          </p>
        </div>
        <div className="about-image">
          <img src={nutritionAdvice} alt="Nutrition advice" />
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>Why Choose Coachly?</h2>
          <p>
            With Coachly, you can connect directly with certified trainers and
            nutritionists, track your progress, and get continuous support along
            your fitness journey. Our platform is designed to keep you motivated
            and informed.
          </p>
        </div>
        <div className="about-image">
          <img src={coachlyTeam} alt="Coachly team" />
        </div>
      </section>

      <section className="about-section contact-section">
        <div className="about-text">
          <h2>Contact Information</h2>
          <p>Have questions? Reach out to us!</p>
          <ul className="contact-list">
            <li>
              Email: <a>support@coachly.com</a>
            </li>
            <li>
              Phone: <a>+962780000000</a>
            </li>
            <li>Address: 123 Fitness St., Amman City, Jordan</li>
          </ul>
          <div className="contactIcon">
            <a href="https://github.com/BisanF00"><IoLogoGithub /></a>
            <a href="https://www.linkedin.com/in/bisanfararjeh/"><FaLinkedin /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
