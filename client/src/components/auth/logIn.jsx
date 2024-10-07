import { useState } from "react";
import c from "./logIn.module.css";
import { message } from "antd";
import api from "../api/index";
import Overlay from "../layout/Overlay";

import { useDispatch } from "react-redux";
import { loginActions } from "../../store/logInSlice";

import aptiv from "../../assets/aptiv-logo.png";
const Login = () => {
  const dispatch = useDispatch();

  const [Login, setLogin] = useState({
    userID: "",
    passWord: "",
  });

  const ClickHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/LogIn", Login);
      const data = res.data;
      const msg = data.message;
    

      dispatch(
        loginActions.LogIn({
          role: data.user.role,
          userName: data.user.userName,
          department: data.user.department,
          token: data.token,
        })
      );
      message.success(msg);
      return res.data;
    } catch (err) {
      console.log(err);

      message.warning(err.response.data.message, 7);
    }
  };

  return (
    <>
      <Overlay />
      <div className={c["Login-Form"]}>
        <div className={c["Form-Container"]}>
          <fieldset>
            <legend>LOGIN </legend>
            <form onSubmit={ClickHandler}>
              <div className={c["user-container"]}>
                <input
                  type="text"
                  name="matricule"
                  placeholder="Enter Your ID"
                  className={c["username"]}
                  value={Login.username}
                  onChange={(e) =>
                    setLogin((p) => ({ ...p, userID: e.target.value }))
                  }
                />
              </div>

              <div className={c["password-container"]}>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  className={c["userpassword"]}
                  value={Login.password}
                  onChange={(e) =>
                    setLogin((p) => ({ ...p, passWord: e.target.value }))
                  }
                />
              </div>
              <button className={c["Login"]}>Log In</button>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default Login;
