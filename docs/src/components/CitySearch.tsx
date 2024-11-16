import React from "react";

interface CitySearchProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
}

const CitySearch: React.FC<CitySearchProps> = ({ handleInput, query }) => {
  return (
    <div className="w-full sm:w-[400px] flex flex-col mx-4 my-4">
      <input
        type="text"
        id="city-search"
        value={query}
        onChange={handleInput}
        placeholder="Type a city name..."
        className="p-2  border-future-600 dark:bg-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-future-600"
      />
      
    </div>
  );
};

export default CitySearch;
