import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useGlobalState } from "../../../context/context";
import homeIcom from "../../../assets/home.png";
import reelsIcom from "../../../assets/reels.png";
import friendsIcon from "../../../assets/friends.png";
import chatIcom from "../../../assets/chat.png";

const Footer = () => {
  const { setOpen } = useGlobalState();
  return (
    <div className="footer-container">
      <div className="footer-content">
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
          <img className="footer-icon" src={homeIcom} alt="" />
        </Link>
        <Link to="/" className="logo">
          <img className="footer-icon" src={reelsIcom} alt="" />
        </Link>
        <Link to="/" className="logo">
          <img className="footer-icon" src={chatIcom} alt="" />
        </Link>
        <Link to="/" className="logo">
          <img
            className="footer-icon"
            style={{
              backgroundColor: "rgb(165, 218, 239)",
              borderRadius: "50%",
            }}
            src={friendsIcon}
            alt=""
          />
        </Link>
        <Link
          onClick={() => setOpen("nav-active")}
          to={`/dashboard/home/${localStorage.getItem("userId")}`}
          className="logo"
        >
          <Logo logoUrl={localStorage.getItem("logoUrl")} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
