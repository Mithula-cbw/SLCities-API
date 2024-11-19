import React, { useState, useEffect } from "react";
import CitySearch from "./CitySearch";
import DemoOptions from "./DemoOptions";
import axios from "axios";

const DemoContainer: React.FC = () => {

  interface Suggestion {
    id: number;
    name: string;
  }
  
  const [query, setQuery] = useState<string>(''); 
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [queryTemplate, setQueryTemplate] = useState<string>('cities/search?fusy=true'); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fullQuery, setFullQuery] = useState<string>('cities/search?fusy=true');
  const [response, setResponse] = useState<string>('');

  const fetchCities = async () => {
    if (!query.trim()) {
      setFullQuery(`${queryTemplate}`);
      setError(null);
      setResponse('//response data will appear here..');
      setSuggestions([]); // Clear suggestions if query is empty
      return;
    }
    setIsLoading(true);
    setFullQuery(`${queryTemplate}&q=${query}`);
    try {
      const response = await axios.get(`/api/${queryTemplate}`, {
        params: { q: query },
      });
      setSuggestions(response.data.data.matches || []); 
      setResponse(JSON.stringify(response.data, null, 2));
    } catch (error : any) {
      setError(error);
      setSuggestions([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchCities();
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <div className="w-full text-left p-2 shadow-md mt-10 font-poppins rounded-sm border">
      <h2 className="text-xs sm:text-sm m-2">Give Our API a Spin and See it in Action</h2>
      <div className="w-full flex flex-col justify-start items-start p-0">
        <CitySearch handleInput={handleInputChange} query={query} suggestions={suggestions}/>         
          {error && (
            <div 
              className="sm:mx-4 mb-4 w-full sm:w-[400px] text-sm border-l-4 bg-red-100 text-red-800 rounded-lg border-red-600 p-3 shadow-md flex items-center"
              role="alert"
            >
              <svg 
                className="w-5 h-5 mr-2 text-red-600" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M18.364 18.364L5.636 5.636" />
              </svg>
              {error.message || "An unexpected error occurred. Please try again."}
            </div>
          )}          
        <DemoOptions queryTemplate={fullQuery} response={response} />
      </div>
    </div>
  );
};

export default DemoContainer;
