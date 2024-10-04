import React, { useCallback, useEffect, useState } from "react";
import Circle from "../../../assets/icons/aptivCircle.png";
import users from "../../../assets/icons/users.png";
import { useSelector } from "react-redux";
import ADD from "../../../assets/icons/add.png";
import c from "./Settings.module.css";
import BackDrop from "../../UI/BackDrops";
const Settings = () => {
  const [ShowBackDrop, setShowBackDrop] = useState(false);
  const isAuthentificated = useSelector((st) => st.LogIn.isLoged);
  return (
    <div className="container">
      <div>
        <h1>
          <img className="icons" src={Circle} />
          Manage Technicians
        </h1>
        <br />
        {isAuthentificated.role === "adminIT" && (
          <div className={c["new-tech"]} onClick={() => setShowBackDrop(true)}>
            <h4>ADD NEW TECHNICIAN </h4>
            <img className="icons" src={ADD} />
          </div>
        )}
        {ShowBackDrop && (
          <>
            <BackDrop click={() => setShowBackDrop(false)} />
            {/*  <AddTechs /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
