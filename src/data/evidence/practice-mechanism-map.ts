/** SPEC 47 — practice ↔ mechanism mapping. Generated from the settled 16 Nov mapping. */

export type MechanismHonesty = "nothing-found" | "custom";

export type PracticeMechanismLink = {
  slug: string;
  /** Link label on the practice page. */
  name: string;
  /** Italic qualifier after the em dash (family position, etc.). */
  qualifier?: string;
  honesty?: MechanismHonesty;
  /** Overrides the default nothing-found honesty sentence when honesty is "custom". */
  honestyText?: string;
};

export type PracticeEvidenceMapping = {
  /** leverSlug/practiceSlug */
  key: string;
  mechanisms: PracticeMechanismLink[] | null;
  /** Orphan / special note when mechanisms is null. */
  orphanNote?: string;
};

export const PRACTICE_MECHANISM_MAP: Record<string, PracticeEvidenceMapping> = {
  "awareness/aware-of-awareness": {
    key: "awareness/aware-of-awareness",
    mechanisms: [
      { slug: "awareness-without-thought", name: "Awareness without thought", qualifier: "depth 4" },
    ],
  },
  "awareness/body-scan": {
    key: "awareness/body-scan",
    mechanisms: [
      { slug: "interoception-and-body-scan", name: "Interoception and body scan" },
    ],
  },
  "awareness/breath-awareness": {
    key: "awareness/breath-awareness",
    mechanisms: [
      { slug: "meditation", name: "Meditation", qualifier: "Quieting repetitive thought, depth 2" },
    ],
  },
  "awareness/compassionate-presence": {
    key: "awareness/compassionate-presence",
    mechanisms: [
      { slug: "decentering", name: "Decentering", qualifier: "depth 1" },
      { slug: "compassion-and-loving-kindness-training", name: "Compassion and loving-kindness training" },
    ],
  },
  "awareness/deep-listening-meditation": {
    key: "awareness/deep-listening-meditation",
    mechanisms: [
      { slug: "self-referential-processing", name: "Self-referential processing", qualifier: "depth 3" },
      { slug: "music-and-deliberately-chosen-sound", name: "Music and deliberately chosen sound" },
    ],
  },
  "awareness/disidentifying": {
    key: "awareness/disidentifying",
    mechanisms: [
      { slug: "decentering", name: "Decentering", qualifier: "depth 1" },
    ],
  },
  "awareness/inner-gaze": {
    key: "awareness/inner-gaze",
    mechanisms: [
      { slug: "meditation", name: "Meditation", qualifier: "depth 2" },
    ],
  },
  "awareness/non-doing": {
    key: "awareness/non-doing",
    mechanisms: [
      { slug: "self-referential-processing", name: "Self-referential processing", qualifier: "depth 3" },
    ],
  },
  "awareness/non-sleep-deep-rest": {
    key: "awareness/non-sleep-deep-rest",
    mechanisms: [
      { slug: "interoception-and-body-scan", name: "Interoception and body scan", qualifier: "calming" },
    ],
  },
  "awareness/pure-observation": {
    key: "awareness/pure-observation",
    mechanisms: [
      { slug: "decentering", name: "Decentering", qualifier: "depth 1" },
    ],
  },
  "awareness/reading-your-vital-state": {
    key: "awareness/reading-your-vital-state",
    mechanisms: [
      { slug: "interoception-and-body-scan", name: "Interoception and body scan" },
    ],
  },
  "awareness/self-inquiry": {
    key: "awareness/self-inquiry",
    mechanisms: [
      { slug: "awareness-without-thought", name: "Awareness without thought", qualifier: "depth 4" },
    ],
  },
  "awareness/being-nothing": {
    key: "awareness/being-nothing",
    mechanisms: [
      { slug: "awareness-without-thought", name: "Awareness without thought", qualifier: "depth 4" },
    ],
  },
  "awareness/looking-at-death": {
    key: "awareness/looking-at-death",
    mechanisms: [
      { slug: "awareness-without-thought", name: "Awareness without thought", qualifier: "depth 4" },
    ],
  },
  "awareness/whole-system-awareness": {
    key: "awareness/whole-system-awareness",
    mechanisms: [
      { slug: "self-referential-processing", name: "Self-referential processing", qualifier: "depth 3" },
      { slug: "interoception-and-body-scan", name: "Interoception and body scan" },
    ],
  },
  "breath/4-7-8-breathing": {
    key: "breath/4-7-8-breathing",
    mechanisms: [
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing", qualifier: "calming" },
    ],
  },
  "breath/alternate-nostril-breathing": {
    key: "breath/alternate-nostril-breathing",
    mechanisms: [
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing", qualifier: "Regulating arousal — calming" },
    ],
  },
  "breath/bellows-breath": {
    key: "breath/bellows-breath",
    mechanisms: [
      { slug: "activating-breathwork", name: "Activating breathwork", qualifier: "Regulating arousal — activating" },
    ],
  },
  "breath/breath-retention": {
    key: "breath/breath-retention",
    mechanisms: [
      { slug: "activating-breathwork", name: "Activating breathwork", qualifier: "activating" },
    ],
  },
  "breath/coherent-breathing": {
    key: "breath/coherent-breathing",
    mechanisms: [
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing", qualifier: "calming" },
    ],
  },
  "breath/cyclic-hyperventilation": {
    key: "breath/cyclic-hyperventilation",
    mechanisms: [
      { slug: "activating-breathwork", name: "Activating breathwork", qualifier: "activating" },
    ],
  },
  "breath/deep-belly-breathing": {
    key: "breath/deep-belly-breathing",
    mechanisms: [
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing", qualifier: "calming" },
    ],
  },
  "breath/skull-shining-breath": {
    key: "breath/skull-shining-breath",
    mechanisms: [
      { slug: "activating-breathwork", name: "Activating breathwork", qualifier: "activating" },
    ],
  },
  "breath/spinal-breathing": {
    key: "breath/spinal-breathing",
    mechanisms: [
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing", qualifier: "calming" },
    ],
  },
  "breath/the-great-lock": {
    key: "breath/the-great-lock",
    mechanisms: [
      { slug: "activating-breathwork", name: "Activating breathwork" },
      { slug: "pelvic-floor-contraction-as-an-inner-practice", name: "Pelvic floor contraction", honesty: "custom", honestyText: "nothing found for the lock itself" },
    ],
  },
  "breath/the-physiological-sigh": {
    key: "breath/the-physiological-sigh",
    mechanisms: [
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing", qualifier: "calming" },
    ],
  },
  "connection/honesty": {
    key: "connection/honesty",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "connection/arriving-full": {
    key: "connection/arriving-full",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "connection/service": {
    key: "connection/service",
    mechanisms: [
      { slug: "prosocial-behaviour-and-volunteering", name: "Prosocial behaviour and volunteering" },
    ],
  },
  "connection/knowing-yourself": {
    key: "connection/knowing-yourself",
    mechanisms: [
      { slug: "values-clarification-and-self-affirmation", name: "Values clarification and self-affirmation" },
    ],
  },
  "connection/being-with-someone": {
    key: "connection/being-with-someone",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
      { slug: "affective-touch-and-co-regulation", name: "Affective touch and co-regulation" },
    ],
  },
  "connection/forgiveness": {
    key: "connection/forgiveness",
    mechanisms: [
      { slug: "forgiveness", name: "Forgiveness" },
    ],
  },
  "connection/community": {
    key: "connection/community",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "connection/touch": {
    key: "connection/touch",
    mechanisms: [
      { slug: "affective-touch-and-co-regulation", name: "Affective touch and co-regulation" },
    ],
  },
  "conservation/fasting": {
    key: "conservation/fasting",
    mechanisms: [
      { slug: "time-restricted-eating-and-fasting", name: "Time-restricted eating and fasting" },
    ],
  },
  "conservation/sensory-rest": {
    key: "conservation/sensory-rest",
    mechanisms: [
      { slug: "input-restriction-and-attentional-load", name: "Input restriction and attentional load" },
    ],
  },
  "conservation/sexual-conservation": {
    key: "conservation/sexual-conservation",
    mechanisms: [
      { slug: "sexual-behaviour-and-abstinence", name: "Sexual behaviour and abstinence" },
    ],
  },
  "conservation/silence": {
    key: "conservation/silence",
    mechanisms: [
      { slug: "input-restriction-and-attentional-load", name: "Input restriction and attentional load" },
    ],
  },
  "conservation/the-root-lock": {
    key: "conservation/the-root-lock",
    mechanisms: [
      { slug: "pelvic-floor-contraction-as-an-inner-practice", name: "Pelvic floor contraction as an inner practice", honesty: "nothing-found" },
    ],
  },
  "environment/air-light-and-sound": {
    key: "environment/air-light-and-sound",
    mechanisms: [
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure" },
    ],
  },
  "environment/clearing-your-space": {
    key: "environment/clearing-your-space",
    mechanisms: [
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
    ],
  },
  "environment/places-of-stillness": {
    key: "environment/places-of-stillness",
    mechanisms: [
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
      { slug: "energetic-properties-of-objects-and-spaces", name: "Energetic properties of objects and spaces", honesty: "nothing-found" },
    ],
  },
  "environment/where-you-live": {
    key: "environment/where-you-live",
    mechanisms: [
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "environment/living-among-others": {
    key: "environment/living-among-others",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "environment/what-you-wear": {
    key: "environment/what-you-wear",
    mechanisms: [
      { slug: "pressure-and-texture-on-the-skin", name: "Pressure and texture on the skin" },
    ],
  },
  "environment/the-objects-around-you": {
    key: "environment/the-objects-around-you",
    mechanisms: [
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
      { slug: "energetic-properties-of-objects-and-spaces", name: "Energetic properties of objects and spaces", honesty: "nothing-found" },
    ],
  },
  "heart/ecstatic-chanting": {
    key: "heart/ecstatic-chanting",
    mechanisms: [
      { slug: "sustained-vocalisation", name: "Sustained vocalisation" },
      { slug: "religious-and-devotional-practice", name: "Religious and devotional practice" },
    ],
  },
  "heart/emotional-presence": {
    key: "heart/emotional-presence",
    mechanisms: [
      { slug: "acceptance-and-psychological-flexibility", name: "Acceptance and psychological flexibility" },
    ],
  },
  "heart/giving-and-receiving": {
    key: "heart/giving-and-receiving",
    mechanisms: [
      { slug: "compassion-and-loving-kindness-training", name: "Compassion and loving-kindness training" },
    ],
  },
  "heart/heart-coherence": {
    key: "heart/heart-coherence",
    mechanisms: [
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing", qualifier: "calming" },
    ],
  },
  "heart/holding-love-steady": {
    key: "heart/holding-love-steady",
    mechanisms: [
      { slug: "compassion-and-loving-kindness-training", name: "Compassion and loving-kindness training" },
    ],
  },
  "heart/loving-kindness": {
    key: "heart/loving-kindness",
    mechanisms: [
      { slug: "compassion-and-loving-kindness-training", name: "Compassion and loving-kindness training" },
    ],
  },
  "heart/loving-life-itself": {
    key: "heart/loving-life-itself",
    mechanisms: [
      { slug: "religious-and-devotional-practice", name: "Religious and devotional practice" },
      { slug: "awareness-without-thought", name: "Awareness without thought", qualifier: "depth 4" },
    ],
  },
  "heart/prayer": {
    key: "heart/prayer",
    mechanisms: [
      { slug: "religious-and-devotional-practice", name: "Religious and devotional practice" },
    ],
  },
  "heart/surrendering": {
    key: "heart/surrendering",
    mechanisms: [
      { slug: "acceptance-and-psychological-flexibility", name: "Acceptance and psychological flexibility" },
    ],
  },
  "mind/clarity-of-purpose": {
    key: "mind/clarity-of-purpose",
    mechanisms: [
      { slug: "values-clarification-and-self-affirmation", name: "Values clarification and self-affirmation" },
      { slug: "work-and-values-congruence", name: "Work and values congruence" },
    ],
  },
  "mind/conscious-affirmation": {
    key: "mind/conscious-affirmation",
    mechanisms: [
      { slug: "values-clarification-and-self-affirmation", name: "Values clarification and self-affirmation" },
    ],
  },
  "mind/visualisation-and-action": {
    key: "mind/visualisation-and-action",
    mechanisms: [
      { slug: "mental-imagery-and-visualisation", name: "Mental imagery and visualisation" },
    ],
  },
  "mind/input-control": {
    key: "mind/input-control",
    mechanisms: [
      { slug: "input-restriction-and-attentional-load", name: "Input restriction and attentional load", qualifier: "Quieting repetitive thought, depth 2" },
    ],
  },
  "mind/journaling": {
    key: "mind/journaling",
    mechanisms: [
      { slug: "expressive-writing", name: "Expressive writing", qualifier: "Quieting repetitive thought, depth 2" },
    ],
  },
  "mind/laser-focus": {
    key: "mind/laser-focus",
    mechanisms: [
      { slug: "meditation", name: "Meditation", qualifier: "Quieting repetitive thought, depth 2" },
    ],
  },
  "mind/mindful-reflection": {
    key: "mind/mindful-reflection",
    mechanisms: [
      { slug: "decentering", name: "Decentering", qualifier: "Quieting repetitive thought, depth 1" },
    ],
  },
  "movement/joint-rotations": {
    key: "movement/joint-rotations",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/progressive-muscle-relaxation": {
    key: "movement/progressive-muscle-relaxation",
    mechanisms: [
      { slug: "progressive-muscle-relaxation-and-stillness", name: "Progressive muscle relaxation and stillness", qualifier: "calming" },
    ],
  },
  "movement/spinal-loosening": {
    key: "movement/spinal-loosening",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/thumb-to-index-seal": {
    key: "movement/thumb-to-index-seal",
    mechanisms: [
      { slug: "hand-positions", name: "Hand positions", honesty: "nothing-found" },
    ],
  },
  "movement/the-corpse-pose": {
    key: "movement/the-corpse-pose",
    mechanisms: [
      { slug: "progressive-muscle-relaxation-and-stillness", name: "Progressive muscle relaxation and stillness", qualifier: "calming" },
      { slug: "interoception-and-body-scan", name: "Interoception and body scan" },
    ],
  },
  "movement/free-movement": {
    key: "movement/free-movement",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/the-deep-squat": {
    key: "movement/the-deep-squat",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/the-full-practice": {
    key: "movement/the-full-practice",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/the-meditation-seat": {
    key: "movement/the-meditation-seat",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/closed-hand-seal": {
    key: "movement/closed-hand-seal",
    mechanisms: [
      { slug: "hand-positions", name: "Hand positions", honesty: "nothing-found" },
    ],
  },
  "movement/prostration": {
    key: "movement/prostration",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/full-mobility-sequence": {
    key: "movement/full-mobility-sequence",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "nature/air": {
    key: "nature/air",
    mechanisms: [
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
    ],
  },
  "nature/earth": {
    key: "nature/earth",
    mechanisms: [
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
      { slug: "grounding-and-earthing", name: "Grounding and earthing", honesty: "custom", honestyText: "early, and the electrical claim is unsupported" },
    ],
  },
  "nature/fire": {
    key: "nature/fire",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure" },
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
    ],
  },
  "nature/wild-places": {
    key: "nature/wild-places",
    mechanisms: [
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
    ],
  },
  "nature/space": {
    key: "nature/space",
    mechanisms: [
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
    ],
  },
  "nature/water": {
    key: "nature/water",
    mechanisms: [
      { slug: "cold-exposure", name: "Cold exposure" },
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
    ],
  },
  "nutrition/when-you-eat": {
    key: "nutrition/when-you-eat",
    mechanisms: [
      { slug: "time-restricted-eating-and-fasting", name: "Time-restricted eating and fasting" },
    ],
  },
  "nutrition/cooking-and-eating-with-attention": {
    key: "nutrition/cooking-and-eating-with-attention",
    mechanisms: [
      { slug: "diet-composition", name: "Diet composition" },
      { slug: "meditation", name: "Meditation" },
    ],
  },
  "nutrition/fasting": {
    key: "nutrition/fasting",
    mechanisms: [
      { slug: "time-restricted-eating-and-fasting", name: "Time-restricted eating and fasting" },
    ],
  },
  "nutrition/herbs": {
    key: "nutrition/herbs",
    mechanisms: [
      { slug: "botanical-preparations", name: "Botanical preparations" },
    ],
  },
  "nutrition/how-food-affects-you": {
    key: "nutrition/how-food-affects-you",
    mechanisms: [
      { slug: "diet-composition", name: "Diet composition" },
    ],
  },
  "nutrition/how-you-eat": {
    key: "nutrition/how-you-eat",
    mechanisms: [
      { slug: "diet-composition", name: "Diet composition" },
      { slug: "interoception-and-body-scan", name: "Interoception and body scan" },
    ],
  },
  "nutrition/water": {
    key: "nutrition/water",
    mechanisms: [
      { slug: "hydration", name: "Hydration" },
    ],
  },
  "sleep/when-life-gets-irregular": {
    key: "sleep/when-life-gets-irregular",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure" },
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/caffeine-alcohol-and-timing": {
    key: "sleep/caffeine-alcohol-and-timing",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/taking-the-pressure-off": {
    key: "sleep/taking-the-pressure-off",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/tracking-your-sleep": {
    key: "sleep/tracking-your-sleep",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/light-and-sound-at-night": {
    key: "sleep/light-and-sound-at-night",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure" },
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
    ],
  },
  "sleep/sharing-a-bed": {
    key: "sleep/sharing-a-bed",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "sleep/sleep-position": {
    key: "sleep/sleep-position",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/settling-the-body": {
    key: "sleep/settling-the-body",
    mechanisms: [
      { slug: "progressive-muscle-relaxation-and-stillness", name: "Progressive muscle relaxation and stillness", qualifier: "calming" },
    ],
  },
  "sleep/moving-at-the-right-times": {
    key: "sleep/moving-at-the-right-times",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "sleep/your-body-clock": {
    key: "sleep/your-body-clock",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure and entrainment" },
    ],
  },
  "sleep/the-first-hour": {
    key: "sleep/the-first-hour",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure and entrainment" },
    ],
  },
  "sleep/the-bedroom": {
    key: "sleep/the-bedroom",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
      { slug: "pressure-and-texture-on-the-skin", name: "Pressure and texture on the skin" },
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
    ],
  },
  "sleep/the-wind-down-hour": {
    key: "sleep/the-wind-down-hour",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/the-edge-of-sleep": {
    key: "sleep/the-edge-of-sleep",
    mechanisms: [
      { slug: "interoception-and-body-scan", name: "Interoception and body scan" },
    ],
  },
  "sound/chanting": {
    key: "sound/chanting",
    mechanisms: [
      { slug: "sustained-vocalisation", name: "Sustained vocalisation" },
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing" },
    ],
  },
  "sound/conscious-listening": {
    key: "sound/conscious-listening",
    mechanisms: [
      { slug: "music-and-deliberately-chosen-sound", name: "Music and deliberately chosen sound" },
    ],
  },
  "sound/humming": {
    key: "sound/humming",
    mechanisms: [
      { slug: "sustained-vocalisation", name: "Sustained vocalisation" },
      { slug: "slow-and-paced-breathing", name: "Slow and paced breathing" },
    ],
  },
  "sustenance/what-money-is": {
    key: "sustenance/what-money-is",
    mechanisms: [
      { slug: "financial-security-and-scarcity", name: "Financial security and scarcity" },
    ],
  },
  "sustenance/how-you-think-about-money": {
    key: "sustenance/how-you-think-about-money",
    mechanisms: [
      { slug: "financial-security-and-scarcity", name: "Financial security and scarcity" },
    ],
  },
  "sustenance/building-skill": {
    key: "sustenance/building-skill",
    mechanisms: [
      { slug: "skill-mastery-and-self-efficacy", name: "Skill mastery and self-efficacy" },
    ],
  },
  "sustenance/right-livelihood": {
    key: "sustenance/right-livelihood",
    mechanisms: [
      { slug: "work-and-values-congruence", name: "Work and values congruence" },
    ],
  },
  "sustenance/spending-less": {
    key: "sustenance/spending-less",
    mechanisms: [
      { slug: "financial-security-and-scarcity", name: "Financial security and scarcity" },
    ],
  },
  "sustenance/easing-money-fear": {
    key: "sustenance/easing-money-fear",
    mechanisms: [
      { slug: "financial-security-and-scarcity", name: "Financial security and scarcity" },
      { slug: "rumination-and-mind-wandering", name: "Rumination and mind-wandering", qualifier: "depth 2" },
    ],
  },
};

export type MechanismPracticeRef = {
  leverSlug: string;
  slug: string;
  name: string;
};

/** Practices that list this mechanism, primary-first order preserved from Part 3. */
export const MECHANISM_PRACTICES: Record<string, MechanismPracticeRef[]> = {
  "acceptance-and-psychological-flexibility": [
    { leverSlug: "heart", slug: "emotional-presence", name: "Emotional Presence" },
    { leverSlug: "heart", slug: "surrendering", name: "Surrendering" },
  ],
  "activating-breathwork": [
    { leverSlug: "breath", slug: "bellows-breath", name: "Bellows Breath" },
    { leverSlug: "breath", slug: "skull-shining-breath", name: "Skull-Shining Breath" },
    { leverSlug: "breath", slug: "cyclic-hyperventilation", name: "Cyclic Hyperventilation" },
    { leverSlug: "breath", slug: "breath-retention", name: "Breath Retention" },
    { leverSlug: "breath", slug: "the-great-lock", name: "The Great Lock" },
  ],
  "affective-touch-and-co-regulation": [
    { leverSlug: "connection", slug: "touch", name: "Touch" },
    { leverSlug: "connection", slug: "being-with-someone", name: "Being With Someone" },
  ],
  "air-quality-noise-and-visual-order": [
    { leverSlug: "environment", slug: "clearing-your-space", name: "Clearing Your Space" },
    { leverSlug: "environment", slug: "the-objects-around-you", name: "The Objects Around You" },
    { leverSlug: "environment", slug: "air-light-and-sound", name: "Air, Light and Sound" },
    { leverSlug: "environment", slug: "where-you-live", name: "Where You Live" },
    { leverSlug: "sleep", slug: "light-and-sound-at-night", name: "Light and Sound at Night" },
    { leverSlug: "sleep", slug: "the-bedroom", name: "The Bedroom" },
    { leverSlug: "nature", slug: "air", name: "Air" },
  ],
  "awareness-without-thought": [
    { leverSlug: "awareness", slug: "self-inquiry", name: "Self-Inquiry" },
    { leverSlug: "awareness", slug: "looking-at-death", name: "Looking at Death" },
    { leverSlug: "awareness", slug: "aware-of-awareness", name: "Aware of Awareness" },
    { leverSlug: "awareness", slug: "being-nothing", name: "Being Nothing" },
    { leverSlug: "heart", slug: "loving-life-itself", name: "Loving Life Itself" },
  ],
  "botanical-preparations": [
    { leverSlug: "nutrition", slug: "herbs", name: "Herbs" },
  ],
  "circadian-light-exposure-and-entrainment": [
    { leverSlug: "sleep", slug: "your-body-clock", name: "Your Body Clock" },
    { leverSlug: "sleep", slug: "light-and-sound-at-night", name: "Light and Sound at Night" },
    { leverSlug: "sleep", slug: "the-first-hour", name: "The First Hour" },
    { leverSlug: "sleep", slug: "when-life-gets-irregular", name: "When Life Gets Irregular" },
    { leverSlug: "nature", slug: "fire", name: "Fire" },
    { leverSlug: "environment", slug: "air-light-and-sound", name: "Air, Light and Sound" },
  ],
  "cold-exposure": [
    { leverSlug: "nature", slug: "water", name: "Water" },
  ],
  "compassion-and-loving-kindness-training": [
    { leverSlug: "heart", slug: "holding-love-steady", name: "Holding Love Steady" },
    { leverSlug: "heart", slug: "loving-kindness", name: "Loving-Kindness" },
    { leverSlug: "heart", slug: "giving-and-receiving", name: "Giving and Receiving" },
    { leverSlug: "awareness", slug: "compassionate-presence", name: "Compassionate Presence" },
  ],
  "decentering": [
    { leverSlug: "mind", slug: "mindful-reflection", name: "Mindful Reflection" },
    { leverSlug: "awareness", slug: "compassionate-presence", name: "Compassionate Presence" },
    { leverSlug: "awareness", slug: "pure-observation", name: "Pure Observation" },
    { leverSlug: "awareness", slug: "disidentifying", name: "Disidentifying" },
  ],
  "diet-composition": [
    { leverSlug: "nutrition", slug: "how-food-affects-you", name: "How Food Affects You" },
    { leverSlug: "nutrition", slug: "how-you-eat", name: "How You Eat" },
    { leverSlug: "nutrition", slug: "cooking-and-eating-with-attention", name: "Cooking and Eating with Attention" },
  ],
  "energetic-properties-of-objects-and-spaces": [
    { leverSlug: "environment", slug: "the-objects-around-you", name: "The Objects Around You" },
    { leverSlug: "environment", slug: "places-of-stillness", name: "Places of Stillness" },
  ],
  "expressive-writing": [
    { leverSlug: "mind", slug: "journaling", name: "Journaling" },
  ],
  "financial-security-and-scarcity": [
    { leverSlug: "sustenance", slug: "how-you-think-about-money", name: "How You Think About Money" },
    { leverSlug: "sustenance", slug: "what-money-is", name: "What Money Is" },
    { leverSlug: "sustenance", slug: "spending-less", name: "Spending Less" },
    { leverSlug: "sustenance", slug: "easing-money-fear", name: "Easing Money Fear" },
  ],
  "forgiveness": [
    { leverSlug: "connection", slug: "forgiveness", name: "Forgiveness" },
  ],
  "grounding-and-earthing": [
    { leverSlug: "nature", slug: "earth", name: "Earth" },
  ],
  "hand-positions": [
    { leverSlug: "movement", slug: "thumb-to-index-seal", name: "Thumb-to-Index Seal" },
    { leverSlug: "movement", slug: "closed-hand-seal", name: "Closed-Hand Seal" },
  ],
  "hydration": [
    { leverSlug: "nutrition", slug: "water", name: "Water" },
  ],
  "input-restriction-and-attentional-load": [
    { leverSlug: "conservation", slug: "silence", name: "Silence" },
    { leverSlug: "conservation", slug: "sensory-rest", name: "Sensory Rest" },
    { leverSlug: "mind", slug: "input-control", name: "Input Control" },
  ],
  "interoception-and-body-scan": [
    { leverSlug: "awareness", slug: "body-scan", name: "Body Scan" },
    { leverSlug: "awareness", slug: "non-sleep-deep-rest", name: "Non-Sleep Deep Rest (NSDR)" },
    { leverSlug: "awareness", slug: "reading-your-vital-state", name: "Reading Your Vital State" },
    { leverSlug: "sleep", slug: "the-edge-of-sleep", name: "The Edge of Sleep" },
    { leverSlug: "movement", slug: "the-corpse-pose", name: "The Corpse Pose" },
    { leverSlug: "awareness", slug: "whole-system-awareness", name: "Whole-System Awareness" },
    { leverSlug: "nutrition", slug: "how-you-eat", name: "How You Eat" },
  ],
  "meditation": [
    { leverSlug: "mind", slug: "laser-focus", name: "Laser Focus" },
    { leverSlug: "awareness", slug: "breath-awareness", name: "Breath Awareness" },
    { leverSlug: "awareness", slug: "inner-gaze", name: "Inner Gaze" },
    { leverSlug: "nutrition", slug: "cooking-and-eating-with-attention", name: "Cooking and Eating with Attention" },
  ],
  "mental-imagery-and-visualisation": [
    { leverSlug: "mind", slug: "visualisation-and-action", name: "Visualisation and Action" },
  ],
  "movement-mobility-and-exercise-timing": [
    { leverSlug: "movement", slug: "joint-rotations", name: "Joint Rotations" },
    { leverSlug: "movement", slug: "full-mobility-sequence", name: "Full Mobility Sequence" },
    { leverSlug: "movement", slug: "spinal-loosening", name: "Spinal Loosening" },
    { leverSlug: "movement", slug: "the-full-practice", name: "The Full Practice" },
    { leverSlug: "movement", slug: "free-movement", name: "Free Movement" },
    { leverSlug: "movement", slug: "the-meditation-seat", name: "The Meditation Seat" },
    { leverSlug: "movement", slug: "the-deep-squat", name: "The Deep Squat" },
    { leverSlug: "movement", slug: "prostration", name: "Prostration" },
    { leverSlug: "sleep", slug: "moving-at-the-right-times", name: "Moving at the Right Times" },
  ],
  "music-and-deliberately-chosen-sound": [
    { leverSlug: "sound", slug: "conscious-listening", name: "Conscious Listening" },
    { leverSlug: "awareness", slug: "deep-listening-meditation", name: "Deep Listening Meditation" },
  ],
  "nature-exposure-and-awe": [
    { leverSlug: "nature", slug: "earth", name: "Earth" },
    { leverSlug: "nature", slug: "air", name: "Air" },
    { leverSlug: "nature", slug: "space", name: "Space" },
    { leverSlug: "nature", slug: "wild-places", name: "Wild Places" },
    { leverSlug: "environment", slug: "places-of-stillness", name: "Places of Stillness" },
    { leverSlug: "nature", slug: "water", name: "Water" },
    { leverSlug: "nature", slug: "fire", name: "Fire" },
  ],
  "pelvic-floor-contraction-as-an-inner-practice": [
    { leverSlug: "conservation", slug: "the-root-lock", name: "The Root Lock" },
    { leverSlug: "breath", slug: "the-great-lock", name: "The Great Lock" },
  ],
  "pressure-and-texture-on-the-skin": [
    { leverSlug: "environment", slug: "what-you-wear", name: "What You Wear" },
    { leverSlug: "sleep", slug: "the-bedroom", name: "The Bedroom" },
  ],
  "progressive-muscle-relaxation-and-stillness": [
    { leverSlug: "movement", slug: "progressive-muscle-relaxation", name: "Progressive Muscle Relaxation" },
    { leverSlug: "movement", slug: "the-corpse-pose", name: "The Corpse Pose" },
    { leverSlug: "sleep", slug: "settling-the-body", name: "Settling the Body" },
  ],
  "prosocial-behaviour-and-volunteering": [
    { leverSlug: "connection", slug: "service", name: "Service" },
  ],
  "religious-and-devotional-practice": [
    { leverSlug: "heart", slug: "loving-life-itself", name: "Loving Life Itself" },
    { leverSlug: "heart", slug: "prayer", name: "Prayer" },
    { leverSlug: "heart", slug: "ecstatic-chanting", name: "Ecstatic Chanting" },
  ],
  "rumination-and-mind-wandering": [
    { leverSlug: "sustenance", slug: "easing-money-fear", name: "Easing Money Fear" },
  ],
  "self-referential-processing": [
    { leverSlug: "awareness", slug: "whole-system-awareness", name: "Whole-System Awareness" },
    { leverSlug: "awareness", slug: "deep-listening-meditation", name: "Deep Listening Meditation" },
    { leverSlug: "awareness", slug: "non-doing", name: "Non-Doing" },
  ],
  "sexual-behaviour-and-abstinence": [
    { leverSlug: "conservation", slug: "sexual-conservation", name: "Sexual Conservation" },
  ],
  "skill-mastery-and-self-efficacy": [
    { leverSlug: "sustenance", slug: "building-skill", name: "Building Skill" },
  ],
  "sleep-behaviour": [
    { leverSlug: "sleep", slug: "taking-the-pressure-off", name: "Taking the Pressure Off" },
    { leverSlug: "sleep", slug: "caffeine-alcohol-and-timing", name: "Caffeine, Alcohol and Timing" },
    { leverSlug: "sleep", slug: "the-bedroom", name: "The Bedroom" },
    { leverSlug: "sleep", slug: "sleep-position", name: "Sleep Position" },
    { leverSlug: "sleep", slug: "sharing-a-bed", name: "Sharing a Bed" },
    { leverSlug: "sleep", slug: "the-wind-down-hour", name: "The Wind-Down Hour" },
    { leverSlug: "sleep", slug: "tracking-your-sleep", name: "Tracking Your Sleep" },
    { leverSlug: "sleep", slug: "when-life-gets-irregular", name: "When Life Gets Irregular" },
  ],
  "slow-and-paced-breathing": [
    { leverSlug: "breath", slug: "alternate-nostril-breathing", name: "Alternate-Nostril Breathing" },
    { leverSlug: "breath", slug: "deep-belly-breathing", name: "Deep Belly Breathing" },
    { leverSlug: "breath", slug: "coherent-breathing", name: "Coherent Breathing" },
    { leverSlug: "breath", slug: "the-physiological-sigh", name: "The Physiological Sigh" },
    { leverSlug: "breath", slug: "4-7-8-breathing", name: "4-7-8 Breathing" },
    { leverSlug: "breath", slug: "spinal-breathing", name: "Spinal Breathing" },
    { leverSlug: "heart", slug: "heart-coherence", name: "Heart Coherence" },
    { leverSlug: "sound", slug: "chanting", name: "Chanting" },
    { leverSlug: "sound", slug: "humming", name: "Humming" },
  ],
  "social-connection-and-isolation": [
    { leverSlug: "connection", slug: "arriving-full", name: "Arriving Full" },
    { leverSlug: "connection", slug: "honesty", name: "Honesty" },
    { leverSlug: "connection", slug: "being-with-someone", name: "Being With Someone" },
    { leverSlug: "connection", slug: "community", name: "Community" },
    { leverSlug: "environment", slug: "living-among-others", name: "Living Among Others" },
    { leverSlug: "sleep", slug: "sharing-a-bed", name: "Sharing a Bed" },
    { leverSlug: "environment", slug: "where-you-live", name: "Where You Live" },
  ],
  "sustained-vocalisation": [
    { leverSlug: "sound", slug: "chanting", name: "Chanting" },
    { leverSlug: "sound", slug: "humming", name: "Humming" },
    { leverSlug: "heart", slug: "ecstatic-chanting", name: "Ecstatic Chanting" },
  ],
  "time-restricted-eating-and-fasting": [
    { leverSlug: "conservation", slug: "fasting", name: "Fasting" },
    { leverSlug: "nutrition", slug: "when-you-eat", name: "When You Eat" },
    { leverSlug: "nutrition", slug: "fasting", name: "Fasting" },
  ],
  "values-clarification-and-self-affirmation": [
    { leverSlug: "mind", slug: "clarity-of-purpose", name: "Clarity of Purpose" },
    { leverSlug: "mind", slug: "conscious-affirmation", name: "Conscious Affirmation" },
    { leverSlug: "connection", slug: "knowing-yourself", name: "Knowing Yourself" },
  ],
  "work-and-values-congruence": [
    { leverSlug: "sustenance", slug: "right-livelihood", name: "Right Livelihood" },
    { leverSlug: "mind", slug: "clarity-of-purpose", name: "Clarity of Purpose" },
  ],
};

export function getPracticeEvidence(leverSlug: string, practiceSlug: string) {
  return PRACTICE_MECHANISM_MAP[`${leverSlug}/${practiceSlug}`] ?? null;
}

export function getPracticesForMechanism(mechanismSlug: string) {
  return MECHANISM_PRACTICES[mechanismSlug] ?? [];
}

/** Replace the Practices that rest on it list with SPEC 47 linked assignments. */
export function withMappedPracticeLinks(markdown: string, mechanismSlug: string): string {
  const practices = getPracticesForMechanism(mechanismSlug);
  if (!practices.length) return markdown;

  const links = practices
    .map((p) => `[${p.name}](/practices/${p.leverSlug}/${p.slug})`)
    .join(" · ");

  return markdown.replace(
    /## Practices that rest on it\n\n[\s\S]*?(?=\n## )/,
    `## Practices that rest on it\n\n${links}\n\n`,
  );
}

