import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Dashboard/Home";
import MyVideos from "./components/Dashboard/MyVideos";
import Upload from "./components/Dashboard/Upload";
import Video from "./components/Video";
import MainHome from "./components/Home";
import Navbar from "./components/component/Navbar";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="my-video" element={<MyVideos />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
