import React from "react";
import c from "./layout.module.css";
import video from"../../assets/3141211-uhd_3840_2160_25fps.mp4"

const Overlay = () => {
  return (
    <div className={c["overlay"]}>
         <div className={c["overlayconainer"]}></div>
      <div className={c["video-container"]}>
        <video autoPlay loop muted playsInline src={video}></video>
      </div>
     
    </div>
  );
};

export default Overlay;