import { uid } from './db.js';
const lesson = (day, subject, start, physical = false, end = null) => ({ id: uid('schedule'), day, subject, start, end, physical, commute: physical ? 30 : 0, active: true, createdAt: Date.now() });
export const initialSchedule = () => [
  lesson(6, 'Arabic', '12:00', true), lesson(6, 'Chemistry', '14:00', true), lesson(6, 'Physics', '15:00', true),
  lesson(0, 'French', '12:00'), lesson(0, 'English', '13:30'), lesson(0, 'Biology', '15:00'),
  lesson(1, 'Arabic', '12:00', true), lesson(1, 'ساعة في السنتر', '13:00', true, '14:00'), lesson(1, 'Chemistry', '14:00', true), lesson(1, 'Physics', '15:00', true),
  lesson(2, 'French', '12:00'), lesson(2, 'English', '13:30'), lesson(2, 'Biology', '15:00'),
  lesson(3, 'Chemistry', '14:00', true), lesson(3, 'Physics', '15:00', true),
  lesson(4, 'English', '13:30'), lesson(4, 'Biology', '15:00')
];
export const defaultSettings = () => ({ key: 'settings', theme: 'dark', suggestionCount: 3, defaultCommute: 30, notifications: { lessons: false, tasks: false, tomorrow: false }, seededAt: Date.now() });
