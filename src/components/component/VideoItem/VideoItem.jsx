import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalState } from "../../../context/context";

const VideoItem = ({ timeAgo }) => {
  const loader = useRef(null);
  const { fetchVideos, videos, hasMore } = useGlobalState();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchVideos();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current; // ✅ copy ref value

    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader); // ✅ cleanup with same value
    };
  }, [loader, hasMore, fetchVideos]);

  return (
    <>
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
        </div>
      ))}
      {hasMore ? (
        <div ref={loader} style={{ height: "50px" }} />
      ) : (
        <p>No more videos</p>
      )}
    </>
  );
};

export default VideoItem;
