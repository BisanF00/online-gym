import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import "./styles/Layout.css";

export default function Layout() {
  return (
    <>
      <div className="layout">
        <div>
              <header className="header">
                <h1 className="appName">Coachly</h1>
                <Navigation />
              </header>
            </div>
        
        <main><Outlet /></main>
        <footer>© 2025 Coachly</footer>
      </div>
    </>
  );
}