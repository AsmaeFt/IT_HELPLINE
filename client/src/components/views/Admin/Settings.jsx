import React, { useCallback, useEffect, useState } from "react";
import Circle from "../../../assets/icons/aptivCircle.png";
import users from "../../../assets/icons/users.png";
import { useSelector } from "react-redux";
import ADD from "../../../assets/icons/add.png";
import c from "./Settings.module.css";
import BackDrop from "../../UI/BackDrops";
import UserImage from "../../../assets/icons/User.png";
import api from "../../api/index";
const Settings = () => {
  const [ShowBackDrop, setShowBackDrop] = useState(false);
  const isAuthentificated = useSelector((st) => st.LogIn.isLoged);
  const [Users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const res = await api.get("/user/getUsers");
       console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  
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
        <div className={c["users-list"]}>
          {Users &&
            Users.map((u, i) => {
              return (
                u.role !== "root" &&
                u.role !== "superUsers" && (
                  <div key={i} className={c.cards}>
                    <div className={c.userImage}>
                      <img src={UserImage} />
                    </div>
                    <h1>
                      {u.firstName} {u.lasttName}
                    </h1>
                    <h3> {u.position}</h3>
                    <h4>{u.shift}</h4>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Settings;
