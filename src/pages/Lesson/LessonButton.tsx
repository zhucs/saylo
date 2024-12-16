import React from "react";

interface LessonButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  size?: "small" | "large"; // Add size prop
}

const LessonButton: React.FC<LessonButtonProps> = ({ onClick, children, size = "small" }) => {
  const baseClasses =
    "text-white rounded-lg hover:bg-purple-600 transition duration-200";
  const sizeClasses =
    size === "large"
      ? "bg-purple-500 px-8 py-4 text-xl"
      : "bg-purple-500 px-4 py-2 text-md";

  return (
    <button onClick={onClick} className={`${baseClasses} ${sizeClasses}`}>
      {children}
    </button>
  );
};

export default LessonButton;
