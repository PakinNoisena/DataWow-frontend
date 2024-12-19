import React from "react";

interface ButtonProps {
  text: string; // Button text
  className?: string; // Custom class names for styling
  hide?: boolean; // Hide button
  onClick: () => void; // Function to execute on button click
  icon?: React.ReactNode; // Optional icon to render
}

const Button: React.FC<ButtonProps> = ({
  text,
  className = "bg-blue-500 text-white", // Default classes for styling
  hide = false,
  onClick,
  icon,
}) => {
  if (hide) return null; // Hide the button if `hide` is true

  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded font-medium hover:opacity-80 focus:outline-none focus:ring ${className}`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>} {/* Render the icon if provided */}
      <span>{text}</span>
    </button>
  );
};

export default Button;
