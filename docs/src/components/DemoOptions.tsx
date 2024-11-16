import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button";
import { BsCodeSlash } from "react-icons/bs";


interface CodeProps {
  fetchRequest: string;
}

const DemoOptions: React.FC<CodeProps> = ({ fetchRequest}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCodeVisibility = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
         <div className="sm:w-[500px] sm:mx-4">
            <Button
              onClick={toggleCodeVisibility}
              className={`bg-black hover:bg-black text-xs flex items-center gap-2 px-4 py-2 rounded-md ${
                isOpen ? "text-gray-500" : "text-gray-100"
              }`}>
              <BsCodeSlash className={`${
                isOpen ? "fill-gray-500" : "fill-gray-100"
              }`} />
              {isOpen? `Hide Dev`: `Show dev`}
            </Button>
           
           {isOpen && 
           <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="request">request</TabsTrigger>
              <TabsTrigger value="response">response</TabsTrigger>
            </TabsList>
              <TabsContent value="request">
                Change your password here.
              </TabsContent>
              <TabsContent value="response">
              Change your password here.
              </TabsContent>
              </Tabs>
          }
         </div>
  );
};

export default DemoOptions;
