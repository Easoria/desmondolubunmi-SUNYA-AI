import type { FamilyCode } from "@/data/levers/types";
import { FAMILY_PROBLEM_META, metaDescriptionFromOpening } from "@/lib/family-labels";

/**
 * Written problem pages — one per mechanism.
 * Internal `code` is PRIVATE and must never be rendered.
 * Copy is final — do not paraphrase.
 */
export type ProblemPage = {
  /** PRIVATE — never render. */
  code: FamilyCode;
  slug: string;
  title: string;
  opening: string;
  stateLine: string;
  bullets: [string, string, string, string];
  mechanism: string;
  metaTitle: string;
  metaDescription: string;
};

function page(
  code: FamilyCode,
  opening: string,
  stateLine: string,
  bullets: [string, string, string, string],
  mechanism: string,
): ProblemPage {
  const meta = FAMILY_PROBLEM_META[code];
  return {
    code,
    slug: meta.slug,
    title: meta.title,
    opening,
    stateLine,
    bullets,
    mechanism,
    metaTitle: `${meta.title} — What's Actually Happening, and What Helps | Sunya`,
    metaDescription: metaDescriptionFromOpening(opening),
  };
}

export const PROBLEM_PAGES: ProblemPage[] = [
  page(
    "H1",
    "Something is going to go wrong. You do not know what. Your body has already decided.",
    "You are scanning. The threat is in the future and you are already there.",
    [
      "Your mind runs forward — what if, what then, what next",
      "The feeling is fear rather than pressure or irritation",
      "Reassurance works for about ten minutes",
      "Your body is tense even when nothing is happening",
    ],
    "The alarm is not in your thinking, which is why reasoning with it does not work. It is in your breath and your nervous system. That is where it has to be met.",
  ),
  page(
    "H2",
    "There is too much. Too many things, too many decisions, too many open loops.",
    "The volume has exceeded what you can sort. So nothing gets sorted.",
    [
      "You cannot decide what to do first, so you do nothing",
      "The feeling is pressure rather than fear",
      "Every task you start pulls you toward the others",
      "You have handled more than this before, which makes it worse",
    ],
    "This is not a discipline problem. More is coming in than the system can process, so it has stopped trying. Reduce the input and the ability to act returns on its own.",
  ),
  page(
    "H3",
    "Small things are landing hard. The slow driver. The badly worded message. The sound of someone eating.",
    "Something is blocked, and the force has nowhere to go.",
    [
      "You are irritable rather than anxious or flat",
      "There is an urge to push against something",
      "You know the reaction is bigger than the trigger",
      "Holding it in leaves you drained",
    ],
    "Anger is energy meeting a wall. Suppressing it does not remove it — it stores it. It needs somewhere to discharge, through the body rather than through understanding.",
  ),
  page(
    "H4",
    "Your body is heavy. Your mind is not. Thoughts keep looping — unfinished conversations, random fragments, the same worry in a slightly different costume.",
    "You are on. The day has not powered down.",
    [
      "Thoughts keep generating even when you try to stop them",
      "You feel mentally busy rather than frightened",
      "Lying still makes the noise louder",
      "You know you are tired and still cannot drop",
    ],
    "The thoughts are not the problem. They are the exhaust. Underneath is momentum that has not discharged, and you cannot think your way out of it, because thinking is the thing that is running.",
  ),
  page(
    "L1",
    "The tank is empty. Not sleepy — empty.",
    "You have been spending more than you take in, for long enough that the reserve is gone.",
    [
      "Small tasks feel disproportionately heavy",
      "Rest helps a little and does not fix it",
      "You are depleted rather than numb or sad",
      "You get through the day and there is nothing left after it",
    ],
    "You are not low on motivation. You are low on energy, physically. Pushing harder deepens it. This one is slow, and there is no way to make it fast.",
  ),
  page(
    "L2",
    "You know what you should feel. You do not feel it.",
    "The volume has been turned down. It has not come back up.",
    [
      "Good news lands about the same as bad news",
      "You feel distant from yourself rather than sad",
      "You are going through the motions and doing it well",
      "You would rather feel something difficult than nothing",
    ],
    "This is protection, not damage. There was more feeling than the system could hold, so it turned the volume down. It comes back slowly, through the body, when there is enough safety to risk it.",
  ),
  page(
    "L3",
    "You know what to do. You are not doing it.",
    "Your system has decided the task is a threat, and it is backing away.",
    [
      "The task is specific and you keep going around it",
      "Thinking about it costs more than doing it would",
      "You have energy for other things",
      "Every day you avoid it, it grows",
    ],
    "Avoidance is not laziness. It is the system backing away from a perceived threat, and every day of avoidance teaches it that it was right to. What breaks it is making the entry small enough that nothing objects.",
  ),
  page(
    "L4",
    "Everything is heavier than it should be. Getting up. Getting dressed. Replying.",
    "There is weight in the system and no lift.",
    [
      "Things that used to matter feel flat",
      "You feel heavy rather than numb or panicked",
      "You are functioning, and it costs everything you have",
      "You cannot find the thing that would shift it",
    ],
    "Heaviness does not lift through thinking. It lifts through the body first — movement, breath, light, contact with other people. The mind follows. It rarely goes the other way.",
  ),
  page(
    "M1",
    "Part of you wants it. Part of you does not. Neither will stand down.",
    "You are pulling in two directions, so you cannot move in either.",
    [
      "You change your mind depending on the day",
      "More information has not helped",
      "You start, stop, then start again",
      "The indecision is costing more than either choice would",
    ],
    "Thinking gives both sides more to say, which is why more of it does not help. A divided system cannot see clearly. Settle it first, and the answer is often already there.",
  ),
  page(
    "M2",
    "The voice is running. It has been for a long time.",
    "Part of you has turned against another part.",
    [
      "You replay things you said and did",
      "You speak to yourself in ways you would never speak to anyone else",
      "The feeling is aimed inward, at yourself",
      "Arguing with it makes it louder",
    ],
    "The attacker and the target are both you, so there is nowhere to go. What loosens it is not winning the argument. It is enough space to see the voice as something happening, rather than as the truth.",
  ),
  page(
    "M3",
    "Your head is full and nothing is in order.",
    "Too many threads are open. None of them can finish.",
    [
      "You start things and lose them halfway",
      "The problem is disorder rather than volume of work",
      "You read the same paragraph and take in none of it",
      "Concentrating harder does not work",
    ],
    "This is disorder, not overload. Forcing concentration on a scattered system does not work. It needs one thing, given a shape, until the field settles.",
  ),
  page(
    "M4",
    "You go hard. Then you collapse. Then you go hard again.",
    "The system swings between full output and shutdown, with nothing in between.",
    [
      "Good weeks and lost weeks, on repeat",
      "You cannot sustain what you start",
      "The crash arrives without much warning",
      "You keep believing this time will be different",
    ],
    "The crash is not weakness. It is the correction to the push. The way out is not more discipline at the top — it is taking less, so there is less to fall from.",
  ),
  page(
    "P1",
    "Your body is holding. Shoulders, jaw, neck, gut — something is always tight.",
    "The body braced for something and never stood down.",
    [
      "You notice the tension only when you stop",
      "Massage and stretching help briefly, then it returns",
      "Nothing is injured",
      "It worsens under stress and never fully clears",
    ],
    "The holding is not in the muscle. It is in an instruction the body never cancelled. Stretching does not reach it. Contracting deliberately and then releasing does.",
  ),
  page(
    "P2",
    "The body does not move the way it used to.",
    "The range you stopped using is the range you lost.",
    [
      "Getting up from the floor takes planning",
      "Certain movements are no longer available",
      "There is no injury and no pain, only restriction",
      "It came on gradually enough that you barely noticed",
    ],
    "The body keeps the range it uses and releases the rest. Nothing is damaged — the range is unclaimed. Movement reclaims it, not by force, but by visiting the edges often enough that the body decides to keep them.",
  ),
  page(
    "P3",
    "The body feels sluggish. Heavy. Slow to start.",
    "A body that does not move produces less energy to move with.",
    [
      "You are physically slow rather than mentally tired",
      "Movement feels like an obligation",
      "The less you do, the less you want to do",
      "Rest does not restore it",
    ],
    "Energy is generated by moving, not stored by resting. Stillness signals that less is needed, so less is produced. The energy arrives after the movement, not before.",
  ),
];

