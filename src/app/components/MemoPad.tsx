'use client';

import { useState } from 'react';

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
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between bg-white border-b border-[#F5F5F5]">
        <h3 className="font-bold text-[18px] text-[#111111]">메모</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 pl-3 pr-2 py-1.5 rounded-full border border-[#4880FF] text-[#4880FF] text-[13px] font-semibold bg-white hover:bg-blue-50 transition-colors"
        >
          추가하기
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* Content Area - Vertical List */}
      <div className="flex-1 w-full overflow-y-auto px-5 py-4 bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="flex flex-col gap-3">
          
          {/* Input Card */}
          {isAdding && (
            <div className="w-full bg-white border-2 border-[#4880FF] rounded-[8px] p-3 flex flex-col shadow-sm">
              <textarea
                autoFocus
                value={newMemoText}
                onChange={(e) => setNewMemoText(e.target.value)}
                placeholder="내용을 입력하세요"
                className="w-full h-[60px] resize-none border-none focus:ring-0 text-[14px] leading-relaxed p-0 placeholder-gray-400"
              />
              <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-gray-500 hover:text-gray-800"
                >
                  취소
                </button>
                <button
                  onClick={handleAddMemo}
                  className="text-xs bg-[#4880FF] text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  저장
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {memos.length === 0 && !isAdding && (
             <div className="w-full h-[100px] bg-[#F5F8FF] rounded-[8px] flex flex-col items-center justify-center text-center border border-[#EBF1FF]">
                <p className="text-gray-400 text-sm">
                    학습중인 내용을<br/>자유롭게 메모해보세요
                </p>
             </div>
          )}

          {/* Memo Cards */}
          {memos.map((memo, index) => (
            <div
              key={index}
              className="w-full bg-[#E8F3FF] rounded-[8px] p-3 relative group hover:shadow-md transition-shadow border border-transparent hover:border-[#4880FF]/30"
            >
              <button
                onClick={() => {
                  const newMemos = memos.filter((_, i) => i !== index);
                  setMemos(newMemos);
                }}
                className="absolute top-2 right-2 text-[#8FB6FF] hover:text-[#4880FF] p-1 opacity-0 group-hover:opacity-100 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <p className="text-[#333333] text-[14px] leading-relaxed whitespace-pre-wrap font-medium pr-6">
                {memo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
