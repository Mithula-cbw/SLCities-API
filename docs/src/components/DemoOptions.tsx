import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { BsCodeSlash } from "react-icons/bs";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DrawerCode from "./DrawerCode";

interface CodeProps {
  queryTemplate: string;
  response: string;
  setQueryTemplate: (query: string) => void;
}

const DemoOptions: React.FC<CodeProps> = ({
  queryTemplate,
  response,
  setQueryTemplate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for showing and hiding the code section
  const toggleCodeVisibility = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Handle saving the updated query template
  const handleSave = (updatedQuery: string) => {
    setQueryTemplate(updatedQuery);
    console.log("Saved query:", updatedQuery);
  };

  const resetQuery = ()=>{
    setQueryTemplate("cities/search?&limit=3fusy=3")
  }

  return (
    <div className="w-full sm:w-[500px] sm:mx-4">
      <Button
        onClick={toggleCodeVisibility}
        className={`bg-black hover:bg-black text-xs flex items-center gap-2 px-4 py-2 rounded-md ${
          isOpen ? "text-gray-500" : "text-gray-100"
        }`}
      >
        <BsCodeSlash
          className={`${
            isOpen ? "fill-gray-500" : "fill-gray-100"
          }`}
        />
        {isOpen ? "Hide Dev" : "Show Dev"}
      </Button>

      {isOpen && (
        <Tabs defaultValue="request" className="w-full">
          <TabsList>
            <TabsTrigger value="request">Request</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
          </TabsList>
          <TabsContent value="request">
            <pre className="bg-gray-300 text-gray-900 px-4 pt-4 rounded-t-md overflow-x-auto">
              <span contentEditable={false} className="text-green-900 text-xs block">
                // The fetch request of the search, try editing it!
              </span>
            </pre>
            <pre className="flex flex-col bg-gray-300 text-gray-900 px-4 pt-2 pb-2 rounded-b-md overflow-x-auto outline-none">
              <div className="relative">
                <code className="font-mono block overflow-auto max-h-64 px-2 pb-8 text-xs sm:text-lg pt-2">
                  <span contentEditable={false} className="text-red-900">
                    slcities/api/
                  </span>
                  <span className="outline-none">{queryTemplate}</span>
                </code>
                <Drawer>
                  <DrawerTrigger>
                    <Button className="text-xs py-0 sm:text-sm">
                      Edit
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerCode queryTemplate={queryTemplate} onSave={handleSave} />
                  </DrawerContent>
                </Drawer>
                <Button
                  className="text-xs py-0 sm:text-sm mx-2"
                  disabled={queryTemplate === "cities/search?&limit=3fusy=3"}
                  onClick={resetQuery}>
                  reset
                </Button>
              </div>
            </pre>
          </TabsContent>
          <TabsContent value="response">
            <pre className="bg-gray-300 text-gray-900 px-4 pt-4 rounded-md overflow-x-auto pb-2">
              <code className="font-mono block overflow-auto text-xs md:text-sm max-h-64 px-2 pb-8">
                {response}
              </code>
            </pre>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default DemoOptions;
