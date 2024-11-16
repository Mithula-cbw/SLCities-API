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
         <div className="w-full sm:mx-4">
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
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <pre className="w-full mt-2 p-3 bg-gray-100 text-gray-800 rounded-md text-sm shadow-md overflow-auto">
                    <code>{fetchRequest}</code>
                </pre>
            </TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
          }
         </div>
  );
};

export default DemoOptions;
