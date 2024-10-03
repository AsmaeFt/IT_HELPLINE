import React, { useState } from "react";
import c from "./LandingPage.module.css";
import BackDrop from "../../ui/BackDrops";
import Overlay from "../../layout/Overlay";
const LandingPage = () => {
  const [shiwBackDrop, setshiwBackDrop] = useState(false);
  return (
    <>
      <Overlay />

      <div className={`${"container"} ${c["main"]}`}>
        <div style={{ width: "100%" }}>
          <div className={c["blinkText"]}>
            <h2>Empowering Your Workflow</h2>
          </div>
          <h1>
            <span style={{ color: "#950101" }}>IT Support</span> When You Need
            It Most
          </h1>
          <p>
            How Can We Assist You Today? Check the IT Team On Shift or Report an
            Issue Below
          </p>
          <span>
            <button>Report an Issue</button>
            <button onClick={() => setshiwBackDrop(true)}>Contact IT</button>
          </span>
        </div>
        {shiwBackDrop && (
          <>
            <BackDrop click={() => setshiwBackDrop(false)} />
          </>
        )}
      </div>
    </>
  );
};

export default LandingPage;
