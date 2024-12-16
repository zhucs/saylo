import React from "react";

interface ExitButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ExitButton: React.FC<ExitButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 text-sm"
    >
      {children}
    </button>
  );
};

export default ExitButton;
