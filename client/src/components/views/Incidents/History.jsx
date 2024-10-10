import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/index";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import * as IncidentsActions from "../../../store/incidentSlice";
import { message } from "antd";

//icons
import hight from "../../../assets/icons/dangerHight.png";
import warnning from "../../../assets/icons/warnning.png";
import medium from "../../../assets/icons/medium.png";

import done from "../../../assets/icons/done.png";
import inProgress from "../../../assets/icons/inProgress.png";
import onHold from "../../../assets/icons/onHold.png";

const History = () => {
  const dispatch = useDispatch();
  const Incidents = useSelector((s) => s.Icidents.Incidents);

  const getIncidents = useCallback(async () => {
    try {
      const res = await api.get("/incident/getIncident");

      dispatch(IncidentsActions.setIncidents(res.data));
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch incidents. Please try again later.");
    }
  }, [dispatch]);
  useEffect(() => {
    getIncidents();
    /*     const socket = io("http://10.236.148.30:8080");
  socket.on("connect", () => {
      console.log("Socket connected"); 
    });
   
      socket.on("newIncident", (newIncident) => {
      setIncidents((prev) => [...prev, newIncident]);
    });
  
    return () => {
      socket.off("newIncident");
      socket.disconnect(); 
    };  */
  }, [getIncidents]);

  const customLevel = (l) => {
    return l === "low"
      ? { color: "yellow", icon: warnning }
      : l === "medium"
      ? { color: "orange", icon: medium }
      : { color: "red", icon: hight };
  };

  const customStatus = (s) => {
    return s === "not checked yet"
      ? { color: "red", icon: onHold }
      : s === "on processing"
      ? { color: "yellow", icon: inProgress }
      : { color: "lime", icon: done };
  };

  return (
    <React.Fragment>
      <div className="table">
        <table>
          <thead>
            <tr>
              <td>Incident Category</td>
              <td>Description</td>
              <td>Status</td>
              <td>Danger Level</td>
            </tr>
          </thead>

          <tbody>
            {Incidents.map((c, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: c.dangerLevel === "hight" ? "#ff000075" : "",
                }}
              >
                <td>{c.incidentCategory}</td>
                <td>{c.description}</td>
                <td>
                  <div className={c["status-options"]}>
                    <span
                      className="level"
                      style={{ color: customStatus(c.incidentStatus).color }}
                    >
                      {c.incidentStatus}
                      <img
                        className="icons"
                        src={customStatus(c.incidentStatus).icon}
                        alt="status icon"
                      />
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    className="level"
                    style={{ color: customLevel(c.dangerLevel).color }}
                  >
                    {c.dangerLevel}
                    <img
                      className="icons"
                      src={customLevel(c.dangerLevel).icon}
                      alt="level of danger icon"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default History;
