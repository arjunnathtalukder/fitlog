import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="card group block transition hover:-translate-y-0.5 hover:border-white/20">
      <div className="aspect-[1.9/1] overflow-hidden bg-[#22252b]">
        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
      </div>
      <div className="p-3">
        <div className="mb-2 flex min-h-4 flex-wrap gap-1">
          {workout.category.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <h3 className="display text-[15px] font-bold uppercase leading-none tracking-wide">{workout.name}</h3>
        <p className="mt-1.5 truncate text-[9px] text-muted">{workout.equipment}</p>
        <div className="mt-3 flex items-center gap-2 text-[8px] text-muted">
          <span className="inline-flex items-center gap-1"><Clock3 size={10} /> {workout.duration} min</span>
          <span className="inline-flex items-center gap-1"><Flame size={10} /> {workout.calories} kcal</span>
          <span className="inline-flex items-center gap-1"><Star size={10} /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
