'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const PlanContext = createContext(null);
const PLAN_KEY = 'fitlog-plan-v1';
const SAVED_KEY = 'fitlog-saved-v1';
const DONE_KEY = 'fitlog-done-v1';

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem(PLAN_KEY) || '[]'));
      setSaved(JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'));
      setDone(JSON.parse(localStorage.getItem(DONE_KEY) || '[]'));
    } catch (_) {}
    setReady(true);
  }, []);

  useEffect(() => { if (ready) localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); }, [plan, ready]);
  useEffect(() => { if (ready) localStorage.setItem(SAVED_KEY, JSON.stringify(saved)); }, [saved, ready]);
  useEffect(() => { if (ready) localStorage.setItem(DONE_KEY, JSON.stringify(done)); }, [done, ready]);

  const addToPlan = (workout) => {
    if (plan.some((x) => x.id === workout.id)) return { ok: false, reason: 'exists' };
    if (plan.length >= 5) return { ok: false, reason: 'limit' };
    setPlan((p) => [...p, workout]);
    return { ok: true };
  };

  const removeFromPlan = (id) => setPlan((p) => p.filter((x) => x.id !== id));

  const saveWorkout = (workout) => {
    if (saved.some((x) => x.id === workout.id)) return { ok: false, reason: 'exists' };
    setSaved((s) => [...s, workout]);
    return { ok: true };
  };

  const removeSaved = (id) => setSaved((s) => s.filter((x) => x.id !== id));

  const markDone = (id) => setDone((d) => (d.includes(id) ? d : [...d, id]));

  const metrics = useMemo(() => ({
    exercises: plan.length,
    minutes: plan.reduce((sum, x) => sum + Number(x.duration || 0), 0),
    calories: plan.reduce((sum, x) => sum + Number(x.calories || 0), 0),
  }), [plan]);

  return (
    <PlanContext.Provider value={{ plan, saved, done, ready, metrics, addToPlan, removeFromPlan, saveWorkout, removeSaved, markDone }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const value = useContext(PlanContext);
  if (!value) throw new Error('usePlan must be used inside PlanProvider');
  return value;
}
