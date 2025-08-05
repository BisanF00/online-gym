import { useEffect, useState } from "react";
import "../Profile/profile.css";

export default function Profile() {
  console.log("Profile component is mounted");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          window.location.href = "/";
          return;
        }
        console.log("Trying to fetch profile...");
        const response = await fetch("http://localhost:1010/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setUserData(data);
      } catch (error) {
        console.error(error);
        window.location.href = "/";
      }
    };
    handleProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (userData === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile">
        <h1>Welcome, {userData.name || "User"}</h1>
        <p>Email: {userData.email || "N/A"}</p>
        <p>Gender: {userData.gender || "N/A"}</p>
        <p>Role: {userData.role || "N/A"}</p>

        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
