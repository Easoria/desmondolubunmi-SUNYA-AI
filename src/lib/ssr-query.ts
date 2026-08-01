/** Hard timeout for SSR Supabase reads so hung DNS/TLS never blocks page TTFB. */
export const SSR_QUERY_TIMEOUT_MS = 2000;

export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number = SSR_QUERY_TIMEOUT_MS,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => {
          reject(new Error(`SSR query timed out after ${ms}ms`));
        }, ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
