
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[440px] z-50">
      <div className="bg-white/90 dark:bg-[#1a1f26]/95 backdrop-blur-3xl rounded-[36px] px-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/40 dark:border-white/5 h-[84px]">
        
        {/* Left Nav Items */}
        <div className="flex flex-1 justify-around items-center h-full">
          {leftItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 w-14 h-14 rounded-2xl ${
                currentScreen === item.id 
                  ? 'text-primary' 
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              <span className={`material-symbols-outlined text-[30px] ${item.fill ? 'fill-1' : ''} ${currentScreen === item.id ? 'scale-110 font-bold' : ''}`}>
                {item.icon}
              </span>
              {currentScreen === item.id && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Central Action Button - Large size, no border as requested before */}
        <div className="flex flex-col items-center justify-center -mt-6">
          <button
            onClick={onActionClick}
            className="w-16 h-16 bg-primary rounded-[24px] flex items-center justify-center text-black shadow-2xl shadow-primary/40 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-4xl font-black">add</span>
          </button>
        </div>

        {/* Right Nav Items */}
        <div className="flex flex-1 justify-around items-center h-full">
          {rightItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 w-14 h-14 rounded-2xl ${
                currentScreen === item.id 
                  ? 'text-primary' 
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              <span className={`material-symbols-outlined text-[30px] ${item.fill ? 'fill-1' : ''} ${currentScreen === item.id ? 'scale-110 font-bold' : ''}`}>
                {item.icon}
              </span>
              {currentScreen === item.id && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 animate-pulse" />}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BottomNav;
