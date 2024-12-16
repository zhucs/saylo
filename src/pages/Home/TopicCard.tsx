import React from "react";
import { useNavigate } from "react-router-dom";

interface TopicCardProps {
  title: string;
  items: string[];
  lessonData: any;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, items, lessonData }) => {
  const navigate = useNavigate();

  const handleStartLesson = (item: string) => {
    console.log("Lesson Data:", lessonData);
    console.log("Clicked Item:", item);

    // Find the lesson associated with the clicked item
    const selectedLesson = lessonData.find(
      (lesson: any) => lesson.title === item
    );

    if (!selectedLesson) {
      console.error("No lesson found for the selected item");
      return;
    }

    console.log("Navigating to lesson:", selectedLesson);
    navigate("/lesson", { state: selectedLesson });
  };

  return (
    <div className="bg-purple-100 rounded-lg font-primary shadow-md mb-6 p-4">
      <h3 className="text-xl font-bold text-purple-700 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => handleStartLesson(item)}
            className="bg-white text-gray-800 p-2 rounded-lg shadow-sm cursor-pointer hover:bg-purple-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicCard;
