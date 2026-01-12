
import React from 'react';
import { Victory } from '../types';

interface DashboardScreenProps {
  victories: Victory[];
  onDebtCircleClick?: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ victories, onDebtCircleClick }) => {
  const percentage = 65;
  const size = 220; // Slightly smaller for better fit
  const strokeWidth = 16;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col gap-8 pt-8 px-6 font-display animate-in fade-in duration-700 pb-36">
      <header className="flex items-center justify-between">
        <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-800 dark:text-white text-xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl font-black text-gray-900 dark:text-white">债务进度</h2>
        <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-800 dark:text-white text-xl">share</span>
        </button>
      </header>

      {/* Progress Section */}
      <div className="flex flex-col items-center justify-center py-6 relative">
        <button 
          onClick={onDebtCircleClick}
          className="relative flex items-center justify-center active:scale-95 transition-transform group"
          style={{ width: size, height: size }}
        >
          {/* Background Shadow Glow */}
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[40px] opacity-50"></div>
          
          {/* Inner Depth Ball - Matches visual exactly */}
          <div 
            className="absolute rounded-full bg-white dark:bg-[#1a1f26] shadow-[inset_0_4px_16px_rgba(0,0,0,0.03),0_12px_40px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_4px_16px_rgba(0,0,0,0.3),0_12px_40px_rgba(0,0,0,0.5)] z-0"
            style={{ width: (radius * 2) - strokeWidth + 4, height: (radius * 2) - strokeWidth + 4 }}
          />
          
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            className="absolute transform -rotate-90 drop-shadow-[0_0_10px_rgba(43,238,124,0.1)] z-10"
          >
            {/* Background Track Circle - Perfectly centered */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-gray-100 dark:text-gray-800"
            />
            {/* Foreground Progress Arc - Perfectly overlapping */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-primary transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner Content */}
          <div className="z-20 text-center flex flex-col items-center">
            <span className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
              {percentage}%
            </span>
            <span className="text-[11px] font-bold opacity-30 text-gray-800 dark:text-white mt-3 uppercase tracking-[0.2em]">
              已还清债务
            </span>
          </div>
        </button>

        {/* Global Summary Pill */}
        <div className="mt-12 bg-primary/10 px-6 py-2.5 rounded-full flex items-center gap-3 border border-primary/20 backdrop-blur-sm animate-in slide-in-from-bottom duration-700">
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(43,238,124,0.6)]"></span>
          <p className="text-primary text-[13px] font-black tracking-tight">
            剩余 ¥35,000 / 总额 ¥100,000
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '坚持天数', value: '42 天' },
          { label: '最近还款', value: '¥2,000' },
          { label: '连续周数', value: '12 周' },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-panel-dark p-4 rounded-[28px] border border-gray-100 dark:border-white/5 flex flex-col gap-1 shadow-sm transition-all hover:border-primary/20"
          >
            <p className="text-[10px] uppercase tracking-widest font-black opacity-30 text-gray-800 dark:text-white">{stat.label}</p>
            <p className="text-[15px] font-black text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Victories List */}
      <div className="flex flex-col gap-5 mt-4">
        <h3 className="text-xl font-black text-gray-900 dark:text-white ml-1">近期小胜利</h3>
        <div className="flex flex-col gap-3">
          {victories.map((v, idx) => (
            <div 
              key={v.id} 
              className="bg-white dark:bg-panel-dark p-5 rounded-[32px] flex items-center gap-5 border border-gray-100 dark:border-white/5 group active:scale-[0.98] transition-all shadow-sm animate-in fade-in slide-in-from-right duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary/20">
                <span className="material-symbols-outlined text-2xl">
                  {v.type === 'credit' ? 'credit_card' : v.type === 'loan' ? 'payments' : 'verified'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="font-black text-base text-gray-900 dark:text-white truncate">{v.title}</h4>
                  <span className={`text-[10px] font-black tracking-widest uppercase flex-shrink-0 ${v.status === '已完成' || v.status === '成就' ? 'text-primary' : 'opacity-40 text-gray-500'}`}>
                    {v.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-400 mt-0.5 truncate">
                  {v.amount} {v.date && `• ${v.date}`}
                </p>
              </div>
              <span className="material-symbols-outlined text-gray-300 text-sm group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Banner */}
      <div className="bg-gray-900 dark:bg-primary py-6 px-8 rounded-[36px] shadow-2xl flex items-center gap-5 mt-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-1000">
           <span className="material-symbols-outlined text-[80px] text-white">format_quote</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-gray-900/10 flex items-center justify-center relative z-10">
          <span className="material-symbols-outlined text-primary dark:text-gray-900 fill-1 text-xl">format_quote</span>
        </div>
        <p className="flex-1 text-sm font-black italic text-white dark:text-gray-900 relative z-10 leading-relaxed">
          “每向前迈出一步，都是迈向自由的一步。”
        </p>
      </div>
    </div>
  );
};

export default DashboardScreen;
