import React, { useState, useEffect } from "react";

interface DropdownProps {
  items: { name: string; id: string }[]; // Array of dropdown items
  onSelect: (value: string) => void; // Callback to send selected value to parent
  defaultSelected?: string; // Default selected value
  bgColor?: string; // Background color
  borderColor?: string; // Border color
  textColor?: string; // Text color
  hoverBgColor?: string; // Hover background color
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  defaultSelected = "all", // Ensure a default fallback
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  textColor = "text-gray-700",
  hoverBgColor = "hover:bg-gray-100",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(defaultSelected);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsDropdownOpen(false);
    onSelect(value); // Notify parent of the selected value
  };

  useEffect(() => {
    setSelected(defaultSelected); // Sync selected with default
  }, [defaultSelected]);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown button */}
      <button
        id="dropdownButton"
        className={`${bgColor} ${borderColor} font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
        type="button"
        onClick={toggleDropdown}
      >
        {selected
          ? items.find((item) => item.id === selected)?.name
          : "Select an option"}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute mt-1 ${
          isDropdownOpen ? "block" : "hidden"
        } ${bgColor} divide-y divide-gray-100 rounded-lg shadow-lg w-44 z-50`}
      >
        <ul
          className={`py-2 text-sm ${textColor}`}
          aria-labelledby="dropdownButton"
        >
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleSelect(item.id)}
                className={`block px-4 py-2 w-full text-left ${hoverBgColor}`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Dropdown;
