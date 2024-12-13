import React from "react";

interface TopicCardProps {
  title: string;
  items: string[];
}

const TopicCard: React.FC<TopicCardProps> = ({ title, items }) => {
  return (
    <div className="bg-purple-100 rounded-lg font-primary shadow-md mb-6 p-4">
      <h3 className="text-xl font-bold text-purple-700 mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
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
