"use client";

import { useState } from "react";
import { Item } from "@/components/Questions";
import Answers from "@/components/Answers";

interface ToggleProps {
  lang: string;
  data: Item[];
}

export default function Toggle({ lang, data }: ToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleLanguage = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="p-4 border rounded shadow-md w-full">
      <button
        onClick={toggleLanguage}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {lang === "en" ? "번역 보기" : "See Translation"}
      </button>
      {isOpen && (
        <div className="py-[20px]">
          <h4 className="font-bold pb-[10px]">{data[0]?.question}</h4>
          <Answers options={data[0]?.options} />
        </div>
      )}
    </div>
  );
}
