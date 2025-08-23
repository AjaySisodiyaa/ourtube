import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "../../component/Comment";
import NewComment from "../../component/NewComment";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../context/context";
import AdsterraBanner from "../../component/Adsterra/AdsterraBanner";
import "./Video.css";

const Video = () => {
  const { videoId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState({});
  // const { videoId} = useParams();

  const navigate = useNavigate();
  const {
    videos,
    hasMore,
    fetchVideos,
    playlist,
    fetchPlaylist,
    hasMorePlaylist,
    userClickedPlaylist,
    userClickedVideo,
    getVideo,
    video,
    getPlaylistByVideoId,
    playlistByVideoId,
  } = useGlobalState();
  const loader = useRef(null);
  const platlistLoader = useRef(null);
  console.log(userClickedPlaylist, userClickedVideo);

  //get playlist by video id
  // useEffect(() => {
  // }, [videoId, getPlaylistByVideoId]);

  // Get all videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchVideos();
          getPlaylistByVideoId(videoId);
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
  }, [hasMore, fetchVideos, getPlaylistByVideoId, videoId]);

  // Get all playlist
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePlaylist) {
          fetchPlaylist();
        }
      },
      { threshold: 1.0 }
    );

    if (platlistLoader.current) observer.observe(platlistLoader.current);

    return () => {
      if (platlistLoader.current && observer) {
        observer.unobserve(platlistLoader.current);
      }
    };
  }, [hasMorePlaylist, fetchPlaylist]);

  //get comments
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://ourtubeapi-1-37sk.onrender.com/comment/${videoId}`
      );

      setComments(response.data.commentList.reverse());
    } catch (error) {
      console.log(error);
    }
  }, [videoId]);

  //get user by id
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(
        `https://ourtubeapi-1-37sk.onrender.com/user/${userId}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Error fetching user");
    }
  };

  useEffect(() => {
    getComments();
    getUserById(localStorage.getItem("userId"));
  }, [getComments]);

  useEffect(() => {
    getVideo(videoId);
  }, [getVideo, videoId]);

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

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, []);

  //views updated
  const viewed = useCallback(async () => {
    try {
      await axios.put(
        `https://ourtubeapi-1-37sk.onrender.com/video/views/${video?._id}`
      );
      getVideo();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error subscribing");
      console.log(error.response?.data?.error);
    }
  }, [video?._id, getVideo]);

  useEffect(() => {
    if (!video?._id) return;

    const timer = setTimeout(() => {
      viewed();
    }, 5000);

    return () => clearTimeout(timer);
  }, [video?._id, viewed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key.toLowerCase() === "m") {
        // Press 'M' to unmute
        if (videoRef.current.muted === true) {
          videoRef.current.muted = false;
          videoRef.current.play(); // Ensure playback resumes
        } else {
          videoRef.current.muted = true;
        }
      } else if (e.key.toLowerCase() === "k") {
        if (videoRef.current.paused) {
          videoRef.current.play(); // Ensure playback resumes
        } else {
          videoRef.current.pause();
          //   videoRef.current.muted = true;
        }
      } else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          videoRef.current.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      } else if (e.key.toLowerCase() === "j") {
        videoRef.current.currentTime -= 10;
      } else if (e.key.toLowerCase() === "l") {
        videoRef.current.currentTime += 10;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="play-wrapper">
      <div className="play-container">
        <div className="play-player">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            src={video.videoUrl}
            controls
          ></video>
        </div>

        <div className="play-info">
          {/* <AdsterraBanner /> */}
          <h2>{video.title}</h2>
          {/* <div className="subscribe">
            <Logo
              logoUrl={video?.user_id?.logoUrl}
              userId={video?.user_id?._id}
            />
            <div className="subscribe-info">
              <h3>{video?.user_id?.channelName}</h3>
              <p>{video?.user_id?.subscribers} subscribers</p>
            </div>
            <button
              className={
                user?.subscribedChannels?.includes(video?.user_id?._id)
                  ? "unsubscribe"
                  : "subscribed"
              }
              onClick={
                user?.subscribedChannels?.includes(video?.user_id?._id)
                  ? handleUnsubscribe
                  : handleSubscribe
              }
            >
              {user?.subscribedChannels?.includes(video?.user_id?._id)
                ? "Unsubscribe"
                : "Subscribe"}
            </button>
          </div> */}
        </div>
        <div className="play-description">
          <div className="play-description-info">
            <p>{video?.views} views</p>
            <p>{timeAgo(video?.createdAt)} </p>
          </div>
          <p onClick={() => setIsOpen(true)}>
            {isOpen ? (
              <>
                {video?.description}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  show less
                </button>
              </>
            ) : (
              video?.description?.slice(0, 200)
            )}
          </p>
        </div>
        <NewComment
          logoUrl={video?.user_id?.logoUrl}
          userId={video?.user_id?._id}
          videoId={videoId}
          getComments={getComments}
        />
        <div>
          <Comment
            logoUrl={video?.user_id?.logoUrl}
            userId={video?.user_id?._id}
            comments={comments}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            padding: "10px 15px",
            borderRadius: "10px",
            marginBottom: "10px",
            backgroundColor: "#333",
          }}
          className="play-suggestion"
        >
          {playlistByVideoId.map((video) => (
            <div
              style={{
                padding: "10px 5px ",
                borderRadius: "10px",
                marginBottom: "10px",
                backgroundColor: "#000",
                color: "white",
              }}
              key={video?._id}
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={`/video/${video?._id}`}
              >
                {video?.title}
              </Link>
            </div>
          ))}
          {hasMorePlaylist && (
            <div ref={platlistLoader} style={{ height: "50px" }} />
          )}
          {/* {playlist?.map((playlist) => (
            <div
              key={playlist._id}
              onClick={() => navigate(`/video/${video._id}`)}
              className="play-suggestion-video"
            >
              <img src={playlist?.video_id[0]?.thumbnailUrl} alt="video" />
              <div className="play-suggestion-video-info">
                <h3>{video.title}</h3>
                <p>{video.user_id.channelName}</p>
                <div className="play-suggestion-video-views">
                  <p>{video?.views} views</p>
                  <p>{timeAgo(video?.createdAt)} </p>
                </div>
              </div>
            </div>
            ))}
            */}
        </div>
        <div className="play-suggestion">
          {videos?.map((video) => (
            <div
              key={video._id}
              onClick={() => navigate(`/video/${video._id}`)}
              className="play-suggestion-video"
            >
              <img src={video?.thumbnailUrl} alt="video" />
              <div className="play-suggestion-video-info">
                <h3>{video.title}</h3>
                <p>{video.user_id.channelName}</p>
                <div className="play-suggestion-video-views">
                  <p>{video?.views} views</p>
                  <p>{timeAgo(video?.createdAt)} </p>
                </div>
              </div>
            </div>
          ))}
          {hasMore && <div ref={loader} style={{ height: "50px" }} />}
        </div>
      </div>
    </div>
  );
};

export default Video;
