import React, { useState, useEffect } from "react";
import CitySearch from "./CitySearch";
import DemoOptions from "./DemoOptions";
import axios from "axios";

const DemoContainer: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // State for the search query
  const [suggestions, setSuggestions] = useState<any[]>([]); // State for city suggestions
  const [queryTemplate, setQueryTemplate] = useState<string>('cities/search?fusy=true'); // API endpoint
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const fetchCities = async () => {
    if (!query.trim()) return; // Don't make an API call if the query is empty
    setIsLoading(true); 
    try {
      const response = await axios.get(`/api/${queryTemplate}`, {
        params: {
          q: query, 
        },
      });
      setSuggestions(response.data); 
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

 
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchCities(); 
    }, 500); 

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query]); 

  return (
    <div className="w-full text-left p-2 shadow-md mt-10 font-poppins rounded-sm border">
      <h2 className="text-xs sm:text-sm m-2">Give Our API a Spin and See it in Action</h2>
      <div className="w-full flex flex-col justify-start items-start p-0">
        <CitySearch handleInput={handleInputChange} query={query} /> 
        <DemoOptions queryTemplate={queryTemplate} />
      </div>
    </div>
  );
};

export default DemoContainer;
