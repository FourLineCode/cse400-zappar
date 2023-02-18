import { useLoader } from '@react-three/fiber';
import { ImageTracker, ZapparCamera, ZapparCanvas } from '@zappar/zappar-react-three-fiber';
import { useEffect, useState } from 'react';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export function App() {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const mtl = useLoader(MTLLoader, '/models/untitled.mtl');
  const obj = useLoader(OBJLoader, '/models/untitled.obj', (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => [0, prev[1] + 0.02, 0]);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ZapparCanvas>
      <ZapparCamera />
      <directionalLight position={[0, 10, 10]} />
      <ImageTracker
        targetImage='/images/mango.zpt'
        onNotVisible={(anchor) => console.log(`Not visible ${anchor.id}`)}
        onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
        onVisible={(anchor) => console.log(`Visible ${anchor.id}`)}
      >
        <primitive
          object={obj}
          scale={[0.05, 0.05, 0.05]}
          position={[-1, -1, 0]}
          rotation={rotation}
        />
      </ImageTracker>
    </ZapparCanvas>
  );
}
