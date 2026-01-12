
import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onActionClick?: () => void;
}

interface NavItem {
  id: AppScreen;
  icon: string;
  fill?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, onActionClick }) => {
  const leftItems: NavItem[] = [
    { id: AppScreen.DASHBOARD, icon: 'home' },
    { id: AppScreen.SPA, icon: 'spa', fill: true },
  ];

  const rightItems: NavItem[] = [
    { id: AppScreen.WALL, icon: 'account_balance_wallet' },
    { id: AppScreen.PROFILE, icon: 'person' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-50">
      <div className="bg-white/90 dark:bg-[#1a1f26]/95 backdrop-blur-3xl rounded-[32px] px-2 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/40 dark:border-white/5 h-[76px]">
        
        {/* Left Nav Items */}
        <div className="flex flex-1 justify-around h-full">
          {leftItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 w-12 h-full ${
                currentScreen === item.id 
                  ? 'text-primary' 
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              <span className={`material-symbols-outlined text-[26px] ${item.fill ? 'fill-1' : ''} ${currentScreen === item.id ? 'scale-110 font-bold' : ''}`}>
                {item.icon}
              </span>
              {currentScreen === item.id && <div className="w-1 h-1 bg-primary rounded-full mt-1 animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Central Action Button */}
        <div className="flex flex-col items-center justify-center -mt-2">
          <button
            onClick={onActionClick}
            className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-black shadow-lg shadow-primary/30 active:scale-90 transition-all border-4 border-white dark:border-[#1a1f26]"
          >
            <span className="material-symbols-outlined text-3xl font-black">add</span>
          </button>
        </div>

        {/* Right Nav Items */}
        <div className="flex flex-1 justify-around h-full">
          {rightItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 w-12 h-full ${
                currentScreen === item.id 
                  ? 'text-primary' 
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              <span className={`material-symbols-outlined text-[26px] ${item.fill ? 'fill-1' : ''} ${currentScreen === item.id ? 'scale-110 font-bold' : ''}`}>
                {item.icon}
              </span>
              {currentScreen === item.id && <div className="w-1 h-1 bg-primary rounded-full mt-1 animate-pulse" />}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BottomNav;
