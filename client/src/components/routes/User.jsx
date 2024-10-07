import { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Main from "../views/Incidents/Main";

const Incidents = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Routes>
        <Route path="/incidents" element={<Main />} />
        <Route path="*" element={<Navigate replace to="/incidents" />} />
      </Routes>
    </Suspense>
  );
};

export default Incidents;
