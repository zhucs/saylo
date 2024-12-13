import React from "react";
import TopicCard from "./TopicCard";

const topics = [
  {
    title: "Counterexpectation",
    items: ["Better than I thought", "Big ass truck", "Not necessarily..."],
  },
  {
    title: "Body Ailments",
    items: ["My tummy hurts", "Loss of motion", "Sprained an ankle"],
  },
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
