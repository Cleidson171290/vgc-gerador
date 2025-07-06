import React from "react";

export const TypeBadge = ({ type }) => (
  <span className={`type-badge type-${type}`}>{type}</span>
);

export const TeraTypeBadge = ({ type }) => (
  <div className={`inline-flex items-center space-x-2 type-badge type-${type}`}>
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L9.2 8.3H2l6.2 4.5L5.8 19L12 14.7L18.2 19l-2.4-6.2L22 8.3h-7.2L12 2z"
        transform="scale(1.2) translate(-2, -2)"
      />
    </svg>
    <span>TERA: {type}</span>
  </div>
);
