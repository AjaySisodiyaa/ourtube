import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/context";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { open, setOpen } = useGlobalState();
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/home");
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("channelName");
    localStorage.removeItem("logoUrl");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="dashboard-container">
      <div className={`side-nav ${open}`}>
        <div className="profile-container">
          <img src={localStorage.getItem("logoUrl")} alt="logo" />
          <h2>{localStorage.getItem("channelName")}</h2>
        </div>
        <div className="menu-container">
          <Link
            onClick={() => setOpen("")}
            className={
              location.pathname ===
              `/dashboard/home/${localStorage.getItem("userId")}`
                ? "active-menu-link"
                : "menu-link"
            }
            to={`home/${localStorage.getItem("userId")}`}
          >
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
          <Link
            onClick={() => setOpen("")}
            className={
              location.pathname === "/dashboard/my-video"
                ? "active-menu-link"
                : "menu-link"
            }
            to={"my-video"}
          >
            <i className="fa-solid fa-video"></i> My Videos
          </Link>
          <Link
            onClick={() => setOpen("")}
            className={
              location.pathname === "/dashboard/upload"
                ? "active-menu-link"
                : "menu-link"
            }
            to={"upload"}
          >
            <i className="fa-solid fa-upload"></i>
            Upload video
          </Link>
          <div onClick={handleLogout} className="menu-link">
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </div>
        </div>
      </div>
      <div className="content-container">
        <div
          style={{ backgroundColor: "black", margin: "0px", padding: "0px" }}
        ></div>
        <h2 onClick={() => setOpen("nav-active")} className="back">
          <span>=</span>&gt;
        </h2>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
