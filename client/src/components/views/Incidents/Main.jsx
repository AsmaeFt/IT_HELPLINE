import c from "./Main.module.css";
import History from "./History";
import FeedBack from "./FeedBack";

import hist from "../../../assets/icons/arrow.png";
import React , { useState } from "react";
const Main = () => {
  const [showView, setshowView] = useState("H");
  return (
    <>
      <div className="container">
        <div className={c.Header}>
          <span onClick={() => setshowView("H")} >
            Incident History <img className="icons" src={hist} />
          </span>
          <span onClick={() => setshowView("F")}>
            Provide Your Feedback <img className="icons" src={hist} />
          </span>
        </div>
        {
          <React.Fragment>
            {showView === "H" ? <History /> : <FeedBack />}
          </React.Fragment>
        }
      </div>
    </>
  );
};

export default Main;
