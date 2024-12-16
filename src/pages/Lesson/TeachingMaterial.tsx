import React from "react";

interface TeachingMaterialProps {
  content: {
    title: string;
    description: string;
    examples?: {
      structure: string; // Add structure field for purple text
      spanish: string;
      english: string;
    }[];
  };
}

const TeachingMaterial: React.FC<TeachingMaterialProps> = ({ content }) => {
  return (
    <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{content.title}</h2>
      <p className="text-lg text-gray-700 mb-4">{content.description}</p>

      {content.examples && content.examples.length > 0 && (
        <div className="mb-4">
          {content.examples.map((example, index) => (
            <div key={index} className="mb-6">
              <p className="text-xl text-purple-700 font-bold mb-1">
                {example.structure}
              </p>
              <p className="text-lg text-black font-bold">{example.spanish}</p>
              <p className="text-md text-gray-600">{example.english}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachingMaterial;
