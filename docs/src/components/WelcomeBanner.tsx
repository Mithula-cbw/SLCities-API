import React from "react";

const WelcomeBanner: React.FC = () => {
  return (
    <div className="w-full text-left px-16 shadow-md">
      <h1 className="text-xl sm:text-3xl font-bold mb-2">Explore Nearby Cities</h1>
      <p className="text-gray-500">
        Can't find your city? Help us grow by adding it to our database!
      </p>
    </div>
  );
};

export default WelcomeBanner;
