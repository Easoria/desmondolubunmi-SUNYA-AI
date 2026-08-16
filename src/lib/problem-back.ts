const STORAGE_KEY = "sunya:problem-back";

export type ProblemBackOrigin = {
  name: string;
  path: string;
};

type RouterStateWithOrigin = {
  fromPractice?: ProblemBackOrigin;
};

export function rememberProblemBackOrigin(origin: ProblemBackOrigin) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
  } catch {
    // Ignore private-mode / quota errors.
  }
}

export function readProblemBackOrigin(
  routerState: unknown,
): ProblemBackOrigin | null {
  const fromState = (routerState as RouterStateWithOrigin | null | undefined)?.fromPractice;
  if (fromState?.name && fromState?.path?.startsWith("/practices/")) {
    rememberProblemBackOrigin(fromState);
    return fromState;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ProblemBackOrigin;
    if (parsed?.name && parsed?.path?.startsWith("/practices/")) return parsed;
  } catch {
    // Ignore parse / storage errors.
  }

  return null;
}

export function problemTagLinkState(practiceName: string, leverSlug: string, practiceSlug: string) {
  return {
    fromPractice: {
      name: practiceName,
      path: `/practices/${leverSlug}/${practiceSlug}`,
    } satisfies ProblemBackOrigin,
  };
}
