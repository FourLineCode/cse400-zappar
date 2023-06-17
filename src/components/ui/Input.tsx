import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  parentClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, label, error, parentClassName, fullWidth = false, ...props }, ref) => {
    const inputClasses = twJoin(
      'w-[100px] rounded-lg bg-gray-900 text-white text-xs border border-[#c2c2c2] px-4 py-2 font-medium focus:outline-none',
      icon && 'pl-8',
      props.className,
      fullWidth && 'w-full'
    );

    return (
      <div className={twJoin('relative', parentClassName)}>
        {label && (
          <label htmlFor={props.name} className='block text-sm stroke-slate-50'>
            {label}
          </label>
        )}
        <div className='relative'>
          {icon && (
            <div className='absolute inset-y-0 top-0 bottom-0 left-0 flex items-center pl-2 my-auto'>
              {icon}
            </div>
          )}
          <input {...props} ref={ref} className={inputClasses} />
        </div>
        {error && <p className='text-xs text-red-500'>{error}</p>}
      </div>
    );
  }
);
