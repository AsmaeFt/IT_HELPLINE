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
  },
});


export const { setIncidents, addIncidents } = incidentSlice.actions;
export default incidentSlice.reducer;
