import baseMarkdown from "./base.content";
import slowAndPacedBreathing from "./slow-and-paced-breathing.content";
import activatingBreathwork from "./activating-breathwork.content";
import sustainedVocalisation from "./sustained-vocalisation.content";
import meditation from "./meditation.content";
import decentering from "./decentering.content";
import selfReferentialProcessing from "./self-referential-processing.content";
import interoceptionAndBodyScan from "./interoception-and-body-scan.content";
import expressiveWriting from "./expressive-writing.content";
import musicAndDeliberatelyChosenSound from "./music-and-deliberately-chosen-sound.content";
import mentalImageryAndVisualisation from "./mental-imagery-and-visualisation.content";
import valuesClarificationAndSelfAffirmation from "./values-clarification-and-self-affirmation.content";
import inputRestrictionAndAttentionalLoad from "./input-restriction-and-attentional-load.content";
import ruminationAndMindWandering from "./rumination-and-mind-wandering.content";
import quietingRepetitiveThought from "./quieting-repetitive-thought.content";
import regulatingArousal from "./regulating-arousal.content";
import compassionAndLovingKindnessTraining from "./compassion-and-loving-kindness-training.content";
import acceptanceAndPsychologicalFlexibility from "./acceptance-and-psychological-flexibility.content";
import socialConnectionAndIsolation from "./social-connection-and-isolation.content";
import affectiveTouchAndCoRegulation from "./affective-touch-and-co-regulation.content";
import prosocialBehaviourAndVolunteering from "./prosocial-behaviour-and-volunteering.content";
import forgiveness from "./forgiveness.content";
import religiousAndDevotionalPractice from "./religious-and-devotional-practice.content";
import circadianLightExposureAndEntrainment from "./circadian-light-exposure-and-entrainment.content";
import sleepBehaviour from "./sleep-behaviour.content";
import financialSecurityAndScarcity from "./financial-security-and-scarcity.content";
import movementMobilityAndExerciseTiming from "./movement-mobility-and-exercise-timing.content";
import skillMasteryAndSelfEfficacy from "./skill-mastery-and-self-efficacy.content";
import workAndValuesCongruence from "./work-and-values-congruence.content";
import progressiveMuscleRelaxationAndStillness from "./progressive-muscle-relaxation-and-stillness.content";
import coldExposure from "./cold-exposure.content";
import timeRestrictedEatingAndFasting from "./time-restricted-eating-and-fasting.content";
import dietComposition from "./diet-composition.content";
import hydration from "./hydration.content";
import natureExposureAndAwe from "./nature-exposure-and-awe.content";
import botanicalPreparations from "./botanical-preparations.content";
import airQualityNoiseAndVisualOrder from "./air-quality-noise-and-visual-order.content";
import sexualBehaviourAndAbstinence from "./sexual-behaviour-and-abstinence.content";
import groundingAndEarthing from "./grounding-and-earthing.content";
import handPositions from "./hand-positions.content";
import soundVibrationActingOnTissue from "./sound-vibration-acting-on-tissue.content";
import energeticPropertiesOfObjectsAndSpaces from "./energetic-properties-of-objects-and-spaces.content";
import pelvicFloorContractionAsAnInnerPractice from "./pelvic-floor-contraction-as-an-inner-practice.content";

export type MechanismStatus = "complete" | "planned";

export type EvidenceGroupId =
  | "breath-and-voice"
  | "attention-and-cognition"
  | "emotion-and-relationship"
  | "body-and-lifestyle"
  | "material-conditions"
  | "expected-weak";

export type EvidenceMechanism = {
  slug: string;
  title: string;
  /** Short subtitle shown on cards / index lines. */
  blurb?: string;
  group: EvidenceGroupId;
  status: MechanismStatus;
  reviewDate?: string;
  researchGrade?: string;
  traditionalGrade?: string;
  description: string;
  markdown?: string;
};

