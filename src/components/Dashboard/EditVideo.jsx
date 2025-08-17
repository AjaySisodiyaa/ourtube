import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import uploadVideo from "../../assets/upload-video.gif";
import uploadImage from "../../assets/upload-image.png";

const EditVideo = () => {
  const { videoId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const navigate = useNavigate();

  const getVideoById = useCallback(
    async (req, res) => {
      try {
        const res = await axios.get(
          `https://ourtubeapi-1-37sk.onrender.com/video/video/${videoId}`
        );
        setTitle(res.data.video.title);
        setDescription(res.data.video.description);
        setCategory(res.data.video.category);
        setTags(res.data.video.tags);
        setImageUrl(res.data.video.thumbnailUrl);
        console.log(res.data.video);
      } catch (error) {
        console.log(error.data.error.message);
        toast.error(error.data.error.message);
      }
    },
    [videoId]
  );

  useEffect(() => {
    getVideoById();
  }, [getVideoById]);

  const thumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const videoHandler = (e) => {
    setVideoUrl(URL.createObjectURL(e.target.files[0]));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);

    formData.append("thumbnail", thumbnail);

    await axios
      .post(
        `https://ourtubeapi-1-37sk.onrender.com/video/${videoId}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast("Video is Uploaded");
        navigate("/dashboard/my-video");
      })
      .catch((err) => {
        setLoading(false);
        const message = err.response?.data?.error || "Updating failed";
        toast.error(message);
        console.error(message);
      });
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <div className="upload-container">
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
            value={title}
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
          value={title}
          <textarea
            onChange={(e) => setTags(e.target.value)}
            name="tags"
            placeholder="Tags"
          ></textarea>
          <div className="upload-file-container">
            <label htmlFor="upload-video-label" className="upload-file">
              Select Video
              <img src={uploadVideo} alt="" />
            </label>
            <input
              id="upload-video-label"
              style={{ display: "none" }}
              onChange={videoHandler}
              type="file"
            />
            <label htmlFor="thumbnail" className="upload-file">
              Select Thumbnail
              <img src={uploadImage} alt="" />
            </label>
            <input
              id="thumbnail"
              style={{ display: "none" }}
              onChange={thumbnailHandler}
              type="file"
            />
          </div>
          <button type="submit">
            {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
            Upload
          </button>
        </form>
        <div className="upload-video-content">
          {videoUrl !== "" && (
            <video className="upload-video" controls src={videoUrl}></video>
          )}

          {imageUrl !== "" && (
            <img className="upload-thumbnail" src={imageUrl} alt="thumbnail" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
