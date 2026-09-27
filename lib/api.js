export const API_URL = 'https://api.abcz.workers.dev/api/fitlog';
export const FALLBACK_API_URL = 'https://api.api-store.workers.dev/api/fitlog';

const fallbackImage =
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85';

const fallback = [
  { id: '1', name: 'Barbell Bench Press', category: ['Chest', 'Arms'], equipment: 'Barbell, Bench', difficulty: 'Intermediate', sets: 4, reps: '6-8', duration: 25, calories: 180, rating: 4.8, image: fallbackImage, description: 'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.', instructions: ['Lie on the bench with eyes under the bar and feet planted.', 'Unrack with locked elbows and lower the bar to mid-chest.', 'Press up in a slight arc until elbows lock without bouncing.', 'Keep shoulder blades pinched and a natural arch in the back.'] },
  { id: '2', name: 'Pull-Up', category: ['Back', 'Arms'], equipment: 'Pull-up Bar', difficulty: 'Intermediate', sets: 4, reps: '6-10', duration: 20, calories: 150, rating: 4.7, image: fallbackImage, description: 'A bodyweight pull that builds back width and upper-body strength.', instructions: ['Grip the bar slightly wider than shoulder width.', 'Brace your core and start from a controlled hang.', 'Pull your chest toward the bar.', 'Lower under control until your arms are extended.'] },
  { id: '3', name: 'Back Squat', category: ['Legs'], equipment: 'Barbell, Rack', difficulty: 'Intermediate', sets: 4, reps: '6-8', duration: 30, calories: 240, rating: 4.9, image: fallbackImage, description: 'A foundational lower-body lift for strength, control, and total-body stability.', instructions: ['Set the bar comfortably across your upper back.', 'Brace your trunk and sit down between your hips.', 'Drive through the floor while keeping your knees tracking over your feet.', 'Stand tall and reset before the next rep.'] },
  { id: '4', name: 'Overhead Press', category: ['Shoulders', 'Arms'], equipment: 'Barbell', difficulty: 'Intermediate', sets: 4, reps: '6-8', duration: 22, calories: 165, rating: 4.6, image: fallbackImage, description: 'A strict vertical press for shoulders, triceps, and upper-body stability.', instructions: ['Start with the bar at upper-chest height.', 'Brace your core and squeeze your glutes.', 'Press overhead while keeping the bar path close.', 'Lower slowly to the starting position.'] },
  { id: '5', name: 'Dumbbell Bicep Curl', category: ['Arms'], equipment: 'Dumbbells', difficulty: 'Beginner', sets: 3, reps: '10-12', duration: 15, calories: 95, rating: 4.5, image: fallbackImage, description: 'A simple isolation movement for controlled biceps work.', instructions: ['Stand tall with a dumbbell in each hand.', 'Keep elbows close to your sides.', 'Curl without swinging your torso.', 'Lower slowly and repeat.'] },
  { id: '6', name: 'Dumbbell Bench Curl', category: ['Arms'], equipment: 'Dumbbells, Bench', difficulty: 'Beginner', sets: 3, reps: '10-12', duration: 16, calories: 100, rating: 4.6, image: fallbackImage, description: 'A supported curl variation that keeps tension focused on the arms.', instructions: ['Set up securely on an incline bench.', 'Let your arms hang naturally.', 'Curl the weights while keeping your shoulders still.', 'Return slowly to full extension.'] },
  { id: '7', name: 'Hanging Leg Raise', category: ['Core'], equipment: 'Pull-up Bar', difficulty: 'Intermediate', sets: 3, reps: '10-15', duration: 18, calories: 120, rating: 4.7, image: fallbackImage, description: 'A controlled core exercise for the lower abdominals and hip flexors.', instructions: ['Hang with a stable grip.', 'Brace your core and avoid swinging.', 'Raise your legs with control.', 'Lower slowly and reset.'] },
  { id: '8', name: 'Seated Row', category: ['Back'], equipment: 'Cable Machine', difficulty: 'Beginner', sets: 4, reps: '8-12', duration: 20, calories: 135, rating: 4.7, image: fallbackImage, description: 'A horizontal pulling movement for the mid-back and lats.', instructions: ['Sit tall and brace your core.', 'Pull the handle toward your torso.', 'Squeeze the shoulder blades together.', 'Return the handle under control.'] },
  { id: '9', name: 'Barbell Good Morning', category: ['Legs', 'Back'], equipment: 'Barbell', difficulty: 'Advanced', sets: 3, reps: '8-10', duration: 18, calories: 140, rating: 4.5, image: fallbackImage, description: 'A hip-hinge exercise that trains the posterior chain.', instructions: ['Place the bar securely across your upper back.', 'Soften your knees and push your hips back.', 'Keep your spine neutral as you hinge.', 'Drive the hips forward to stand.'] },
  { id: '10', name: 'Dumbbell Bench Curl', category: ['Arms'], equipment: 'Dumbbells, Bench', difficulty: 'Beginner', sets: 3, reps: '10-12', duration: 16, calories: 100, rating: 4.6, image: fallbackImage, description: 'A supported curl variation that keeps tension focused on the arms.', instructions: ['Set up securely on an incline bench.', 'Let your arms hang naturally.', 'Curl the weights while keeping your shoulders still.', 'Return slowly to full extension.'] },
  { id: '11', name: 'Walking Lunge', category: ['Legs'], equipment: 'Dumbbells', difficulty: 'Intermediate', sets: 3, reps: '10 each', duration: 20, calories: 155, rating: 4.8, image: fallbackImage, description: 'A dynamic unilateral leg exercise for balance and lower-body strength.', instructions: ['Stand tall with feet hip width apart.', 'Step forward and lower under control.', 'Push through the front foot to move forward.', 'Alternate sides while keeping your torso tall.'] },
  { id: '12', name: 'Russian Twist', category: ['Core'], equipment: 'Medicine Ball', difficulty: 'Intermediate', sets: 3, reps: '16-20', duration: 14, calories: 110, rating: 4.6, image: fallbackImage, description: 'A rotational core movement that challenges trunk control.', instructions: ['Sit with knees bent and core braced.', 'Lean back slightly while keeping your spine long.', 'Rotate your torso from side to side.', 'Move smoothly rather than rushing each rep.'] },
];

