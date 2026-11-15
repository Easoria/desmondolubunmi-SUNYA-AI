import type { Lever } from "@/data/levers/types";

export const soundLever: Lever = {
  slug: "sound",
  number: 4,
  name: "Sound",
  layerLine: "The Vital Body + Emotional Body",
  summaryLine: "Your voice. Sound vibrations such as chanting, singing, or humming can be used to calm the nervous system, focus the mind, and loosen held tension so the body settles and feels open.",
  intro: [
    "Sound is the most universal inner technology in human history. Across every tradition, in every era and culture, human beings independently discovered that intentional sound transforms the inner state: the Om of Hindu practitioners, the Gregorian chants of Christian monks, the Dhikr of the Sufis, the ceremonial drumming of indigenous peoples. The outer forms differ entirely. The pattern is the same.",
    "Chanting works through things you can feel. Sustained sound requires a long, controlled exhale, and a long exhale is one of the most reliable ways to settle the nervous system. The vibration is felt directly — in the chest, the throat, the bones of the face. And holding a sound occupies the attention that would otherwise be running commentary.",
    "The practices of this lever fall into two modes: active vocalisation — chanting and toning — which generates the vibration from within, and conscious listening, which allows curated external sound to do the work. Both converge on the same result: a cleared, coherent, open system.",
  ],
  practices: [
    {
      sourceNumber: 1,
      slug: "aum-chanting",
      name: "Chanting",
      essence:
        "A sustained sound on a long out-breath. It quiets the mind, loosens held tension and settles the body — mostly through the long exhale, which is one of the most reliable ways to calm the nervous system. The usual form is ah–oo–mm: the mouth travels from fully open to fully closed, using only jaw and lips, with no tongue shaping. It needs no language — those are among the most common sounds in human speech. You feel it in the chest and the skull. (Known in the Indian traditions as AUM, or Om.) If you have a tradition of your own, its chant or prayer does this as well as anything here — the Jesus Prayer, dhikr, a psalm, a mantra you were given, a hymn you know by heart. The practice is the sustained sound and the feeling behind it, not the words.",
      mechanism: [
        "Three things are happening, and you can check all of them.",
        "The sound is carried on a long, controlled exhale, and a long exhale is one of the most reliable ways to move the body toward a calmer state. This is the largest part of the effect.",
        "The vibration is felt directly, and it moves. Ah sits lowest, in the chest and belly. Oo rises into the chest and throat. Mm is felt in the face and skull. Running them in sequence carries the sensation up the body.",
        "And holding a sound occupies attention. While you are sustaining a tone you are not narrating, so the commentary quiets because something else is using the channel.",
        "The form needs no language. Ah, oo and mm use only the jaw and lips, travelling from fully open to fully closed with no tongue shaping, and they are among the most common sounds in human speech.",
      ],
      protocol: [
        {
          text: "The A (Ah): Sit with the spine erect and take a deep breath in. Open the mouth wide and softly vocalize the sound “Ah.” Do not strain; let the sound pour out naturally. Rest attention just below the navel — feel where the vibration lands.",
        },
        {
          text: "The U (Oo): As the breath continues to empty, let the mouth gently narrow to form the sound “Oo.” Shift attention upward to the chest and the heart. Feel the vibration spread through the ribcage.",
        },
        {
          text: "The M (Mm): Finally, close the lips and let the sound turn into a deep, humming “Mm.” Shift attention to the throat, the centre of the head, and the brain. Feel the vibration moving against the skull — cutting through mental noise and soothing the nervous system.",
        },
        {
          text: "Merge the three: On the next breath, chant them as one continuous, fluid wave: A-A-A- U-U-U-M-M-M. Notice how the sound naturally arises from the belly, rolls through the chest, and dissolves in the head.",
        },
        {
          text: "Rest in the silence: The most important part of the chant is the silence that follows the M. When the sound completely fades, do not immediately take the next breath. Rest your awareness in the empty, lingering vibration. Most people find this the part that does the most.",
        },
        {
          text: "Silent chanting: for those in environments where chanting aloud is impractical, AUM can be chanted silently in the mind. More challenging, but when done with genuine intensity and focus, mental chanting can be equally powerful.",
        },
      ],
      layers: ["The Vital Body", "Emotional Body"],
      leverSlug: "sound",
      relatedPractices: ["humming", "conscious-listening"],
      metaTitle: "Chanting — How to Practise It | Sunya",
      metaDescription:
        "A sustained sound on a long out-breath. It quiets the mind, loosens held tension and settles the body.",
      families: ["L3"],
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "humming",
            reason: "Adjacent in source order within the same lever sequence.",
          },
          {
            slug: "conscious-listening",
            reason: "Adjacent in source order within the same lever sequence.",
          },
        ],
      },
    },
    {
      sourceNumber: 2,
      slug: "humming",
      name: "Humming",
      essence:
        "The easiest way in. Mouth closed, one long tone on the out-breath. You feel it strongest in the face and skull. Quieter than chanting and needs no preparation, which makes it the one most likely to actually get done. (Known in the yogic traditions as bhramari.)",
      mechanism: [
        "Humming is chanting reduced to its simplest form: one continuous tone on a long out-breath, with the mouth closed. The long exhale does most of the settling. The vibration is felt strongly in the face and skull, which gives the attention something concrete to rest on.",
      ],
      protocol: [
        {
          text: "Sit comfortably with a long spine. Close the mouth. Inhale through the nose.",
        },
        {
          text: "On the out-breath, make a steady hum — one tone, no melody. Keep the volume moderate enough that you can sustain it without strain.",
        },
        {
          text: "Feel where the vibration lands, especially in the face and skull. When the breath ends, rest briefly in the quiet before the next inhale.",
        },
        {
          text: "Repeat for several breaths. Stop when the body feels settled rather than when a count is finished.",
        },
      ],
      layers: ["The Vital Body", "Emotional Body"],
      leverSlug: "sound",
      relatedPractices: ["aum-chanting", "conscious-listening"],
      metaTitle: "Humming — How to Practise It | Sunya",
      metaDescription:
        "The easiest way in. Mouth closed, one long tone on the out-breath. You feel it strongest in the face and skull.",
      families: ["L3"],
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "aum-chanting",
            reason: "Adjacent in source order within the same lever sequence.",
          },
          {
            slug: "conscious-listening",
            reason: "Adjacent in source order within the same lever sequence.",
          },
        ],
      },
    },
    {
      sourceNumber: 3,
      slug: "conscious-listening",
      name: "Conscious Listening",
      essence:
        "Choosing what you listen to deliberately. What goes into your ears changes how settled you feel, and most people never choose it.",
      mechanism: [
        "In the science of Cymatics, when a specific sound frequency is played on a plate coated with sand, the grains snap from chaotic scattering into perfect, symmetrical geometric mandalas — visible proof that sound organises matter. You are not a metal plate; you are largely composed of fluid, and fluid conducts sound far more efficiently than air. Which means you are being continuously shaped, at the physical level, by what you hear. Disharmonious sound creates internal chaos. Harmonious sound creates coherence. There is a second mechanism at work. The nervous system naturally entrains to external sound — it synchronises to the dominant frequency of its environment. And when you listen to devotional music created with genuine feeling and intention, the heart responds to the feeling in the music, taking in not just the sound but the inner state behind it. Listening becomes a way the inner state of the music reaches you.",
      ],
      protocol: [
        {
          text: "The following are designed for specific situations — read through all of them and learn to apply the right one at the right time.",
        },
        {
          text: "The sound bath: When the inner armour is too thick for gentle meditation — when the separate self is deeply entrenched in survival mode and nothing quieter will reach it — use the sheer acoustic force of gongs and large Tibetan bowls. The analytical mind survives by predicting patterns. Because it cannot predict the complex, unpredictable layers of sound pouring from a skilfully played gong, it gives up entirely. Lie flat on your back and surrender completely to the volume and density of the sound. Do not merely listen with the ears — feel the vibration pass through the skin, the bones, and the entire body. As the sound builds, the physical boundary of the body begins to dissolve. The sense of inside and outside fades, and a deep, open awareness fills the space.",
        },
        {
          text: "Curate your acoustic diet: Listening is consumption. Chaotic news, aggressive music, and constant noise feeds the mind junk and creates negative emotions and contraction in the energy system. Begin consciously feeding the nervous system sound that supports life: silence, nature, high-vibration chants, and music that genuinely opens you. The grounding protocol — for anxiety and insomnia: When the mind is intensely scattered or the body cannot settle, immerse yourself in heavy, rhythmic sounds — heavy rain, ocean waves, the crackling of a log fire, or low-frequency Tibetan bowls. These sounds activate the downward-moving energy (Apana Vayu), grounding the nervous system and settling the life force back into the body.",
        },
        {
          text: "The safety signal — nature sounds: To quickly dissolve the nervous system’s defensive contraction, listen to wind, flowing water, birdsong, and the sound of slow, gentle breath. From an evolutionary standpoint, these sounds signal the body’s primal survival centres that the environment is safe and no threat is present — shifting rapidly from a state of stress to a state of rest. The elevation protocol — for dullness or depression: When energy is flat or the mind is foggy, listen to high-frequency sounds: flutes, high-pitched bells, or classical chants. These frequencies lift the life force toward the upper energy centres, clearing the heaviness and restoring clarity.",
        },
        {
          text: "The space protocol — for deep meditation: When entering deep meditation, use pure silence or the sound of a continuous drone such as a Tambura. Because a drone has no melody for the conditioned mind to latch onto, it creates a stable sonic floor — allowing the mind to fully release and awareness to effortlessly enter pure stillness.",
        },
        {
          text: "Binaural beats: Using headphones, slightly different frequencies are delivered to each ear. The nervous system responds by synchronising to the difference between them. Use Theta frequencies (4–8 Hz) for deep relaxation and meditation, or Delta frequencies (1–4 Hz) for sleep support.",
        },
        {
          text: "Solfeggio frequencies: Specific frequency sets — such as 432 Hz and 528 Hz — that many find genuinely calming and healing. The scientific research is still developing, but the principle is consistent with what we already know: sound shapes form, and the body is made of fluid. Let your felt experience be the guide. If a particular frequency produces a genuine sense of opening, calm, or relief in the body — that is enough. Sound has form. You are made of fluid. Therefore, sound shapes you. Conscious listening is not a hobby; it is an energetic necessity for maintaining coherence in a chaotic world. When you listen consciously, the channels open, the localised contraction of the separate self relaxes, and you align yourself with the geometry of Life without any active effort.",
        },
      ],
      layers: ["The Vital Body", "Emotional Body"],
      leverSlug: "sound",
      relatedPractices: ["aum-chanting", "humming"],
      metaTitle: "Conscious Listening — How to Practise It | Sunya",
      metaDescription:
        "Choosing what you listen to deliberately. What goes into your ears changes how settled you feel, and most people never choose it.",
      families: ["M3"],
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "aum-chanting",
            reason: "Adjacent in source order within the same lever sequence.",
          },
          {
            slug: "humming",
            reason: "Adjacent in source order within the same lever sequence.",
          },
        ],
      },
    },
  ],
  groups: [],
  relatedZones: ["emotional-accumulation", "mental-fragmentation"],
  metaTitle: "Sound — Lever 4 Practice Library | Sunya",
  metaDescription: "Sound is the most universal inner technology in human history.",
};
