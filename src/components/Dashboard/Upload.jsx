import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadVideo from "../../assets/upload-video.gif";
import uploadImage from "../../assets/upload-image.png";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util"; // replaces fetchFile

import ffmpeg, { loadFFmpeg } from "../../context/ffmpeg";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressed, setCompressed] = useState(null);

  const navigate = useNavigate();

  //video compressor

  // const load = async () => {
  //   await ffmpeg.load();
  //   setReady(true);
  // };

  useEffect(() => {
    const init = async () => {
      await loadFFmpeg();
      setReady(true);
    };
    init();
  }, []);

  const compressVideo = async (file) => {
    // Write file into FFmpeg FS
    await ffmpeg.writeFile("input.mp4", await fetchFile(file));
    ffmpeg.on("progress", ({ progress }) => {
      setProgress(Math.round(progress * 100));
      setLoading(true);
    });

    // Run compression
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vcodec",
      "libx264",
      "-crf",
      "28", // adjust quality/size
      "output.mp4",
    ]);

    // Read output file
    const data = await ffmpeg.readFile("output.mp4");
    const blob = new Blob([data.buffer], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);

    setCompressed(url);
    setVideo(new File([data.buffer], "compressed.mp4", { type: "video/mp4" }));
    setVideoUrl(url);

    setLoading(false);
    setProgress(100); // done
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
          <div className="upload-file-container">
            {ready ? (
              <>
                <label htmlFor="upload-video-label" className="upload-file">
                  Select Video
                  <img src={uploadVideo} alt="" />
                </label>
                <input
                  id="upload-video-label"
                  style={{ display: "none" }}
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setVideo(file);
                      setProgress(0);
                      await compressVideo(file);
                    }
                  }}
                />
              </>
            ) : (
              <p>loading....</p>
            )}
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

          <button disabled={loading} type="submit">
            {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
            {/* 👇 Progress Bar */}
            {loading ? (
              <div
                className="progress-bar-wrapper"
                style={{ margin: "10px 0" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    background: "#eee",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "#4caf50",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
                <p style={{ fontSize: "12px" }}>{progress}%</p>
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </form>
        <div className="upload-video-content">
          {videoUrl && (
            <div>
              <p>Compressed Preview:</p>
              <video className="upload-video" controls src={videoUrl}></video>
            </div>
          )}

          {imageUrl && (
            <img className="upload-thumbnail" src={imageUrl} alt="thumbnail" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
