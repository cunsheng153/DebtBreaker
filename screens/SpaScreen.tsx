
import React, { useState } from 'react';
import { Mood } from '../types';

const moods: Mood[] = [
  { id: 'peace', name: '平静', icon: 'sentiment_satisfied' },
  { id: 'ok', name: '一般', icon: 'sentiment_neutral' },
  { id: 'anxious', name: '焦虑', icon: 'sentiment_dissatisfied' },
  { id: 'broken', name: '崩溃', icon: 'sentiment_very_dissatisfied' },
];

const SpaScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState('peace');
  const [isBreathing, setIsBreathing] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 dark:from-background-dark dark:to-purple-900/20 px-6 pt-4 font-display">
      <header className="flex items-center justify-between py-2">
        <span className="material-symbols-outlined cursor-pointer dark:text-white">arrow_back_ios_new</span>
        <h2 className="text-lg font-bold dark:text-white pr-8">情绪 SPA</h2>
        <div className="w-8" />
      </header>

      <div className="text-center mt-12 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">给自己留一点时间</h1>
        <p className="text-gray-500 dark:text-purple-300 font-medium">你现在感觉如何？</p>
      </div>

      <div className="flex justify-center gap-6 mb-16">
        {moods.map((m) => (
          <button 
            key={m.id}
            onClick={() => setSelectedMood(m.id)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
              selectedMood === m.id 
                ? 'bg-secondary text-white border-secondary scale-110 shadow-lg shadow-secondary/20' 
                : 'bg-white/50 dark:bg-white/5 text-secondary border-white/30 dark:border-white/10'
            }`}>
              <span className="material-symbols-outlined text-3xl">{m.icon}</span>
            </div>
            <p className={`text-[12px] font-bold transition-opacity ${selectedMood === m.id ? 'text-gray-900 dark:text-white opacity-100' : 'text-gray-400 opacity-70'}`}>
              {m.name}
            </p>
          </button>
        ))}
      </div>

      {/* Breathing Circle */}
      <div className="relative flex flex-col items-center justify-center flex-1 pb-12">
        <div className="absolute w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>
        <button 
          onClick={() => setIsBreathing(!isBreathing)}
          className={`relative z-10 w-56 h-56 rounded-full flex flex-col items-center justify-center bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl transition-transform duration-500 active:scale-95 group ${
            isBreathing ? 'animate-breathe' : ''
          }`}
        >
          <span className="material-symbols-outlined text-secondary text-5xl mb-2">air</span>
          <span className="text-secondary text-2xl font-bold tracking-[0.3em]">呼 吸</span>
          <div className="mt-3 w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"></div>
        </button>
        <p className={`mt-8 text-gray-500 dark:text-purple-200 text-sm font-medium tracking-wide ${isBreathing ? 'animate-pulse' : ''}`}>
          {isBreathing ? '吸气... 呼气...' : '点击开始深呼吸'}
        </p>
      </div>

      <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 rounded-3xl text-center border border-white/40 dark:border-white/10 mb-24">
        <span className="material-symbols-outlined text-secondary/60 mb-2">auto_awesome</span>
        <p className="text-sm leading-relaxed text-gray-800 dark:text-white">
          “你现在的财务状况只是一个章节，而不是整本书。深呼吸，你已经做得很好了。”
        </p>
      </div>
    </div>
  );
};

export default SpaScreen;
