import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useGlobalState } from "../../context";
import Logo from "./Logo";
const Navbar = () => {
  const { open, setOpen } = useGlobalState("");

  return (
    <div className="navbar-container">
      <Link to={"/"} className="logo">
        <img src={logo} alt="logo" />
        <span>OurTube</span>
      </Link>
      <div className="links">
        {!localStorage?.getItem("token") ? (
          <Link className="link" to={"/login"}>
            Login
          </Link>
        ) : (
          <Link
            className="profile"
            to={`/dashboard/home/${localStorage.getItem("userId")}`}
          >
            <Logo
              // userId={localStorage.getItem("userId")}
              logoUrl={localStorage.getItem("logoUrl")}
            />
          </Link>
        )}
        <i
          onClick={() =>
            open === "nav-active" ? setOpen("") : setOpen("nav-active")
          }
          className="fas fa-hamburger"
        ></i>
      </div>
    </div>
  );
};

export default Navbar;