function number(v, fallbackValue = 0) {
  if (typeof v === 'number') return v;
  const n = Number(String(v ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : fallbackValue;
}

function list(v) {
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  if (typeof v === 'string') return v.split(',').map((x) => x.trim()).filter(Boolean);
  return [];
}

export function normalizeWorkout(raw, index = 0) {
  const x = raw || {};
  const id = String(x.id ?? x._id ?? x.workoutId ?? index + 1);
  const categories = list(x.category ?? x.categories ?? x.tags ?? x.muscle ?? x.muscles);
  const instructions = list(x.instructions ?? x.steps ?? x.instruction);
  return {
    id,
    name: String(x.name ?? x.title ?? x.workoutName ?? 'Workout'),
    category: categories.length ? categories : ['Fitness'],
    equipment: String(x.equipment ?? x.equipments ?? 'Bodyweight'),
    difficulty: String(x.difficulty ?? 'Intermediate'),
    sets: x.sets ?? x.set ?? 3,
    reps: String(x.reps ?? x.rep ?? '8-12'),
    duration: number(x.duration ?? x.durationMin ?? x.minutes ?? x.time, 20),
    calories: number(x.calories ?? x.calorie ?? x.kcal, 120),
    rating: number(x.rating ?? x.rate, 4.5),
    image: String(x.image ?? x.imageUrl ?? x.photo ?? x.thumbnail ?? fallbackImage),
    description: String(x.description ?? x.desc ?? 'A focused training movement for building strength and consistency.'),
    instructions: instructions.length ? instructions : fallback[0].instructions,
  };
}

function extractList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.workouts)) return data.workouts;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

export async function getWorkouts() {
  const urls = [API_URL, FALLBACK_API_URL];
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const json = await res.json();
      const rows = extractList(json);
      if (rows.length) return rows.map(normalizeWorkout);
    } catch (_) {}
  }
  return fallback;
}

export async function getWorkout(id) {
  const urls = [`${API_URL}/${id}`, `${FALLBACK_API_URL}/${id}`];
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const json = await res.json();
      const item = json?.data ?? json?.workout ?? json;
      if (item && typeof item === 'object' && !Array.isArray(item)) return normalizeWorkout(item);
    } catch (_) {}
  }
  return fallback.find((x) => String(x.id) === String(id)) || null;
}
