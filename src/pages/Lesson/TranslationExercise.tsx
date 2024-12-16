import React, { useState } from "react";

interface TranslationExerciseProps {
  english: string;
  correctTranslation: string;
  onNext: () => void;
}

const TranslationExercise: React.FC<TranslationExerciseProps> = ({
  english,
  correctTranslation,
  onNext,
}) => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setFeedback(null); // Clear feedback when input changes
  };

  const handleButtonClick = () => {
    if (userInput.trim() === correctTranslation) {
      setFeedback("Correct! Great job!");
    } else {
      setFeedback("Incorrect, try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div className="bg-white p-6 rounded-lg shadow-md h-[16rem] flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recall the Structure in Spanish
          </h2>
          <div className="mb-8 text-2xl text-gray-700">{english}</div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg text-xl w-full p-2 mb-4 outline-none focus:border-gray-500 focus:ring-0"
            placeholder="Type your translation here..."
            disabled={feedback?.includes("Correct")} // Freeze input on correct answer
          />
        </div>

        {/* Feedback */}
        <div className="min-h-[1em] mb-4 flex items-center justify-center">
          {feedback && (
            <p
              className={`${
                feedback.includes("Correct")
                  ? "text-green-600"
                  : "text-red-600"
              } text-lg font-bold`}
            >
              {feedback}
            </p>
          )}
        </div>
      </div>

      {/* Next Button */}
      <button
        className={`${
          feedback?.includes("Correct")
            ? "bg-green-400 hover:bg-green-500"
            : "bg-purple-500 hover:bg-purple-700"
        } text-white px-8 py-4 text-xl mt-6 rounded-lg block mx-auto`}
        onClick={feedback?.includes("Correct") ? onNext : handleButtonClick}
      >
        {feedback?.includes("Correct") ? "Next" : "Check"}
      </button>
    </div>
  );
};

export default TranslationExercise;
