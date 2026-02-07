'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { Suspense } from 'react';
import LeafSpringInfo from './LeafSpringInfo';

export default function DroneAssemblyMode() {
  return (
    <div className="w-full h-full bg-bg-3d rounded-2xl overflow-hidden relative border border-gray-200">
      
      {/* Search/Header Overlay (Optional - currently using app subheader) */}
      
      {/* Left Slider Control */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 group">
        <div className="h-64 w-1.5 bg-gray-300 rounded-full relative">
            {/* Slider Handle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"></div>
        </div>
        <div className="absolute left-6 top-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            슬라이더를 움직여서 분해과정을 살펴보세요!
        </div>
      </div>

      {/* Top Left - Fullscreen Button */}
      <button className="absolute top-6 left-6 z-10 p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      </button>

      {/* Bottom Left - Zoom Controls */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
        </button>
      </div>

      {/* Right - Leaf Spring Info Overlay */}
      <div className="absolute top-6 right-6 z-10">
        <LeafSpringInfo />
      </div>

      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <Suspense fallback={null}>
            <OrbitControls makeDefault />
            <Environment preset="city" />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} shadow-bias={-0.0001} />
            
            <Grid 
                position={[0, -0.5, 0]} 
                args={[20, 20]} 
                cellColor="#ccc" 
                sectionColor="#bbb" 
                fadeDistance={40} 
                fadeStrength={1}
                infiniteGrid
            />

            {/* Placeholder for the actual Leaf Spring Model */}
            <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
                <boxGeometry args={[3, 0.5, 1]} />
                <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
            </mesh>
            
        </Suspense>
      </Canvas>
    </div>
  );
}

