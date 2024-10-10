import React, { useCallback, useEffect, useState } from "react";
import c from "./Incidents.module.css";
import Circle from "../../../assets/icons/aptivCircle.png";
import { useDispatch, useSelector } from "react-redux";
import * as IncidentsActions from "../../../store/incidentSlice";
import api from "../../api/index";
import { message } from "antd";

//icons
import hight from "../../../assets/icons/dangerHight.png";
import warnning from "../../../assets/icons/warnning.png";
import medium from "../../../assets/icons/medium.png";

import done from "../../../assets/icons/done.png";
import inProgress from "../../../assets/icons/inProgress.png";
import onHold from "../../../assets/icons/onHold.png";

const Incidents = () => {
  const dispatch = useDispatch();
  const Incidents = useSelector((s) => s.Icidents.Incidents);

  const status = ["not checked yet", "on processing", "done"];

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "done") {
      message.warning("The status is already done ^^");
      return null;
    }

    const currentIndex = status.indexOf(currentStatus);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= status.length) {
      return currentStatus;
    }

    return status[nextIndex];
  };

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
      : { color: "green", icon: done };
  };

  const updateIncident = (id, status) => {
    const newStatus = getNextStatus(status);

    if (newStatus === null) {
      return;
    }

    try {
      dispatch(
        IncidentsActions.UpdateStatus({
          id: id,
          newStatus,
        })
      );
      message.success("Incident status updated successfully.");
    } catch (err) {
      console.error(err);
      message.error("Failed to update incident status. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>
        <img className="icons" src={Circle} />
        Incidents Dashboard
      </h1>

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
            {Incidents.map((inci, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    inci.dangerLevel === "hight" ? "#ff000075" : "",
                }}
              >
                <td>{inci.incidentCategory}</td>
                <td>{inci.description}</td>

                <td>
                  <div
                    className={c["status-options"]}
                    onClick={() =>
                      updateIncident(inci._id, inci.incidentStatus)
                    }
                  >
                    <span
                      className={`${c.level} ${c.status}`}
                      style={{ color: customStatus(inci.incidentStatus).color }}
                    >
                      {inci.incidentStatus}
                      <img
                        className="icons"
                        src={customStatus(inci.incidentStatus).icon}
                        alt="status icon"
                      />
                    </span>
                  </div>
                </td>

                <td>
                  <span
                    className={c.level}
                    style={{ color: customLevel(inci.dangerLevel).color }}
                  >
                    {inci.dangerLevel}
                    <img
                      className="icons"
                      src={customLevel(inci.dangerLevel).icon}
                      alt="level of danger icon"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incidents;
