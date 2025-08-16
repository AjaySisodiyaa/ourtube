import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      <div className="side-nav">
        <div className="profile-container">
          <img src={localStorage.getItem("logoUrl")} alt="logo" />
          <h2>{localStorage.getItem("channelName")}</h2>
        </div>
        <div className="menu-container">
          <Link
            className={
              location.pathname === "/dashboard/home"
                ? "active-menu-link"
                : "menu-link"
            }
            to={"home"}
          >
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
          <Link
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
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
