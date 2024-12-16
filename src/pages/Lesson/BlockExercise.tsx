import React, { useState, useEffect } from "react";

interface BlockExerciseProps {
  sentence: string;
  blocks: string[];
  onNext: () => void;
}

const shuffleArray = (array: string[]) => {
  return [...array].map((value, index) => ({ value, id: index })).sort(() => Math.random() - 0.5);
};

const BlockExercise: React.FC<BlockExerciseProps> = ({
  sentence,
  blocks,
  onNext,
}) => {
  // Add unique IDs to each block for handling duplicates
  const [correctOrder, setCorrectOrder] = useState<{ value: string; id: number }[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<{ value: string; id: number }[]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<{ value: string; id: number }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [buttonLabel, setButtonLabel] = useState<"Check" | "Next">("Check");

  useEffect(() => {
    const blocksWithIds = blocks.map((block, index) => ({ value: block, id: index }));
    setCorrectOrder(blocksWithIds); // Set the correct order
    setAvailableBlocks(shuffleArray(blocks)); // Shuffle the blocks
    setSelectedBlocks([]); // Clear selected blocks
    setFeedback(null); // Clear feedback
    setButtonLabel("Check"); // Reset button to "Check"
  }, [sentence, blocks]);

  const handleBlockClick = (block: { value: string; id: number }, fromSelected: boolean) => {
    if (fromSelected) {
      setSelectedBlocks(selectedBlocks.filter((b) => b.id !== block.id));
      setAvailableBlocks([...availableBlocks, block]);
    } else {
      setAvailableBlocks(availableBlocks.filter((b) => b.id !== block.id));
      setSelectedBlocks([...selectedBlocks, block]);
    }
    setFeedback(null); // Clear feedback when blocks are modified
  };

  const handleButtonClick = () => {
    if (buttonLabel === "Check") {
      const userSequence = selectedBlocks.map((block) => block.value);
      const correctSequence = correctOrder.map((block) => block.value);
      if (userSequence.join(" ") === correctSequence.join(" ")) {
        setFeedback("That's right! Great work!");
        setButtonLabel("Next");
      } else {
        setFeedback("Wrong, try again.");
        setAvailableBlocks(shuffleArray(blocks)); // Reset available blocks
        setSelectedBlocks([]); // Clear selected blocks
      }
    } else if (buttonLabel === "Next") {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div className="bg-white p-6 rounded-lg shadow-md h-[24rem] flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Write this in Spanish
          </h2>
          <div className="mb-8 text-2xl text-gray-700">{sentence}</div>

          {/* Selected Blocks */}
          <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-gray-800 pb-2 min-h-[56px]">
            {selectedBlocks.map((block) => (
              <button
                key={block.id}
                className="px-4 py-2 bg-amber-200 text-lg text-gray-800 rounded-lg hover:bg-amber-300"
                onClick={() => handleBlockClick(block, true)}
              >
                {block.value}
              </button>
            ))}
          </div>

          {/* Available Blocks */}
          <div className="flex flex-wrap gap-2 mb-4">
            {availableBlocks.map((block) => (
              <button
                key={block.id}
                className="px-4 py-2 bg-amber-100 text-lg text-gray-800 rounded-lg hover:bg-amber-200"
                onClick={() => handleBlockClick(block, false)}
              >
                {block.value}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="min-h-[1em] mb-4 flex items-center justify-center">
          {feedback && (
            <p
              className={`${
                feedback.includes("right") ? "text-green-600" : "text-red-600"
              } text-lg font-bold text-center`}
            >
              {feedback}
            </p>
          )}
        </div>
      </div>

      {/* Button Below the Card */}
      <button
        className={`${
          buttonLabel === "Next"
            ? "bg-green-400 hover:bg-green-500"
            : "bg-purple-500 hover:bg-purple-700"
        } text-white px-8 py-4 text-xl mt-6 rounded-lg block mx-auto`}
        onClick={handleButtonClick}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default BlockExercise;
