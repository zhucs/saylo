import React from "react";
import TopicCard from "./TopicCard";

// Lessons data
const lessons = [
  {
    title: "Better than I thought",
    contentSequence: [
      {
        type: "teaching",
        data: {
          title: "Express your surprise!",
          description:
            "In your everyday life, things are not always what you expect. You might come across, for instance, a cat that's so fluffy it could be a pillow. Use these Spanish structures to express unexpected intensities or qualities.",
          examples: [
            {
              structure: "1) tan... que",
              spanish: "Ella fue tan alta que no cabía por la puerta.",
              english: "She was so tall that she couldn't fit through the door.",
            },
            {
              structure: "2) más... de lo que [pensar/imaginar/creer]",
              spanish: "El carro fue más bonito de lo que imaginaba.",
              english: "The car was more beautiful than I imagined.",
            },
          ],
        },
      },
      {
        type: "block",
        data: {
          sentence: "This pool is bigger than I thought.",
          blocks: ["esta", "piscina", "es", "más", "grande", "de", "lo", "que", "pensé"],
        },
      },
      {
        type: "translation",
        data: {
          english: "so cold that",
          correctTranslation: "tan frío que",
        },
      },
      {
        type: "block",
        data: {
          sentence: "This movie was so good I'd say it's the best",
          blocks: ["la", "película", "fue", "tan", "buena", "que", "diría", "que", "es", "la", "mejor"],
        },
      },
      {
        type: "translation",
        data: {
          english: "better than I thought",
          correctTranslation: "mejor de lo que pensé",
        },
      },
      {
        type: "dialogue",
        data: {
          topic: "Expressing Counterexpectation",
          structures: [
            "1) tan... que",
            "2) más... de lo que [pensar/imaginar/creer]",
          ],
        },
      },
    ],
  },
  {
    title: "Big ass truck",
    contentSequence: [
      {
        type: "teaching",
        data: {
          title: "Big Trucks!",
          description:
            "Learn how to describe oversized things with these structures.",
          examples: [
            {
              structure: "adjective + noun",
              spanish: "Camión grande",
              english: "Big truck.",
            },
          ],
        },
      },
      {
        type: "block",
        data: {
          sentence: "Camión grande",
          blocks: ["Camión", "grande"],
        },
      },
    ],
  },
];

// Topics data
const topics = [
  {
    title: "Counterexpectation",
    items: ["Better than I thought", "Big ass truck", "Not necessarily..."],
  },
  {
    title: "Body Ailments",
    items: ["My tummy hurts", "Loss of motion", "Sprained an ankle"],
  },
  {
    title: "Mood Expressions",
    items: ["I'm so excited", "Pretty disappointed", "Feeling meh"],
  },
  {
    title: "Weather Talk",
    items: ["It's too hot", "Freezing cold", "Not bad, though"],
  },
  {
    title: "Food Opinions",
    items: ["Tastes amazing", "Not great", "Just okay"],
  },
];

const HomeContent = () => {
  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto">
      {topics.map((topic, index) => {
        // Filter the lessons for the current topic
        const filteredLessons = lessons.filter((lesson) =>
          topic.items.includes(lesson.title)
        );

        return (
          <TopicCard
            key={index}
            title={topic.title}
            items={topic.items}
            lessonData={filteredLessons} // Pass filtered lessons for each topic
          />
        );
      })}
    </div>
  );
};

export default HomeContent;
