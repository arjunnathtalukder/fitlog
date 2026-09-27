import Link from 'next/link';

export default function NotFound() {
  return <section className="container-fit flex min-h-[65vh] flex-col items-center justify-center text-center"><p className="text-[10px] font-bold tracking-[.2em] text-acid">404</p><h1 className="display mt-2 text-6xl font-bold uppercase">Route not found</h1><p className="mt-3 max-w-md text-xs leading-5 text-muted">The page you are looking for does not exist. Head back to the workout library and keep training.</p><Link href="/" className="acid-btn mt-6">Back to FitLog</Link></section>;
}
