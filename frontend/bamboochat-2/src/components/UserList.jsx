import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const UserList = ({ 
  title, 
  isOpen, 
  onToggle, 
  children, 
  isOtherSectionOpen 
}) => {
  const containerHeight = isOpen
    ? isOtherSectionOpen
      ? 'h-[50%]'
      : 'h-full'
    : 'min-h-[70px]';

  return (
    <div className={`flex flex-col items-center bg-bamboo w-full ${containerHeight} rounded-[30px] overflow-hidden relative transition-all duration-300`}>
      {/* Header */}
      <div
        className="w-full ps-[40px] bg-bamboo pt-[20px] h-[50px] cursor-pointer relative"
        onClick={onToggle}
      >
        {isOpen ? (
          <ChevronDown className="text-white absolute top-3 right-4 h-10 w-6" />
        ) : (
          <ChevronRight className="text-white absolute top-3 right-4 h-10 w-6" />
        )}
        <h2 className="text-white font-bold text-lg mb-2">{title}</h2>
      </div>

      {/* Content */}
      {isOpen && (
        <>
          {/* Top gradient */}
          <div className="absolute top-[50px] left-0 right-0 h-10 pointer-events-none bg-gradient-to-b from-bamboo/100 to-bamboo/0 z-20" />
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-t from-bamboo/100 to-bamboo/0 z-20" />
          {/* Content */}
          <div className="flex flex-col px-2 gap-2 w-full overflow-y-auto scrollbar-hide max-h-full pr-2">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
