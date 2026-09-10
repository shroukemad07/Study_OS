const DAY = 86400000;
export const isoDay = (date = new Date()) => date.toISOString().slice(0, 10);
export const mins = time => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
export const clock = value => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
export const dateLabel = value => new Intl.DateTimeFormat('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00`));
export function blocksForDay(schedule, date) {
  const weekday = new Date(`${date}T12:00:00`).getDay();
  return schedule.filter(x => x.active && x.day === weekday).flatMap(x => {
    const start = mins(x.start); const end = x.end ? mins(x.end) : start + 60;
    const blocks = [{ start, end, label: x.subject, kind: 'lesson' }];
    if (x.physical && x.commute) blocks.unshift({ start: Math.max(0, start - x.commute), end: start, label: 'وقت المواصلات', kind: 'commute' });
    return blocks;
  }).sort((a, b) => a.start - b.start);
}
export function availableWindows(blocks, planned, now = new Date()) {
  const start = now.getHours() * 60 + now.getMinutes();
  const busy = [...blocks, ...planned.map(t => ({ start: t.plannedStart, end: t.plannedStart + (t.estimate || 30) }))].sort((a, b) => a.start - b.start);
  let cursor = Math.max(8 * 60, start); const endOfDay = 22 * 60; const windows = [];
  busy.forEach(b => { if (b.end <= cursor || b.start >= endOfDay) return; if (b.start > cursor) windows.push({ start: cursor, end: Math.min(b.start, endOfDay) }); cursor = Math.max(cursor, b.end); });
  if (cursor < endOfDay) windows.push({ start: cursor, end: endOfDay }); return windows.filter(w => w.end - w.start >= 15);
}
function scoreTask(task, today, exams, previousLoad) {
  let score = task.priority === 'high' ? 90 : task.priority === 'medium' ? 55 : 25;
  if (task.dueDate) { const days = Math.round((new Date(`${task.dueDate}T12:00:00`) - new Date(`${today}T12:00:00`)) / DAY); score += days < 0 ? 220 + Math.abs(days) * 10 : Math.max(0, 90 - days * 12); }
  const nearestExam = exams.filter(e => e.subjectId === task.subjectId).map(e => Math.ceil((new Date(`${e.date}T12:00:00`) - new Date(`${today}T12:00:00`)) / DAY)).filter(x => x >= 0).sort((a,b) => a-b)[0];
  if (nearestExam !== undefined) score += Math.max(0, 55 - nearestExam * 5);
  if (task.plannedDate === today) score += 45;
  if (previousLoad === 'high' && task.load === 'high') score -= 35;
  return score;
}
export function suggestPlan({ tasks, schedule, exams, date = isoDay(), count = 3 }) {
  const blocks = blocksForDay(schedule, date); const planned = tasks.filter(t => t.plannedDate === date && t.status !== 'COMPILED' && Number.isFinite(t.plannedStart));
  const windows = availableWindows(blocks, planned); let remaining = windows.map(x => ({ ...x })); let previousLoad = null;
  const candidates = tasks.filter(t => t.status !== 'COMPILED' && (!t.plannedDate || t.plannedDate === date)).sort((a, b) => scoreTask(b,date,exams,previousLoad)-scoreTask(a,date,exams,previousLoad));
  const result = [];
  for (const task of candidates) {
    if (result.length >= count || task.plannedDate === date) continue;
    const duration = task.estimate || 30; const index = remaining.findIndex(w => w.end - w.start >= duration);
    if (index < 0) continue;
    const window = remaining[index]; result.push({ ...task, plannedDate: date, plannedStart: window.start, reason: explain(task, date, exams) });
    remaining[index] = { ...window, start: window.start + duration + 10 }; previousLoad = task.load;
  }
  return { suggestions: result, blocks, windows };
}
export function explain(task, today, exams) {
  if (task.dueDate && task.dueDate < today) return 'Overdue — clearing it reduces the queue.';
  if (task.dueDate && task.dueDate <= new Date(Date.now() + 3 * DAY).toISOString().slice(0,10)) return 'Due soon, with a realistic open window.';
  if (task.priority === 'high') return 'High priority, fitted around your commitments.';
  if (exams.some(e => e.subjectId === task.subjectId)) return 'Connected to an upcoming exam.';
  return 'Fits an available study window.';
}