export const EVIDENCE_GROUPS: Array<{ id: EvidenceGroupId; label: string }> = [
  { id: "breath-and-voice", label: "Breath and voice" },
  { id: "attention-and-cognition", label: "Attention and cognition" },
  { id: "emotion-and-relationship", label: "Emotion and relationship" },
  { id: "body-and-lifestyle", label: "Body and lifestyle" },
  { id: "material-conditions", label: "Material conditions" },
  { id: "expected-weak", label: "Mechanisms expected to be weak or unsupported" },
];

/** Footnote definitions from the parent doc — needed wherever [^n] markers render. */
function extractFootnoteDefinitions(markdown: string) {
  const defs = markdown.match(/^\[\^\d+\]:[\s\S]*$/m);
  if (!defs) return "";
  // Collect every [^n]: line through end of file.
  const start = markdown.search(/^\[\^\d+\]:/m);
  if (start === -1) return "";
  return markdown.slice(start).trim();
}

/** Parent-page prose — everything above the mechanism index. */
export const EVIDENCE_BASE_INTRO_MARKDOWN = (() => {
  const intro = stripLeadingTitle(stripFromHeading(baseMarkdown, "## The mechanisms"))
    // Drop internal editorial note + decorative rule from the source doc.
    .replace(/^\*Parent document\.[^*\n]*\*\n+/, "")
    .replace(/^---\n+/, "")
    .trimStart();
  const defs = extractFootnoteDefinitions(baseMarkdown);
  // Footnote markers live in the intro; append defs so superscripts resolve.
  // The visible References list is rendered after the mechanism index instead.
  return defs ? `${intro}\n\n${defs}` : intro;
})();

/**
 * Parent-page prose after the mechanism index — What would actually test this,
 * Completeness, and a reader-facing References list (not footnote-def syntax,
 * which already drives the intro superscripts).
 */
