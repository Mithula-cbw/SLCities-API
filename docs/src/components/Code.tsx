import React, { useState } from "react";

interface CodeProps {
  fetchRequest: string;
}

const Code: React.FC<CodeProps> = ({ fetchRequest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCodeVisibility = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full mt-4">
      <button
        onClick={toggleCodeVisibility}
        className="px-4 py-2 text-sm font-semibold text-white bg-future-600 rounded-md hover:bg-future-700 focus:outline-none focus:ring-2 focus:ring-future-500"
      >
        {isOpen ? "Hide Code" : "Show Code"}
      </button>
      {isOpen && (
        <pre className="mt-2 p-3 bg-gray-100 text-gray-800 rounded-md text-sm shadow-md overflow-auto">
          <code>{fetchRequest}</code>
        </pre>
      )}
    </div>
  );
};

export default Code;
