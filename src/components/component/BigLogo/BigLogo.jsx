import { useNavigate } from "react-router-dom";
import "./BigLogo.css";

const BigLogo = ({ logoUrl, userId }) => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        className="big-logo"
        src={window.localStorage.getItem("logoUrl")}
        onClick={() =>
          navigate(`/dashboard/home/${window.localStorage.getItem("userId")}`)
        }
        alt=""
      />
    </div>
  );
};

export default BigLogo;
