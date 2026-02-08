'use client';

import { useObjectDetail } from '@/features/3d-viewer/api/use3DViewer';
import { IComponent } from '@/features/3d-viewer/types';
import { useState, useEffect } from 'react';

interface InfoModalProps {
  objectId: number;
  onClose?: () => void;
  selectedPartName?: string | null;
}

export default function InfoModal({
  objectId,
  onClose,
  selectedPartName,
}: InfoModalProps) {
  const [activeTab, setActiveTab] = useState<'product' | 'detail'>('product');
  const [selectedComponent, setSelectedComponent] = useState<IComponent | null>(null);

  const { objectDetail, isLoading, error, fetchObjectDetail } = useObjectDetail();
  console.log(objectDetail);

  useEffect(() => {
    if (objectId) {
      fetchObjectDetail(objectId);
    }
  }, [objectId]);

  // 부품 선택 시 detail 탭으로 전환
  const handleComponentClick = (component: IComponent) => {
    setSelectedComponent(component);
    setActiveTab('detail');
  };

  // 완제품 탭 클릭 시 선택된 부품 초기화
  const handleProductTabClick = () => {
    setActiveTab('product');
    setSelectedComponent(null);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] w-[320px] h-full px-5 py-6 flex items-center justify-center">
        <p className="text-[#666666]">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] w-[320px] h-full px-5 py-6 flex items-center justify-center">
        <p className="text-red-500">오류가 발생했습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] w-[320px] h-full px-5 py-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-[18px] text-[#111111] leading-tight flex items-center gap-1">
            {activeTab === 'product'
              ? `${objectDetail?.name || ''} (${objectDetail?.nameEn || ''})`
              : selectedComponent?.name || selectedPartName || '부품 상세'}
          </h2>
          <p className="text-[#666666] text-[13px] font-normal leading-relaxed">
            {activeTab === 'product'
              ? objectDetail?.description || ''
              : selectedComponent?.role || '선택된 부품의 상세 설명입니다.'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[#999999] hover:text-[#333333] transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Tags (Chip Buttons) */}
      <div className="flex gap-2">
        <button
          onClick={handleProductTabClick}
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
      <div className="space-y-4 mt-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-2">
        {activeTab === 'product' ? (
          <>
            {/* 이론 섹션 */}
            <div className="space-y-2">
              <h3 className="font-bold text-[16px] text-[#222222]">이론</h3>
              <p className="text-[14px] text-[#444444] leading-[1.6]">
                {objectDetail?.theory || ''}
              </p>
            </div>

            {/* 부품 목록 섹션 */}
            <div className="space-y-2 mt-4">
              <h3 className="font-bold text-[16px] text-[#222222]">구성 부품</h3>
              <div className="space-y-2">
                {objectDetail?.components?.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => handleComponentClick(component)}
                    className="w-full text-left p-3 bg-[#F8F9FA] rounded-lg hover:bg-[#EBF1FF] transition-colors border border-transparent hover:border-[#4880FF]/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[14px] font-medium text-[#333333]">
                          {component.name}
                        </p>
                        <p className="text-[12px] text-[#666666]">
                          {component.nameEn}
                        </p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 부품 상세 정보 */}
            {selectedComponent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-[16px] text-[#222222]">부품 정보</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[13px] text-[#666666] min-w-[60px]">영문명</span>
                      <span className="text-[14px] text-[#333333]">
                        {selectedComponent.nameEn}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[13px] text-[#666666] min-w-[60px]">재질</span>
                      <span className="text-[14px] text-[#333333]">
                        {selectedComponent.material}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[13px] text-[#666666] min-w-[60px]">역할</span>
                      <span className="text-[14px] text-[#333333] leading-relaxed">
                        {selectedComponent.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-[#666666] text-[14px]">
                좌측 목록에서 부품을 선택해주세요
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
