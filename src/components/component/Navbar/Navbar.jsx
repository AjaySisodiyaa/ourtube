import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import searchIcon from "../../../assets/search.png";
import bellIcon from "../../../assets/bell.png";

const Navbar = () => {
  const [hide, setHide] = useState(true);
  console.log(hide);
  return (
    <div className="navbar-container">
      <Link to={"/"} className={hide ? "logo" : `logo hide`}>
        <img src={logo} alt="logo" />
        <span>OurTube</span>
      </Link>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        className={hide ? "hide" : `search-wrapper`}
      >
        <form className={` search-container`}>
          <input
            type="text"
            className={hide ? "hide nav-search" : `nav-search `}
          />
          <button type="submit" className={hide ? "hide" : `search `}>
            Search
          </button>
        </form>
        <h1
          className={hide ? " rehide hide" : `rehide`}
          style={{ color: "white", padding: "0 10px", cursor: "pointer" }}
          onClick={() => setHide(true)}
        >
          X
        </h1>
      </div>
      <div className={hide ? "icons" : ` hide`}>
        <img
          className="rehide"
          onClick={() => setHide(false)}
          src={searchIcon}
          alt=""
        />
        <img src={bellIcon} alt="" />
        <div className="links">
          {!localStorage?.getItem("token") ? (
            <Link className="link" to={"/login"}>
              Login
            </Link>
          ) : (
            <Link className="link" to={"/login"}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
