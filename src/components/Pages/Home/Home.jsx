import "./Home.css";

import Playlist from "../../component/Playlist/PlaylistItem";
import { useEffect } from "react";
import AdsterraBanner from "../../component/Adsterra/AdsterraBanner";

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

  function handleAdClick() {
    window.open(
      "https://www.profitableratecpm.com/uafdu270vn?key=681b59d059dca02467e18babca42f9f7",
      "_blank",
      "noopener,noreferrer"
    );
  }

  useEffect(() => {
    // Example: attach to user click
    const element = document.getElementById("ad-opener");
    if (element) {
      element.addEventListener("click", handleAdClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleAdClick);
      }
    };
  }, []);

  return (
    <div
      className="home-container"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        paddingTop: "100px",
      }}
    >
      <iframe
        title="video"
        src="https://megaplay.buzz/stream/s-2/113728/sub"
        allow="autoplay; fullscreen"
        allowfullscreen="yes"
        frameborder="no"
        scrolling="no"
        style={{ width: "70vw", height: "70vh", overflow: "hidden" }}
      ></iframe>
      <div className="playlist-container">
        <a
          target="_blank"
          data-cfasync="false"
          href="https://www.profitableratecpm.com/uafdu270vn?key=681b59d059dca02467e18babca42f9f7"
          rel="noopener noreferrer"
        >
          <Playlist />
        </a>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
