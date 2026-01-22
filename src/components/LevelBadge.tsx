import React from 'react';

interface LevelBadgeProps {
  level: string;
  isActive?: boolean;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level, isActive = true }) => {
  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm ${
        isActive
          ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md'
          : 'bg-gray-200 text-gray-500'
      }`}
    >
      <span className="mr-1">👑</span>
      {level}
    </div>
  );
};

export default LevelBadge;