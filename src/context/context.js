import axios from "axios";
import React, { createContext, useState, useContext, useCallback } from "react";

// 1. Create context
const GlobalStateContext = createContext();

// 2. Create provider component
export const GlobalStateProvider = ({ children }) => {
  const [open, setOpen] = useState("nav-active");
  const [videos, setVideos] = useState([]); // store fetched videos
  const [page, setPage] = useState(1); // track current page
  const [hasMore, setHasMore] = useState(true); // stop fetching when no more

  const fetchVideos = useCallback(async () => {
    if (!hasMore) return;

    try {
      const res = await axios.get(
        `https://ourtubeapi-1-37sk.onrender.com/video/video?page=${page}&limit=4`
        // `http://localhost:4000/video/video?page=${page}&limit=8`
      );
      const data = await res.data;

      if (data.videos.length === 0) {
        setHasMore(false); // no more videos
      } else {
        setVideos((prev) => [...prev, ...data.videos]);
        setPage((p) => p + 1);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  }, [page, hasMore]);

  return (
    <GlobalStateContext.Provider
      value={{
        open,
        setOpen,
        videos,
        fetchVideos,
        hasMore,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// 3. Custom hook to access context
export const useGlobalState = () => useContext(GlobalStateContext);
