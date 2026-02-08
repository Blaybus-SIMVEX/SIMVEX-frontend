'use client';

import { DroneAssembly } from '@/app/components/DroneAssembly';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import LeafSpringInfo from './LeafSpringInfo';

interface SelectedPartInfo {
  partName: string;
  displayName: string;
}

type ModelType = 'engine' | 'drone';

interface ThreeDViewerProps {
  modelType: ModelType;
  selectedPart: SelectedPartInfo | null;
  onSelectPart: (partName: string | null, displayName: string | null) => void;
}

export default function ThreeDViewer({
  modelType,
  selectedPart,
  onSelectPart,
}: ThreeDViewerProps) {
  const [assemblyStep, setAssemblyStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  // Show tooltip initially after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowTooltip(true);
    }, 500); // 0.5s delay
    return () => clearTimeout(timer);
  }, []);

  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-[#BCCCDC] overflow-hidden group">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }} className="w-full h-full">
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera={false}>
              <DroneAssembly onSelectPart={onSelectPart} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>

      {/* Left UI Controls - Separated */}

      {/* 1. Fullscreen Button (Top Left) */}
      <div className="absolute left-6 top-6 z-10">
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors text-[#333333]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>

      {/* 2. Assembly Slider (Center Left) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
        <div 
            className="relative h-[460px] w-12 flex justify-center items-center"
        >
             {/* Track */}
             <div className="absolute h-full w-[8px] bg-[#ECECEC] rounded-full shadow-inner"></div>
             
             {/* Ticks */}
             <div className="absolute flex flex-col justify-between h-[85%] top-[7.5%] pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-[2px] bg-white/80"></div>
                ))}
            </div>

             {/* Slider Input */}
             <input
              type="range"
              min="0"
              max="10"
              step="1"
              // @ts-expect-error - orient is a valid attribute for range inputs in some browsers but not in React types
              orient="vertical"
              value={assemblyStep}
              onChange={(e) => {
                setAssemblyStep(Number(e.target.value));
                if (showTooltip) setShowTooltip(false); // Hide tooltip on interaction
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              style={{ WebkitAppearance: 'slider-vertical' }}
            />

            {/* Custom Thumb handle - Pill Shape */}
            <div 
                className="absolute w-[20px] h-[31px] bg-[#222222] rounded-full shadow-lg z-10 pointer-events-none transition-all flex flex-col items-center justify-center gap-[3px]"
                style={{ bottom: `calc(${(assemblyStep / 10) * 100}% - 15.5px)` }}
            >
                <div className="w-2.5 h-[2px] bg-white/90 rounded-full"></div>
                <div className="w-2.5 h-[2px] bg-white/90 rounded-full"></div>
            </div>

            {/* Tooltip - Shows initially, hides on interaction */}
            {showTooltip && (
                <div className="absolute left-[44px] top-1/2 -translate-y-1/2 bg-[#222222] text-white text-[13px] px-4 py-3 rounded-[12px] shadow-xl pointer-events-none leading-[1.5] z-30 whitespace-nowrap animate-fade-in">
                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-[#222222] border-b-[6px] border-b-transparent"></div>
                    슬라이더를 움직여서<br/>분해과정을 살펴보세요!
                </div>
            )}
        </div>
      </div>

      {/* 3. Zoom Controls (Bottom Left) */}
      <div className="absolute left-6 bottom-6 z-10 flex flex-col gap-2">
            <button className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors text-[#333333]">
                {/* Plus Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5V19M5 12H19"/>
                </svg>
            </button>
            <button className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors text-[#333333]">
                {/* Minus Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12H19"/>
                </svg>
            </button>
      </div>



      {/* Right Info Panel - Full Height Drawer */}
      {showInfoPanel && (
        <div className="absolute top-0 right-0 bottom-0 z-20 shadow-xl animate-slide-in-right">
          <LeafSpringInfo onClose={() => setShowInfoPanel(false)} />
        </div>
      )}
    </div>
  );
}
