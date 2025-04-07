interface AnswersProps {
  options: string[];
  onSelect?: (option: string) => void;
  selected?: string | null;
  setShowAnswer?: (show: boolean) => void;
}

export default function Answers({
  options,
  onSelect,
  selected,
  setShowAnswer,
}: AnswersProps) {
  return (
    <div>
      {options.map((option: string, index: number) => {
        const letter = String.fromCharCode(97 + index);
        return (
          <p
            key={option}
            onClick={() => {
              onSelect?.(option);
              setShowAnswer?.(false);
            }}
            className={`cursor-pointer ${
              selected === option
                ? "text-blue-500 font-bold"
                : "text-black font-normal"
            } hover:text-[#34b07a]`}
          >
            {letter}. {option}
          </p>
        );
      })}
    </div>
  );
}
