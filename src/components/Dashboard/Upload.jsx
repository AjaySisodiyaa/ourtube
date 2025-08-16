import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const videoHandler = (e) => {
    setVideo(e.target.files[0]);
  };
  const thumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);

    await axios
      .post("https://ourtubeapi-1-37sk.onrender.com/video/upload", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast("Video is uploaded");
        navigate("/dashboard/my-video");
      })
      .catch((err) => {
        setLoading(false);
        const message = err.response?.data?.error || "Upload failed";
        toast.error(message);
        console.error(message);
      });
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={submitHandler} className="upload-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="Description"
        ></textarea>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="entertainment">Entertainment</option>
          <option value="technology">Technology</option>
          <option value="education">Education</option>
          <option value="science">Science</option>
          <option value="motivation">Motivation</option>
        </select>
        <textarea
          onChange={(e) => setTags(e.target.value)}
          name="tags"
          placeholder="Tags"
        ></textarea>
        <label htmlFor="video">Select Video</label>
        <input onChange={videoHandler} type="file" />
        <label htmlFor="thumbnail">Select Thumbnail</label>
        <input onChange={thumbnailHandler} type="file" />
        {imageUrl !== "" && (
          <img className="thumbnail" src={imageUrl} alt="thumbnail" />
        )}
        <button type="submit">
          {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
