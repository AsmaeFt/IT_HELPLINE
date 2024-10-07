import React, { useCallback, useEffect, useState } from "react";
import c from "./AddTechs.module.css";
import SelectDrop from "../UI/SelectDropDown";
import { getShiftDate, OptionsFormat } from "../functions/utilis";
import api from "../api/index";
import { message } from "antd";

const AddTechs = () => {
  const shift = ["morning", "evening", "night"];
  const curentShift = getShiftDate(new Date());
  const [Shift, setShift] = useState(curentShift.shift);

  const [user, setUser] = useState({
    firstName: "",
    lasttName: "",
    userID: "",
    departemnet: "IT",
    passWord: "",
    role: "itTechnician",
    position: "",
    shift: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    const techUser = {
      ...user,
      shift: Shift,
    };
    console.log(techUser);
    try {
      const res = await api.post("/user/createTechnician", techUser);
      return res;
    } catch (err) {
      console.log(err);
      message.warning(err.response.data.error, 7);
    }
  };

  return (
    <>
      <div className={c.container}>
        <form onSubmit={handleClick}>
          <h2>ADD NEW IT RESPONSIBLE </h2>
          <input
            type="text"
            name="firstName"
            placeholder=" Responsible First Name ..."
            onChange={(e) =>
              setUser((p) => ({ ...p, firstName: e.target.value }))
            }
          />
          <input
            type="text"
            name="lasttName"
            placeholder=" Responsible Last Name ..."
            onChange={(e) =>
              setUser((p) => ({ ...p, lasttName: e.target.value }))
            }
          />
          <input
            type="text"
            name="userID"
            placeholder=" Responsible ID ..."
            onChange={(e) => setUser((p) => ({ ...p, userID: e.target.value }))}
          />
          <input
            type="text"
            name="position"
            placeholder=" Responsible position ..."
            onChange={(e) =>
              setUser((p) => ({ ...p, position: e.target.value }))
            }
          />
          <SelectDrop
            options={OptionsFormat(shift)}
            value={Shift}
            onChange={(e) => setShift(e)}
          />
          <input
            type="password"
            name="passWord"
            placeholder=" your password ..."
            onChange={(e) =>
              setUser((p) => ({ ...p, passWord: e.target.value }))
            }
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddTechs;
