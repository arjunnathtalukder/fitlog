'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dumbbell, Flame, Timer } from 'lucide-react';
import { usePlan } from '../../components/PlanProvider';
import WorkoutListCard from '../../components/WorkoutListCard';

export default function MyPlan() {
  const params = useSearchParams();
  const { plan, saved, metrics, ready } = usePlan();
  const [tab, setTab] = useState('plan');
  useEffect(() => { if (params.get('tab') === 'saved') setTab('saved'); }, [params]);
  const items = tab === 'plan' ? plan : saved;
  if (!ready) return <div className="container-fit py-20 text-center text-xs text-muted">Loading your plan…</div>;
  return <section className="container-fit py-8 sm:py-10">
    <div className="mb-6"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-acid">YOUR LOG</p><h1 className="display mt-2 text-4xl font-bold uppercase leading-none sm:text-5xl">My Plan</h1><p className="mt-2 text-[10px] text-muted">Cap of five lifts for today. Finish them, then load more.</p></div>
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <Metric icon={<Dumbbell size={14}/>} label="Exercises" value={metrics.exercises}/>
      <Metric icon={<Timer size={14}/>} label="Minutes" value={metrics.minutes}/>
      <Metric icon={<Flame size={14}/>} label="Calories" value={metrics.calories}/>
    </div>
    <div className="mt-6 flex gap-2 border-b border-line pb-2"><button onClick={()=>setTab('plan')} className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase ${tab==='plan'?'bg-acid text-black':'text-muted hover:text-white'}`}>Today&apos;s Plan</button><button onClick={()=>setTab('saved')} className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase ${tab==='saved'?'bg-acid text-black':'text-muted hover:text-white'}`}>Saved</button></div>
    <div className="mt-4 space-y-2.5">
      {items.length ? items.map((w)=><WorkoutListCard key={w.id} workout={w} savedTab={tab==='saved'}/>) : <div className="rounded-lg border border-dashed border-line bg-panel px-5 py-16 text-center"><p className="display text-2xl font-bold uppercase">Nothing here yet</p><p className="mx-auto mt-2 max-w-sm text-[10px] leading-5 text-muted">Browse the library and add a lift to get today moving.</p><Link href="/#library" className="acid-btn mt-5">Go to workouts</Link></div>}
    </div>
  </section>;
}

function Metric({ icon, label, value }) { return <div className="rounded-lg border border-line bg-panel p-3 sm:p-4"><div className="flex items-center gap-2 text-muted">{icon}<span className="text-[9px] font-semibold uppercase">{label}</span></div><div className="display mt-2 text-2xl font-bold">{value}</div></div>; }
