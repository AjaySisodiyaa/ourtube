import { Routes, Route } from "react-router-dom";
import Signup from "./components/Pages/Signup";
import Login from "./components/Pages/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Dashboard/Home";
import MyVideos from "./components/Dashboard/MyVideos";
import Upload from "./components/Dashboard/Upload";
import Video from "./components/Pages/Video/Video";
import MainHome from "./components/Pages/Home/Home";
import Navbar from "./components/component/Navbar/Navbar";
import Profile from "./components/Pages/Profile";
import EditVideo from "./components/Dashboard/EditVideo";
import { GlobalStateProvider } from "./context/context";
// import Footer from "./components/component/Footer/Footer";
import Playlist from "./components/Dashboard/PlayList/Playlist";
import Sidebar from "./components/component/Sidebar/Sidebar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <GlobalStateProvider>
        <Navbar />
        {/* <div className="main-wrapper" style={{ display: "flex" }}> */}
        {/* <Sidebar /> */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video/:videoId" element={<Video />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home/:profileId" element={<Home />} />
            <Route path="my-video" element={<MyVideos />} />
            <Route path="upload" element={<Upload />} />
            <Route path="playlist" element={<Playlist />} />
            <Route
              path="my-video/edit-video/:videoId"
              element={<EditVideo />}
            />
          </Route>
        </Routes>
        {/* </div> */}

        <ToastContainer />
        {/* <Footer /> */}
      </GlobalStateProvider>
    </div>
  );
}

export default App;
