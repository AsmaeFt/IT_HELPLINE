import React from "react";
import c from "./layout.module.css";
import video from"../../assets/aptiv.mp4"

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