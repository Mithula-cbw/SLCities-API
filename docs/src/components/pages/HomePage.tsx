import React from "react";
import WelcomeBanner from "../WelcomeBanner";

const HomePage:React.FC = () => {
  return(
    <div className="w-full p-4">
        <WelcomeBanner></WelcomeBanner>
    </div>
  );
}

export default HomePage;