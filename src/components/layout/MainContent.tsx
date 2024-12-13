import React from "react";
import TopicCard from "../../pages/Home/TopicCard";

const topics = [
  { title: "Counterexpectation", items: ["Better than I thought", "Big ass truck", "Not necessarily..."] },
  { title: "Body Ailments", items: ["My tummy hurts", "Loss of motion", "Sprained an ankle"] },
  { title: "Mood Expressions", items: ["I'm so excited", "Pretty disappointed", "Feeling meh"] },
  { title: "Weather Talk", items: ["It's too hot", "Freezing cold", "Not bad, though"] },
  { title: "Food Opinions", items: ["Tastes amazing", "Not great", "Just okay"] },
  // Add more topics if needed
];


const MainContent = () => {
  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto">
      {topics.map((topic, index) => (
        <TopicCard key={index} title={topic.title} items={topic.items} />
      ))}
    </div>
  );
};

export default MainContent;
