
import React, { useState, useEffect } from 'react';
import { speakText } from '../services/geminiService';

interface LoginScreenProps {
  onLogin: () => void;
}

const MOTIVATIONAL_QUOTES = [
  "每一步小小的努力，都是在为自由铺路。",
  "债务终会清零，但你的意志将永存。",
  "黎明前的黑暗最深，但光芒终将到来。",
  "不再逃避的那一刻，你就已经赢了。",
  "优雅上岸，从心开始。",
  "今天的克制，是为了明天的阔绰。",
  "每一次还款，都是重获自由的仪式。",
  "不要看山有多高，看脚下的路有多坚实。",
  "即使在风暴中，也要保持内心的航向。",
  "你比你想象的更强大，更有韧性。"
];

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [agreed, setAgreed] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleLoginAttempt = () => {
    if (!agreed) return;
    
    // 随机选择一条语录
    const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setCurrentQuote(quote);
    setShowEncouragement(true);
    
    // 触发语音播报
    setIsSpeaking(true);
    speakText(quote).finally(() => setIsSpeaking(false));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display">
      <div className="flex items-center p-4 pb-2 justify-end">
        <span className="material-symbols-outlined text-gray-400 cursor-pointer text-[28px]">help</span>
      </div>

      <div className="flex flex-col items-center justify-center pt-12 pb-4">
        <div className="w-[120px] h-[120px] bg-danger rounded-[32px] flex items-center justify-center shadow-2xl shadow-danger/30 mb-8 transform hover:scale-105 transition-transform duration-500">
          <span className="text-white font-bold text-4xl tracking-tight">破债者</span>
        </div>
        <p className="text-[#181111] dark:text-gray-300 text-lg font-normal text-center px-4">
          打破债务困局，迎接上岸人生
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 max-w-[320px] mx-auto w-full pt-12">
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleLoginAttempt}
            disabled={!agreed}
            className={`flex w-full items-center justify-center rounded-[16px] h-[50px] px-5 gap-2.5 shadow-lg transition-all duration-300 ${
              agreed ? 'bg-[#10c05f] hover:bg-[#0da652] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8.225 3C4.197 3 1 5.86 1 9.405c0 2.033 1.056 3.844 2.704 5.011l-.69 2.535 2.21-1.155c.954.266 1.95.411 2.99.411 4.04 0 7.234-2.86 7.234-6.405C15.448 5.86 12.253 3 8.225 3z" />
              </svg>
            </div>
            <span className="text-base font-bold">微信一键登录</span>
          </button>
          
          <button 
            onClick={handleLoginAttempt}
            disabled={!agreed}
            className={`flex w-full items-center justify-center rounded-[16px] h-[50px] px-5 border transition-all ${
              agreed ? 'border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white' : 'border-gray-200 text-gray-300'
            } bg-white dark:bg-gray-900/50 backdrop-blur-sm`}
          >
            手机号登录/注册
          </button>
        </div>

        <div className="mt-8 flex items-start gap-4 px-1">
          <input 
            type="checkbox" 
            id="agreement"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-5 w-5 rounded-md border-gray-300 text-danger focus:ring-danger bg-transparent transition-colors"
          />
          <label htmlFor="agreement" className="text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
            我已阅读并同意 <span className="text-danger/70 hover:underline">《用户服务协议》</span> 与 <span className="text-danger/70 hover:underline">《隐私权政策》</span>。登录即代表您同意。
          </label>
        </div>
      </div>

      <div className="relative h-48 w-full mt-auto overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-10 w-full text-center">
          <span className="text-blue-400/60 dark:text-blue-400/40 text-xl font-bold tracking-[0.6em]">破 局 • 上 岸</span>
        </div>
      </div>

      {/* 励志插页效果图 */}
      {showEncouragement && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-background-dark animate-in slide-in-from-right duration-500 flex flex-col items-center justify-center p-8">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
            <div className="mb-12 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-primary text-4xl">graphic_eq</span>
            </div>
            
            <div className="bg-white/80 dark:bg-panel-dark/40 backdrop-blur-2xl p-10 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-2xl mb-12 w-full">
              <span className="material-symbols-outlined text-primary mb-4 block">format_quote</span>
              <p className="text-2xl font-black leading-snug text-gray-800 dark:text-white italic">
                “{currentQuote}”
              </p>
            </div>

            <button 
              onClick={onLogin}
              className="group flex items-center gap-3 bg-gray-900 dark:bg-primary text-white dark:text-gray-900 px-8 py-5 rounded-[24px] font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>开启上岸之旅</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            
            <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">
              {isSpeaking ? '正在为你朗读...' : '已为你开启能量场'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
