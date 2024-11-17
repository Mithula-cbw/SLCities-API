import React, { useState } from "react";
import CitySearch from "./CitySearch";
import DemoOptions from "./DemoOptions";
import axios from "axios";

const DemoContainer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ queryTemplate, setQueryTemplate] = useState('');

  const fetchCities = async () => {
    try {
      const response = await axios.get('/api/cities/', {
        params: {
          q: 'kurngala',
          fusy: true,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchCities();
  };

  return (
    <div className="w-full text-left p-2 shadow-md mt-10 font-poppins rounded-sm border">
      <h2 className="text-xs sm:text-sm m-2">Give Our API a Spin and See it in Action</h2>
      <div className="w-full flex flex-col justify-start items-start p-0">
        <CitySearch handleInput={handleInputChange} query={query}></CitySearch>
        <DemoOptions fetchRequest={""} ></DemoOptions>
      </div>  
    </div>
  );
};

export default DemoContainer;
