import { Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { ImageTracker, Loader, ZapparCamera, ZapparCanvas } from '@zappar/zappar-react-three-fiber';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Input } from './components/Input';

const DEV = false;

export function App() {
  const [vec3, setVec3] = useState<[number, number, number]>([5, 0, 3]);
  const mtl = useLoader(MTLLoader, '/models/circuit.mtl');
  const obj = useLoader(OBJLoader, '/models/circuit.obj', (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  const [visible, setVisible] = useState(false);
  const [mirrored, setMirrored] = useState(false);

  const [voltage, setVoltage] = useState(0);
  const [resistance, setResistance] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(voltage / resistance);
  }, [voltage, resistance]);

  return (
    <main className='relative w-screen h-screen'>
      {DEV && (
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
            value={vec3[0]}
            onChange={(e) => setVec3((prev) => [+e.target.value, prev[1], prev[2]])}
          />
          <label htmlFor='x'>X: {vec3[0]}</label>
          <input
            type='range'
            name='y'
            id='y'
            min={0}
            max={10}
            step={0.01}
            value={vec3[1]}
            onChange={(e) => setVec3((prev) => [prev[0], +e.target.value, prev[2]])}
          />
          <label htmlFor='y'>Y: {vec3[1]}</label>
          <input
            type='range'
            name='z'
            id='z'
            min={0}
            max={10}
            step={0.01}
            value={vec3[2]}
            onChange={(e) => setVec3((prev) => [prev[0], prev[1], +e.target.value])}
          />
          <label htmlFor='z'>Z: {vec3[2]}</label>
        </div>
      )}
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
              <>
                <primitive
                  object={obj}
                  scale={[0.12, 0.12, 0.12]}
                  position={[-0.5, -0.5, 0]}
                  rotation={[5, 0, 3]}
                />
                <Html position={[1, 0, 0]}>
                  <Input
                    placeholder='Voltage'
                    label='Voltage'
                    type='number'
                    step={0.1}
                    value={voltage}
                    onChange={(e) => setVoltage(+e.target.value)}
                  />
                </Html>
                <Html position={[-0.5, 0, 0]}>
                  <Input
                    placeholder='Resistance'
                    label='Resistance'
                    type='number'
                    step={0.1}
                    value={resistance}
                    onChange={(e) => setResistance(+e.target.value)}
                  />
                </Html>
                <Html position={[-1, 1, 0]}>
                  <Input
                    placeholder='Current'
                    label='Current'
                    value={resistance === 0 ? 'Infinity' : current.toFixed(3)}
                    readOnly
                  />
                </Html>
              </>
            )}
          </ImageTracker>
          <Loader />
        </ZapparCanvas>
      </div>
    </main>
  );
}
