import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const BackButton = () => {
  return (
    <Link
      href="/"
      className={twMerge(
        "flex items-center gap-2 fixed top-6 left-6 text-gray-700 bg-white/80 shadow-lg backdrop-blur-sm",
        "hover:text-amber-600 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-amber-400",
        "px-3 py-2 rounded-xl transition-all duration-200 border border-amber-200 font-semibold text-base z-20"
      )}
    >
      <Image src="/arrow.svg" alt="Back" width={20} height={20} />
      <span className="text-sm font-medium">Atrás</span>
    </Link>
  );
};
