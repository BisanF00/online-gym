import { useEffect, useState } from "react";
import "./trainers.css";
import { LiaWindowCloseSolid } from "react-icons/lia";

export default function TrainersCard({
  picture,
  name,
  description,
  specialty,
  trainer,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [follow, setFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);

  useEffect(() => {
    if (!trainer?.id) return;

    fetch(`http://localhost:1010/api/coaches/${trainer.id}/like-count`)
      .then((res) => res.json())
      .then((data) => setLikeCount(data.count));

    fetch(`http://localhost:1010/api/coaches/${trainer.id}/ratings`)
      .then((res) => res.json())
      .then((data) => setAvgRating(data.average));

    fetch(`http://localhost:1010/api/coaches/${trainer.id}/followers`)
      .then((res) => res.json())
      .then((data) => setFollowerCount(data.count));

    fetch(`http://localhost:1010/api/coaches/${trainer.id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));

    fetch(`http://localhost:1010/api/coaches/${trainer.id}/isLiked`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setLiked(data.liked));

    fetch(`http://localhost:1010/api/coaches/${trainer.id}/isFollowed`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setFollow(data.followed));
  }, [trainer?.id]);

  const handleLike = async () => {
    try {
      const res = await fetch(
        `http://localhost:1010/api/coaches/${trainer.id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      console.log("Response status:", res.status);
      console.log("Response data:", data);

      if (res.ok) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      } else {
        alert("server error: " + data?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error sending like:", error);
    }
  };

  const handleRating = async (star) => {
    setRating(star);
    await fetch(`http://localhost:1010/api/coaches/${trainer.id}/rate`, {
      method: "POST",
      body: JSON.stringify({ score : star }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await fetch(
      `http://localhost:1010/api/coaches/${trainer.id}/ratings`
    );
    const data = await res.json();
    setAvgRating(data.average);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    await fetch(`http://localhost:1010/api/coaches/${trainer.id}/comment`, {
      method: "POST",
      body: JSON.stringify({ content : commentText }),
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCommentText("");
    const res = await fetch(
      `http://localhost:1010/api/coaches/${trainer.id}/comments`
    );
    const data = await res.json();
    setComments(data);
    setCommentText("");
  };

  const handleFollow = async () => {
    try {
      const res = await fetch(
        `http://localhost:1010/api/coaches/${trainer.id}/follow`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      console.log("Response status:", res.status);
      console.log("Response data:", data);

      if (res.ok) {
        setFollow(true);
        setFollowerCount(likeCount + 1);
      } else {
        alert("server error: " + data?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error sending follow:", error);
    }
  };

  return (
    <>
      <div className="trainerCard">
        <img src={picture} alt={name} className="trainerImg"></img>
        <h3 className="trainerName">{name}</h3>
        <div className="trainersInfo">
          <p>Specialty : {specialty}</p>
          <p>{description}</p>
        </div>

        <div className="trainer-actions">
          <button
            className={`btn ${liked ? "btn-disabled" : "btn-active"}`}
            onClick={handleLike}
            disabled={liked}
          >
            {liked ? "❤️ Liked" : "🤍 Like"} ({likeCount})
          </button>

          <button
            className={`btn ${follow ? "btn-disabled" : "btn-active"}`}
            onClick={handleFollow}
            disabled={follow}
          >
            {follow ? "✔️ Following" : "➕ Follow"} ({followerCount})
          </button>

          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`rating-star ${rating >= star ? "filled" : ""}`}
                style={{ cursor: "pointer", fontSize: "20px", color: rating >= star ? "#ffcc00" : "#ccc" }}
              >
                ★
              </span>
            ))}
            <span style={{ marginLeft: "8px" }}>
              {(Number(avgRating) || 0).toFixed(1)}
            </span>
          </div>

          <button
          className="btn btn-active comment-toggle-btn"
          onClick={() => setShowCommentsDrawer(true)}
        >
          💬 Comments ({comments.length})
        </button>
      </div>

      {showCommentsDrawer && (
        <div className="comments-drawer">
          <div className="drawer-header">
            <h3>Comments</h3>
            <button className="close-btn" onClick={() => setShowCommentsDrawer(false)}>
              <LiaWindowCloseSolid />
            </button>
          </div>

          <div className="comments-list">
            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map((c, index) => (
              <p key={index} className="comment-item">
                <b>{c.name}</b>: {c.content}
              </p>
            ))}
          </div>

          <div className="comment-input-area">
            <input
              type="text"
              className="comment-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button className="btn btn-active" onClick={handleComment}>
              Submit
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
