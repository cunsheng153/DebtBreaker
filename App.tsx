
import React, { useState, useEffect } from 'react';
import { AppScreen, Spark, SparkCategory, Victory, DebtInstitution } from './types';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import SpaScreen from './screens/SpaScreen';
import WallScreen from './screens/WallScreen';
import ProfileScreen from './screens/ProfileScreen';
import RepaymentScreen from './screens/RepaymentScreen';
import DebtDetailsScreen from './screens/DebtDetailsScreen';
import BottomNav from './components/BottomNav';

const INITIAL_SPARKS: Spark[] = [
  { id: '1', content: '从负债20万到现在的5万，我学会了克制。', time: '2分钟前', likes: 124, secondaryStat: 12, type: 'green', icon: 'auto_stories', category: 'story', replies: ['加油！你是最棒的', '希望能早日像你一样上岸'] },
  { id: '2', content: '今天压力好大，想哭。', time: '15分钟前', likes: 89, secondaryStat: 42, type: 'blue', icon: 'favorite', category: 'feeling', replies: ['抱抱你', '想哭就大声哭出来吧'] },
  { id: '3', content: '第一笔逾期时的绝望，现在想来也是成长的代价。', time: '1小时前', likes: 542, secondaryStat: 203, type: 'purple', icon: 'history_edu', category: 'story', replies: [] },
  { id: '4', content: '加油，明天会更好。', time: '3小时前', likes: 31, secondaryStat: 0, type: 'green', icon: 'mood', category: 'feeling', replies: ['借你吉言'] },
  { id: '5', content: '坚持记账第100天，发现了很多没必要的开支。', time: '5小时前', likes: 210, secondaryStat: 15, type: 'blue', icon: 'menu_book', category: 'story', replies: [] },
  { id: '6', content: '感觉自己像在深海里游泳。', time: '6小时前', likes: 45, secondaryStat: 8, type: 'purple', icon: 'waves', category: 'feeling', replies: [] },
];

const INITIAL_VICTORIES: Victory[] = [
  { id: '1', title: '信用卡 A', amount: '¥2,000', date: '昨天', type: 'credit', status: '已完成' },
  { id: '2', title: '个人贷款', amount: '¥500', date: '3天前', type: 'loan', status: '按月' },
  { id: '3', title: '达成里程碑', amount: '50% 债务缩减', date: '', type: 'milestone', status: '成就' },
];

