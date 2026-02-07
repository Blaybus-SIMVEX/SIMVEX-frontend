'use client';

import DroneAssemblyMode from '@/app/components/DroneAssemblyMode';
import AIAssistant from '@/app/components/AIAssistant';
import MemoPad from '@/app/components/MemoPad';

export default function Lab() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] bg-bg-main p-6 gap-4">
      
      {/* Sub-Header */}
      <div className="flex items-center gap-4 mb-2">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">3D 뷰어</h1>
        <div className="flex gap-2 ml-2">
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-medium">#자동차</span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-medium">#기계공학</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 w-full gap-6 overflow-hidden">
        {/* Main Content - 3D Viewer (65%) */}
        <div className="w-[65%] h-full relative">
          <DroneAssemblyMode />
        </div>

        {/* Sidebar - AI & Memo (35%) */}
        <div className="w-[35%] h-full flex flex-col gap-6">
          {/* Top - AI Chat (60% of sidebar) */}
          <div className="flex-grow-[6] h-[60%]">
            <AIAssistant />
          </div>

          {/* Bottom - Memo (40% of sidebar) */}
          <div className="flex-grow-[4] h-[40%]">
            <MemoPad />
          </div>
        </div>
      </div>
    </div>
  );
}

