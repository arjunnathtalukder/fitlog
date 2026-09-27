'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWorkout } from '../../../lib/api';
import Loading from '../../../components/Loading';
import DetailActions from '../../../components/DetailActions';

export default function WorkoutDetails({ params }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getWorkout(params.id).then(setWorkout).finally(() => setLoading(false)); }, [params.id]);
  if (loading) return <div className="container-fit"><Loading text="Loading workout…"/></div>;
  if (!workout) return <div className="container-fit py-20"><h1 className="display text-4xl uppercase">Workout not found</h1><Link href="/" className="acid-btn mt-5">Back to workouts</Link></div>;
  const specs = [['Equipment', workout.equipment], ['Difficulty', workout.difficulty], ['Sets', workout.sets], ['Reps', workout.reps], ['Duration', `${workout.duration} min`], ['Calories', `${workout.calories} kcal`], ['Rating', workout.rating]];
  return <section className="container-fit py-7 sm:py-10">
    <Link href="/#library" className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase text-muted hover:text-white"><ArrowLeft size={12}/> Back to library</Link>
    <div className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
      <div className="overflow-hidden rounded-lg border border-line bg-panel"><img src={workout.image} alt={workout.name} className="aspect-[1/1] h-full w-full object-cover"/></div>
      <div>
        <h1 className="display text-4xl font-bold uppercase leading-none sm:text-5xl">{workout.name}</h1>
        <p className="mt-3 max-w-2xl text-xs leading-5 text-muted">{workout.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{workout.category.map((tag)=><span className="tag" key={tag}>{tag}</span>)}</div>
        <div className="mt-4 overflow-hidden rounded-lg border border-line bg-panel">
          {specs.map(([label,value]) => <div key={label} className="flex items-center justify-between border-b border-line px-4 py-3 text-[10px] last:border-b-0"><span className="font-bold uppercase tracking-wider text-muted">{label}</span><span>{value}</span></div>)}
        </div>
        <div className="mt-6"><h2 className="text-[11px] font-bold uppercase tracking-wider">Instructions</h2><ol className="mt-3 space-y-3">{workout.instructions.slice(0,4).map((step,i)=><li key={i} className="flex gap-3 text-[10px] leading-4 text-muted"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line text-[9px] text-white">{i+1}</span><span>{step}</span></li>)}</ol></div>
        <div className="mt-6"><DetailActions workout={workout}/></div>
      </div>
    </div>
  </section>;
}
