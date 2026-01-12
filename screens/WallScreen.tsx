
import React, { useState } from 'react';
import { Spark, SparkCategory } from '../types';

interface WallScreenProps {
  sparks: Spark[];
  onUpdateSparks: (updated: Spark[]) => void;
}

const WallScreen: React.FC<WallScreenProps> = ({ sparks, onUpdateSparks }) => {
  const [activeTab, setActiveTab] = useState<SparkCategory>('story');
  const [selectedSparkId, setSelectedSparkId] = useState<string | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleAddReply = (sparkId: string) => {
    if (!replyText.trim()) return;
    const updated = sparks.map(s => {
      if (s.id === sparkId) {
        return { ...s, replies: [...(s.replies || []), replyText] };
      }
      return s;
    });
    onUpdateSparks(updated);
    setReplyText('');
  };

  const selectedSpark = sparks.find(s => s.id === selectedSparkId);
  const filteredSparks = sparks.filter(s => s.category === activeTab);

  const renderSparkCard = (s: Spark) => {
    return (
      <div 
        key={s.id}
        onClick={() => setSelectedSparkId(s.id)}
        className="flex flex-col gap-2 rounded-2xl p-4 bg-white dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 mb-4 active:scale-[0.98] transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] opacity-40 text-gray-800 dark:text-white">{s.icon}</span>
            <span className="text-[10px] text-gray-400 dark:text-white/30 font-medium">{s.time}</span>
          </div>
        </div>
        <p className="text-gray-800 dark:text-white/90 text-[14px] leading-relaxed italic line-clamp-4">
          {s.content}
        </p>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">favorite</span>
            <span className="text-primary/70 text-[11px] font-bold">{s.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-gray-400 dark:text-white/40">chat_bubble</span>
            <span className="text-gray-400 dark:text-white/40 text-[11px] font-bold">{s.replies?.length || 0}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8f7] dark:bg-background-dark font-display text-gray-900 dark:text-white relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      </div>

      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl p-4 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-between">
          <span className="material-symbols-outlined cursor-pointer text-gray-400 dark:text-white/60">arrow_back_ios</span>
          <div className="text-center">
            <h2 className="text-lg font-bold">希望之墙</h2>
            <p className="text-primary text-[10px] uppercase tracking-widest font-bold">匿名庇护所</p>
          </div>
          <button 
            onClick={() => setIsInfoModalOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined text-gray-400 dark:text-white/60">info</span>
          </button>
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="flex justify-center gap-8 py-6 px-4">
        <button 
          onClick={() => setActiveTab('story')}
          className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 ${activeTab === 'story' ? 'border-primary text-primary opacity-100' : 'border-transparent text-gray-400 dark:text-white/40 opacity-70'}`}
        >
          <span className="material-symbols-outlined text-sm">auto_stories</span>
          <span className="text-sm font-bold uppercase tracking-wider">负债故事</span>
        </button>
        <button 
          onClick={() => setActiveTab('feeling')}
          className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 ${activeTab === 'feeling' ? 'border-secondary text-secondary opacity-100' : 'border-transparent text-gray-400 dark:text-white/40 opacity-70'}`}
        >
          <span className="material-symbols-outlined text-sm">favorite</span>
          <span className="text-sm font-bold uppercase tracking-wider">匿名心声</span>
        </button>
      </div>

      {/* Main Content: Single column tabbed view */}
      <div className="flex-1 px-4 pb-12">
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
          {filteredSparks.length > 0 ? (
            filteredSparks.map(renderSparkCard)
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <span className="material-symbols-outlined text-6xl mb-4 text-gray-900 dark:text-white">auto_awesome</span>
              <p className="text-sm italic text-gray-900 dark:text-white">这里空荡荡的，等候第一颗火星...</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-[340px] bg-white dark:bg-[#1a1f26] border border-gray-100 dark:border-white/10 rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">info</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">关于希望之墙</h3>
            </div>
            
            <div className="flex flex-col gap-6 mb-8 text-gray-600 dark:text-white/70">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">vpn_lock</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">完全匿名</p>
                  <p className="text-[11px] leading-relaxed">您的发言不显示任何个人信息，这里是属于您的绝对隐秘空间。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">groups</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">点火互助</p>
                  <p className="text-[11px] leading-relaxed">通过分享故事或心声，与经历相似的伙伴产生共鸣，互相给予点亮黑暗的力量。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-danger text-xl flex-shrink-0">verified_user</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">社区守则</p>
                  <p className="text-[11px] leading-relaxed">严禁发布广告、暴力或攻击性言论。让我们共同维护这块最后的纯净之地。</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsInfoModalOpen(false)}
              className="w-full py-4 bg-primary text-black font-black rounded-2xl active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              明白了
            </button>
          </div>
        </div>
      )}

      {/* Full Screen Display Modal */}
      {selectedSpark && (
        <div className="fixed inset-0 z-[120] bg-[#f6f8f7] dark:bg-background-dark flex flex-col animate-in slide-in-from-bottom duration-300">
          <header className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md">
            <button 
              onClick={() => setSelectedSparkId(null)}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/60 active:scale-90"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-center">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">{selectedSpark.category === 'story' ? '负债故事' : '匿名心声'}</h3>
              <p className="text-[10px] text-gray-400 dark:text-white/30">{selectedSpark.time}</p>
            </div>
            <div className="w-10" />
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar">
            <div className="mb-10">
              <span className="material-symbols-outlined text-4xl text-primary/40 mb-4">{selectedSpark.icon}</span>
              <p className="text-xl leading-relaxed text-gray-900 dark:text-white/95 italic font-medium">
                {selectedSpark.content}
              </p>
              <div className="flex items-center gap-4 mt-8 opacity-60">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary">favorite</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedSpark.likes}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold text-gray-400 dark:text-white/20 uppercase tracking-[0.2em] mb-4">暖心互动</h4>
              {selectedSpark.replies && selectedSpark.replies.length > 0 ? (
                selectedSpark.replies.map((reply, idx) => (
                  <div key={idx} className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 animate-in fade-in slide-in-from-left duration-300 shadow-sm" style={{ animationDelay: `${idx * 50}ms` }}>
                    <p className="text-sm text-gray-800 dark:text-white/80 leading-relaxed">{reply}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-20 italic text-sm text-gray-900 dark:text-white">
                  暂无评论，留下你的第一声鼓励...
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 pb-10">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-2 pl-4">
              <input 
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="善良是一种选择..."
                className="flex-1 bg-transparent border-none text-gray-800 dark:text-white text-sm focus:outline-none placeholder:text-gray-400 dark:placeholder:text-white/20"
                onKeyDown={(e) => e.key === 'Enter' && handleAddReply(selectedSpark.id)}
              />
              <button 
                onClick={() => handleAddReply(selectedSpark.id)}
                disabled={!replyText.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${replyText.trim() ? 'bg-primary text-black' : 'bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-white/20 cursor-not-allowed'}`}
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WallScreen;
