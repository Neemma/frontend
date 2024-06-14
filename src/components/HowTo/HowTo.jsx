import React, { useState, useEffect } from "react";
import "./HowTo.css";

const HowTo = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch video tutorials from backend
    const fetchVideos = async () => {
      try {
        const response = await fetch("https://backend-one-black.vercel.app/videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (videoId) => {
    if (newComment.trim() === "") return;

    try {
      const response = await fetch(`https://backend-one-black.vercel.app/videos/${videoId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment }),
      });

      if (response.ok) {
        setComments((prevComments) => ({
          ...prevComments,
          [videoId]: [...(prevComments[videoId] || []), newComment],
        }));
        setNewComment("");
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="how-to-container">
      <h1>Video Tutorials</h1>
      {videos.map((video) => (
        <div key={video.id} className="video-tutorial">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <video width="600" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="comments-section">
            <h3>Comments</h3>
            {(comments[video.id] || []).map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment"
            ></textarea>
            <button onClick={() => handleCommentSubmit(video.id)}>Submit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowTo;
