import { useCallback, useEffect, useState } from "react";
import api from "../../api/index";
import { io } from "socket.io-client";

const socket = io("http://10.236.148.30:8080");
const History = () => {
  const [Incidents, setIncidents] = useState([]);

  const getIncidents = useCallback(async () => {
    try {
      const res = await api.get("/incident/getIncident");
      console.log(res.data);
      setIncidents(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    getIncidents();
/*     socket.on("connect", () => {
      console.log("Socket connected"); 
    });
   */
   
/*     socket.on("newIncident", (newIncident) => {
      setIncidents((prev) => [...prev, newIncident]);
    });
  
    return () => {
      socket.off("newIncident");
      socket.disconnect(); 
    }; */
  }, [getIncidents]);

  return (
    <>
      <div className="table">
        <table>
          <thead>
            <tr>
              <td>incident Category</td>
              <td>description</td>
            </tr>
          </thead>
          <tbody>
            {Incidents.map((c, i) => (
              <tr key={i}>
                <td>{c.incidentCategory}</td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