export const EVIDENCE_BASE_AFTER_MARKDOWN = (() => {
  const start = baseMarkdown.indexOf("## What would actually test this");
  if (start === -1) return "";
  const after = baseMarkdown.slice(start);
  const withoutFootnoteDefs = after.replace(/\n## References\n[\s\S]*$/, "").trim();
  const references = `

## References

*APA 7th.*

1. Cipriani, A., Furukawa, T. A., Salanti, G., Chaimani, A., Atkinson, L. Z., Ogawa, Y., Leucht, S., Ruhe, H. G., Turner, E. H., Higgins, J. P. T., Egger, M., Takeshima, N., Hayasaka, Y., Imai, H., Shinohara, K., Tajika, A., Ioannidis, J. P. A., & Geddes, J. R. (2018). Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder: A systematic review and network meta-analysis. *The Lancet, 391*(10128), 1357–1366. https://doi.org/10.1016/S0140-6736(17)32802-7

2. Ngandu, T., Lehtisalo, J., Solomon, A., Levälahti, E., Ahtiluoto, S., Antikainen, R., Bäckman, L., Hänninen, T., Jula, A., Laatikainen, T., Lindström, J., Mangialasche, F., Paajanen, T., Pajala, S., Peltonen, M., Rauramaa, R., Stigsdotter-Neely, A., Strandberg, T., Tuomilehto, J., Soininen, H., & Kivipelto, M. (2015). A 2 year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline in at-risk elderly people (FINGER): A randomised controlled trial. *The Lancet, 385*(9984), 2255–2263. https://doi.org/10.1016/S0140-6736(15)60461-5
`;
  return `${withoutFootnoteDefs}\n${references}`.trim();
})();

export const EVIDENCE_MECHANISMS: EvidenceMechanism[] = [
  {
    slug: "regulating-arousal",
    title: "Regulating arousal",
    blurb: "Family page for lowering and raising physiological activation.",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for lowering blood pressure and for shifting the nervous system in either direction, Moderate for mood and anxiety",
    traditionalGrade: "Very strong downward, Strong upward",
    description:
      "The second mechanism behind the internal levers — slowing the system toward rest, or rousing it, and knowing which direction you need.",
    markdown: withNormalizedGrades(regulatingArousal),
  },
  {
    slug: "slow-and-paced-breathing",
    title: "Slow and paced breathing",
    blurb:
      "Merges the earlier separate entries for extended exhale and resonance-frequency breathing — the literature pools them.",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade: "Strong for blood pressure and physiology, Moderate for mood",
    traditionalGrade: "Very strong",
    description:
      "Slowing the breath to around six a minute — blood pressure, nervous-system shift, and small-to-moderate mood effects.",
    markdown: withNormalizedGrades(slowAndPacedBreathing),
  },
  {
    slug: "activating-breathwork",
    title: "Activating breathwork — rapid breathing and breath holding",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for acute activation and for the inflammatory response, Moderate for mood and anxiety with regular practice",
    traditionalGrade: "Strong",
    description:
      "Rapid breathing and breath holding — acute activation, inflammatory response, and the longest safety section in the library.",
    markdown: withNormalizedGrades(activatingBreathwork),
  },
  {
    slug: "sustained-vocalisation",
    title: "Sustained vocalisation — chanting and humming",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for chanting and mantra on mental health, None found for the nitric-oxide explanation of humming",
    traditionalGrade: "Very strong",
    description:
      "Sustained sound with the voice — anxiety, stress, low mood, PTSD symptoms, and a route into slow breathing.",
    markdown: withNormalizedGrades(sustainedVocalisation),
  },
  {
    slug: "music-and-deliberately-chosen-sound",
    title: "Music and deliberately chosen sound",
    blurb: "Added: Conscious Listening was not covered by any existing entry.",
    group: "breath-and-voice",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for acute stress, surgical pain and subjective sleep quality, Preliminary for everyday stress recovery in healthy adults and for binaural beats or specific tuning frequencies",
    traditionalGrade: "Very strong",
    description:
      "Chosen music and natural sound — acute stress and surgical pain, subjective sleep, and where laboratory recovery and entrainment claims fall short.",
    markdown: withNormalizedGrades(musicAndDeliberatelyChosenSound),
  },
  {
    slug: "quieting-repetitive-thought",
    title: "Quieting repetitive thought",
    blurb: "Family page for the four depths of interrupting thought that feeds on itself.",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong at the first two depths, Moderate at the third, Preliminary at the fourth",
    traditionalGrade: "Very strong",
    description:
      "The largest finding in this evidence base as one mechanism at four depths — from decentering through rumination and self-reference to awareness without thought.",
    markdown: withNormalizedGrades(quietingRepetitiveThought),
  },
  {
    slug: "rumination-and-mind-wandering",
    title: "Rumination and mind-wandering",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for rumination's link to depression and anxiety and for targeted therapies reducing repetitive negative thinking, Moderate for mindfulness reducing rumination and for content-dependent mood effects of mind-wandering",
    traditionalGrade: "Very strong",
    description:
      "Repetitive negative thinking versus ordinary mind-wandering — clinical risk, targeted training, and why not every drift of attention is the problem.",
    markdown: withNormalizedGrades(ruminationAndMindWandering),
  },
  {
    slug: "meditation",
    title: "Meditation — focused attention and open monitoring",
    blurb: "Merged: the trial literature teaches and tests both together.",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for anxiety, depression and pain; Moderate to large in healthy people against no treatment; Preliminary for attention at ordinary doses",
    traditionalGrade: "Very strong",
    description:
      "Training attention in focused and open modes — anxiety, depression, pain, and the dose finding on attention.",
    markdown: withNormalizedGrades(meditation),
  },
  {
    slug: "decentering",
    title: "Decentering — seeing thoughts as thoughts",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade: "Strong for what it does, Moderate for why it works",
    traditionalGrade: "Very strong",
    description:
      "The shift from being inside a thought to observing it — relapse prevention, rumination buffering, and trainability.",
    markdown: withNormalizedGrades(decentering),
  },
  {
    slug: "self-referential-processing",
    title: "Self-referential processing",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for training changing self-referential processing and self-views, Preliminary for the neural account and for whether any of it mediates improvement, None found for the deep self-inquiry practices",
    traditionalGrade: "Very strong",
    description:
      "The commentary that turns experience into a story about you — self-view trials, mediation evidence, network changes, and where deep self-inquiry remains untested.",
    markdown: withNormalizedGrades(selfReferentialProcessing),
  },
  {
    slug: "awareness-without-thought",
    title: "Awareness without thought — in preparation.",
    group: "attention-and-cognition",
    status: "planned",
    description:
      "Pending research. The fourth depth in Quieting repetitive thought — what remains when the commentary stops.",
  },
  {
    slug: "interoception-and-body-scan",
    title: "Interoception and body scan",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for self-reported body awareness and emotional self-regulation within broader mindfulness programmes, Preliminary for standalone body scan on health outcomes and for objective signal accuracy",
    traditionalGrade: "Very strong",
    description:
      "Scanning attention through the body — how you relate to sensation, stress markers, and the limits of standalone body scan.",
    markdown: withNormalizedGrades(interoceptionAndBodyScan),
  },
  {
    slug: "expressive-writing",
    title: "Expressive writing",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for small reductions in everyday distress and reported symptoms, Preliminary for clinical depression, trauma and physical disease markers",
    traditionalGrade: "Weak",
    description:
      "Private writing about an unresolved experience — small delayed gains in distress, and where the protocol fails.",
    markdown: withNormalizedGrades(expressiveWriting),
  },
  {
    slug: "mental-imagery-and-visualisation",
    title: "Mental imagery and visualisation",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for motor skill rehearsal, mental contrasting and clinical imagery rescripting, Preliminary for standalone positive imagery on depression",
    traditionalGrade: "Strong",
    description:
      "Mental rehearsal, mental contrasting and clinical imagery — what works, and why outcome fantasies fall short.",
    markdown: withNormalizedGrades(mentalImageryAndVisualisation),
  },
  {
    slug: "values-clarification-and-self-affirmation",
    title: "Values clarification and self-affirmation",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for small gains in everyday well-being, acute stress buffering and openness to threatening information, Preliminary for values clarification on clinical anxiety, depression and life satisfaction",
    traditionalGrade: "Very strong",
    description:
      "Writing about a core personal value — small well-being and stress-buffering gains, and why pep-talk slogans are a different (and riskier) practice.",
    markdown: withNormalizedGrades(valuesClarificationAndSelfAffirmation),
  },
  {
    slug: "input-restriction-and-attentional-load",
    title: "Input restriction and attentional load",
    group: "attention-and-cognition",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for quiet post-learning rest, notification disruption and mobile-internet reduction on attention and well-being, Preliminary for standalone social-media detoxes and causal effects of media multitasking",
    traditionalGrade: "Very strong",
    description:
      "Cutting alerts and continuous mobile internet — attention, well-being, quiet post-learning rest, and where short detoxes fall short.",
    markdown: withNormalizedGrades(inputRestrictionAndAttentionalLoad),
  },
  {
    slug: "compassion-and-loving-kindness-training",
    title: "Compassion and loving-kindness training",
    group: "emotion-and-relationship",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for reducing depression, anxiety, stress and self-criticism against waitlist controls, Preliminary against active psychological treatments and on real-world prosocial behaviour",
    traditionalGrade: "Very strong",
    description:
      "Training goodwill and self-compassion — moderate clinical gains against waitlists, thinner results against active controls, and the backdraft caution.",
    markdown: withNormalizedGrades(compassionAndLovingKindnessTraining),
  },
  {
    slug: "acceptance-and-psychological-flexibility",
    title: "Acceptance and psychological flexibility",
    group: "emotion-and-relationship",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for clinical outcomes in depression, anxiety and chronic pain against inactive controls and treatment as usual, Moderate for acceptance increasing distress tolerance experimentally and for whether flexibility is the unique active mechanism",
    traditionalGrade: "Very strong",
    description:
      "Allowing unwanted experience while acting on what matters — ACT outcomes, distress tolerance, and limits of the flexibility measures.",
    markdown: withNormalizedGrades(acceptanceAndPsychologicalFlexibility),
  },
  {
    slug: "social-connection-and-isolation",
    title: "Social connection and isolation",
    group: "emotion-and-relationship",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for the association between social disconnection, mortality, cardiovascular disease and depression, Moderate for interventions reducing loneliness",
    traditionalGrade: "Very strong",
    description:
      "Isolation versus loneliness — survival and health associations, and why contact alone often fails without addressing social fear.",
    markdown: withNormalizedGrades(socialConnectionAndIsolation),
  },
  {
    slug: "affective-touch-and-co-regulation",
    title: "Affective touch and co-regulation",
    group: "emotion-and-relationship",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for massage and structured touch reducing pain, anxiety and depression, Preliminary for everyday affectionate touch (hugs, hand-holding) and dyadic physiological co-regulation as standalone interventions",
    traditionalGrade: "Strong",
    description:
      "Safe physical contact and partner co-regulation — massage trial gains, stress buffering, and when touch triggers threat instead.",
    markdown: withNormalizedGrades(affectiveTouchAndCoRegulation),
  },
  {
    slug: "prosocial-behaviour-and-volunteering",
    title: "Prosocial behaviour and volunteering",
    group: "emotion-and-relationship",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for small-to-medium well-being gains from experimental acts of kindness, Preliminary for formal volunteering's causal effects on physical health and mortality",
    traditionalGrade: "Very strong",
    description:
      "Acts of kindness and volunteering — modest well-being gains when freely chosen, and why observational survival links outrun randomised proof.",
    markdown: withNormalizedGrades(prosocialBehaviourAndVolunteering),
  },
  {
    slug: "forgiveness",
    title: "Forgiveness",
    group: "emotion-and-relationship",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for structured process-based forgiveness programmes reducing anger, stress, depression and anxiety, Preliminary for physical health outcomes and brief decision-only exercises",
    traditionalGrade: "Very strong",
    description:
      "Releasing resentment without excusing harm — process-based gains, failed decision-only workshops, and when forgiving an unrepentant partner backfires.",
    markdown: withNormalizedGrades(forgiveness),
  },
  {
    slug: "religious-and-devotional-practice",
    title: "Religious and devotional practice",
    group: "emotion-and-relationship",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for longitudinal associations between public religious participation, lower mortality, lower suicide rates and small mental-health gains, Preliminary for private prayer on its own",
    traditionalGrade: "Very strong",
    description:
      "Communal worship and devotion — survival and mental-health associations, faith-adapted therapy, and where private prayer and distant intercession fall short.",
    markdown: withNormalizedGrades(religiousAndDevotionalPractice),
  },
  {
    slug: "circadian-light-exposure-and-entrainment",
    title: "Circadian light exposure and entrainment",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for bright light therapy in seasonal and non-seasonal depression and circadian phase shifting, Moderate for sleep problems overall and observational links between day/night light contrast and long-term health",
    traditionalGrade: "Weak",
    description:
      "Morning bright light and evening darkness — depression and sleep timing gains, and why clear blue-blocker glasses fall short.",
    markdown: withNormalizedGrades(circadianLightExposureAndEntrainment),
  },
  {
    slug: "sleep-behaviour",
    title: "Sleep behaviour — stimulus control, wind-down, environment",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for stimulus control and sleep restriction within chronic insomnia treatment, Moderate for caffeine/alcohol timing, pre-bed warm bathing and room temperature, Preliminary for standalone sleep-hygiene checklists in chronic insomnia",
    traditionalGrade: "Strong",
    description:
      "Stimulus control, sleep restriction and wind-down timing — what reverses chronic insomnia, and why hygiene checklists alone fall short.",
    markdown: withNormalizedGrades(sleepBehaviour),
  },
  {
    slug: "movement-mobility-and-exercise-timing",
    title: "Movement, mobility and exercise timing",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for depression, anxiety, all-cause mortality and joint range of motion, Moderate for post-meal walking breaks and evening exercise timing",
    traditionalGrade: "Very strong",
    description:
      "Daily movement, mobility and workout timing — mood and longevity gains, post-meal walking breaks, and why stretching alone does not prevent injury.",
    markdown: withNormalizedGrades(movementMobilityAndExerciseTiming),
  },
  {
    slug: "progressive-muscle-relaxation-and-stillness",
    title: "Progressive muscle relaxation and stillness",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for reducing anxiety, stress and depressive symptoms and improving subjective sleep quality in clinical settings, Preliminary for long-term blood pressure reduction and standalone physical stillness",
    traditionalGrade: "Strong",
    description:
      "Progressive muscle relaxation and deliberate stillness — anxiety and sleep gains, short-term blood-pressure drops, and when relaxing in bed backfires.",
    markdown: withNormalizedGrades(progressiveMuscleRelaxationAndStillness),
  },
  {
    slug: "cold-exposure",
    title: "Cold exposure",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for post-exercise muscle soreness and acute autonomic arousal, Preliminary for mood, depression, stress, immunity and metabolic health",
    traditionalGrade: "Moderate",
    description:
      "Cold showers and plunges — acute arousal and soreness relief, delayed stress shifts, and why mood and immunity claims remain unestablished.",
    markdown: withNormalizedGrades(coldExposure),
  },
  {
    slug: "time-restricted-eating-and-fasting",
    title: "Time-restricted eating and fasting",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for weight and metabolic improvements comparable to ordinary calorie reduction, Preliminary for weight-independent circadian benefits, multi-day fasting and human cellular recycling",
    traditionalGrade: "Very strong",
    description:
      "Eating windows and intermittent fasting — weight and metabolic effects mainly via fewer calories, earlier windows vs late eating, and where autophagy claims outrun human data.",
    markdown: withNormalizedGrades(timeRestrictedEatingAndFasting),
  },
  {
    slug: "diet-composition",
    title: "Diet composition",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for cardiovascular and metabolic outcomes, Moderate for depressive symptoms",
    traditionalGrade: "Very strong",
    description:
      "Whole-food dietary patterns, fibre and ultra-processed food — cardiovascular event reductions, mood effects, and why named macro diets converge.",
    markdown: withNormalizedGrades(dietComposition),
  },
  {
    slug: "hydration",
    title: "Hydration",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for mild-dehydration effects on attention, fatigue and recurrent kidney stones, Preliminary for raising daily water intake beyond thirst for weight loss or general health",
    traditionalGrade: "Moderate",
    description:
      "Mild dehydration, daily water targets and kidney-stone prevention — cognitive costs of fluid loss, and why eight glasses a day has no experimental basis.",
    markdown: withNormalizedGrades(hydration),
  },

  {
    slug: "botanical-preparations",
    title: "Botanical preparations",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for specific standardised extracts (St. John's wort in mild-to-moderate depression, oral lavender oil in anxiety), Preliminary for ashwagandha, chamomile and valerian",
    traditionalGrade: "Very strong",
    description:
      "Herbal extracts for mood, anxiety and sleep — St. John's wort and Silexan evidence, plus interaction and liver-injury cautions.",
    markdown: withNormalizedGrades(botanicalPreparations),
  },

  {
    slug: "nature-exposure-and-awe",
    title: "Nature exposure and awe",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for blood pressure, stress markers, mood and clinical anxiety/depression from nature exposure, Preliminary for standalone awe interventions and cognitive attention restoration",
    traditionalGrade: "Very strong",
    description:
      "Greenspace, cortisol and mood — the two-hour weekly threshold, awe walks, and why ordinary parks count without wilderness.",
    markdown: withNormalizedGrades(natureExposureAndAwe),
  },

  {
    slug: "air-quality-noise-and-visual-order",
    title: "Air quality, noise and visual order",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for indoor ventilation on cognitive performance and environmental noise on sleep and heart disease, Preliminary for air pollution and noise on mood, home air purifiers on blood pressure, and visual clutter on stress and well-being",
    traditionalGrade: "Very strong",
    description:
      "Indoor air, night-time noise and visual clutter — cognitive costs of stale air, sleep micro-awakenings, and correlational clutter evidence.",
    markdown: withNormalizedGrades(airQualityNoiseAndVisualOrder),
  },

  {
    slug: "sexual-behaviour-and-abstinence",
    title: "Sexual behaviour and abstinence",
    group: "body-and-lifestyle",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for the association between partnered sex, physical affection and relationship well-being, Preliminary for sleep effects, prostate health and deliberate sexual or pornography abstinence",
    traditionalGrade: "Strong",
    description:
      "Partnered intimacy, affection and abstinence claims — the once-a-week well-being plateau, retracted testosterone myths, and shame-forum risks.",
    markdown: withNormalizedGrades(sexualBehaviourAndAbstinence),
  },

  {
    slug: "financial-security-and-scarcity",
    title: "Financial security and scarcity",
    group: "material-conditions",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for poverty, debt and mental health distress and for cash-transfer effects in low-income settings, Moderate for liquid savings buffers, debt-account relief and financial education, Preliminary for scarcity-induced cognitive decline and high-income guaranteed-income trials",
    traditionalGrade: "Strong",
    description:
      "Poverty, debt and liquid cash buffers — mental-health effects, cash-transfer evidence, and why contemplation cannot replace a missing buffer.",
    markdown: withNormalizedGrades(financialSecurityAndScarcity),
  },
  {
    slug: "skill-mastery-and-self-efficacy",
    title: "Skill mastery and self-efficacy",
    group: "material-conditions",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Strong for behavioral activation on depression and experimental self-efficacy gains on health behaviour, Moderate for deliberate practice and work performance correlations, Preliminary for standalone confidence interventions on complex real-world jobs",
    traditionalGrade: "Very strong",
    description:
      "Mastery experiences and task-specific self-efficacy — behavioral activation, deliberate practice limits, and why pep talks are not enough.",
    markdown: withNormalizedGrades(skillMasteryAndSelfEfficacy),
  },
  {
    slug: "work-and-values-congruence",
    title: "Work and values congruence",
    group: "material-conditions",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Moderate for associations between value fit, meaningful work, engagement and job satisfaction and for job crafting interventions, Preliminary for causal mental health outcomes of career change and civilian occupational moral injury",
    traditionalGrade: "Very strong",
    description:
      "Value fit, meaningful work and job crafting — engagement gains, calling risks, and when meaning cannot compensate for poor conditions.",
    markdown: withNormalizedGrades(workAndValuesCongruence),
  },
  {
    slug: "grounding-and-earthing",
    title: "Grounding and earthing",
    group: "expected-weak",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Preliminary — small pilots report isolated shifts, yet no large independent randomised trial or meta-analysis exists, mood and soreness results are mixed, and foundational papers carry commercial conflicts of interest",
    traditionalGrade: "Weak",
    description:
      "Electrical earthing claims versus small pilots — skin voltage changes are real, broad anti-inflammatory claims are not established.",
    markdown: withNormalizedGrades(groundingAndEarthing),
  },
  {
    slug: "pelvic-floor-contraction-as-an-inner-practice",
    title: "Pelvic floor contraction as an inner practice",
    group: "expected-weak",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "None found for mood, attention, autonomic balance or contemplative outcomes (Strong strictly as physical rehabilitation for female stress urinary incontinence, which is a different use)",
    traditionalGrade: "Strong",
    description:
      "Root lock and pelvic floor contraction — strong for female stress incontinence rehab, none found for mood or contemplative outcomes alone.",
    markdown: withNormalizedGrades(pelvicFloorContractionAsAnInnerPractice),
  },

  {
    slug: "hand-positions",
    title: "Hand positions",
    group: "expected-weak",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "None found for finger-to-thumb hand seals on autonomic, cognitive or clinical outcomes; one controlled trial supports warm hand-on-chest self-touch for buffering cortisol after stress",
    traditionalGrade: "Strong",
    description:
      "Finger seals versus warm self-touch — no sham-controlled evidence for mudrā geometry, and one cortisol trial for hand-on-chest contact.",
    markdown: withNormalizedGrades(handPositions),
  },
  {
    slug: "sound-vibration-acting-on-tissue",
    title: "Sound vibration acting on tissue",
    group: "expected-weak",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "Preliminary for singing bowls and vibroacoustic stimulation on short-term relaxation; none found for claims that acoustic sound waves mechanically repair tissue, dissolve knots or re-tune organs and cells",
    traditionalGrade: "Weak",
    description:
      "Singing bowls and vibroacoustic beds — acute relaxation via listening and rest, not proven tissue repair or organ re-tuning.",
    markdown: withNormalizedGrades(soundVibrationActingOnTissue),
  },
  {
    slug: "energetic-properties-of-objects-and-spaces",
    title: "Energetic properties of objects and spaces",
    group: "expected-weak",
    status: "complete",
    reviewDate: "November 2026",
    researchGrade:
      "None found for invisible healing or calming forces in crystals, talismans or sacred room proportions beyond expectation and ordinary sensory design",
    traditionalGrade: "Moderate",
    description:
      "Crystals, talismans and sacred geometry — blinded tests reduce effects to expectation; room comfort tracks light, greenery and layout.",
    markdown: withNormalizedGrades(energeticPropertiesOfObjectsAndSpaces),
  },
];

export function getEvidenceMechanism(slug: string) {
  return EVIDENCE_MECHANISMS.find((m) => m.slug === slug) ?? null;
}

export function getCompleteEvidenceMechanisms() {
  return EVIDENCE_MECHANISMS.filter((m) => m.status === "complete" && m.markdown);
}

export function getMechanismsByGroup(group: EvidenceGroupId) {
  return EVIDENCE_MECHANISMS.filter((m) => m.group === group);
}

/** Drop the leading H1 so the page chrome owns the title. */
export function stripLeadingTitle(markdown: string) {
  return markdown.replace(/^#\s+[^\n]+\n+/, "").trimStart();
}

/**
 * Research strength and Traditional convergence must render as two distinct
 * paragraphs, each ending with a full stop. Enforce this for every mechanism
 * page — including future ones that forget the blank line or trailing period.
 */
export function normalizeGradeLines(markdown: string) {
  return markdown.replace(
    /(\*\*Research strength[^\n]*?)(?:\.)?\n+(?:\n*)(\*\*Traditional convergence[^\n]*?)(?:\.)?(?=\n)/g,
    (_match, research: string, traditional: string) => {
      return `${research.trimEnd()}.\n\n${traditional.trimEnd()}.`;
    },
  );
}

function withNormalizedGrades(markdown: string) {
  return normalizeGradeLines(markdown);
}

function stripFromHeading(markdown: string, heading: string) {
  const idx = markdown.indexOf(heading);
  if (idx === -1) return markdown.trim();
  return markdown.slice(0, idx).trim();
}
