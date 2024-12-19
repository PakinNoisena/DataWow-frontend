"use client";
import React, { useState, useEffect } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  defaultValue?: string; // Optional default value prop
}

export default function SearchForm({
  onSearch,
  defaultValue = "",
}: SearchFormProps) {
  const [searchValue, setSearchValue] = useState(defaultValue); // Initialize with defaultValue
  const [debouncedValue, setDebouncedValue] = useState(defaultValue); // Debounced value

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 900);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Trigger onSearch whenever debouncedValue changes, including empty strings
  useEffect(() => {
    onSearch(debouncedValue); // Always call onSearch, even for empty strings
  }, [debouncedValue, onSearch]);

  return (
    <form className="max-w-md mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={searchValue}
          onChange={handleInputChange}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
    </form>
  );
}
