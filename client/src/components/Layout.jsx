import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import "./styles/Layout.css";
import layoutBackground from "./images/layoutBackground.png";


export default function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/home";

  return (
    <>
      <div
        className="layout"
        style={{
          backgroundImage: isHome
            ? 'url("https://plus.unsplash.com/premium_photo-1661331770729-7d67495b2c9f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
            : `url(${layoutBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          minHeight: "100vh",
        }}
      >
        <div>
          <header className="header">
            <h1 className="appName">Coachly</h1>
            <Navigation />
          </header>
        </div>

        <main>
          <Outlet />
        </main>
        <footer>© 2025 Coachly</footer>
      </div>
    </>
  );
}
