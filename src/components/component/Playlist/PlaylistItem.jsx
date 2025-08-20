import React, { useEffect, useRef } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../context/context";
import "./Playlist.css";
import AdsterraBanner from "../Adsterra/AdsterraBanner";

const Playlisy = () => {
  const {
    playlist,
    hasMorePlaylist,
    fetchPlaylist,
    adClicked,
    setAdClicked,
    setUserClickedPlaylist,
    setUserClickedVideo,
  } = useGlobalState();
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

  const handleClick = (playlistId, videoId) => {
    console.log(playlistId, videoId);
    setUserClickedPlaylist(playlistId._id);
    setUserClickedVideo(videoId._id);
    setAdClicked((prev) => {
      console.log(prev);
      if (prev === 2) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };
  return (
    <>
      {playlist.map((playlist) => (
        <div key={playlist?._id} className="playlist-container">
          <div className="video-title">
            <h2 style={{ color: "white" }}>{playlist?.title}</h2>
          </div>
          <div className="playlist-slider">
            {playlist.video_id.map((video) => (
              <Link
                key={video._id}
                className="playlist-link"
                onClick={() => {
                  handleClick(playlist, video);
                }}
                target={adClicked === 2 ? "_self" : "_blank"}
                to={
                  adClicked === 2
                    ? `/video/${video?._id}`
                    : `https://www.profitableratecpm.com/uafdu270vn?key=681b59d059dca02467e18babca42f9f7`
                }
              >
                {/* {console.log(video)} */}
                <img
                  className="playlist-thumbnail"
                  src={video?.thumbnailUrl}
                  alt={video?.title}
                />
                <p style={{ color: "white" }}>{video?.title}</p>
              </Link>
            ))}
          </div>
          <div className="video-info">
            {/* <Logo
              logoUrl={playlist?.user_id?.logoUrl}
              userId={playlist?.user_id?._id}
            /> */}
          </div>
          <AdsterraBanner />
        </div>
      ))}
      {hasMorePlaylist && <div ref={loader} style={{ height: "50px" }} />}
    </>
  );
};

export default Playlisy;
