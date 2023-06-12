import { useLoader } from '@react-three/fiber';
import { ImageTracker, ZapparCamera, ZapparCanvas } from '@zappar/zappar-react-three-fiber';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export function App() {
  const [rotation, setRotation] = useState([5, 0, 3]);
  const mtl = useLoader(MTLLoader, '/models/circuit.mtl');
  const obj = useLoader(OBJLoader, '/models/circuit.obj', (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  const [visible, setVisible] = useState(false);
  const [mirrored, setMirrored] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // setRotation((prev) => [0, prev[1] + 0.02, 0]);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className='relative w-screen h-screen'>
      <div className='absolute top-0 left-0 z-50 p-1 bg-white'>
        <input
          id='mirrored'
          type='checkbox'
          checked={mirrored}
          onChange={(e) => setMirrored(e.target.checked)}
        />
        <label htmlFor='mirrored'>Mirrored?</label>
        <input
          type='range'
          name='x'
          id='x'
          min={0}
          max={10}
          step={0.01}
          value={rotation[0]}
          onChange={(e) => setRotation((prev) => [+e.target.value, prev[1], prev[2]])}
        />
        <label htmlFor='x'>X: {rotation[0]}</label>
        <input
          type='range'
          name='y'
          id='y'
          min={0}
          max={10}
          step={0.01}
          value={rotation[1]}
          onChange={(e) => setRotation((prev) => [prev[0], +e.target.value, prev[2]])}
        />
        <label htmlFor='y'>Y: {rotation[1]}</label>
        <input
          type='range'
          name='z'
          id='z'
          min={0}
          max={10}
          step={0.01}
          value={rotation[2]}
          onChange={(e) => setRotation((prev) => [prev[0], prev[1], +e.target.value])}
        />
        <label htmlFor='z'>Z: {rotation[2]}</label>
      </div>
      <div className={twJoin('w-full h-full', mirrored && '-scale-x-100')}>
        <ZapparCanvas>
          <ZapparCamera />
          <directionalLight position={[0, 10, 10]} />
          <ImageTracker
            targetImage='/images/circuit.zpt'
            onVisible={() => setVisible(true)}
            onNotVisible={() => setVisible(false)}
            onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
          >
            {visible && (
              <primitive
                object={obj}
                scale={[0.12, 0.12, 0.12]}
                position={[-0.5, -0.5, 0]}
                rotation={rotation}
              />
            )}
          </ImageTracker>
        </ZapparCanvas>
      </div>
    </main>
  );
}
