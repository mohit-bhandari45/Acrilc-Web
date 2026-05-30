import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IMarketplace } from "@/types/marketplace";

const TabsSection = ({ data }: { data: IMarketplace }) => {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex bg-transparent border-b border-[#f0ddd0] rounded-none h-auto p-0 gap-0">
          <TabsTrigger
            value="description"
            className="rounded-none px-5 py-3 text-sm font-semibold text-[#9a8578] bg-transparent border-b-2 border-transparent data-[state=active]:text-[#834C3D] data-[state=active]:border-[#834C3D] data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="rounded-none px-5 py-3 text-sm font-semibold text-[#9a8578] bg-transparent border-b-2 border-transparent data-[state=active]:text-[#834C3D] data-[state=active]:border-[#834C3D] data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
          >
            Additional Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4">
          <p className="text-sm text-[#5e3c2f] leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </TabsContent>

        <TabsContent value="info" className="mt-4 space-y-3">
          <p className="text-sm text-[#5e3c2f] leading-relaxed whitespace-pre-line">
            {data.additionalInfo}
          </p>
          {data.showContactInfo && data.contactInfo && (
            <div className="mt-3 rounded-xl bg-[#f5e2d8] border border-[#834C3D]/20 px-4 py-3">
              <p className="text-xs font-semibold text-[#765240] mb-1">Contact</p>
              <p className="text-sm text-[#834C3D]">{data.contactInfo}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
