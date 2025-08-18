import React from "react";
import "./Playlist.css";
import PlaylistItem from "../../component/Playlist/PlaylistItem";

const Playlist = () => {
  return (
    <div>
      <div className="playlist-container">
        <PlaylistItem />
      </div>
    </div>
  );
};

export default Playlist;
