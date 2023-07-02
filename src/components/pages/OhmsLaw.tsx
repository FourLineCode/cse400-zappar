import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Formula } from '../ui/Formula';
import { Layout } from '../ui/Layout';
import { SlideDown } from '../ui/SlideDown';
import { Var } from '../ui/Var';

export function OhmsLaw() {
  const [step, setStep] = useState(1);

  return (
    <Layout>
      <h1 className='mb-3 text-2xl font-bold text-center'>Ohm's Law</h1>
      <SlideDown show={step >= 1}>
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
      </SlideDown>
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

function Step1() {
  return (
    <>
      <p>
        Ohm’s law describes the relationship between <b>current</b> in and{' '}
        <b>potential difference</b> across <b>conductors</b>. The law was developed by physicist{' '}
        <b>Georg Ohm</b>, who found that for many types of conductors the current in them was{' '}
        <b>directly proportional</b> to the potential difference across them.
      </p>
      <br />
      <p>
        Ohm eventually identified a mathematical relationship between current, resistance, and
        potential difference for a conductor.
      </p>
      <br />
    </>
  );
}

function Step2() {
  return (
    <>
      <h2 className='text-xl font-bold'>Formula</h2>
      <p>
        If <Var>I</Var> is the current in a conductor in an electrical circuit, <Var>V</Var> is the
        potential difference across the conductor, and <Var>R</Var> is the conductor’s resistance to
        charge flow, then
      </p>
      <Formula>V = I &#215; R</Formula>
      <p>
        In this expression, the standard unit of potential difference is volts (V), the unit of
        current is amperes (A), and the unit of resistance is ohms (Ω).
      </p>
      <br />
    </>
  );
}

function Step3() {
  const [selected, setSelected] = useState<string | null>(null);
  const [win, setWin] = useState<boolean | null>(null);

  const onGuess = () => {
    if (selected === '0.5') {
      setWin(true);
    } else {
      setWin(false);
    }
  };

  return (
    <>
      <h2 className='text-xl font-bold'>Example</h2>
      <p>
        A 10 Ω resistor in a circuit has a potential difference of 5 V across it. What is the
        current through the resistor?
      </p>
      <div className='flex items-center justify-center'>
        <img src='/images/circuit.svg' alt='circuit' className='w-full h-auto' />
      </div>
      <br />
      <h2 className='text-xl font-bold'>Answer</h2>
      <p>Choose an answer:</p>
      <div className='pl-10'>
        <div className='space-x-3'>
          <input
            type='radio'
            name='answer'
            id='5'
            value='5'
            checked={selected === '5'}
            onChange={(e) => setSelected(e.target.value)}
          />
          <label htmlFor='5'>5 A</label>
        </div>
        <div className='space-x-3'>
          <input
            type='radio'
            name='answer'
            id='0.5'
            value='0.5'
            checked={selected === '0.5'}
            onChange={(e) => setSelected(e.target.value)}
          />
          <label htmlFor='0.5'>0.5 A</label>
        </div>
        <div className='space-x-3'>
          <input
            type='radio'
            name='answer'
            id='0.25'
            value='0.25'
            checked={selected === '0.25'}
            onChange={(e) => setSelected(e.target.value)}
          />
          <label htmlFor='0.25'>0.25 A</label>
        </div>
        <div className='font-bold'>
          {win !== null && win ? (
            <p className='text-green-500'>Correct!</p>
          ) : (
            win !== null && !win && <p className='text-red-500'>Incorrect!</p>
          )}
        </div>
      </div>
      <button
        onClick={onGuess}
        disabled={!selected}
        className='flex items-center justify-center w-full gap-4 px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700 disabled:grayscale'
      >
        Submit
      </button>
      <br />
    </>
  );
}

function Step4() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className='text-xl font-bold'>Visualize</h2>
      <p>
        You can visualize a physical representation of Ohm's Law in Augmented Reality by scanning an
        image of the circuit. Start by clicking the button below.
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate('/tracker');
        }}
        className='flex items-center justify-center w-full gap-4 px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700'
      >
        <FaPlay size={20} fill='white' />
        <span>Visualize in 3D</span>
      </button>
    </>
  );
}
