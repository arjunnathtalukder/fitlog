import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-[#08090b]">
      <div className="container-fit flex min-h-16 items-center justify-between gap-4 text-[9px] text-muted">
        <div className="flex items-center gap-2 font-bold text-white"><Dumbbell size={12} className="text-acid" /> FITLOG</div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
