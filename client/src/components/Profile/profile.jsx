import { useEffect, useState } from "react";
import "../Profile/profile.css";
import { BsPersonCircle } from "react-icons/bs";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          window.location.href = "/";
          return;
        }
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

    const savedImage = localStorage.getItem("image");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (userData === null) {
    return <p>Loading...</p>;
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        localStorage.setItem("image", base64Image);
        setImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile">
          <label htmlFor="image" className="image-upload">
            {image ? (
              <img src={image} alt="Profile" className="profile-image" />
            ) : (
              <BsPersonCircle className="imageIcon" />
            )}
          </label>

          <input
            type="file"
            accept="image/*"
            id="image"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <h1 className="userName">{userData.name || "User"}</h1>
          <div className="userInfo">
            <p className="userData">Email: {userData.email || "N/A"}</p>
            <p className="userData">Gender: {userData.gender || "N/A"}</p>
            <p className="userData">Role: {userData.role || "N/A"}</p>
          </div>

          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
