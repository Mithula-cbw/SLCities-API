import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
interface DropDownProps {
  options: string[];
  placeholder: string;
}

const DropDown: React.FC<DropDownProps> = ({ options, placeholder }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDown;
