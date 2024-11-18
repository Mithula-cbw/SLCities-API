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
  const [queryTemplate, setQueryTemplate] = useState<string>('cities/search?fusy=true'); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fullQuery, setFullQuery] = useState<string>('cities/search?fusy=true');
  const [response, setResponse] = useState<string>('');

  const fetchCities = async () => {
    if (!query.trim()) {
      setFullQuery(`${queryTemplate}`);
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
    } catch (error) {
      console.error('Error fetching cities:', error);
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
        <CitySearch handleInput={handleInputChange} query={query} />
        {isLoading && <p>Loading...</p>}
        {suggestions.length > 0 ? (
          <ul className="suggestions fixed z-40 bg-black">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>{suggestion.name}</li>
          ))}
        </ul>
        
        ) : (
          !isLoading && query && <p>No matches found for "{query}"</p>
        )}
        <DemoOptions queryTemplate={fullQuery} response={response} />
      </div>
    </div>
  );
};

export default DemoContainer;
