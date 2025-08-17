import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Home.css";
import { Link } from "react-router-dom";
import Logo from "./component/Logo";
import VideoItem from "./component/VideoItem/VideoItem";

const Home = () => {
  // const [allVideos, setAllVideos] = useState([]);
  // const getAllVideo = useCallback(async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://ourtubeapi-1-37sk.onrender.com/video/videos`
  //     );
  //     setAllVideos(response.data.videos);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(
  //       error.response?.data?.error || "Error fetching channel videos"
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   getAllVideo();
  // }, [getAllVideo]);

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
    <div className="home-container">
      <VideoItem timeAgo={timeAgo} />
      {/* {allVideos.map((video) => (
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
                <p>{video?.user_id?.channelName} </p>
                <div className="video-stats">
                  <p>. {video?.views} views</p>
                  <p>{timeAgo(video?.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Home;
