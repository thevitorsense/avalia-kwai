import React from 'react';

interface LevelBadgeProps {
  level: 'Iniciante' | 'Intermediário' | 'Expert';
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-800';
  
  switch (level) {
    case 'Intermediário':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'Expert':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      break;
    default:
      break;
  }
  
  return (
    <span className={`${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {level}
    </span>
  );
};

export default LevelBadge;
