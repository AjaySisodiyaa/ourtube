import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../App.css";
import { toast } from "react-toastify";
const Signup = () => {
  const [channelName, setChannelName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fileHandler = (e) => {
    setLogo(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("logo", logo);

    await axios
      .post("https://ourtubeapi-1-37sk.onrender.com/user/signup", formData)
      .then((res) => {
        setLoading(false);
        navigate("/login");
        toast("Account is created..");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="main-wrapper">
      <div className="wrapper-header">
        <img
          className="logo-image"
          src={require("../../assets/logo.png")}
          alt="logo"
        />
        <h2 className="c-name">Our Tube</h2>
      </div>

      <form className="form-wrapper" onSubmit={submitHandler}>
        <input
          required
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          type="text"
          placeholder="Channel Nmae"
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Phone"
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input required onChange={fileHandler} type="file" />
        {imageUrl !== "" && (
          <img className="preview-image" src={imageUrl} alt="logo-img" />
        )}
        <button type="submit">
          {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
          Submit
        </button>
        <Link className="link" to="/login">
          Login here
        </Link>
      </form>
    </div>
  );
};

export default Signup;
