import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../component/Logo/Logo";
import { toast } from "react-toastify";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  // const [deleteConf, setDeleteConf] = useState(false);

  const getVideos = async () => {
    try {
      const res = await axios.get(
        "https://ourtubeapi-1-37sk.onrender.com/video/own-video",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setVideos(res.data.videos.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (videoId) => {
    try {
      alert("are you sure you want to delete this video");
      // if (!deleteConf) {
      // return;
      // }
      await axios.delete(
        `https://ourtubeapi-1-37sk.onrender.com/video/${videoId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast("Video deleted");
      getVideos();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);

  function timeAgo(dateString) {
    const now = new Date();
    const created = new Date(dateString);
    const diffInSeconds = Math.floor((now - created) / 1000);

    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }

  return (
    <div className="my-videos-container">
      <h1 className="videos-heading">My Videos</h1>
      <table className="videos-table">
        <thead>
          <tr>
            <th>Vdieo</th>
            <th>Title</th>
            <th>data</th>
            <th>Views</th>
            <th>Like vs Dislike</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video._id}>
              <td onClick={() => navigate(`/video/${video._id}`)}>
                <img src={video?.thumbnailUrl} alt="thumbnail" />
              </td>
              <td>{video?.title}</td>
              <td>{video?.createdAt}</td>
              <td>{video?.views}</td>
              <td>
                {video?.likes} / {video?.dislike}
              </td>
              <td>
                <button onClick={() => handleDelete(video?._id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => navigate(`edit-video/${video?._id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card-video">
        {videos.map((video) => (
          <div key={video?._id} className="video-container">
            <Link to={`/video/${video?._id}`}>
              <img
                className="thumbnail"
                src={video?.thumbnailUrl}
                alt="thumbnail"
              />
            </Link>
            <div className="video-info">
              <Logo
                logoUrl={video?.user_id?.logoUrl}
                userId={video?.user_id._id}
              />
              <div className="video-title">
                <h4>{video?.title?.slice(0, 50)}</h4>
                <div className="video-duration">
                  <p>{video?.user_id?.channelName}</p>
                  <div className="video-stats">
                    <p>. {video?.views} views</p>
                    <p>{timeAgo(video?.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-actions">
              <button onClick={() => navigate(`edit-video/${video?._id}`)}>
                Edit
              </button>
              <button onClick={() => handleDelete(video?._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideos;
