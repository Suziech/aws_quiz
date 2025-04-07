"use client";

import { useState, useEffect } from "react";
import Answers from "@/components/Answers";
import { usePathname } from "next/navigation";
import Toggle from "@/components/Toggle";
import { TbEyeClosed } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import { supabase } from "@/utils/supabase/server"; // Supabase 클라이언트 import

// function shuffleArray(
//   array: {
//     id: number;
//     question: string;
//     options: string[];
//     correctAnswer: string;
//     question_id: number;
//   }[]
// ) {
//   return array.sort(() => Math.random() - 0.5);
// }

export interface Item {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  question_id: number;
  language: string;
}

export default function Questions() {
  const pathName = usePathname();
  const [quizData, setQuizData] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  // 📌 Supabase에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("quiz_questions").select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // 데이터 가져와서 랜덤 섞기
        // setQuizData(shuffleArray(data));
        setQuizData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [pathName]);

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (quizData.length === 0) return <p>No quiz data found.</p>;

  const quiz = quizData.filter((item) => pathName.includes(item.language))[
    currentIndex
  ];
  const questionId = quiz?.question_id;
  const translationQuiz = quizData.filter(
    (item) =>
      item.question_id === questionId && !pathName.includes(item.language)
  );
  const currentLang = pathName.split("/")[1];
  return (
    <div className="p-[20px]">
      <h4 className="font-bold">{quiz.question}</h4>
      <div className="py-[20px]">
        <Answers
          options={quiz.options}
          onSelect={setSelected}
          selected={selected}
          setShowAnswer={setShowAnswer}
        />
      </div>

      <Toggle lang={currentLang} data={translationQuiz} />
      <button
        onClick={handleCheckAnswer}
        disabled={!selected}
        className="flex hover:text-orange-500 pt-[20px]"
      >
        {showAnswer ? <IoEyeSharp size="20" /> : <TbEyeClosed size="20" />}
        &nbsp;
        <span className={`${selected ? "font-bold" : "text-gray-400"}`}>
          Check answer
        </span>
      </button>
      {showAnswer
        ? selected === quiz.correctAnswer
          ? "✅ Correct!"
          : "❌ Wrong answer!"
        : !selected && <small>please choose the answer</small>}

      <div className="mt-[20px] flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`${currentIndex === 0?"text-gray-300":"hover:text-orange-500"}`}
        >
          <GrPrevious />
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === quizData.length - 1}
          className="hover:text-orange-500"
        >
          <GrNext />
          Next
        </button>
      </div>
    </div>
  );
}
