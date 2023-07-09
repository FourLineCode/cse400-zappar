import { useState } from 'react';
import { Layout } from '../ui/Layout';

export function Node() {
  const [step, setStep] = useState(1);

  return (
    <Layout>
      <h1 className='mb-3 text-2xl font-bold text-center'>Nodal analysis</h1>
      {/* <SlideDown show={step >= 1}>
        <Step1 />
      </SlideDown>
      <SlideDown show={step >= 2}>
        <Step2 />
      </SlideDown>
      <SlideDown show={step >= 3}>
        <Step3 />
      </SlideDown>
      <SlideDown show={step >= 4}>
        <Step4 />
      </SlideDown> */}
      {step < 4 && (
        <button
          onClick={() => setStep((prev) => prev + 1)}
          className='flex items-center justify-center w-full gap-4 px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700 disabled:grayscale'
        >
          Next
        </button>
      )}
    </Layout>
  );
}

// function Step1() {
//   return (
//     <>
//       <p>
//         Mesh Current Analysis is a technique used to find the currents circulating around a loop or
//         mesh with in any closed path of a circuit.
//       </p>
//       <br />
//       <p>
//         As with any circuit analysis challenge, we have to solve a system of 2E independent
//         equations, where E is the number of circuit elements. The Mesh Current Method efficiently
//         manages the analysis task, resulting in a relatively small number of equations to solve. The
//         Mesh Current Method is based on Kirchhoff's Voltage Law (KVL).
//       </p>
//       <br />
//     </>
//   );
// }

// function Step2() {
//   return (
//     <>
//       <p>The Mesh Current Method uses two special terms: loop and mesh.</p>
//       <img src='/images/mesh.svg' alt='mesh' className='w-full h-auto' />
//       <br />
//       <p>
//         A loop is any closed path around a circuit. To trace a loop, you start at any component
//         terminal, and trace a path through connected elements until you get back to the starting
//         point. A loop is allowed to go through an element just one time. In the circuit above, there
//         are three loops, two solid loops, I and II, and one dashed loop III, all the way around the
//         outside.
//       </p>
//       <br />
//     </>
//   );
// }

// function Step3() {
//   return (
//     <>
//       <p>
//         Our circuit has two meshes. We identify two loop currents and call them i1 and i2. These are
//         going to be our independent variables. Important: the loop current directions are the same,
//         both flow in a clockwise direction.
//       </p>
//       <img src='/images/mesh2.svg' alt='mesh2' className='w-full h-auto' />
//       <p>
//         By defining a loop current in every mesh, you will have enough independent equations to
//         solve the circuit.
//       </p>
//       <br />
//       <p>Applying KVL we get the following equations:</p>
//       <br />
//       <Formula>
//         mesh 1: +5v - 2000 i1 - 1000 (i1 - i2) = 0
//         <br />
//         mesh 2: -1000 (i1 - i2) - 2000 i2 - 2V = 0
//       </Formula>
//       <br />
//       <p>Solving both equations we get following values for the mesh currents:</p>
//       <Formula>
//         i1 = -0.125 mA
//         <br />
//         i2 = +1.625 mA
//       </Formula>
//       <br />
//     </>
//   );
// }

// function Step4() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <h2 className='text-xl font-bold'>Visualize</h2>
//       <p>
//         You can visualize a physical representation of Mesh current analysis by scanning an image of
//         the circuit. Start by clicking the button below.
//       </p>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           navigate('/tracker');
//         }}
//         className='flex items-center justify-center w-full gap-4 px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700'
//       >
//         <FaPlay size={20} fill='white' />
//         <span>Visualize in 3D</span>
//       </button>
//     </>
//   );
// }
