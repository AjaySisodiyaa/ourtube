import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useGlobalState } from "../../../context";

const Footer = () => {
  const { open, setOpen } = useGlobalState();
  return (
    <div className="footer-container">
      <div className="footer-content">
        <Link onClick={() => window.scrollTo(0, 0)} to="/" className="logo">
          Home
        </Link>
        <Link to="/" className="logo">
          shorts
        </Link>
        <Link to="/" className="logo">
          chat
        </Link>
        <Link to="/" className="logo">
          subscription
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
