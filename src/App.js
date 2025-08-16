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
import EditVideo from "./components/Dashboard/EditVideo";
import { GlobalStateProvider } from "./context";
import Footer from "./components/component/Footer/Footer";

function App() {
  return (
    <div>
      <GlobalStateProvider>
        <Navbar />

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
            <Route
              path="my-video/edit-video/:videoId"
              element={<EditVideo />}
            />
          </Route>
        </Routes>

        <ToastContainer />
        <Footer />
      </GlobalStateProvider>
    </div>
  );
}

export default App;
