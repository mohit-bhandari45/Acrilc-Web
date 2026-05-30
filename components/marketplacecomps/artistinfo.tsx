import { IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const ArtistInfo = ({ user, forte }: { user: IUser; forte: string }) => {
  const initials = user.fullName?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("") || "?";

  return (
    <Link href={`/profile/${user.username}`} className="flex items-center gap-3 mb-6 group">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ead7c9]">
        {user.profilePicture ? (
          <Image src={user.profilePicture} alt={user.fullName} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] select-none">
            <span className="text-xs font-bold text-white">{initials}</span>
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold text-[#2e1f14] text-sm group-hover:text-[#834C3D] transition-colors">
          {user.fullName}
        </p>
        {forte && (
          <span className="inline-flex items-center rounded-full bg-[#f5e2d8] border border-[#834C3D]/25 px-2.5 py-0.5 text-xs font-semibold text-[#834C3D]">
            {forte}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ArtistInfo;
