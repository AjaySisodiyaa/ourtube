import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
