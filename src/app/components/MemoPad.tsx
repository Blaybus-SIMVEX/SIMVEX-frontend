'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

export default function MemoPad() {
  const [memos, setMemos] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMemoText, setNewMemoText] = useState('');

  const handleAddMemo = () => {
    if (newMemoText.trim()) {
      setMemos([newMemoText, ...memos]);
      setNewMemoText('');
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
        <h3 className="font-bold text-lg text-black tracking-tight">메모</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="text-primary-600 text-sm font-bold bg-white border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-1"
        >
          추가하기 +
        </button>
      </div>

      {/* Content Area - Horizontal Scroll */}
      <div className="flex-1 w-full overflow-x-auto overflow-y-hidden p-5 bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="flex bg-white h-full gap-4 min-w-min">
          
          {/* Input Card (Visible when adding) */}
          {isAdding && (
            <div className="min-w-[240px] w-[240px] h-full bg-white border-2 border-primary-100 rounded-xl p-4 flex flex-col shadow-sm flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-200">
               <textarea
                autoFocus
                value={newMemoText}
                onChange={(e) => setNewMemoText(e.target.value)}
                placeholder="메모를 입력하세요..."
                className="flex-1 w-full resize-none border-none focus:ring-0 bg-transparent text-sm leading-relaxed p-0 placeholder-gray-400"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
                >
                  취소
                </button>
                <button 
                  onClick={handleAddMemo}
                  className="text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800"
                >
                  저장
                </button>
              </div>
            </div>
          )}

          {/* Empty State / Placeholder */}
          {memos.length === 0 && !isAdding && (
             <div className="min-w-[240px] w-[240px] h-full bg-primary-50 rounded-xl border border-transparent flex items-center justify-center p-6 text-center shadow-sm flex-shrink-0">
                <p className="text-gray-800 font-medium text-sm leading-relaxed">
                  학습중인 내용을<br/>메모해 보세요
                </p>
             </div>
          )}

          {/* Memo Cards */}
          {memos.map((memo, index) => (
            <div key={index} className="min-w-[240px] w-[240px] h-full bg-[#E8EFFF] rounded-xl border border-transparent p-5 relative shadow-sm group flex-shrink-0 flex flex-col justify-center">
              <button 
                onClick={() => {
                    const newMemos = memos.filter((_, i) => i !== index);
                    setMemos(newMemos);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="text-gray-800 text-sm leading-relaxed text-center font-medium line-clamp-6">
                {memo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
