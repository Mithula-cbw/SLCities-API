import React from "react";

interface Suggestion {
  id: number;
  name: string;
}

interface CitySearchProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions:Suggestion[];
  query: string;
}

const CitySearch: React.FC<CitySearchProps> = ({ handleInput, query, suggestions }) => {
  return (
    <div className="w-full sm:w-[400px] flex flex-col sm:mx-4 my-4 relative">
      <input
        type="text"
        id="city-search"
        value={query}
        onChange={handleInput} 
        placeholder="Type a city name..."
        className="p-2 border-future-600 dark:bg-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-future-600"
      />
        {suggestions.length > 0 && 
          <ul className="suggestions z-40 bg-black absolute top-[100%]">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>{suggestion.name}</li>
          ))}
        </ul>
        
        
        }
    </div>
  );
};

export default CitySearch;
