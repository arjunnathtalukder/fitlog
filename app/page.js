'use client';

import { ArrowDown, ArrowRight, Clock3 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import Loading from '../components/Loading';
import { getWorkouts } from '../lib/api';

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('duration');

  useEffect(() => {
    let active = true;
    getWorkouts().then((data) => { if (active) setWorkouts(data); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const sorted = useMemo(() => [...workouts].sort((a,b) => Number(a[sort]) - Number(b[sort])), [workouts, sort]);

  return <>
    <section className="container-fit pt-7 sm:pt-10">
      <div className="relative overflow-hidden rounded-lg border border-line bg-panel px-4 py-8 sm:px-8 sm:py-10">
        <div className="max-w-xl">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[.18em] text-acid">WORKOUT LIBRARY</p>
          <h1 className="display max-w-lg text-4xl font-bold uppercase leading-[.95] tracking-tight sm:text-6xl">Train with intent. Log every set.</h1>
          <p className="mt-4 max-w-xl text-[10px] leading-5 text-muted sm:text-xs">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <a href="#library" className="acid-btn mt-5"><ArrowRight size={13}/> Browse workouts</a>
        </div>
        <div className="pointer-events-none absolute right-[-35px] top-[-30px] hidden h-[260px] w-[340px] sm:block">
          <img src={workouts[0]?.image || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'} alt="Workout" className="h-full w-full object-cover opacity-80 [mask-image:linear-gradient(to_left,black_45%,transparent_100%)]" />
        </div>
      </div>
    </section>

    <section id="library" className="container-fit scroll-mt-8 pt-8 sm:pt-12">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="display text-2xl font-bold uppercase">The Library</h2><p className="mt-1 text-[9px] text-muted">Twelve lifts covering every major muscle group.</p></div>
        <label className="relative inline-flex items-center self-start rounded-md border border-line bg-panel px-3 py-2 text-[10px] text-muted sm:self-auto">
          <Clock3 size={12} className="mr-2"/> Sort By:
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="ml-1 cursor-pointer appearance-none bg-transparent pr-4 text-white outline-none"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select>
          <ArrowDown size={11} className="pointer-events-none absolute right-2"/>
        </label>
      </div>
      {loading ? <Loading /> : <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{sorted.map((workout) => <WorkoutCard key={workout.id} workout={workout}/>)}</div>}
    </section>
  </>;
}
