
import React, { useState } from 'react';
import { Victory, DebtInstitution } from '../types';

interface RepaymentScreenProps {
  debts: DebtInstitution[];
  onComplete: (victory: Victory) => void;
  onCancel: () => void;
  onNavigateToDebts: () => void;
}

const RepaymentScreen: React.FC<RepaymentScreenProps> = ({ debts, onComplete, onCancel, onNavigateToDebts }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'credit' | 'loan'>('credit');
  const [selectedDebtId, setSelectedDebtId] = useState<string>('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !title) return;

    const newVictory: Victory = {
      id: Date.now().toString(),
      title: title,
      amount: `¥${parseFloat(amount).toLocaleString()}`,
      date: '刚刚',
      type: category,
      status: '已完成'
    };

    onComplete(newVictory);
  };

  const handleSelectDebt = (debt: DebtInstitution) => {
    setSelectedDebtId(debt.id);
    setTitle(debt.name);
    // Auto switch category based on institution type if applicable
    if (debt.type === 'bank') setCategory('credit');
    else if (debt.type === 'fintech' || debt.type === 'personal') setCategory('loan');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display px-6 pt-4 pb-20">
      <header className="flex items-center justify-between py-2 mb-8">
        <button onClick={onCancel} className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back_ios</button>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">还一笔</h2>
        <div className="w-6" />
      </header>

      <div className="flex-1 flex flex-col gap-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em] mb-2">本次还款金额</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-primary">¥</span>
            <input 
              autoFocus
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-5xl font-black bg-transparent border-none text-gray-800 dark:text-white focus:ring-0 w-full max-w-[200px] text-center placeholder:text-gray-100 dark:placeholder:text-white/5"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">选择还款机构</label>
            
            {debts.length === 0 ? (
              <div className="flex flex-col items-center gap-4 p-8 rounded-[32px] bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 text-center">
                <span className="material-symbols-outlined text-4xl text-gray-300">account_balance</span>
                <p className="text-sm text-gray-400">您还没有添加任何债务机构</p>
                <button 
                  type="button"
                  onClick={onNavigateToDebts}
                  className="px-6 py-2.5 bg-primary/10 text-primary rounded-full text-xs font-bold active:scale-95 transition-transform"
                >
                  前往添加机构
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {debts.map((debt) => (
                  <button
                    key={debt.id}
                    type="button"
                    onClick={() => handleSelectDebt(debt)}
                    className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all border-2 flex items-center gap-2 ${
                      selectedDebtId === debt.id 
                        ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10' 
                        : 'border-gray-100 dark:border-white/5 bg-white dark:bg-panel-dark text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {debt.type === 'bank' ? 'account_balance' : 'wallet'}
                    </span>
                    {debt.name}
                  </button>
                ))}
                <button 
                  type="button"
                  onClick={onNavigateToDebts}
                  className="px-5 py-3 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 text-gray-300 flex items-center gap-2 hover:border-primary/40 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  <span className="text-sm font-bold">管理机构</span>
                </button>
              </div>
            )}
            {selectedDebtId && (
              <p className="text-[10px] text-primary font-bold ml-1 animate-in fade-in slide-in-from-left duration-300">
                已选中：{title}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">还款类型</label>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setCategory('credit')}
                className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                  category === 'credit' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-white/5 bg-white dark:bg-panel-dark text-gray-400'
                }`}
              >
                <span className="material-symbols-outlined">credit_card</span>
                信用卡
              </button>
              <button 
                type="button"
                onClick={() => setCategory('loan')}
                className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                  category === 'loan' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-white/5 bg-white dark:bg-panel-dark text-gray-400'
                }`}
              >
                <span className="material-symbols-outlined">payments</span>
                贷款
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
             <button 
              type="submit"
              disabled={!amount || !selectedDebtId}
              className={`w-full py-5 rounded-[24px] font-black text-xl shadow-xl transition-all active:scale-[0.98] ${
                amount && selectedDebtId ? 'bg-primary text-black shadow-primary/30' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              确认并记录
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              返回
            </button>
          </div>
        </form>
      </div>

      <div className="py-10 text-center opacity-30 mt-auto">
        <span className="material-symbols-outlined text-4xl mb-2">verified_user</span>
        <p className="text-xs">每一笔记录都将永久为您加密存储</p>
      </div>
    </div>
  );
};

export default RepaymentScreen;
