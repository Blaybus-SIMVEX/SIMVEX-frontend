'use client';

import { Environment, Grid, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

export default function DroneAssemblyMode() {
  const [assemblyStep, setAssemblyStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);

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
    <div className="w-full h-full bg-[#DDE2E8] rounded-[20px] overflow-hidden relative">
      {/* 3D Scene */}
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <color attach="background" args={['#DDE2E8']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />

        {/* Placeholder Mesh */}
        <mesh position={[0, 0, 0]} scale={assemblyStep * 0.1 + 1}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={assemblyStep > 5 ? 'orange' : 'royalblue'} />
        </mesh>

        <Grid
          position={[0, -0.5, 0]}
          args={[20, 20]}
          cellSize={1}
          cellThickness={1}
          cellColor="#ffffff"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#ffffff"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
        />

        <OrbitControls makeDefault />
      </Canvas>

      {/* Left Control Panel */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-full py-5 px-2 gap-5 shadow-lg">
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors text-[#333333]"
          title="전체화면"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 21H3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Vertical Slider */}
        <div className="relative h-[200px] w-full flex justify-center">
          {/* Track */}
          <div className="absolute h-full w-[16px] bg-[#E0E0E0] rounded-full"></div>

          {/* Ticks */}
          <div className="absolute flex flex-col justify-between h-[85%] top-[7.5%] pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-[2px] bg-white/80"></div>
            ))}
          </div>

          {/* Input Range */}
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            // @ts-expect-error - orient is valid for range input
            orient="vertical"
            value={assemblyStep}
            onChange={(e) => {
              setAssemblyStep(Number(e.target.value));
              setShowTooltip(false);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            style={{ WebkitAppearance: 'slider-vertical' }}
          />

          {/* Thumb */}
          <div
            className="absolute w-[24px] h-[44px] bg-[#222222] rounded-full shadow-lg z-10 pointer-events-none transition-all flex flex-col items-center justify-center gap-[3px]"
            style={{
              bottom: `calc(${(assemblyStep / 10) * 100}% - 22px)`,
            }}
          >
            <div className="w-2.5 h-[2px] bg-white/90 rounded-full"></div>
            <div className="w-2.5 h-[2px] bg-white/90 rounded-full"></div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-col gap-2 items-center">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors text-[#333333]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors text-[#333333]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-[72px] top-1/2 -translate-y-1/2 bg-[#222222] text-white text-[13px] px-4 py-3 rounded-[12px] shadow-xl pointer-events-none leading-[1.5]">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-[#222222] border-b-[6px] border-b-transparent"></div>
          슬라이더를 움직여서
          <br />
          분해과정을 살펴보세요!
        </div>
      )}
    </div>
  );
}
