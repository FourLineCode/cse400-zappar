export function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center py-4 font-serif text-xl italic font-bold'>
      {children}
    </div>
  );
}
