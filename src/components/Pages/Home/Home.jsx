import "./Home.css";

import Playlist from "../../component/Playlist/PlaylistItem";
import { useEffect, useState } from "react";
import AdsterraBanner from "../../component/Adsterra/AdsterraBanner";
import axios from "axios";
// import cheerio from "cheerio";

const Home = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [mainVideoUrl, setMainVideoUrl] = useState("");
  function handleAdClick() {
    window.open(
      "https://www.profitableratecpm.com/uafdu270vn?key=681b59d059dca02467e18babca42f9f7",
      "_blank",
      "noopener,noreferrer"
    );
  }

  useEffect(() => {
    // Example: attach to user click
    const element = document.getElementById("ad-opener");
    if (element) {
      element.addEventListener("click", handleAdClick);
    }

    return () => {
      if (element) {
        element.removeEventListener("click", handleAdClick);
      }
    };
  }, []);

  // const getVideos = async () => {
  //   try {
  //     const url = `http://localhost:4000/video/get-video-url`;
  //     const { data } = await axios.post(url, { videoUrl: mainVideoUrl });
  //     console.log("data-------------------------->", data);
  //     setVideoUrl(data.videoUrl);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   getVideos();
  // }, [getVideos]);

  return (
    <div
      className="home-container"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        paddingTop: "100px",
      }}
    >
      <div>
        <p>Naruto Episode 6</p>
        <iframe
          src="https://short.icu/OUtOcpGTH"
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div>
        <p>Naruto Episode 7</p>
        <iframe
          src="https://short.icu/8RD6hO4fs"
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div>
        <p>Naruto Episode 8</p>
        <iframe
          src="https://animedekho.co/?trdekho=1&amp;trid=41510&amp;trtype=2"
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div>
        <p>Naruto Episode 9</p>
        <iframe
          src="https://animedekho.co/?trdekho=1&amp;trid=41511&amp;trtype=2"
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div>
        <p>Naruto Episode 10</p>
        <iframe
          src="https://animedekho.co/?trdekho=1&amp;trid=41512&amp;trtype=2"
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div>
        <p>Naruto Episode 11</p>
        <iframe
          src="https://animedekho.co/?trdekho=1&amp;trid=41513&amp;trtype=2"
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div>
        <p>Naruto Episode 12</p>
        <iframe
          src="https://animedekho.co/?trdekho=1&amp;trid=41514&amp;trtype=2"
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
      <div>
        <p>Naruto Episode 13</p>
        <iframe
          title="Naruto Episode 1"
          class="serversel"
          width="560"
          height="315"
          frameborder="0"
          id="okIqAuiNSs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
          src="https://animedekho.co/?trdekho=1&amp;trid=41515&amp;trtype=2"
        ></iframe>
      </div>

      <iframe
        title="Naruto Episode 1"
        class="serversel"
        width="560"
        height="315"
        frameborder="0"
        id="okIqAuiNSs"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen=""
        src="https://animedekho.co/?trdekho=1&amp;trid=41503&amp;trtype=2"
      ></iframe>
      {/* <input type="text" onChange={(e) => setMainVideoUrl(e.target.value)} /> */}
      <div className="playlist-container">
        <AdsterraBanner />
        <div>
          <Playlist />
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
