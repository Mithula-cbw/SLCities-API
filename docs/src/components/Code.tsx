import React, { useState } from "react";

interface CodeProps {
  fetchRequest: string;
  labelOpen: string;
  labelClose: string;
}

const Code: React.FC<CodeProps> = ({ fetchRequest, labelOpen, labelClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCodeVisibility = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleCodeVisibility}
        className="px-4 py-2 text-sm font-semibold text-white rounded-md border"
      >
        {isOpen ? `${labelOpen}` : `${labelClose}`}
      </button>
      {isOpen && (
        <pre className=" fixed mt-2 p-3 bg-gray-100 text-gray-800 rounded-md text-sm shadow-md overflow-auto">
          <code>{fetchRequest}</code>
        </pre>
      )}
    </div>
  );
};

export default Code;
