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
        setImage(null);
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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Image = event.target.result;

        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:1010/user/profile/image",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ image: base64Image }),
            }
          );

          if (response.ok) {
            setImage(base64Image);
            localStorage.setItem("image", base64Image);

            const profileResponse = await fetch(
              "http://localhost:1010/user/profile",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const updatedData = await profileResponse.json();
            setUserData(updatedData);
          }
        } catch (err) {
          console.error("Error uploading image:", err);
        }
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
            ) : userData.profile_image ? (
              <img
                src={userData.profile_image}
                alt="Profile"
                className="profile-image"
              />
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
