import React from "react";

interface ProductCardProps {
  author: string;
  category: string;
  title: string;
  description: string;
  commentsCount: number;
  avatarUrl: string;
  onClick?: () => void; // Optional onClick handler
}

const ProductCard: React.FC<ProductCardProps> = ({
  author,
  category,
  title,
  description,
  commentsCount,
  avatarUrl,
  onClick,
}) => {
  return (
    <div
      className="bg-white shadow rounded-lg p-4 flex items-start gap-4 border border-gray-200 cursor-pointer hover:shadow-md transition"
      onClick={onClick} // Handle click event
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatarUrl}
          alt={`${author}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="flex-grow">
        {/* Author and Category */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">{author}</h4>
        </div>
        {/* Category */}
        <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
          {category}
        </span>
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mt-1">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2">{description}</p>

        {/* Comments */}
        <div className="flex items-center text-gray-500 text-sm mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.36 1.5 1.18 1.5 2.14v6.774c0 1.344-1.579 2.01-2.646 1.174L15.75 16.5l-3.75 3-3.75-3-3.354 2.824c-1.067.836-2.646.17-2.646-1.174V10.65c0-.96.616-1.78 1.5-2.14l8.25-3.364a1.724 1.724 0 0 1 1.5 0l8.25 3.364z"
            />
          </svg>
          <span>{commentsCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
