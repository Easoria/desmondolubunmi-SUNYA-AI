import type { Problem } from "@/data/problems/types";

export const insomniaProblem: Problem = {
  slug: "insomnia",
  title: "Why You Can’t Sleep",
  headline: "Not all insomnia is the same.",
  recognition: [
    "You are tired. Your body wants sleep. And still, somehow, you are awake.",
    "Maybe your thoughts will not stop. Maybe tomorrow is already loud in your head. Maybe you feel drained and wired at the same time. Or maybe you fall asleep fine — then wake at three, staring at the ceiling, counting the hours until morning.",
    "Whatever the shape of it, the night has stopped feeling like rest. It feels like something you have to get through.",
    "You have probably already tried the usual advice: no screens, herbal tea, earlier bedtime, forcing yourself to “just relax.” Sometimes it helps a little. Often it doesn’t — and then you feel worse, because now you are also failing at sleeping.",
    "That is not a character flaw. It is a mismatch. Different kinds of sleeplessness come from different states in the system. What settles one can leave another untouched — or make it worse.",
  ],
  variants: [
    {
      slug: "mind-will-not-stop",
      label: "Your mind will not stop",
      description:
        "Your body is heavy. Your mind is not. Thoughts keep looping — unfinished conversations, random fragments, the same worry arriving again in a slightly different costume. You are not necessarily scared. You are on. The day has not powered down.",
      signs: [
        "Thoughts keep generating even when you try to stop them",
        "You feel mentally busy more than emotionally panicked",
        "Lying still makes the noise louder",
        "You know you are tired and still cannot drop",
      ],
      families: ["H4"],
      practiceSlugs: [
        "cognitive-de-escalation",
        "journaling",
        "4-7-8-breathing",
        "breath-awareness",
        "the-somatic-runway",
        "coherent-breathing",
        "sensory-rest",
      ],
    },
    {
      slug: "worried-about-tomorrow",
      label: "You are worried about tomorrow",
      description:
        "It is not random chatter. It is projection. Meetings, money, conversations, what might go wrong. Your body is scanning for threat that has not arrived yet — and sleep will not come while the system still thinks it needs to stay ready.",
      signs: [
        "The thoughts are about the future, not noise for its own sake",
        "You feel braced, tense, or slightly alert in the body",
        "Checking the time makes it worse",
        "Reassurance (“it will be fine”) does not settle you",
      ],
      families: ["H1"],
      practiceSlugs: [
        "somatic-regulation",
        "deep-belly-breathing",
        "the-physiological-sigh",
        "cognitive-de-escalation",
        "body-scan",
        "journaling",
        "the-sleep-sanctuary",
        "environmental-architecture",
        "the-somatic-runway",
      ],
    },
    {
      slug: "exhausted-but-wired",
      label: "Exhausted but wired",
      description:
        "You are not “a bit tired.” You are depleted — and somehow still unable to power down. Coffee might be long gone. The body feels hollow and overstimulated at once. Pushing through the day on empty has left you with no reserve and no off-switch.",
      signs: [
        "Deep fatigue with a restless, buzzing edge",
        "Sleep feels out of reach even though you could cry from tiredness",
        "Stimulation (screens, conversation, scrolling) makes it worse, but stillness feels impossible",
        "Energising “fixes” leave you more agitated",
      ],
      families: ["L1", "H4"],
      practiceSlugs: [
        "non-sleep-deep-rest",
        "somatic-regulation",
        "deep-belly-breathing",
        "4-7-8-breathing",
        "sensory-rest",
        "cognitive-de-escalation",
        "conscious-consumption",
        "the-circadian-architecture",
        "the-somatic-runway",
        "strategic-somatic-movement",
      ],
      sequenceNote:
        "Restore and settle first. Do not use energising practices at night — anything that revs the system up will make tonight harder. Strategic Somatic Movement belongs in the daytime only.",
    },
    {
      slug: "wake-at-three",
      label: "You wake at three and cannot get back",
      description:
        "Falling asleep was not the problem. Staying under was. You surface in the small hours — sometimes with a jolt, sometimes for no clear reason — and then the night opens up in front of you. The mind arrives. The body is half-awake. Dawn starts doing maths in your head.",
      signs: [
        "Initial sleep came relatively easily",
        "Waking is consistent (often 2–4am)",
        "Clock-watching and calculating sleep left makes it worse",
        "Full “wake-up” behaviours (bright light, phone, planning) lock you into the day too early",
      ],
      families: ["H1", "M4"],
      practiceSlugs: [
        "cognitive-de-escalation",
        "coherent-breathing",
        "breath-awareness",
        "non-doing",
        "4-7-8-breathing",
        "body-scan",
        "the-somatic-runway",
        "the-circadian-architecture",
        "environmental-architecture",
        "biological-adaptability",
      ],
    },
  ],
  metaTitle: "Why You Can't Sleep — And What Actually Works | Sunya",
  metaDescription:
    "Not all insomnia is the same. A racing mind, night-time anxiety, and being exhausted-but-wired need different things. Find which one is yours, and the practices that work for it.",
};
