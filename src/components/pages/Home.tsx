import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { TbCircuitAmmeter } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../ui/Layout';
import { SlideDown } from '../ui/SlideDown';

export function Home() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Layout>
      <h1 className='mb-3 text-2xl font-bold text-center'>Browse Topics</h1>
      <div className='space-y-4'>
        {[0, 1, 2, 3].map((id) => (
          <Topic
            id={id}
            key={id}
            active={active}
            name={"Ohm's Law"}
            path='/ohms-law'
            description='Ohm’s law states the relationship between electric current and potential difference'
            onClick={(id) => setActive(active === id ? null : id)}
          />
        ))}
      </div>
    </Layout>
  );
}

function Topic({
  id,
  name,
  description,
  path,
  active,
  onClick,
}: {
  id: number;
  name: string;
  description: string;
  path: string;
  active: number | null;
  onClick: (id: number) => void;
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => onClick(id)}
      className='w-full p-4 overflow-hidden transition-colors border-2 border-gray-800 rounded-xl hover:bg-gray-100'
    >
      <div className='flex items-center gap-4'>
        <TbCircuitAmmeter size={28} />
        <h2 className='text-xl font-semibold'>{name}</h2>
      </div>
      <SlideDown show={id === active} className='mt-2 space-y-4'>
        <div className='text-sm text-left'>{description}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(path);
          }}
          className='flex items-center justify-center w-full gap-4 px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700'
        >
          <FaPlay size={20} fill='white' />
          <span>Start lesson</span>
        </button>
      </SlideDown>
    </button>
  );
}
