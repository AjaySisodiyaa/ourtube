import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Logo from "./Logo/Logo";

const NewComment = ({ videoId, getComments }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        `https://ourtubeapi-1-37sk.onrender.com/comment/new-comment/${videoId}`,
        {
          commentText: comment,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setComment("");
      getComments();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <form className="new-comment-form" onSubmit={handleSubmit}>
      <div className="new-comment-container">
        <Logo
          userId={localStorage.getItem("userId")}
          logoUrl={localStorage.getItem("logoUrl")}
        />

        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Comment"
        />
      </div>
      <button type="submit">Comment</button>
    </form>
  );
};

export default NewComment;
