import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search icon"
          height={24}
          width={24}
          className="cursor-pointer"
        />
        <Input
          readOnly
          type="text"
          placeholder="Search globally"
          value=""
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