const INITIAL_DEBTS: DebtInstitution[] = [
  { id: 'd1', name: '南京银行', total: 50000, paid: 35000, remaining: 15000, percentage: 50, type: 'bank' },
  { id: 'd2', name: '招商银行信用卡', total: 30000, paid: 20000, remaining: 10000, percentage: 30, type: 'bank' },
  { id: 'd3', name: '蚂蚁借呗', total: 20000, paid: 10000, remaining: 10000, percentage: 20, type: 'fintech' },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>(INITIAL_SPARKS);
  const [victories, setVictories] = useState<Victory[]>(INITIAL_VICTORIES);
  const [debts, setDebts] = useState<DebtInstitution[]>(INITIAL_DEBTS);
  
  // Global Posting State
  const [isTypeSelectionOpen, setIsTypeSelectionOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SparkCategory>('feeling');
  const [newContent, setNewContent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleActionClick = () => {
    setIsTypeSelectionOpen(true);
  };

  const handleCreateNew = (category: SparkCategory) => {
    setSelectedCategory(category);
    setIsTypeSelectionOpen(false);
    setIsInputModalOpen(true);
  };

  const handleStartRepayment = () => {
    setIsTypeSelectionOpen(false);
    setCurrentScreen(AppScreen.REPAYMENT);
  };

  const handleSaveSpark = () => {
    if (!newContent.trim()) return;
    
    const types: ('green' | 'blue' | 'purple')[] = ['green', 'blue', 'purple'];
    const icons = selectedCategory === 'story' ? ['auto_stories', 'history_edu', 'menu_book'] : ['favorite', 'mood', 'waves'];
    
    const newSpark: Spark = {
      id: Date.now().toString(),
      content: newContent,
      time: '刚刚',
      likes: 0,
      secondaryStat: 0,
      type: types[Math.floor(Math.random() * types.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
      category: selectedCategory,
      replies: []
    };

    setSparks([newSpark, ...sparks]);
    setNewContent('');
    setIsInputModalOpen(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentScreen(AppScreen.WALL);
    }, 1500);
  };

  const handleAddRepayment = (newVictory: Victory) => {
    setVictories([newVictory, ...victories]);
    setCurrentScreen(AppScreen.DASHBOARD);
  };

  const handleUpdateSparks = (updatedSparks: Spark[]) => {
    setSparks(updatedSparks);
  };

  const handleUpdateDebts = (updatedDebts: DebtInstitution[]) => {
    setDebts(updatedDebts);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.LOGIN:
        return <LoginScreen onLogin={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.DASHBOARD:
        return (
          <DashboardScreen 
            victories={victories} 
            onDebtCircleClick={() => setCurrentScreen(AppScreen.DEBT_DETAILS)} 
          />
        );
      case AppScreen.SPA:
        return <SpaScreen />;
      case AppScreen.WALL:
        return <WallScreen sparks={sparks} onUpdateSparks={handleUpdateSparks} />;
      case AppScreen.PROFILE:
        return (
          <ProfileScreen 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onLogout={() => setCurrentScreen(AppScreen.LOGIN)} 
          />
        );
      case AppScreen.REPAYMENT:
        return (
          <RepaymentScreen 
            debts={debts}
            onComplete={handleAddRepayment} 
            onCancel={() => setCurrentScreen(AppScreen.DASHBOARD)} 
            onNavigateToDebts={() => setCurrentScreen(AppScreen.DEBT_DETAILS)}
          />
        );
      case AppScreen.DEBT_DETAILS:
        return <DebtDetailsScreen debts={debts} onUpdateDebts={handleUpdateDebts} onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      default:
        return <DashboardScreen victories={victories} onDebtCircleClick={() => setCurrentScreen(AppScreen.DEBT_DETAILS)} />;
    }
  };

  const showNav = currentScreen !== AppScreen.LOGIN && currentScreen !== AppScreen.REPAYMENT && currentScreen !== AppScreen.DEBT_DETAILS;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-[480px] mx-auto shadow-2xl relative overflow-x-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {renderScreen()}
      </div>

      {showNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
          onActionClick={handleActionClick}
        />
      )}

      {/* Global Modals for Creating Post */}
      {isTypeSelectionOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="w-full max-w-[340px] bg-white rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">你想点燃什么？</h3>
              <button onClick={() => setIsTypeSelectionOpen(false)} className="text-gray-300 hover:text-gray-500 transition-colors">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleCreateNew('story')}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#f0fff4] border border-[#d1fae5] hover:bg-[#e6fffa] transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-2xl">auto_stories</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#10b981] text-base">写下我的故事</p>
                  <p className="text-[11px] text-[#059669]/60 font-medium">分享你的历程，给他人勇气</p>
                </div>
              </button>
              
              <button 
                onClick={() => handleCreateNew('feeling')}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#faf5ff] border border-[#f3e8ff] hover:bg-[#f5f3ff] transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-2xl">favorite</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#9333ea] text-base">倾诉匿名心声</p>
                  <p className="text-[11px] text-[#7e22ce]/60 font-medium">在这里，你可以放下所有伪装</p>
                </div>
              </button>

              <div className="w-full h-px bg-gray-100 my-1" />

              <button 
                onClick={handleStartRepayment}
                className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">payments</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-blue-600 text-base">还一笔</p>
                  <p className="text-[11px] text-blue-600/60 font-medium">记录你的努力，离上岸更近一步</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {isInputModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-[400px] bg-white dark:bg-[#1a1f26] rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-white/10 slide-in-from-bottom duration-500 animate-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold dark:text-white">
                {selectedCategory === 'story' ? '分享你的故事' : '匿名倾诉'}
              </h3>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedCategory === 'story' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                <span className="material-symbols-outlined">
                  {selectedCategory === 'story' ? 'auto_stories' : 'favorite'}
                </span>
              </div>
            </div>
            
            <textarea
              autoFocus
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={selectedCategory === 'story' ? "写下你的负债故事，或上岸的感悟..." : "现在心里在想什么？说出来会轻松很多..."}
              className="w-full h-40 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-6 transition-all"
            />

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsInputModalOpen(false)}
                className="py-4 rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 font-bold transition-colors border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300"
              >
                取消
              </button>
              <button 
                onClick={handleSaveSpark}
                disabled={!newContent.trim()}
                className={`py-4 rounded-2xl font-bold transition-all ${
                  newContent.trim() 
                    ? (selectedCategory === 'story' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-secondary text-white shadow-lg shadow-secondary/20')
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none px-6">
          <div className="bg-white/90 dark:bg-[#1a1f26]/90 backdrop-blur-2xl border border-primary/30 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-xl animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">发布成功</h3>
              <p className="text-primary font-medium tracking-widest text-sm uppercase">正在前往希望之墙</p>
            </div>
          </div>
        </div>
      )}

      {currentScreen !== AppScreen.PROFILE && (
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-4 right-4 z-[60] w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 dark:text-white"
        >
          <span className="material-symbols-outlined text-sm">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      )}
    </div>
  );
};

export default App;
