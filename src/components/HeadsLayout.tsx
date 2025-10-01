import React from 'react';
import { Head } from '../types/game';

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
  // Filter out defeated and hidden heads
  const visibleHeads = heads.filter(head => !(head.status === 'defeated' && head.isHidden));
  
  // Calculate size for each visible head based on their new positions
  const getSizeClassForVisible = (visibleIndex: number, totalVisible: number) => {
    if (totalVisible <= 1) return 'w-28 h-28'; // Single head gets max size
    
    // For multiple heads, distribute sizes symmetrically (2-point decrements from w-28)
    const sizeOptions = [
      'w-18 h-18', // smallest (28 - 10 = 18)
      'w-20 h-20', // (28 - 8 = 20)
      'w-22 h-22', // (28 - 6 = 22)
      'w-24 h-24', // (28 - 4 = 24)
      'w-26 h-26', // (28 - 2 = 26)
      'w-28 h-28'  // largest (original size)
    ];
    
    const maxSizeIndex = sizeOptions.length - 1;
    
    if (totalVisible === 2) {
      // For 2 heads: both get large size (2 points less than max)
      return 'w-26 h-26';
    } else if (totalVisible < 5) {
      // For 3-5 heads: increase to middle, then decrease
      const middle = Math.floor(totalVisible / 2);
      const distanceFromMiddle = Math.abs(visibleIndex - middle);
      const sizeIndex = Math.min(maxSizeIndex, maxSizeIndex - distanceFromMiddle);
      return sizeOptions[sizeIndex];
    } else {
      // For 6+ heads: classic pattern (increase to middle, then decrease)
      const middle = Math.floor(totalVisible / 2);
      const distanceFromMiddle = Math.abs(visibleIndex - middle);
      const sizeIndex = Math.max(0, Math.min(maxSizeIndex, maxSizeIndex - distanceFromMiddle));
      return sizeOptions[sizeIndex];
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-orange-100 to-yellow-100 py-8">
      <div className="flex justify-center items-end space-x-4 max-w-6xl mx-auto px-4">
        {visibleHeads.map((head, visibleIndex) => {
          const dynamicSizeClass = getSizeClassForVisible(visibleIndex, visibleHeads.length);
          
          return (
            <div key={head.id} className={`flex flex-col items-center mx-2 ${dynamicSizeClass}`}>
              <div 
                className={`relative ${dynamicSizeClass} cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => onHeadClick(head.id)}
              >
                <img
                  src={head.status === 'defeated' ? '/assets/animation.gif' : 
                        '/assets/head.png'}
                  alt={head.name}
                  className={`w-full h-full object-cover rounded-full ${
                    selectedHeadId === head.id ? 'border-4 border-blue-500' :
                    head.status === 'defeated' ? 'border-4 border-green-500' :
                    head.status === 'laughing' ? 'border-4 border-red-500' :
                    'border-2 border-gray-300 hover:border-gray-400'
                  }`}
                />
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
        })}
      </div>
    </div>
  );
};