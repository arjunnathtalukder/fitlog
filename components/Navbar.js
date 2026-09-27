'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { usePlan } from './PlanProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  return (
    <header className="border-b border-line bg-ink">
      <div className="container-fit flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <Dumbbell size={15} strokeWidth={2.5} className="text-acid" />
          <span className="text-sm">FITLOG</span>
        </Link>
        <nav className="hidden items-center gap-2 sm:flex">
          <Link href="/#library" className={`rounded-full px-4 py-2 text-[10px] font-semibold ${pathname === '/' ? 'bg-acid text-black' : 'text-muted hover:text-white'}`}>Workouts</Link>
          <Link href="/my-plan" className={`rounded-full px-4 py-2 text-[10px] font-semibold ${pathname === '/my-plan' ? 'bg-acid text-black' : 'text-muted hover:text-white'}`}>My Plan</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="flex items-center gap-1 rounded-full bg-acid px-2.5 py-1 text-[9px] font-bold text-black">
            <span>Plan</span><span className="grid h-4 min-w-4 place-items-center rounded-full bg-black text-acid">{plan.length}</span>
          </Link>
          <Link href="/my-plan?tab=saved" className="flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[9px] font-semibold text-muted hover:text-white">
            <span>Saved</span><span className="text-white">{saved.length}</span>
          </Link>
        </div>
      </div>
      <div className="container-fit flex pb-2 sm:hidden">
        <nav className="flex w-full gap-2">
          <Link href="/#library" className="flex-1 rounded-md border border-line px-3 py-2 text-center text-[10px] font-semibold text-muted">Workouts</Link>
          <Link href="/my-plan" className="flex-1 rounded-md border border-line px-3 py-2 text-center text-[10px] font-semibold text-muted">My Plan</Link>
        </nav>
      </div>
    </header>
  );
}
