import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

const Showcase = ({ gallery }: { gallery: any }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {gallery.map((item: any) => (
        <div
          key={item.id}
          className="relative w-full overflow-hidden rounded-xl"
        >
          <Image
            src={item.src}
            alt={`Artwork ${item.id}`}
            width={400}
            height={500}
            className="w-full rounded-xl"
          />
          {item.label && (
            <div className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              {item.label}
            </div>
          )}
          {item.showMenu && (
            <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
              <MoreHorizontal size={16} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Showcase;
