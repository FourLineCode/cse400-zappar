import { cn } from '../../utils/cn';

export function ValueLabel({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        'w-32 flex text-sm items-center justify-center transform scale-[400%] px-4 py-2 font-bold bg-white border-2 border-gray-900 rounded-full',
        className
      )}
    >
      {label}
    </div>
  );
}
