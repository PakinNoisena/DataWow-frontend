import React from "react";

interface ProductCardProps {
  author: string;
  category: string;
  title: string;
  description: string;
  commentsCount: number;
  avatarUrl: string;
  userId?: string; // Optional userId for showing edit/delete
  onEdit?: () => void; // Optional onEdit handler
  onDelete?: () => void; // Optional onDelete handler
  onClick?: () => void; // Optional onClick handler
}

const ProductCard: React.FC<ProductCardProps> = ({
  author,
  category,
  title,
  description,
  commentsCount,
  avatarUrl,
  userId,
  onEdit,
  onDelete,
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
          {/* Show Edit/Delete if userId matches ownerUserId */}
          {userId && (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click
                  onEdit && onEdit();
                }}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L7.317 19.395l-4.038.897.897-4.038 12.686-12.687z"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click
                  onDelete && onDelete();
                }}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18.75A2.25 2.25 0 0 0 8.25 21h7.5A2.25 2.25 0 0 0 18 18.75V9H6v9.75zM9 9V7.5a3 3 0 1 1 6 0V9m-9 0h12"
                  />
                </svg>
              </button>
            </div>
          )}
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
