import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button";
import { BsCodeSlash } from "react-icons/bs";


interface CodeProps {
  queryTemplate: string;
}

const DemoOptions: React.FC<CodeProps> = ({ queryTemplate}) => {
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
           <Tabs defaultValue="request" className="w-full">
            <TabsList>
              <TabsTrigger value="request">request</TabsTrigger>
              <TabsTrigger value="response">response</TabsTrigger>
            </TabsList>
              <TabsContent value="request">
              <pre className="bg-gray-300 text-gray-900 px-4 pt-4 rounded-t-md overflow-x-auto">
                <span contentEditable={false} className="text-green-700 text-xs block">//The fetch request of the search, try editing it!</span>
                <span contentEditable={false} className="text-red-900">slcities/api/</span>
              </pre>
              <pre contentEditable className="bg-gray-300 text-gray-900 px-4 pt-2 pb-8 rounded-b-md overflow-x-auto outline-none">
              <code className="font-mono">
                </code>
              </pre>
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
