'use client';

import { Center, OrbitControls, Resize, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Component, ReactNode, Suspense } from 'react';

interface ComponentPreviewProps {
  modelUrl: string;
}

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Model({ url }: { url: string }) {
  // Use proxy API to bypass CORS
  const proxiedUrl = `/api/proxy-model?url=${encodeURIComponent(url)}`;
  const { scene } = useGLTF(proxiedUrl);
  return <primitive object={scene} />;
}

export default function ComponentPreview({ modelUrl }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full bg-[#f0f0f0] rounded-[4px] overflow-hidden">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [0, 2, 10] }}>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Resize scale={6}>
              <Center>
                <Model url={modelUrl} />
              </Center>
            </Resize>
          </Suspense>
        </ErrorBoundary>
        <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
