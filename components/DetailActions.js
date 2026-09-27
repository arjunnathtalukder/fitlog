'use client';

import { Bookmark, CalendarPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePlan } from './PlanProvider';

export default function DetailActions({ workout }) {
  const { plan, saved, addToPlan, saveWorkout } = usePlan();
  const inPlan = plan.some((x) => x.id === workout.id);
  const inSaved = saved.some((x) => x.id === workout.id);
  const add = () => {
    const result = addToPlan(workout);
    if (result.ok) toast.success('Added to today’s plan');
    else if (result.reason === 'limit') toast.error('Today’s plan is full — maximum 5 lifts.');
    else toast('Already in today’s plan');
  };
  const save = () => {
    const result = saveWorkout(workout);
    if (result.ok) toast.success('Saved for later');
    else toast('Already saved');
  };
  return <div className="flex flex-wrap gap-2">
    <button className="acid-btn" onClick={add} disabled={inPlan}><CalendarPlus size={14}/>{inPlan ? 'In today’s plan' : 'Add to today’s plan'}</button>
    <button className="ghost-btn" onClick={save} disabled={inSaved}><Bookmark size={14}/>{inSaved ? 'Saved' : 'Save for later'}</button>
  </div>;
}
