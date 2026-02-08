'use client';

import ThreeDViewer from '@/app/components/3DViewer';
import AIAssistant from '@/app/components/AIAssistant';
import MemoPad from '@/app/components/MemoPad';
import InfoModal from '@/app/components/InfoModal';
import { useObjectDetail } from '@/features/3d-viewer/api/use3DViewer';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

export default function StudyDetail() {
  const params = useParams();
  const router = useRouter();
  const objectId = Number(params.detail);

  // 세션 ID 생성 (브라우저 세션 동안 유지)
  const sessionId = useMemo(() => {
    if (typeof window === 'undefined') return '';
    let id = sessionStorage.getItem('simvex-session-id');
    if (!id) {
      id = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('simvex-session-id', id);
    }
    return id;
  }, []);

  const [selectedPartName, setSelectedPartName] = useState<string | null>(null);
  const { objectDetail, isLoading, error, fetchObjectDetail } = useObjectDetail();

  useEffect(() => {
    if (objectId) {
      fetchObjectDetail(objectId);
    }
  }, [objectId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] bg-[#F5F5F5]">
        <div className="text-[#666666]">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] bg-[#F5F5F5]">
        <div className="text-red-500">오류가 발생했습니다: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] bg-[#F5F5F5] px-10 pt-8 pb-6 gap-4">

      {/* Header Area */}
      <div className="flex items-center gap-3 h-16 shrink-0">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-[#E5E5E5] text-[#333333] shadow-sm hover:bg-gray-50 transition-colors"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </button>

        {/* Title & Tags */}
        <div className="flex items-center gap-2">
            <h1 className="text-[32px] font-bold text-[#111111]">
                {objectDetail?.name || '학습 콘텐츠'}
            </h1>
            <div className="flex gap-[10px]">
                <span className="px-2.5 py-1 bg-[#E8F3FF] text-[#0066FF] text-[12px] font-semibold rounded-[4px]">
                    학습중
                </span>
                {objectDetail?.categories?.map((category, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-[#F5F5F5] text-[#666666] text-[12px] font-medium rounded-[4px] border border-[#E5E5E5]"
                  >
                    {category}
                  </span>
                ))}
            </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 w-full gap-4 overflow-hidden">
        {/* Main Content - 3D Viewer (Fluid width) */}
        <div className="flex-1 h-full relative border border-[#ECECEC] rounded-lg overflow-hidden shadow-sm bg-white">
          <ThreeDViewer
            modelType={'engine'}
            selectedPart={null}
            onSelectPart={(partName) => setSelectedPartName(partName)}
          />

          {/* Info Panel - Floating over 3D Viewer (Right side) */}
          {/* {selectedPartName && ( */}
             <div className="absolute top-4 right-4 bottom-4 z-20 animate-slide-in-right">
                <InfoModal
                    objectId={objectId}
                    onClose={() => setSelectedPartName(null)}
                    selectedPartName={selectedPartName}
                />
             </div>
          {/* )} */}
        </div>

        {/* Sidebar - AI & Memo (Fixed 384px) */}
        <div className="w-[384px] min-w-[384px] h-full flex flex-col gap-4 shrink-0">
           {/* AI Assistant - Fixed Height 414px */}
           <div className="h-[414px] shrink-0">
               <AIAssistant objectId={objectId} />
           </div>

           {/* Memo Pad - Fixed Height 200px (Remaining space) */}
           <div className="h-[200px] shrink-0">
              <MemoPad objectId={objectId} sessionId={sessionId} />
           </div>
        </div>
      </div>
    </div>
  );
}
