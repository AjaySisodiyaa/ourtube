import React from "react";
import "./Sidebar.css";
import BigLogo from "../BigLogo/BigLogo";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../Logo/Logo";
import { useGlobalState } from "../../../context/context";
import homeIcom from "../../../assets/home.png";
import reelsIcom from "../../../assets/reels.png";
import friendsIcon from "../../../assets/friends.png";
import chatIcom from "../../../assets/chat.png";

const Sidebar = () => {
  const { setOpen } = useGlobalState();
  return (
    <div className="sidebar-container">
      <BigLogo />
      <div className="sidebar-links">
        <Link
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }}
          to="/"
          className="logo"
        >
          <img className="footer-icon" src={homeIcom} alt="" />{" "}
          <span>Home</span>
        </Link>
        <Link to="/" className="logo">
          <img className="footer-icon" src={reelsIcom} alt="" />
          <span>Reels</span>
        </Link>
        <Link to="/" className="logo">
          <img className="footer-icon" src={chatIcom} alt="" />
          <span>Chat</span>
        </Link>
        <Link to="/" className="logo">
          <img
            className="footer-icon"
            style={{
              backgroundColor: "rgb(165, 218, 239)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            src={friendsIcon}
            alt=""
          />
          <span>Friends</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
