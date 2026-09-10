import { all, replaceAll } from './db.js';
const VERSION = 1;
export async function exportBackup() {
  return { app: 'Study OS', version: VERSION, exportedAt: new Date().toISOString(), records: await all() };
}
export function validateBackup(data) {
  if (!data || data.app !== 'Study OS' || !Array.isArray(data.records)) throw new Error('This does not look like a Study OS backup.');
  if (!data.records.every(x => x && typeof x.key === 'string')) throw new Error('Backup contains invalid records.');
  return data;
}
export async function restoreBackup(data) { validateBackup(data); await replaceAll(data.records); }
export function downloadBackup(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `study-os-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
