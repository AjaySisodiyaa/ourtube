import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import searchIcon from "../../../assets/search.png";
import bellIcon from "../../../assets/bell.png";

const Navbar = () => {
  const [hide, setHide] = useState("hide");
  return (
    <div className="navbar-container">
      <Link to={"/"} className={hide === "hide" ? "logo" : `logo hide`}>
        <img src={logo} alt="logo" />
        <span>OurTube</span>
      </Link>
      <div className="search-wrapper">
        <form className={`${hide} search-container`}>
          <input type="text" className={`nav-search ${hide}`} />
          <button type="submit" className={`${hide}`}>
            Search
          </button>
          <h1 className={`${hide}`} onClick={() => setHide("hide")}>
            X
          </h1>
        </form>
      </div>
      <div className={hide === "hide" ? "icons" : ` hide`}>
        <img onClick={() => setHide("")} src={searchIcon} alt="" />
        <img src={bellIcon} alt="" />
        <div className="links">
          {!localStorage?.getItem("token") ? (
            <Link className="link" to={"/login"}>
              Login
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
