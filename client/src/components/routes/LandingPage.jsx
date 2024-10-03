import { Suspense } from "react";
import Landing from "../views/LandingPage/LandingPage";

const LandingPage = () => {
  return (
    <Suspense fallback={<div>Loding...</div>}>
      <Landing />
    </Suspense>
  );
};
export default LandingPage;
