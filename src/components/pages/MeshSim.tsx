import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { AiOutlineControl } from 'react-icons/ai';
import { cn } from '../../utils/cn';
import { ButtonInput } from '../ui/ButtonInput';
import { ValueLabel } from '../ui/ValueLabel';

export function MeshSim() {
  const [showControls, setShowControls] = useState(false);

  return (
    <main className='relative w-screen h-screen'>
      <div className='absolute z-50 top-5 left-5'>
        <button
          onClick={() => setShowControls((p) => !p)}
          className={cn(
            'p-1 border-2 border-black rounded-md transition-colors',
            showControls && 'bg-green-300'
          )}
        >
          <AiOutlineControl className='fill-black' size={28} />
        </button>
      </div>
      <Canvas>
        <ambientLight />
        <OrbitControls />
        <color attach='background' args={['gray']} />
        <pointLight position={[10, 10, 10]} />
        <Model url='/models/mesh.glb' showControls={showControls} />
      </Canvas>
    </main>
  );
}

function Model({ url, showControls }: { url: string; showControls: boolean }) {
  const { scene } = useGLTF(url);

  const [resistance1, setResistance1] = useState(0);
  const [resistance2, setResistance2] = useState(0);
  const [resistance3, setResistance3] = useState(0);
  const [voltage1, setVoltage1] = useState(0);
  const [voltage2, setVoltage2] = useState(0);
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const values = { resistance1, resistance2, resistance3, voltage1, voltage2, current1, current2 };

  const setters = {
    resistance1: setResistance1,
    resistance2: setResistance2,
    resistance3: setResistance3,
    voltage1: setVoltage1,
    voltage2: setVoltage2,
    current1: setCurrent1,
    current2: setCurrent2,
  };

  useEffect(() => {
    const i1 =
      (resistance2 * voltage1 + resistance3 * voltage1 - resistance3 * voltage2) /
      (resistance1 * resistance2 + resistance2 * resistance3 + resistance1 * resistance3);
    setCurrent1(i1);
    const i2 = (resistance1 * i1 + resistance3 * i1 - voltage1) / resistance3;
    setCurrent2(i2);
  }, [voltage1, voltage2, resistance1, resistance2, resistance3]);

  const keys = Object.keys(values);
  const annotations: React.ReactNode[] = [];
  if (showControls) {
    scene.traverse((child) => {
      if (keys.includes(child.name)) {
        const prop = child.name as keyof typeof values;

        annotations.push(
          <Html
            key={child.uuid}
            distanceFactor={1}
            position={[child.position.x, child.position.y, child.position.z]}
          >
            {['current1', 'current2'].includes(prop) ? (
              <>
                <ValueLabel label={isNaN(values[prop]) ? '♾️' : `${values[prop].toFixed(2)} A`} />
                <img
                  src='/images/arrow.png'
                  alt='arrow'
                  className={cn('transform -z-50 mt-24 scale-[200%]')}
                />
              </>
            ) : (
              ['resistance1', 'resistance2', 'resistance3', 'voltage1', 'voltage2'].includes(
                prop
              ) && (
                <ButtonInput
                  label={values[prop] + (prop.startsWith('voltage') ? ' V' : ' Ω')}
                  onIncrement={() => setters[prop](values[prop] + 1)}
                  onDecrement={() => setters[prop](values[prop] - 1)}
                />
              )
            )}
          </Html>
        );
      }
    });
  }

  return (
    <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {showControls && annotations}
    </primitive>
  );
}
