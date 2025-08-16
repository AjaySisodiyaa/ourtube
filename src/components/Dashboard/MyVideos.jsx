import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

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
  useEffect(() => {
    getVideos();
  }, []);
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
                <button>Delete</button>
              </td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyVideos;
