import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/index";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import * as IncidentsActions from "../../../store/incidentSlice";
import { message } from "antd";

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
              <tr key={i}>
                <td>{c.incidentCategory}</td>
                <td>{c.description}</td>
                <td>{c.incidentStatus}</td>
                <td>{c.dangerLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default History;
