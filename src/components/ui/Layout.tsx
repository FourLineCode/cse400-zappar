import { cn } from '../../utils/cn';

export function Layout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={cn('w-full min-h-screen max-w-md', className)}>
      <Navbar />
      <div className='p-4 pb-20'>{children}</div>
    </main>
  );
}

function Navbar() {
  return (
    <nav className='sticky flex items-center w-full p-4 text-gray-200 bg-gray-800 shadow-lg'>
      <a href='/' className='text-3xl font-bold'>
        {'AR Circuits'}
      </a>
    </nav>
  );
}
