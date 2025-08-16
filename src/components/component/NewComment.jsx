import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Logo from "./Logo";

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
    <div className="new-comment-container">
      <Logo
        userId={localStorage.getItem("userId")}
        logoUrl={localStorage.getItem("logoUrl")}
      />
      {/* <img src={localStorage.getItem("logoUrl")} alt="" /> */}
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Comment"
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default NewComment;
