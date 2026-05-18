// SSR shim: the auto-generated supabase client references `localStorage`
// at module scope, which throws in Node/Workers. Install a no-op storage
// before any supabase import is evaluated.
if (typeof globalThis !== "undefined" && typeof (globalThis as any).localStorage === "undefined") {
  const mem = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (k: string) => (mem.has(k) ? mem.get(k)! : null),
    setItem: (k: string, v: string) => void mem.set(k, String(v)),
    removeItem: (k: string) => void mem.delete(k),
    clear: () => mem.clear(),
    key: (i: number) => Array.from(mem.keys())[i] ?? null,
    get length() {
      return mem.size;
    },
  };
}

export {};
