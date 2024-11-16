import React from "react";
import WelcomeBanner from "../WelcomeBanner";
import DemoContainer from "../DemoContainer";

const HomePage:React.FC = () => {
  return(
    <div className="w-full px-16 py-4">
        <WelcomeBanner />
        <DemoContainer></DemoContainer>
    </div>
  );
}

export default HomePage;