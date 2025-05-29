import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IMarketplace } from "@/types/marketplace";
import React from "react";

const TabsSection = ({ data }: { data: IMarketplace }) => {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-transparent border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className="py-2 px-4 border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:border-b-2 data-[state=active]:bg-transparent bg-transparent text-black font-semibold rounded-none"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="py-2 px-4 border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:border-b-2 data-[state=active]:bg-transparent bg-transparent text-black font-semibold rounded-none"
          >
            Additional Information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
            {data.description}
          </div>
        </TabsContent>
        <TabsContent value="info" className="mt-4">
          <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
            <strong>Additional Information:</strong>
            <br />
            {data.additionalInfo}
          </div>
            <div className="contact">
              {data.showContactInfo && data.contactInfo} 
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
