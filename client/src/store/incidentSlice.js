import { createSlice } from "@reduxjs/toolkit";

export const incidentSlice = createSlice({
  name: "incident",
  initialState: {
    Incidents: [],
  },
  reducers: {
    setIncidents(s, a) {
      s.Incidents = a.payload;
      console.log(a.payload);
    },
    addIncidents(s, a) {
      s.Incidents.push(a.payload);
    },
    UpdateStatus(s, a) {
      const { id, newStatus } = a.payload;
      console.log(a.payload);
      
      const index = s.Incidents.findIndex((e) => e._id === id);

      if (index !== -1) {
        s.Incidents[index] = {
          ...s.Incidents[index],
          incidentStatus: newStatus,
        };
        console.log("Updated Status:", s.Incidents[index]);
      } else {
        console.error("Incident not found:", id);
      }
    },
  },
});

export const { setIncidents, addIncidents, UpdateStatus } =
  incidentSlice.actions;
export default incidentSlice.reducer;
