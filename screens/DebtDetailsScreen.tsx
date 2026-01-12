
import React, { useState } from 'react';
import { DebtInstitution } from '../types';

interface DebtDetailsScreenProps {
  debts: DebtInstitution[];
  onUpdateDebts?: (updated: DebtInstitution[]) => void;
  onBack: () => void;
}

const DebtDetailsScreen: React.FC<DebtDetailsScreenProps> = ({ debts, onUpdateDebts, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<DebtInstitution | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formTotal, setFormTotal] = useState('');
  const [formPaid, setFormPaid] = useState('');
  const [formType, setFormType] = useState<'bank' | 'fintech' | 'personal'>('bank');

  const totalDebt = debts.reduce((sum, d) => sum + d.total, 0);
  const totalPaid = debts.reduce((sum, d) => sum + d.paid, 0);
  const totalRemaining = totalDebt - totalPaid;

  const openAddModal = () => {
    setEditingDebt(null);
    setFormName('');
    setFormTotal('');
    setFormPaid('');
    setFormType('bank');
    setIsModalOpen(true);
  };

  const openEditModal = (debt: DebtInstitution) => {
    setEditingDebt(debt);
    setFormName(debt.name);
    setFormTotal(debt.total.toString());
    setFormPaid(debt.paid.toString());
    setFormType(debt.type);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const totalVal = parseFloat(formTotal) || 0;
    const paidVal = parseFloat(formPaid) || 0;
    
    const newDebtData: DebtInstitution = {
      id: editingDebt ? editingDebt.id : Date.now().toString(),
      name: formName || '未命名机构',
      total: totalVal,
      paid: paidVal,
      remaining: Math.max(0, totalVal - paidVal),
      percentage: 0, // Will be calculated globally
      type: formType
    };

    let updatedList: DebtInstitution[];
    if (editingDebt) {
      updatedList = debts.map(d => d.id === editingDebt.id ? newDebtData : d);
    } else {
      updatedList = [...debts, newDebtData];
    }

    // Re-calculate percentages based on total volume
    const newGlobalTotal = updatedList.reduce((sum, d) => sum + d.total, 0);
    updatedList = updatedList.map(d => ({
      ...d,
      percentage: newGlobalTotal > 0 ? Math.round((d.total / newGlobalTotal) * 100) : 0
    }));

    onUpdateDebts?.(updatedList);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!editingDebt) return;
    const updatedList = debts.filter(d => d.id !== editingDebt.id);
    
    // Re-calculate percentages
    const newGlobalTotal = updatedList.reduce((sum, d) => sum + d.total, 0);
    const finalizedList = updatedList.map(d => ({
      ...d,
      percentage: newGlobalTotal > 0 ? Math.round((d.total / newGlobalTotal) * 100) : 0
    }));

    onUpdateDebts?.(finalizedList);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="flex items-center justify-between p-4 sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-800 dark:text-white active:bg-gray-100 dark:active:bg-white/10">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">债务结构分析</h2>
        <div className="flex items-center gap-1">
          <button onClick={openAddModal} className="w-10 h-10 rounded-full flex items-center justify-center text-primary active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-2xl font-bold">add</span>
          </button>
          <button 
            onClick={() => setIsAnalyticsOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-800 dark:text-white active:bg-gray-100 dark:active:bg-white/10"
          >
            <span className="material-symbols-outlined">analytics</span>
          </button>
        </div>
      </header>

      <div className="px-6 py-4 flex flex-col gap-8 pb-32">
        {/* Overall Summary Card */}
        <div className="bg-gradient-to-br from-[#1c232d] to-[#12161b] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
          {/* Decorative Glow from screenshot */}
          <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-primary/20 rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />
          
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 mb-1">当前总负债剩余</p>
          <h3 className="text-4xl font-black mb-6">¥{totalRemaining.toLocaleString()}</h3>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] uppercase font-bold opacity-30 mb-1">已还总额</p>
              <p className="text-lg font-bold text-primary">¥{totalPaid.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold opacity-30 mb-1">初始总额</p>
              <p className="text-lg font-bold">¥{totalDebt.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-8 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-primary transition-all duration-1000" 
               style={{ width: `${totalDebt > 0 ? (totalPaid / totalDebt) * 100 : 0}%` }}
             />
          </div>
        </div>

        {/* Institution List */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">债务机构明细</h4>
          <div className="flex flex-col gap-4">
            {debts.length > 0 ? (
              debts.map((debt) => (
                <button 
                  key={debt.id}
                  onClick={() => openEditModal(debt)}
                  className="bg-white dark:bg-panel-dark border border-gray-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm flex flex-col gap-4 text-left group active:scale-[0.98] transition-all hover:border-primary/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-800 dark:text-white group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">
                          {debt.type === 'bank' ? 'account_balance' : debt.type === 'fintech' ? 'wallet' : 'person'}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-bold dark:text-white">{debt.name}</h5>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">份额: {debt.percentage}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black dark:text-white">剩余 ¥{debt.remaining.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-primary">已还 ¥{debt.paid.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[10px] font-bold opacity-40 uppercase tracking-tighter">
                        <span>已清 {debt.total > 0 ? Math.round((debt.paid/debt.total)*100) : 0}%</span>
                        <span>总计 ¥{debt.total.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000" 
                          style={{ width: `${debt.total > 0 ? (debt.paid / debt.total) * 100 : 0}%` }}
                        />
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400 opacity-40 italic">
                <span className="material-symbols-outlined text-4xl mb-2">playlist_add</span>
                <p className="text-sm">暂无债务明细，点击 + 开始理清</p>
              </div>
            )}
          </div>
        </div>

        <div className="py-8 text-center px-8">
           <p className="text-xs text-gray-400 leading-relaxed italic">
             “理清头绪是解决问题的第一步。你已经在路上了，保持专注。”
           </p>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-[480px] bg-white dark:bg-panel-dark rounded-t-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold dark:text-white">{editingDebt ? '编辑债务明细' : '添加新债务'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">机构名称</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="如：南京银行、招行信用卡..."
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">总金额 (¥)</label>
                  <input 
                    type="number" 
                    value={formTotal}
                    onChange={(e) => setFormTotal(e.target.value)}
                    placeholder="0"
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">已还金额 (¥)</label>
                  <input 
                    type="number" 
                    value={formPaid}
                    onChange={(e) => setFormPaid(e.target.value)}
                    placeholder="0"
                    className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">机构类型</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['bank', 'fintech', 'personal'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormType(t)}
                      className={`py-3 rounded-2xl font-bold border-2 transition-all text-xs flex flex-col items-center gap-1 ${
                        formType === t 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-gray-400'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {t === 'bank' ? 'account_balance' : t === 'fintech' ? 'wallet' : 'person'}
                      </span>
                      {t === 'bank' ? '银行' : t === 'fintech' ? '金融' : '个人'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <button 
                  onClick={handleSave}
                  className="w-full py-5 rounded-[24px] bg-primary text-black font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all"
                >
                  保存设置
                </button>
                {editingDebt && (
                  <button 
                    onClick={handleDelete}
                    className="w-full py-4 text-danger font-bold opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    删除此明细
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {isAnalyticsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-300 p-6">
          <div className="w-full max-w-[420px] bg-[#1a1f26] border border-white/10 rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white">债务占比洞察</h3>
              <button 
                onClick={() => setIsAnalyticsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 active:scale-90"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {/* Distribution Bar */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">分布比例</p>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex">
                  {debts.map((debt, idx) => (
                    <div 
                      key={debt.id}
                      className={`h-full transition-all duration-1000 ${
                        idx % 3 === 0 ? 'bg-primary' : idx % 3 === 1 ? 'bg-blue-400' : 'bg-purple-400'
                      }`}
                      style={{ width: `${debt.percentage}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="flex flex-col gap-4">
                 {debts.map((debt, idx) => (
                   <div key={debt.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          idx % 3 === 0 ? 'bg-primary' : idx % 3 === 1 ? 'bg-blue-400' : 'bg-purple-400'
                        }`} />
                        <span className="text-sm font-bold text-white">{debt.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-white">{debt.percentage}%</p>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">¥{debt.total.toLocaleString()}</p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Quick Summary Insight */}
              <div className="bg-primary/10 border border-primary/20 p-5 rounded-3xl flex items-start gap-4">
                 <span className="material-symbols-outlined text-primary text-xl">tips_and_updates</span>
                 <p className="text-xs text-primary font-medium leading-relaxed">
                   您的最高债务项是 <span className="font-bold">“{debts.reduce((prev, current) => (prev.total > current.total) ? prev : current, debts[0] || {name: 'N/A'}).name}”</span>，占总债务的 <span className="font-bold">{debts.reduce((max, d) => Math.max(max, d.percentage), 0)}%</span>。建议优先制定针对性还款计划。
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebtDetailsScreen;
