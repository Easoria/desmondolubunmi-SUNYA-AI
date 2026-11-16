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
  "awareness/the-shunya": {
    key: "awareness/the-shunya",
    mechanisms: [
      { slug: "awareness-without-thought", name: "Awareness without thought", qualifier: "depth 4" },
    ],
  },
  "awareness/ultimate-self-inquiry": {
    key: "awareness/ultimate-self-inquiry",
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
  "connection/internal-saturation": {
    key: "connection/internal-saturation",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "connection/karma-yoga": {
    key: "connection/karma-yoga",
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
  "connection/somatic-communion": {
    key: "connection/somatic-communion",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
      { slug: "affective-touch-and-co-regulation", name: "Affective touch and co-regulation" },
    ],
  },
  "connection/the-alchemy-of-forgiveness": {
    key: "connection/the-alchemy-of-forgiveness",
    mechanisms: [
      { slug: "forgiveness", name: "Forgiveness" },
    ],
  },
  "connection/the-ecosystem-of-belonging": {
    key: "connection/the-ecosystem-of-belonging",
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
  "environment/atmospheric-purity": {
    key: "environment/atmospheric-purity",
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
  "environment/consecrated-spaces": {
    key: "environment/consecrated-spaces",
    mechanisms: [
      { slug: "nature-exposure-and-awe", name: "Nature exposure and awe" },
      { slug: "energetic-properties-of-objects-and-spaces", name: "Energetic properties of objects and spaces", honesty: "nothing-found" },
    ],
  },
  "environment/cultural-resonance": {
    key: "environment/cultural-resonance",
    mechanisms: [
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "environment/navigating-shared-frequencies": {
    key: "environment/navigating-shared-frequencies",
    mechanisms: [
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "environment/somatic-architecture": {
    key: "environment/somatic-architecture",
    mechanisms: null,
    orphanNote: "no mechanism page yet; this practice is carried on tradition and your own trial",
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
  "heart/non-dual-devotion": {
    key: "heart/non-dual-devotion",
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
  "mind/conscious-creation": {
    key: "mind/conscious-creation",
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
  "movement/the-consciousness-seal": {
    key: "movement/the-consciousness-seal",
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
  "movement/the-dance-of-dissolution": {
    key: "movement/the-dance-of-dissolution",
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
  "movement/the-primal-seal": {
    key: "movement/the-primal-seal",
    mechanisms: [
      { slug: "hand-positions", name: "Hand positions", honesty: "nothing-found" },
    ],
  },
  "movement/the-prostration-sujud-balasana": {
    key: "movement/the-prostration-sujud-balasana",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "movement/the-somatic-primer": {
    key: "movement/the-somatic-primer",
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
  "nature/places-of-natural-transformational-power": {
    key: "nature/places-of-natural-transformational-power",
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
  "nutrition/chrononutrition": {
    key: "nutrition/chrononutrition",
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
  "sleep/biological-adaptability": {
    key: "sleep/biological-adaptability",
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
  "sleep/cognitive-de-escalation": {
    key: "sleep/cognitive-de-escalation",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/data-and-intuition": {
    key: "sleep/data-and-intuition",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/environmental-architecture": {
    key: "sleep/environmental-architecture",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure" },
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
    ],
  },
  "sleep/relational-ecology": {
    key: "sleep/relational-ecology",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
      { slug: "social-connection-and-isolation", name: "Social connection and isolation" },
    ],
  },
  "sleep/somatic-alignment": {
    key: "sleep/somatic-alignment",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/somatic-regulation": {
    key: "sleep/somatic-regulation",
    mechanisms: [
      { slug: "progressive-muscle-relaxation-and-stillness", name: "Progressive muscle relaxation and stillness", qualifier: "calming" },
    ],
  },
  "sleep/strategic-somatic-movement": {
    key: "sleep/strategic-somatic-movement",
    mechanisms: [
      { slug: "movement-mobility-and-exercise-timing", name: "Movement, mobility and exercise timing" },
    ],
  },
  "sleep/the-circadian-architecture": {
    key: "sleep/the-circadian-architecture",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure and entrainment" },
    ],
  },
  "sleep/the-morning-ignition": {
    key: "sleep/the-morning-ignition",
    mechanisms: [
      { slug: "circadian-light-exposure-and-entrainment", name: "Circadian light exposure and entrainment" },
    ],
  },
  "sleep/the-sleep-sanctuary": {
    key: "sleep/the-sleep-sanctuary",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
      { slug: "air-quality-noise-and-visual-order", name: "Air quality, noise and visual order" },
    ],
  },
  "sleep/the-somatic-runway": {
    key: "sleep/the-somatic-runway",
    mechanisms: [
      { slug: "sleep-behaviour", name: "Sleep behaviour" },
    ],
  },
  "sleep/the-threshold-of-awakening": {
    key: "sleep/the-threshold-of-awakening",
    mechanisms: [
      { slug: "interoception-and-body-scan", name: "Interoception and body scan" },
    ],
  },
  "sound/aum-chanting": {
    key: "sound/aum-chanting",
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
  "sustenance/decoding-money-and-value": {
    key: "sustenance/decoding-money-and-value",
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
  "sustenance/mastery-of-the-instrument": {
    key: "sustenance/mastery-of-the-instrument",
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
  "sustenance/the-economics-of-simplicity": {
    key: "sustenance/the-economics-of-simplicity",
    mechanisms: [
      { slug: "financial-security-and-scarcity", name: "Financial security and scarcity" },
    ],
  },
  "sustenance/the-ecosystem-trust": {
    key: "sustenance/the-ecosystem-trust",
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
    { leverSlug: "connection", slug: "somatic-communion", name: "Being With Someone" },
  ],
  "air-quality-noise-and-visual-order": [
    { leverSlug: "environment", slug: "clearing-your-space", name: "Clearing Your Space" },
    { leverSlug: "environment", slug: "the-objects-around-you", name: "The Objects Around You" },
    { leverSlug: "environment", slug: "atmospheric-purity", name: "Air, Light and Sound" },
    { leverSlug: "environment", slug: "cultural-resonance", name: "Where You Live" },
    { leverSlug: "sleep", slug: "environmental-architecture", name: "Light and Sound at Night" },
    { leverSlug: "sleep", slug: "the-sleep-sanctuary", name: "The Bedroom" },
    { leverSlug: "nature", slug: "air", name: "Air" },
  ],
  "awareness-without-thought": [
    { leverSlug: "awareness", slug: "self-inquiry", name: "Self-Inquiry" },
    { leverSlug: "awareness", slug: "ultimate-self-inquiry", name: "Looking at Death" },
    { leverSlug: "awareness", slug: "aware-of-awareness", name: "Aware of Awareness" },
    { leverSlug: "awareness", slug: "the-shunya", name: "Being Nothing" },
    { leverSlug: "heart", slug: "non-dual-devotion", name: "Loving Life Itself" },
  ],
  "botanical-preparations": [
    { leverSlug: "nutrition", slug: "herbs", name: "Herbs" },
  ],
  "circadian-light-exposure-and-entrainment": [
    { leverSlug: "sleep", slug: "the-circadian-architecture", name: "Your Body Clock" },
    { leverSlug: "sleep", slug: "environmental-architecture", name: "Light and Sound at Night" },
    { leverSlug: "sleep", slug: "the-morning-ignition", name: "The First Hour" },
    { leverSlug: "sleep", slug: "biological-adaptability", name: "When Life Gets Irregular" },
    { leverSlug: "nature", slug: "fire", name: "Fire" },
    { leverSlug: "environment", slug: "atmospheric-purity", name: "Air, Light and Sound" },
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
    { leverSlug: "environment", slug: "consecrated-spaces", name: "Places of Stillness" },
  ],
  "expressive-writing": [
    { leverSlug: "mind", slug: "journaling", name: "Journaling" },
  ],
  "financial-security-and-scarcity": [
    { leverSlug: "sustenance", slug: "how-you-think-about-money", name: "How You Think About Money" },
    { leverSlug: "sustenance", slug: "decoding-money-and-value", name: "What Money Is" },
    { leverSlug: "sustenance", slug: "the-economics-of-simplicity", name: "Spending Less" },
    { leverSlug: "sustenance", slug: "the-ecosystem-trust", name: "Easing Money Fear" },
  ],
  "forgiveness": [
    { leverSlug: "connection", slug: "the-alchemy-of-forgiveness", name: "Forgiveness" },
  ],
  "grounding-and-earthing": [
    { leverSlug: "nature", slug: "earth", name: "Earth" },
  ],
  "hand-positions": [
    { leverSlug: "movement", slug: "the-consciousness-seal", name: "Thumb-to-Index Seal" },
    { leverSlug: "movement", slug: "the-primal-seal", name: "Closed-Hand Seal" },
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
    { leverSlug: "sleep", slug: "the-threshold-of-awakening", name: "The Edge of Sleep" },
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
    { leverSlug: "mind", slug: "conscious-creation", name: "Visualisation and Action" },
  ],
  "movement-mobility-and-exercise-timing": [
    { leverSlug: "movement", slug: "joint-rotations", name: "Joint Rotations" },
    { leverSlug: "movement", slug: "the-somatic-primer", name: "Full Mobility Sequence" },
    { leverSlug: "movement", slug: "spinal-loosening", name: "Spinal Loosening" },
    { leverSlug: "movement", slug: "the-full-practice", name: "The Full Practice" },
    { leverSlug: "movement", slug: "the-dance-of-dissolution", name: "Free Movement" },
    { leverSlug: "movement", slug: "the-meditation-seat", name: "The Meditation Seat" },
    { leverSlug: "movement", slug: "the-deep-squat", name: "The Deep Squat" },
    { leverSlug: "movement", slug: "the-prostration-sujud-balasana", name: "Prostration" },
    { leverSlug: "sleep", slug: "strategic-somatic-movement", name: "Moving at the Right Times" },
  ],
  "music-and-deliberately-chosen-sound": [
    { leverSlug: "sound", slug: "conscious-listening", name: "Conscious Listening" },
    { leverSlug: "awareness", slug: "deep-listening-meditation", name: "Deep Listening Meditation" },
  ],
  "nature-exposure-and-awe": [
    { leverSlug: "nature", slug: "earth", name: "Earth" },
    { leverSlug: "nature", slug: "air", name: "Air" },
    { leverSlug: "nature", slug: "space", name: "Space" },
    { leverSlug: "nature", slug: "places-of-natural-transformational-power", name: "Wild Places" },
    { leverSlug: "environment", slug: "consecrated-spaces", name: "Places of Stillness" },
    { leverSlug: "nature", slug: "water", name: "Water" },
    { leverSlug: "nature", slug: "fire", name: "Fire" },
  ],
  "pelvic-floor-contraction-as-an-inner-practice": [
    { leverSlug: "conservation", slug: "the-root-lock", name: "The Root Lock" },
    { leverSlug: "breath", slug: "the-great-lock", name: "The Great Lock" },
  ],
  "progressive-muscle-relaxation-and-stillness": [
    { leverSlug: "movement", slug: "progressive-muscle-relaxation", name: "Progressive Muscle Relaxation" },
    { leverSlug: "movement", slug: "the-corpse-pose", name: "The Corpse Pose" },
    { leverSlug: "sleep", slug: "somatic-regulation", name: "Settling the Body" },
  ],
  "prosocial-behaviour-and-volunteering": [
    { leverSlug: "connection", slug: "karma-yoga", name: "Service" },
  ],
  "religious-and-devotional-practice": [
    { leverSlug: "heart", slug: "non-dual-devotion", name: "Loving Life Itself" },
    { leverSlug: "heart", slug: "prayer", name: "Prayer" },
    { leverSlug: "heart", slug: "ecstatic-chanting", name: "Ecstatic Chanting" },
  ],
  "rumination-and-mind-wandering": [
    { leverSlug: "sustenance", slug: "the-ecosystem-trust", name: "Easing Money Fear" },
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
    { leverSlug: "sustenance", slug: "mastery-of-the-instrument", name: "Building Skill" },
  ],
  "sleep-behaviour": [
    { leverSlug: "sleep", slug: "cognitive-de-escalation", name: "Taking the Pressure Off" },
    { leverSlug: "sleep", slug: "caffeine-alcohol-and-timing", name: "Caffeine, Alcohol and Timing" },
    { leverSlug: "sleep", slug: "the-sleep-sanctuary", name: "The Bedroom" },
    { leverSlug: "sleep", slug: "somatic-alignment", name: "Sleep Position" },
    { leverSlug: "sleep", slug: "relational-ecology", name: "Sharing a Bed" },
    { leverSlug: "sleep", slug: "the-somatic-runway", name: "The Wind-Down Hour" },
    { leverSlug: "sleep", slug: "data-and-intuition", name: "Tracking Your Sleep" },
    { leverSlug: "sleep", slug: "biological-adaptability", name: "When Life Gets Irregular" },
  ],
  "slow-and-paced-breathing": [
    { leverSlug: "breath", slug: "alternate-nostril-breathing", name: "Alternate-Nostril Breathing" },
    { leverSlug: "breath", slug: "deep-belly-breathing", name: "Deep Belly Breathing" },
    { leverSlug: "breath", slug: "coherent-breathing", name: "Coherent Breathing" },
    { leverSlug: "breath", slug: "the-physiological-sigh", name: "The Physiological Sigh" },
    { leverSlug: "breath", slug: "4-7-8-breathing", name: "4-7-8 Breathing" },
    { leverSlug: "breath", slug: "spinal-breathing", name: "Spinal Breathing" },
    { leverSlug: "heart", slug: "heart-coherence", name: "Heart Coherence" },
    { leverSlug: "sound", slug: "aum-chanting", name: "Chanting" },
    { leverSlug: "sound", slug: "humming", name: "Humming" },
  ],
  "social-connection-and-isolation": [
    { leverSlug: "connection", slug: "internal-saturation", name: "Arriving Full" },
    { leverSlug: "connection", slug: "honesty", name: "Honesty" },
    { leverSlug: "connection", slug: "somatic-communion", name: "Being With Someone" },
    { leverSlug: "connection", slug: "the-ecosystem-of-belonging", name: "Community" },
    { leverSlug: "environment", slug: "navigating-shared-frequencies", name: "Living Among Others" },
    { leverSlug: "sleep", slug: "relational-ecology", name: "Sharing a Bed" },
    { leverSlug: "environment", slug: "cultural-resonance", name: "Where You Live" },
  ],
  "sustained-vocalisation": [
    { leverSlug: "sound", slug: "aum-chanting", name: "Chanting" },
    { leverSlug: "sound", slug: "humming", name: "Humming" },
    { leverSlug: "heart", slug: "ecstatic-chanting", name: "Ecstatic Chanting" },
  ],
  "time-restricted-eating-and-fasting": [
    { leverSlug: "conservation", slug: "fasting", name: "Fasting" },
    { leverSlug: "nutrition", slug: "chrononutrition", name: "When You Eat" },
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

