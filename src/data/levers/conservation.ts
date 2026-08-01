import type { Lever } from "@/data/levers/types";

export const conservationLever: Lever = {
  slug: "conservation",
  number: 0,
  name: "Conservation",
  subtitle: "The Prerequisite",
  layerLine: "The prerequisite for all twelve",
  intro: [
    "Before you can raise your energy, you must stop wasting it. Most people live with the tap running — leaking life force faster than they could ever build it. Conservation is the simple discipline of plugging the leaks, so that energy is no longer drained away but allowed to gather. It comes before everything else, because there is no use generating more energy into a vessel that cannot hold it.",
    "Energy that is contained does not simply sit still — it pools, concentrates, and begins to rise of its own accord. Recall that the natural movement of gathered life force is upward, along the central channel. The more the outward leaking stops, the more the energy accumulates, and the more it naturally turns vertical, lifting consciousness with it. Conservation forces nothing; it simply removes the constant draining that keeps the system perpetually low. Stop the leaks, and the rising happens by itself.",
    "The life force leaks through a handful of predictable channels. Each practice below seals one of them.",
  ],
  leadEssence:
    "Before you can raise your energy, you must stop wasting it. Most people live with the tap running — leaking life force faster than they could ever build it. Conservation is the simple discipline of plugging the leaks, so that energy is no longer drained away but allowed to gather. It comes before everything else, because there is no use generating more energy into a vessel that cannot hold it.",
  leadMechanism:
    "Energy that is contained does not simply sit still — it pools, concentrates, and begins to rise of its own accord. Recall that the natural movement of gathered life force is upward, along the central channel. The more the outward leaking stops, the more the energy accumulates, and the more it naturally turns vertical, lifting consciousness with it. Conservation forces nothing; it simply removes the constant draining that keeps the system perpetually low. Stop the leaks, and the rising happens by itself.",
  leadBridgeLine:
    "The life force leaks through a handful of predictable channels. Each practice below seals one of them.",
  practices: [
    {
      slug: "silence",
      name: "Silence",
      essence:
        "Speech is one of the largest drains of life force there is, because your speech is a projection of your energy — it runs on it.",
      mechanism: [
        "You can hear this directly: a person brimming with energy speaks with a strong, vivid voice, while a depleted person speaks slowly and faintly. The voice broadcasts the state of the energy, and spends it in the broadcasting.",
        "(Notice, too, that you cannot speak and breathe freely at the same time — speech interrupts the very breath that feeds the system.)",
        "The practice is periods of deliberate silence — not strain or suppression, but resting the voice, and with it the restless mind that drives it. In that silence, two things happen at once: the leaking of energy stops, and a natural clarity arises.",
      ],
      protocol: [
        {
          text: "Set aside a stretch of time each day, or a longer period each week, in which you simply do not speak.",
        },
      ],
      layers: ["Energetic Body", "Mental Body", "Physical Body"],
      leverSlug: "conservation",
      relatedPractices: ["sensory-rest", "deep-belly-breathing", "coherent-breathing"],
      metaTitle: "Silence — How to Practise It | Sunya",
      metaDescription:
        "Speech is one of the largest drains of life force there is, because your speech is a projection of your energy — it runs on it.",
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "sensory-rest",
            reason: "Both reduce outward sensory and cognitive leakage before deeper practice.",
          },
          {
            slug: "deep-belly-breathing",
            reason: "Silence removes vocal interruption and supports calmer diaphragmatic breathing.",
          },
          {
            slug: "coherent-breathing",
            reason: "Both establish steady baseline regulation and calm clarity.",
          },
        ],
      },
    },
    {
      slug: "sensory-rest",
      name: "Sensory Rest",
      essence:
        "The senses reach outward all day toward stimulation — screens, noise, endless input — and pour energy out as they go.",
      mechanism: [
        "The practice is to withdraw them periodically: cut unnecessary input, take deliberate breaks from stimulation, and let the senses settle into quiet.",
      ],
      protocol: [
        {
          text: "Cut unnecessary input, take deliberate breaks from stimulation, and let the senses settle into quiet.",
        },
      ],
      layers: ["Mental Body", "Energetic Body", "Environment"],
      leverSlug: "conservation",
      relatedPractices: ["silence", "coherent-breathing", "alternate-nostril-breathing"],
      metaTitle: "Sensory Rest — How to Practise It | Sunya",
      metaDescription:
        "The senses reach outward all day toward stimulation — screens, noise, endless input — and pour energy out as they go.",
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "silence",
            reason: "Both reduce outward engagement and preserve life force.",
          },
          {
            slug: "coherent-breathing",
            reason: "A quieter sensory field supports sustained rhythmic regulation.",
          },
          {
            slug: "alternate-nostril-breathing",
            reason: "Sensory quiet pairs naturally with concentrated channel-clearing breathwork.",
          },
        ],
      },
    },
    {
      slug: "fasting",
      name: "Fasting",
      essence: "A great deal of the body’s energy goes into digestion.",
      mechanism: [
        "Periodic fasting frees that energy — when the gut is at rest, the freed force rises toward clarity and higher function. Nearly every tradition discovered this, from Lent to Ramadan to the fasting days of yoga.",
      ],
      protocol: [
        {
          text: "Periodic fasting frees that energy — when the gut is at rest, the freed force rises toward clarity and higher function.",
        },
      ],
      layers: ["Physical Body", "Energetic Body", "Mental Body"],
      leverSlug: "conservation",
      relatedPractices: ["sexual-conservation", "deep-belly-breathing", "coherent-breathing"],
      metaTitle: "Fasting — How to Practise It | Sunya",
      metaDescription: "A great deal of the body’s energy goes into digestion.",
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "sexual-conservation",
            reason: "Both are direct conservation channels that reduce major vitality drains.",
          },
          {
            slug: "deep-belly-breathing",
            reason: "Supports nervous-system steadiness while energy reallocates from digestion.",
          },
          {
            slug: "coherent-breathing",
            reason: "Complements fasting with sustainable calm and coherence.",
          },
        ],
      },
    },
    {
      slug: "sexual-conservation",
      name: "Sexual Conservation",
      essence:
        "Sexual energy is among the most concentrated forms of the life force.",
      mechanism: [
        "Its habitual, excessive discharge is a significant drain; conserving it — through moderation, or periods of continence — keeps that vital energy within the system, where it can rise and be put to higher use.",
      ],
      protocol: [
        {
          text: "Conserving it — through moderation, or periods of continence — keeps that vital energy within the system, where it can rise and be put to higher use.",
        },
      ],
      layers: ["Energetic Body", "Physical Body"],
      leverSlug: "conservation",
      relatedPractices: ["the-root-lock", "fasting", "spinal-breathing"],
      metaTitle: "Sexual Conservation — How to Practise It | Sunya",
      metaDescription:
        "Sexual energy is among the most concentrated forms of the life force.",
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "the-root-lock",
            reason: "Both prevent downward loss and support upward redirection of force.",
          },
          {
            slug: "fasting",
            reason: "Each practice conserves major energetic expenditure channels.",
          },
          {
            slug: "spinal-breathing",
            reason: "Conserved force is naturally paired with upward channeling practices.",
          },
        ],
      },
    },
    {
      slug: "the-root-lock",
      name: "The Root Lock",
      essence:
        "A simple physical technique that seals energy at the base of the spine, so it pools and rises rather than draining downward and out:",
      mechanism: [],
      protocol: [
        { text: "Sit with the spine erect." },
        {
          text: "On an out-breath, gently contract and draw upward the muscles of the pelvic floor (the area between the base of the spine and the perineum).",
        },
        {
          text: "Hold the lift lightly for a few seconds — without strain — then release.",
        },
        { text: "Repeat several times, breathing naturally." },
      ],
      duration: "a few seconds",
      layers: ["Energetic Body", "Physical Body"],
      leverSlug: "conservation",
      relatedPractices: ["breath-retention", "the-great-lock", "spinal-breathing"],
      metaTitle: "The Root Lock — How to Practise It | Sunya",
      metaDescription:
        "A simple physical technique that seals energy at the base of the spine, so it pools and rises rather than draining downward and out:",
      generated: {
        layersSource: "STATED",
        durationSource: "STATED",
        relatedPracticeRationale: [
          {
            slug: "breath-retention",
            reason: "Both use pressure-and-hold dynamics to build contained internal force.",
          },
          {
            slug: "the-great-lock",
            reason: "The Great Lock explicitly builds on the root lock from Lever 0.",
          },
          {
            slug: "spinal-breathing",
            reason: "Root sealing complements upward movement through the central channel.",
          },
        ],
      },
    },
  ],
  groups: [],
  relatedZones: [
    "survival-crisis",
    "nervous-system-collapse",
    "emotional-accumulation",
    "mental-fragmentation",
    "the-hollow-seeker",
  ],
  metaTitle: "Conservation — The Prerequisite | Sunya Levers",
  metaDescription: "Before you can raise your energy, you must stop wasting it.",
  closing: [
    "None of this is grim self-denial. Each practice simply closes a valve through which your vitality has been quietly escaping. Seal them, and you will find you have far more energy than before — not because you generated more, but because you stopped pouring it away.",
  ],
};
