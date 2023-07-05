export function ButtonInput({
  label,
  onIncrement,
  onDecrement,
}: {
  label: string;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className='flex text-xs items-center justify-center overflow-hidden transform scale-[400%] font-bold bg-white border-2 border-gray-100 rounded-full'>
      <button className='flex-1 h-full px-1 text-xl text-white bg-gray-900' onClick={onDecrement}>
        -
      </button>
      <span className='flex-1 w-20 p-1'>{label}</span>
      <button className='flex-1 h-full px-1 text-xl text-white bg-gray-900' onClick={onIncrement}>
        +
      </button>
    </div>
  );
}
