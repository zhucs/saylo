import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LessonButton from "./LessonButton";
import ExitButton from "./ExitButton";
import TeachingMaterial from "./TeachingMaterial";
import BlockExercise from "./BlockExercise";
import TranslationExercise from "./TranslationExercise";
import FinishDialogueExercise from "./FinishDialogueExercise";
import FinishedMessage from "./FinishedMessage";

const LessonPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lessonContent = location.state;

  const [currentStep, setCurrentStep] = useState(0);

  if (!lessonContent || !lessonContent.contentSequence) {
    return (
      <div className="flex flex-col items-center justify-center h-screen font-primary bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <LessonButton onClick={() => navigate("/home")}>Go Back</LessonButton>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < lessonContent.contentSequence.length) {
      setCurrentStep(currentStep + 1); // Move to the next content
    }
  };

  const currentContent = lessonContent.contentSequence[currentStep];

  // Extract structures only once at the end
  const allStructures = [];
  for (const content of lessonContent.contentSequence) {
    if (content.type === "dialogue" && content.data.structures) {
      allStructures.push(...content.data.structures);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white font-primary p-6">
      {/* Exit Button */}
      <div className="absolute top-6 left-6">
        <ExitButton onClick={() => navigate("/home")}>Back to Home</ExitButton>
      </div>

      {/* Display FinishedMessage if at the end */}
      {currentStep === lessonContent.contentSequence.length ? (
        <FinishedMessage structures={allStructures} />
      ) : (
        <>
          {/* Current Content */}
          <div className="w-full max-w-2xl bg-white p-6">
            {currentContent.type === "teaching" && (
              <TeachingMaterial content={currentContent.data} />
            )}

            {currentContent.type === "block" && (
              <BlockExercise
                sentence={currentContent.data.sentence}
                blocks={currentContent.data.blocks}
                onNext={handleNext}
              />
            )}

            {currentContent.type === "translation" && (
              <TranslationExercise
                english={currentContent.data.english}
                correctTranslation={currentContent.data.correctTranslation}
                onNext={handleNext}
              />
            )}

            {currentContent.type === "dialogue" && (
              <FinishDialogueExercise
                topic={currentContent.data.topic}
                structures={currentContent.data.structures}
                onNext={handleNext}
              />
            )}
          </div>

          {/* Conditionally Render "Next" Button for Teaching Material */}
          {currentContent.type === "teaching" && (
            <div className="mt-6">
              <LessonButton onClick={handleNext} size="large">
                Next
              </LessonButton>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LessonPage;
