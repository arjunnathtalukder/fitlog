'use client';

import Link from 'next/link';
import { Check, Clock3, Flame, Star, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePlan } from './PlanProvider';

export default function WorkoutListCard({ workout, savedTab = false }) {
  const { removeFromPlan, removeSaved, markDone, done } = usePlan();
  const isDone = done.includes(workout.id);
  const remove = () => { savedTab ? removeSaved(workout.id) : removeFromPlan(workout.id); toast.success(savedTab ? 'Removed from saved' : 'Removed from today’s plan'); };
  return (
    <article className={`card flex flex-col gap-4 p-3 sm:flex-row sm:items-center ${isDone ? 'opacity-60' : ''}`}>
      <img src={workout.image} alt={workout.name} className="h-24 w-full rounded-md object-cover sm:h-20 sm:w-28" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap gap-1">{workout.category.slice(0,2).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <h3 className="display truncate text-lg font-bold uppercase">{workout.name}</h3>
        <p className="mt-1 text-[10px] text-muted">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-[9px] text-muted">
          <span className="inline-flex items-center gap-1"><Clock3 size={10}/> {workout.duration} min</span>
          <span className="inline-flex items-center gap-1"><Flame size={10}/> {workout.calories} kcal</span>
          <span className="inline-flex items-center gap-1"><Star size={10}/> {workout.rating}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link href={`/workout/${workout.id}`} className="ghost-btn">View Details</Link>
        {!savedTab && <button className="acid-btn" onClick={() => { markDone(workout.id); toast.success('Workout marked as done'); }} disabled={isDone}><Check size={13}/>{isDone ? 'Done' : 'Mark as Done'}</button>}
        <button aria-label="Remove" onClick={remove} className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted hover:border-white/30 hover:text-white"><X size={14}/></button>
      </div>
    </article>
  );
}
