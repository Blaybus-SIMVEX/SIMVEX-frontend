'use client';

// Config imports
import droneConfig from '../../../public/models/Drone/config.json';
import leafSpringConfig from '../../../public/models/Leaf Spring/config.json';
import machineViceConfig from '../../../public/models/Machine Vice/config.json';
import robotArmConfig from '../../../public/models/Robot Arm/config.json';
import robotGripperConfig from '../../../public/models/Robot Gripper/config.json';
import suspensionConfig from '../../../public/models/Suspension/config.json';
import engineConfig from '../../../public/models/V4_Engine/config.json';
import ViewerControls from './ViewerControls';
import { DynamicAssembly, ProductConfig } from '@/app/components/DynamicAssembly';
import { useComponents } from '@/features/3d-viewer/api/use3DViewer';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SelectedPartInfo {
  partName: string;
  displayName: string;
}

type ModelType = 'engine' | 'drone' | 'robot-arm' | 'robot-gripper' | 'machine-vice' | 'leaf-spring' | 'suspension';

// 모델 타입별 config 매핑
const MODEL_CONFIGS: Record<string, ProductConfig> = {
  drone: droneConfig as unknown as ProductConfig,
  engine: engineConfig as unknown as ProductConfig,
  'robot-arm': robotArmConfig as unknown as ProductConfig,
  'machine-vice': machineViceConfig as unknown as ProductConfig,
  'leaf-spring': leafSpringConfig as unknown as ProductConfig,
  'robot-gripper': robotGripperConfig as unknown as ProductConfig,
  suspension: suspensionConfig as unknown as ProductConfig,
};

interface ThreeDViewerProps {
  modelType: ModelType;
  selectedPart: SelectedPartInfo | null;
  onSelectPart: (partName: string | null, displayName: string | null) => void;
}

const ASSEMBLY_STEP_STORAGE_KEY = 'simvex-assembly-step';
const CAMERA_STATE_STORAGE_KEY = 'simvex-camera-state';

interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
}

function getInitialAssemblyStep(modelType: string): number {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem(`${ASSEMBLY_STEP_STORAGE_KEY}-${modelType}`);
  return saved ? Number(saved) : 0;
}

function getInitialCameraState(modelType: string): CameraState | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(`${CAMERA_STATE_STORAGE_KEY}-${modelType}`);
  return saved ? JSON.parse(saved) : null;
}

// 카메라 상태 저장을 위한 내부 컴포넌트
interface CameraControllerProps {
  modelType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controlsRef: React.MutableRefObject<any>;
}

function CameraController({ modelType, controlsRef }: CameraControllerProps) {
  const { camera } = useThree();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 카메라 상태 저장 (debounced)
  const saveCameraState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const orbitControls = controlsRef.current as any;
      if (orbitControls && orbitControls.target) {
        const target = orbitControls.target as THREE.Vector3;
        const state: CameraState = {
          position: [camera.position.x, camera.position.y, camera.position.z],
          target: [target.x, target.y, target.z],
        };
        localStorage.setItem(`${CAMERA_STATE_STORAGE_KEY}-${modelType}`, JSON.stringify(state));
      }
    }, 200);
  }, [camera, modelType, controlsRef]);

  // 카메라 변경 이벤트 리스너 - change 이벤트 사용 (모든 조작 감지)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controls = controlsRef.current as any;

    const attachListeners = () => {
      if (controls) {
        controls.addEventListener('change', saveCameraState);
        return true;
      }
      return false;
    };

    const tryAttach = (attempts: number) => {
      if (attempts <= 0) return;
      if (!attachListeners()) {
        setTimeout(() => tryAttach(attempts - 1), 50);
      }
    };

    tryAttach(10);

    return () => {
      if (controls) {
        controls.removeEventListener('change', saveCameraState);
      }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [controlsRef, saveCameraState]);

  return null;
}

const DEFAULT_CAMERA_POSITION: [number, number, number] = [3, 3, 3];
const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 0, 0];

export default function ThreeDViewer({ onSelectPart, modelType }: ThreeDViewerProps) {
  const [assemblyStep, setAssemblyStep] = useState(() => getInitialAssemblyStep(modelType));
  const [showTooltip, setShowTooltip] = useState(false);

  // 초기 카메라 상태
  const initialCameraState = getInitialCameraState(modelType);
  const initialCameraPosition = initialCameraState?.position || DEFAULT_CAMERA_POSITION;
  const initialCameraTarget = initialCameraState?.target || DEFAULT_CAMERA_TARGET;

  // localStorage에 assemblyStep 저장
  useEffect(() => {
    localStorage.setItem(`${ASSEMBLY_STEP_STORAGE_KEY}-${modelType}`, String(assemblyStep));
  }, [assemblyStep, modelType]);

  // 현재 모델 타입에 해당하는 config 가져오기
  const currentConfig = MODEL_CONFIGS[modelType];

  // Fetch components for the selected model (API 연동용, 현재는 config.json 기반으로 동작)
  const { components, fetchComponents } = useComponents();
  const objectId = modelType === 'drone' ? 7 : 1;

  useEffect(() => {
    if (objectId) {
      fetchComponents(objectId);
    }
  }, [objectId, fetchComponents]);

  // Actually, just checking if assemblyStep is 0 might be enough, but the user might move it back to 0.
  // Let's use a ref for the timer.

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only show if the user hasn't moved the slider yet (assemblyStep is still 0)
      // and we haven't explicitly dismissed it.
      // To be safe, we just show it. The dismissal logic handles the hiding.
      // But if I want to be strict:
      if (assemblyStep === 0) {
        setShowTooltip(true);
      }
    }, 500); // 0.5s delay
    return () => clearTimeout(timer);
  }, [assemblyStep]);

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

  // Zoom controls ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orbitControlsRef = useRef<any>(null);

  const handleZoomIn = () => {
    if (orbitControlsRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (orbitControlsRef.current as any).dollyOut(1.2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (orbitControlsRef.current as any).update();
    }
  };

  const handleZoomOut = () => {
    if (orbitControlsRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (orbitControlsRef.current as any).dollyIn(1.2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (orbitControlsRef.current as any).update();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#BCCCDC] overflow-hidden group">
      {/* 3D Canvas */}
      <Canvas camera={{ position: initialCameraPosition, fov: 45 }} className="w-full h-full">
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera={false} shadows={false}>
            {currentConfig ? (
              <DynamicAssembly
                config={currentConfig}
                onSelectPart={onSelectPart}
                components={components}
                assemblyStep={assemblyStep}
              />
            ) : (
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="gray" />
              </mesh>
            )}
          </Stage>
        </Suspense>
        <OrbitControls ref={orbitControlsRef} makeDefault target={initialCameraTarget} />
        <CameraController modelType={modelType} controlsRef={orbitControlsRef} />
      </Canvas>

      {/* Refactored Viewer Controls */}
      <ViewerControls
        assemblyStep={assemblyStep}
        onAssemblyStepChange={setAssemblyStep}
        onToggleFullscreen={toggleFullscreen}
        showTooltip={showTooltip}
        onTooltipDismiss={() => setShowTooltip(false)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </div>
  );
}
