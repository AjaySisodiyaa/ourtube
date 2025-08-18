import "./Home.css";
import VideoItem from "../../component/VideoItem/VideoItem";
import Playlist from "../../component/Playlist/PlaylistItem";

const Home = () => {
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
      <div className="playlist-container">
        <Playlist />
      </div>
      <div className="home-video-container">
        <VideoItem timeAgo={timeAgo} />
      </div>
    </div>
  );
};

export default Home;
