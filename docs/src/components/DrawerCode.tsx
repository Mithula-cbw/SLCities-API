import React, { useState } from "react";

interface Props {
  queryTemplate: string;
  onSave: (updatedQuery: string) => void; 
}

const DrawerCode: React.FC<Props> = ({ queryTemplate, onSave }) => {
  const [editableQuery, setEditableQuery] = useState(queryTemplate);

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableQuery(event.target.value);
  };

  const handleSave = () => {
    onSave(editableQuery); // Save the updated content
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <textarea
        value={editableQuery}
        onChange={handleQueryChange}
        rows={1} // Single line view
        className="w-full sm:w-[300px] p-2 border rounded-md bg-gray-900"
        aria-label="Editable query"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default DrawerCode;
