export default function Loading({ text = 'Loading workouts…' }) {
  return <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-muted"><span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-acid" /><span className="text-xs">{text}</span></div>;
}
