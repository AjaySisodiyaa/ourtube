import React, { useEffect, useRef } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../context/context";

const VideoItem = ({ timeAgo }) => {
  const { videos, hasMore, fetchVideos } = useGlobalState();
  const loader = useRef(null); // ✅ keep loader local

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchVideos();
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
  }, [hasMore, fetchVideos]);

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
              userId={video?.user_id?._id}
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
      {hasMore && <div ref={loader} style={{ height: "50px" }} />}
    </>
  );
};

export default VideoItem;
