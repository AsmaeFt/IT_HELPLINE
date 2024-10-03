import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Settings from "../views/Admin/Settings";
import Incidents from "../views/Admin/Incidents";

const Admin = () => {
  return( 
  
  <>
  <Suspense fallback={(<div>Loading... </div>)}>

  </Suspense>
  
  </>);
};
export default Admin;
