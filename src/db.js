// A deliberately small IndexedDB layer. Data remains entirely on this device.
const DB_NAME = 'study-os';
const STORE = 'records';
let handle;

function open() {
  if (handle) return handle;
  handle = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'key' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return handle;
}
function transaction(mode, work) {
  return open().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode); const store = tx.objectStore(STORE);
    let result; try { result = work(store); } catch (e) { reject(e); return; }
    tx.oncomplete = () => resolve(result); tx.onerror = () => reject(tx.error);
  }));
}
export const uid = (prefix = 'id') => `${prefix}_${crypto.randomUUID()}`;
export async function get(key) {
  return transaction('readonly', store => new Promise((resolve, reject) => {
    const r = store.get(key); r.onsuccess = () => resolve(r.result?.value); r.onerror = () => reject(r.error);
  }));
}
export async function put(key, value) { return transaction('readwrite', store => store.put({ key, value })); }
export async function remove(key) { return transaction('readwrite', store => store.delete(key)); }
export async function all() {
  return transaction('readonly', store => new Promise((resolve, reject) => {
    const r = store.getAll(); r.onsuccess = () => resolve(r.result.map(x => x.value)); r.onerror = () => reject(r.error);
  }));
}
export async function replaceAll(values) {
  return transaction('readwrite', store => { store.clear(); values.forEach(value => store.put({ key: value.key, value })); });
}
