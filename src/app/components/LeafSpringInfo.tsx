'use client';

import { useState } from 'react';

interface LeafSpringInfoProps {
  onClose?: () => void;
  selectedPartName?: string | null;
}

export default function LeafSpringInfo({ onClose, selectedPartName }: LeafSpringInfoProps) {
  const [activeTab, setActiveTab] = useState<'product' | 'detail'>('product');

  // Switch to detail view if a part is selected
  if (selectedPartName && activeTab !== 'detail') {
     setActiveTab('detail');
  }

  return (
    <div className="bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] w-[320px] h-full px-5 py-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
            <h2 className="font-bold text-[18px] text-[#111111] leading-tight flex items-center gap-1">
            {activeTab === 'product' ? 'Leaf Spring (판스프링)' : selectedPartName || '부품 상세'}
            </h2>
             <p className="text-[#666666] text-[13px] font-normal leading-relaxed">
                {activeTab === 'product' 
                    ? '차량 현가장치에 사용되는 판스프링 서스펜션 구조'
                    : '선택된 부품의 상세 설명입니다.'}
             </p>
        </div>
        <button 
          onClick={onClose}
          className="text-[#999999] hover:text-[#333333] transition-colors p-1 rounded-full hover:bg-gray-100"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
      </div>

      {/* Tags (Chip Buttons) */}
      <div className="flex gap-2">
        <button 
            onClick={() => setActiveTab('product')}
            className={`px-3 py-1.5 text-[13px] font-semibold rounded-[20px] border transition-all ${
                activeTab === 'product'
                ? 'bg-[#EBF1FF] text-[#4880FF] border-[#4880FF]'
                : 'bg-white text-[#666666] border-[#E5E5E5] hover:bg-gray-50'
            }`}
        >
          완제품
        </button>
        <button 
            onClick={() => setActiveTab('detail')}
            className={`px-3 py-1.5 text-[13px] font-semibold rounded-[20px] border transition-all ${
                activeTab === 'detail'
                ? 'bg-[#EBF1FF] text-[#4880FF] border-[#4880FF]'
                : 'bg-white text-[#666666] border-[#E5E5E5] hover:bg-gray-50'
            }`}
        >
          부품상세 설명
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2 mt-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-2">
        <h3 className="font-bold text-[16px] text-[#222222]">이론</h3>
        <p className="text-[14px] text-[#444444] leading-[1.6]">
          판스프링은 여러 장의 강판을 겹쳐서 만든 스프링으로, 주로 트럭이나 버스의 후륜 현가장치에 사용됩니다. 하중을 받으면 휘어지면서 충격을 흡수하고, 원래 형태로 돌아오려는 탄성력으로 차체를 지지합니다. 클램프가 판들을 묶어주고, 새클이 차체와 연결합니다.
        </p>
      </div>
    </div>
  );
}
