import React, { useEffect, useRef } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../context/context";
import "./Playlist.css";

const Playlisy = () => {
  const { playlist, hasMorePlaylist, fetchPlaylist } = useGlobalState();
  const loader = useRef(null); // ✅ keep loader local

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePlaylist) {
          fetchPlaylist();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current && observer) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMorePlaylist, fetchPlaylist]);

  return (
    <>
      {playlist.map((playlist) => (
        <div key={playlist?._id} className="playlist-container">
          <div className="playlist-slider">
            {playlist.video_id.map((video) => (
              <Link
                key={video._id}
                className="playlist-link"
                to={`/video/${video?._id}`}
              >
                <img
                  className="playlist-thumbnail"
                  src={video?.thumbnailUrl}
                  alt={video?.title}
                />
              </Link>
            ))}
          </div>
          <div className="video-info">
            <Logo
              logoUrl={playlist?.user_id?.logoUrl}
              userId={playlist?.user_id?._id}
            />
            <div className="video-title">
              <h4>{playlist?.title?.slice(0, 50)}</h4>
              <div className="video-duration">
                <p>{playlist?.user_id?.channelName}</p>
                <div className="video-stats">
                  {/* <p>. {playlist?.views} views</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {hasMorePlaylist && <div ref={loader} style={{ height: "50px" }} />}
      end playlisy
    </>
  );
};

export default Playlisy;
