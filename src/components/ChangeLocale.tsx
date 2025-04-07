"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { GrLanguage } from "react-icons/gr";
import { useState, useRef } from "react";
import useEventListener from "@/utils/hooks/useEventListener";

export default function ChangeLocale() {
  const router = useRouter();
  const urlSegments = useSelectedLayoutSegments();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLocaleChange = (locale: string) => {
    setIsDropdownOpen(false);
    router.push(`/${locale}/${urlSegments.join("/")}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEventListener("mousedown", handleClickOutside);

  return (
    <div ref={dropdownRef} className="relative">
      <GrLanguage onClick={toggleDropdown} className="cursor-pointer hover:text-blue-500" size="20"/>
      {isDropdownOpen && (
        <div className="cursor-pointer border flex flex-col absolute top-[32] right-[-40] bg-[#FFC145] p-2 text-center rounded-md bg-[#]">
          <span onClick={() => handleLocaleChange("en")}>ENGLISH</span>
          <div className="w-full border my-[5px] border-white"></div>
          <span onClick={() => handleLocaleChange("ko")}>한국어</span>
        </div>
      )}
    </div>
  );
}
