import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { AiOutlineControl } from 'react-icons/ai';
import { cn } from '../../utils/cn';

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
        {/* <Sky /> */}
        <color attach='background' args={['gray']} />
        <pointLight position={[10, 10, 10]} />
        <Model url='/models/mesh.glb' showControls={showControls} />
      </Canvas>
    </main>
  );
}

function Model({ url, showControls }: { url: string; showControls: boolean }) {
  const { scene } = useGLTF(url);

  // // TODO: make the values global for a model
  // const [voltage, setVoltage] = useState(0);
  // const [resistance, setResistance] = useState(0);
  // const [current, setCurrent] = useState(0);
  // const values = { voltage, resistance, current };

  // const setters = {
  //   voltage: setVoltage,
  //   resistance: setResistance,
  //   current: setCurrent,
  // };

  // useEffect(() => {
  //   setCurrent(voltage / resistance);
  // }, [voltage, resistance]);

  // const keys = Object.keys(values);
  // const annotations: React.ReactNode[] = [];
  // if (showControls) {
  //   scene.traverse((child) => {
  //     if (keys.includes(child.name)) {
  //       const prop = child.name as keyof typeof values;

  //       annotations.push(
  //         <Html
  //           key={child.uuid}
  //           distanceFactor={1}
  //           position={[child.position.x, child.position.y, child.position.z]}
  //         >
  //           {prop === 'current' ? (
  //             <div className='w-32 flex text-sm items-center justify-center transform scale-[400%] px-4 py-2 font-bold bg-white border-2 border-gray-900 rounded-full'>
  //               {values.resistance === 0 ? 'Infinity' : `${values[prop].toFixed(2)} A`}
  //             </div>
  //           ) : (
  //             <div className='flex text-xs items-center justify-center overflow-hidden transform scale-[400%] font-bold bg-white border-2 border-gray-100 rounded-full'>
  //               <button
  //                 className='flex-1 h-full px-1 text-xl text-white bg-gray-900'
  //                 onClick={() => setters[prop](values[prop] - 1)}
  //               >
  //                 -
  //               </button>
  //               <span className='flex-1 w-20 p-1'>
  //                 {values[prop] + (prop === 'voltage' ? ' V' : ' Ω')}
  //               </span>
  //               <button
  //                 className='flex-1 h-full px-1 text-xl text-white bg-gray-900'
  //                 onClick={() => setters[prop](values[prop] + 1)}
  //               >
  //                 +
  //               </button>
  //             </div>
  //           )}
  //         </Html>
  //       );
  //     }
  //   });
  // }

  return (
    <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* {showControls && annotations} */}
    </primitive>
  );
}
