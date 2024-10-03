import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import notification from "../../assets/icons/whitenotif.png";
import lightLogo from "../../assets/aptiv-logo.png";
import DarkLogo from "../../assets/dark.png";
import { loginActions } from "../../store/logInSlice";
import c from "./layout.module.css";
import User from "../../assets/icons/User.png";
import logOut from "../../assets/icons/whitelogout.png";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const isAuthentificated = useSelector((st) => st.LogIn.isLoged);
  const dispatch = useDispatch();
  return (
    <>
      <div className={c["navbar-container"]}>
        <div className={c.logo}>
          <NavLink to="/Home">
            <img style={{ width: "8rem" }} src={lightLogo} alt="APTIV logo" />
          </NavLink>
        </div>

        <div className={c.links}>
          <ul>
            {isAuthentificated.LogIn ? (
              <>
                {(isAuthentificated.role === "adminIT" ||
                  isAuthentificated.role === "itTechnician") && (
                  <React.Fragment>
                    <li>
                      <NavLink to="/Incidents">Incidents</NavLink>
                    </li>
                    <li>
                      <NavLink to="/Settings">Settings</NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <img className="icons" src={notification} />
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}

                <React.Fragment>
                  <li className={c.User}>
                    <span> {isAuthentificated.userName} </span>
                    <img className="icons" src={User} />
                  </li>
                  <li>
                    <NavLink>
                      <button
                        title="Log Out"
                        className={c.LogOut}
                        onClick={() => {
                          dispatch(loginActions.LogOut());
                        }}
                      >
                        <img src={logOut} />
                      </button>
                    </NavLink>
                  </li>
                </React.Fragment>
              </>
            ) : (
              <React.Fragment>
                <li className={`${c["User"]} ${c["log"]}`}>
                  <NavLink to={"/"}>
                    <span> LOG IN </span>
                    <img className="icons" src={User} />
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default NavBar;
