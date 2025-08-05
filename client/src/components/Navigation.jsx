import { NavLink } from "react-router-dom";
import "./styles/Navigation.css";
import { CgProfile } from "react-icons/cg";

export default function Navigation() {
  return (
    <>
      <div className="nav-links">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/sports"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Sports
        </NavLink>
        <NavLink
          to="/coaches"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Coaches
        </NavLink>
        <NavLink
          to="/sessions"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Sessions
        </NavLink>
        <NavLink
          to="/nutritionist"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Nutritionist
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <CgProfile style={{fontSize:37}}/>
        </NavLink>

        <NavLink to="*" />
      </div>
    </>
  );
}
