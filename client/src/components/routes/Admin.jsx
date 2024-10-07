import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Settings from "../views/Admin/Settings";
import Incidents from "../views/Admin/Incidents";

const Admin = () => {
  return (
    <>
      <Suspense fallback={<div>Loading... </div>}>
        <Routes>
          <Route exact path="/Settings" element={<Settings />} />
          <Route exact path="/Incidents" element={<Incidents />} />
          {/* <Route
            index
            path="/"
            element={<Navigate replace to="/Incidents" />}
          /> */}
          <Route path="*" element={<Navigate replace to="/Incidents" />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default Admin;