export const PROBLEM_PAGE_BY_SLUG = Object.fromEntries(
  PROBLEM_PAGES.map((p) => [p.slug, p]),
) as Record<string, ProblemPage>;

/** Old / ad-hoc problem URLs → canonical mechanism pages (301). */
export const PROBLEM_SLUG_REDIRECTS: Record<string, string> = {
  insomnia: "a-mind-that-wont-switch-off",
  "people-pleasing": "self-criticism-and-shame",
  grief: "low-mood-and-heaviness",
  "chronic-stress": "overwhelm",
  "decision-fatigue": "feeling-torn",
  // Renamed tag slugs
  "feeling-overwhelmed": "overwhelm",
  "a-racing-mind": "a-mind-that-wont-switch-off",
  "numbness-and-disconnection": "emotional-numbness",
  "avoidance-and-procrastination": "procrastination-and-avoidance",
  "self-criticism": "self-criticism-and-shame",
  burnout: "burnout-cycles",
};

/** Lever order for practice lists — immediate first. */
export const PROBLEM_PRACTICE_LEVER_ORDER = [
  "breath",
  "awareness",
  "mind",
  "sound",
  "heart",
  "movement",
  "conservation",
  "sleep",
  "nutrition",
  "connection",
  "environment",
  "nature",
  "sustenance",
] as const;
