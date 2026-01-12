import React, { useState } from 'react';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'invite' | 'password' | 'privacy' | 'terms' | null>(null);

  const menuItems = [
    { id: 'badges', icon: 'military_tech', label: '我的勋章', detail: '已解锁 5 个' },
    { id: 'faq', icon: 'quiz', label: '常见问题', detail: '了解还款策略' },
    { id: 'invite', icon: 'person_add', label: '邀请好友', detail: '邀请立享会员优惠' },
    { id: 'password', icon: 'lock_reset', label: '修改密码', detail: '定期修改更安全' },
    { id: 'privacy', icon: 'security', label: '隐私政策', detail: '保护您的个人信息' },
    { id: 'terms', icon: 'description', label: '使用条款', detail: '了解产品使用规范' },
  ];

  const membershipTiers = [
    { 
      id: 'basic', 
      name: '基础版 Basic', 
      price: '9.9', 
      period: '/月', 
      features: ['债务进度自动同步', '基础情绪支持AI', '还款提醒通知'],
      popular: false 
    },
    { 
      id: 'pro', 
      name: '专业版 Pro', 
      price: '39.9', 
      period: '/月', 
      features: ['包含基础版全部功能', '高级财务分析报告', '优先AI响应支持', '专属上岸计划定制'],
      popular: true 
    },
    { 
      id: 'lifetime', 
      name: '尊享终身版', 
      price: '199', 
      period: ' 一次性', 
      features: ['永久解锁所有功能', '专属1对1情绪咨询', '实体成就勋章寄送', '新功能抢先体验'],
      popular: false 
    },
  ];

  const handleMenuClick = (id: string) => {
    switch (id) {
      case 'invite': setActiveModal('invite'); break;
      case 'password': setActiveModal('password'); break;
      case 'privacy': setActiveModal('privacy'); break;
      case 'terms': setActiveModal('terms'); break;
      default: console.log('Feature for', id, 'clicked');
    }
  };

  const closeModal = () => {
    setIsMembershipModalOpen(false);
    setActiveModal(null);
  };

  if (showDetails) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f6f8f7] dark:bg-background-dark font-display px-6 pt-8">
        <header className="flex items-center gap-4 mb-10">
          <button onClick={() => setShowDetails(false)} className="material-symbols-outlined text-gray-500">arrow_back</button>
          <h2 className="text-xl font-bold dark:text-white">个人信息</h2>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-gray-500 text-sm">头像</span>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=DebtBreaker" 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border border-gray-200"
            />
          </div>
          <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-gray-500 text-sm">昵称</span>
            <span className="text-gray-800 dark:text-white font-medium">张先生</span>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-gray-500 text-sm">性别</span>
            <span className="text-gray-800 dark:text-white font-medium">男</span>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-gray-500 text-sm">地区</span>
            <span className="text-gray-800 dark:text-white font-medium">中国 · 北京</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-8 px-6 font-display bg-[#f6f8f7] dark:bg-background-dark min-h-screen relative">
      <header className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white">个人中心</h2>
        <span className="material-symbols-outlined cursor-pointer text-gray-400">settings</span>
      </header>

      {/* Hero Section */}
      <button 
        onClick={() => setShowDetails(true)}
        className="flex items-center gap-5 p-5 rounded-[28px] bg-white dark:bg-panel-dark border border-gray-100 dark:border-white/5 shadow-sm active:scale-95 transition-all text-left"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=DebtBreaker" 
              alt="Avatar" 
              className="w-full h-full rounded-full bg-primary/5"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary w-5 h-5 rounded-full border-2 border-white dark:border-panel-dark flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">张先生</h3>
          <p className="text-[11px] text-gray-400 font-medium">UID: 20240501 • 已经坚持 42 天</p>
        </div>
        <span className="material-symbols-outlined text-gray-300">chevron_right</span>
      </button>

      {/* Membership Card */}
      <div className="relative overflow-hidden p-6 rounded-[28px] bg-gradient-to-br from-[#fee2e2] to-[#fecaca] dark:from-primary/20 dark:to-primary/10 text-gray-800 dark:text-white shadow-sm border border-white/50 dark:border-white/5 group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <span className="material-symbols-outlined text-[90px]">workspace_premium</span>
        </div>
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified</span>
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-primary/70 uppercase">Progress Member</span>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800 dark:text-white">成就会员 • 享有专属分析</p>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">更舒缓的 UI 体验与定制化的上岸报告</p>
          </div>
          <button 
            onClick={() => setIsMembershipModalOpen(true)}
            className="mt-2 w-max px-5 py-2.5 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white dark:border-white/10 text-primary text-[11px] font-bold rounded-2xl hover:bg-white transition-all shadow-sm active:scale-95"
          >
            查看会员权益
          </button>
        </div>
      </div>

      {/* Menu List */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-panel-dark/20 hover:bg-white dark:hover:bg-panel-dark transition-all group border border-transparent hover:border-gray-100 dark:hover:border-white/5"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-gray-800 dark:text-white">{item.label}</p>
              {item.detail && <p className="text-[10px] text-gray-400">{item.detail}</p>}
            </div>
            <span className="material-symbols-outlined text-gray-200 group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        ))}
      </div>

      {/* Footer Area */}
      <div className="mt-auto pt-4 pb-12 flex flex-col gap-6">
        <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gray-100/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors active:scale-95 group">
          <span className="material-symbols-outlined text-lg opacity-60">headset_mic</span>
          <span className="text-[12px] font-medium">联系客服 (24h 在线)</span>
        </button>

        <button 
          onClick={onLogout}
          className="w-full py-4 rounded-[20px] border border-danger/30 bg-white/50 dark:bg-danger/5 text-danger font-bold hover:bg-danger hover:text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm shadow-danger/5"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          退出当前账户
        </button>
        
        <p className="text-center text-[9px] text-gray-400 uppercase tracking-widest">
          DebtBreaker v1.2.0 • 优雅上岸，从心开始
        </p>
      </div>

      {/* Pop-up Modals Container */}
      {(isMembershipModalOpen || activeModal) && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in">
          <div className="w-full max-w-[480px] bg-white dark:bg-[#1a1f26] rounded-t-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[85vh] overflow-y-auto no-scrollbar relative">
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold dark:text-white">
                {isMembershipModalOpen && '会员权益'}
                {activeModal === 'invite' && '邀请好友'}
                {activeModal === 'password' && '修改密码'}
                {activeModal === 'privacy' && '隐私政策'}
                {activeModal === 'terms' && '使用条款'}
              </h3>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Membership Modal Content */}
            {isMembershipModalOpen && (
              <div className="flex flex-col gap-4 mb-4">
                {membershipTiers.map((tier) => (
                  <div 
                    key={tier.id}
                    className={`relative p-6 rounded-[32px] border-2 transition-all ${
                      tier.popular ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold dark:text-white">{tier.name}</h4>
                        <div className="flex items-baseline gap-0.5 mt-1">
                          <span className="text-sm font-bold text-primary">¥</span>
                          <span className="text-3xl font-extrabold text-primary">{tier.price}</span>
                          <span className="text-xs text-gray-400 font-medium ml-1">{tier.period}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <button className="w-full py-5 rounded-[24px] bg-primary text-white font-extrabold text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all mt-4">立即升级</button>
              </div>
            )}

            {/* Invite Modal Content */}
            {activeModal === 'invite' && (
              <div className="flex flex-col gap-6 text-center">
                <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/20 relative overflow-hidden">
                   <h4 className="text-sm font-bold text-primary/60 tracking-widest uppercase mb-4">我的专属邀请码</h4>
                   <p className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">DBR-2024</p>
                   <button className="w-full py-3 rounded-2xl bg-white dark:bg-white/10 text-gray-800 dark:text-white font-bold border border-gray-100 dark:border-white/10 shadow-sm">复制邀请码</button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 px-4 leading-relaxed">
                  每成功邀请一位新用户，您和好友均可获得 <span className="text-primary font-bold">7天专业版会员</span> 体验卡。
                </p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button className="py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20">微信好友</button>
                  <button className="py-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold">分享海报</button>
                </div>
              </div>
            )}

            {/* Change Password Modal Content */}
            {activeModal === 'password' && (
              <div className="flex flex-col gap-5 pb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">当前密码</label>
                  <input type="password" placeholder="请输入当前密码" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white focus:ring-primary focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">新密码</label>
                  <input type="password" placeholder="请输入新密码" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white focus:ring-primary focus:border-primary" />
                </div>
                <div className="flex flex-col gap-1.5 mb-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">确认新密码</label>
                  <input type="password" placeholder="请再次输入新密码" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white focus:ring-primary focus:border-primary" />
                </div>
                <button className="w-full py-5 rounded-[24px] bg-primary text-white font-extrabold text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all">更新密码</button>
              </div>
            )}

            {/* Privacy Policy Modal Content */}
            {activeModal === 'privacy' && (
              <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed pb-10">
                <p className="font-medium">破债者 (DebtBreaker) 致力于保护您的隐私和数据安全。我们仅收集为您提供核心功能所必需的信息。</p>
                <h4 className="font-bold text-gray-800 dark:text-white">1. 数据收集</h4>
                <p>我们收集的信息包括：账户基础信息、债务金额、还款记录以及您在社区发表的匿名动态。所有财务数据均经过高级加密存储。</p>
                <h4 className="font-bold text-gray-800 dark:text-white">2. 数据使用</h4>
                <p>数据仅用于生成您的进度报告、提供 AI 心理建议。我们绝不向任何第三方出售您的个人隐私数据。</p>
                <h4 className="font-bold text-gray-800 dark:text-white">3. 数据控制</h4>
                <p>您可以随时通过设置页面申请导出或注销账户并删除所有相关数据。</p>
              </div>
            )}

            {/* Terms of Use Modal Content */}
            {activeModal === 'terms' && (
              <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed pb-10">
                <p className="font-medium">欢迎使用破债者。通过访问或使用本应用程序，您同意遵守以下服务条款：</p>
                <h4 className="font-bold text-gray-800 dark:text-white">1. 账户义务</h4>
                <p>您应负责维护账户凭据的保密性，并对在您的账户下发生的所有活动负责。</p>
                <h4 className="font-bold text-gray-800 dark:text-white">2. 社区准则</h4>
                <p>在“希望之墙”中，禁止发布违法、辱骂、仇恨言论或垃圾广告。我们保留移除此类内容的权利。</p>
                <h4 className="font-bold text-gray-800 dark:text-white">3. 免责声明</h4>
                <p>本应用提供的财务建议和 AI 回复仅供参考，不构成专业的法律或金融咨询建议。</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
