import React from 'react';
import { Head } from '../types/game';

interface HeadComponentProps {
  head: Head;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

export const HeadComponent: React.FC<HeadComponentProps> = ({
  head,
  index,
  onClick,
  isSelected
}) => {
  // Calculate size based on position (1-5 increase, 6-10 decrease)
  const getSizeClass = (index: number) => {
    const sizes = [
      'w-12 h-12', // 1st head
      'w-16 h-16', // 2nd head  
      'w-20 h-20', // 3rd head
      'w-24 h-24', // 4th head
      'w-28 h-28', // 5th head (largest)
      'w-24 h-24', // 6th head
      'w-20 h-20', // 7th head
      'w-16 h-16', // 8th head
      'w-12 h-12', // 9th head
      'w-10 h-10'  // 10th head (smallest)
    ];
    return sizes[index];
  };

  const getImageSrc = () => {
    if (head.status === 'defeated') {
      return '/assets/animation.gif';
    }
    // else if (head.status === 'laughing') {
    //   return '/assets/laughing.png';
    // }
    return '/assets/head.png';
  };

  const getBorderClass = () => {
    if (isSelected) return 'border-4 border-blue-500';
    if (head.status === 'defeated') return 'border-4 border-green-500';
    // if (head.status === 'laughing') return 'border-4 border-red-500';
    return 'border-2 border-gray-300 hover:border-gray-400';
  };

  // Don't render defeated heads that have been hidden
  if (head.status === 'defeated' && head.isHidden) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center mx-2 ${getSizeClass(index)}`}>
      <div 
        className={`relative ${getSizeClass(index)} cursor-pointer transition-all duration-300 hover:scale-105`}
        onClick={onClick}
      >
        <img
          src={getImageSrc()}
          alt={head.name}
          className={`w-full h-full object-cover rounded-full ${getBorderClass()}`}
        />
        {/* Status indicator */}
        {/* {head.answeredCount > 0 && head.status !== 'defeated' && (
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {head.answeredCount}
          </div>
        )} */}
      </div>
      <span className={`text-sm font-medium mt-2 text-center ${
        head.status === 'defeated' ? 'text-green-600' :
        head.status === 'laughing' ? 'text-red-600 line-through' : 
        'text-gray-700'
      }`}>
        {head.name}
      </span>
    </div>
  );
};

interface HeadsLayoutProps {
  heads: Head[];
  selectedHeadId: string | null;
  onHeadClick: (headId: string) => void;
}

export const HeadsLayout: React.FC<HeadsLayoutProps> = ({
  heads,
  selectedHeadId,
  onHeadClick
}) => {
  return (
    <div className="w-full bg-gradient-to-b from-orange-100 to-yellow-100 py-8">
      <div className="flex justify-center items-end space-x-4 max-w-6xl mx-auto px-4">
        {heads.map((head, index) => (
          <HeadComponent
            key={head.id}
            head={head}
            index={index}
            onClick={() => onHeadClick(head.id)}
            isSelected={selectedHeadId === head.id}
          />
        ))}
      </div>
    </div>
  );
};