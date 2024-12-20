import React, { useState } from "react";

interface Suggestion {
  id: number;
  name: string;
}

interface CitySearchProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: Suggestion[];
  query: string;
}

const CitySearch: React.FC<CitySearchProps> = ({ handleInput, query, suggestions }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full sm:w-[400px] flex flex-col sm:mx-4 my-4 relative">
      <input
        type="text"
        id="city-search"
        value={query}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Type a city name..."
        className="p-2 border-future-600 dark:bg-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-future-600"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="suggestions z-40 bg-black absolute top-[100%] rounded-md mt-[1px] w-full">
          {suggestions.map((suggestion) => (
            <li
              className="p-1 bg-gray-500 px-3 drop-shadow-sm"
              key={suggestion.id}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
