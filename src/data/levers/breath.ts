import type { Lever } from "@/data/levers/types";

export const breathLever: Lever = {
  slug: "breath",
  number: 1,
  name: "Breath",
  layerLine: "The Vital Body + Physical Body",
  summaryLine: "Your breath. The one faculty that is both automatic and voluntary, which makes it a direct handle on the nervous system and on how much energy is available to you. It is free, always available, and can be used anywhere without drawing attention.",
  intro: [
    "The breath works across several layers at once. At the level of the body, the breath and the nervous system mirror each other in both directions. The breath reveals the state of the system — shallow and fast in anxiety, slow and deep in calm — and it governs that state: slow the breath deliberately, and the system follows it down into safety; quicken it, and the system rouses. You can therefore both read the nervous system through the breath and steer it through the breath.",
    "Breath also changes how much energy you have and how evenly it sits in the body. Slow, deep breathing calms an agitated system; quicker breathing lifts a dull one; even, deliberate breathing gathers attention when it is scattered. And because a still breath quiets the mind, it reaches the mental layer too. This is why the breath is steadied before any deeper inner work: settle the breath, and the mind settles with it.",
    "The breath asks nothing of your beliefs. It needs no faith, no doctrine, no allegiance to any tradition — its effect is simply physiological, and therefore universal. Breathe slowly and you will calm, whatever you believe or do not believe. The body answers the same way in everyone.",
  ],
  groups: [
    {
      slug: "calming",
      name: "Calming",
      qualifier: "For stress, anxiety and an overactive system",
      practices: [
        {
          slug: "alternate-nostril-breathing",
          name: "Alternate-Nostril Breathing",
          subtitle: "balancing both sides",
          essence:
            "The most thorough of the balancing breaths. Alternating sides slows the breath and settles the whole system evenly. (Known in the yogic traditions as nadi shodhana.)",
          mechanism: [
            "Closing one nostril concentrates the breath. With both nostrils open, the breath divides between them; close one, and the entire force of the breath flows through the other — much as water pushed through a single pipe instead of two flows with far greater pressure. So slow, conscious breathing through one nostril is far more potent than ordinary breathing, even deep breathing.",
            "Alternating between the two sides brings that concentrated breath to each half of the system in turn. Because of this, it settles the nervous system more quickly and deeply than ordinary breathing, and leaves the body feeling clearer and more evenly awake from side to side.",
          ],
          protocol: [
            {
              text: "With your right thumb, close the right nostril. Inhale slowly through the left.",
            },
            {
              text: "Close the left nostril (releasing the right). Exhale through the right.",
            },
            { text: "Inhale through the right." },
            { text: "Close the right, and exhale through the left. — That is one round." },
            { text: "Continue for 5–10 minutes, breathing slowly and evenly." },
          ],
          duration: "5–10 minutes",
          layers: ["The Vital Body", "Physical Body", "Mental Body"],
          leverSlug: "breath",
          groupSlug: "calming",
          relatedPractices: ["coherent-breathing", "deep-belly-breathing", "spinal-breathing"],
          metaTitle: "Alternate-Nostril Breathing — How to Practise It | Sunya",
          metaDescription:
            "The most thorough of the balancing breaths. Alternating sides slows the breath and settles the whole system evenly.",
          families: ["H4", "M4"],
          directions: ["calm", "stabilise"],
          problems: [],
          generated: {
            layersSource: "STATED",
            durationSource: "STATED",
            relatedPracticeRationale: [
              {
                slug: "coherent-breathing",
                reason: "Both are foundational regulators that settle and organise the system.",
              },
              {
                slug: "deep-belly-breathing",
                reason: "Both are baseline-safe foundation practices for daily steadiness.",
              },
              {
                slug: "spinal-breathing",
                reason:
                  "Alternate-nostril balancing naturally precedes deeper spinal-breath work.",
              },
            ],
          },
        },
        {
          slug: "deep-belly-breathing",
          name: "Deep Belly Breathing",
          subtitle: "the return to baseline",
          essence: "A return to the body’s natural, default rhythm.",
          mechanism: [
            "Most adults breathe shallowly, high in the chest — the breathing of a system stuck in low-grade anxiety. Drawing the breath down into the belly engages the diaphragm, which stimulates the vagus nerve and lowers stress hormones, signalling to the body that it is safe. It is the quickest way to return an anxious system to baseline.",
          ],
          protocol: [
            { text: "Close your eyes and rest one hand on your belly." },
            {
              text: "Inhale slowly through the nose, feeling the belly expand under your hand. Inwardly say:",
              emphasis: "I am safe.",
            },
            {
              text: "Exhale gently through the nose or mouth, feeling the belly fall. Inwardly say:",
              emphasis: "I am at peace.",
            },
            { text: "Continue for 3–5 minutes." },
          ],
          duration: "3–5 minutes",
          layers: ["Physical Body", "The Vital Body", "Mental Body"],
          leverSlug: "breath",
          groupSlug: "calming",
          relatedPractices: [
            "coherent-breathing",
            "the-physiological-sigh",
            "alternate-nostril-breathing",
          ],
          metaTitle: "Deep Belly Breathing — How to Practise It | Sunya",
          metaDescription: "A return to the body’s natural, default rhythm.",
          families: ["H1", "H4"],
          directions: ["ground", "calm"],
          problems: ["insomnia"],
          generated: {
            layersSource: "STATED",
            durationSource: "STATED",
            relatedPracticeRationale: [
              {
                slug: "coherent-breathing",
                reason: "Both are gentle baseline regulation practices for sustained calm.",
              },
              {
                slug: "the-physiological-sigh",
                reason: "Both directly down-regulate anxious states through breath mechanics.",
              },
              {
                slug: "alternate-nostril-breathing",
                reason: "Foundational side-to-side balancing pairs naturally with diaphragmatic reset.",
              },
            ],
          },
        },
        {
          slug: "coherent-breathing",
          name: "Coherent Breathing",
          subtitle: "heart and mind in one rhythm",
          essence: "Bringing the heart and mind into a single, even rhythm.",
          mechanism: [
            "Breathing at a rate of about five and a half breaths a minute draws the heart, the breath, and the nervous system into coherence — a smooth, ordered rhythm that steadies the entire system at once. It is gentle, sustainable for long periods, and one of the simplest ways to settle into calm clarity.",
          ],
          protocol: [
            { text: "Sit comfortably." },
            { text: "Inhale through the nose for about 5.5 seconds." },
            { text: "Exhale through the nose for about 5.5 seconds." },
            { text: "Let it be a continuous circle — no pause at the top or the bottom." },
            { text: "Continue for 10–20 minutes." },
          ],
          duration: "10–20 minutes",
          layers: ["Physical Body", "The Vital Body", "Mental Body", "Emotional Body"],
          leverSlug: "breath",
          groupSlug: "calming",
          relatedPractices: [
            "deep-belly-breathing",
            "alternate-nostril-breathing",
            "breath-retention",
          ],
          metaTitle: "Coherent Breathing — How to Practise It | Sunya",
          metaDescription: "Bringing the heart and mind into a single, even rhythm.",
          families: ["H3", "H4", "M4"],
          directions: ["calm", "stabilise", "soften"],
          problems: ["insomnia"],
          generated: {
            layersSource: "STATED",
            durationSource: "STATED",
            relatedPracticeRationale: [
              {
                slug: "deep-belly-breathing",
                reason: "Both train smooth, safe baseline nervous-system regulation.",
              },
              {
                slug: "alternate-nostril-breathing",
                reason: "Both settle and organise breath flow across the system.",
              },
              {
                slug: "breath-retention",
                reason: "Coherence provides a stable base before introducing deliberate holds.",
              },
            ],
          },
        },
        {
          slug: "the-physiological-sigh",
          name: "The Physiological Sigh",
          subtitle: "the panic switch",
          essence: "The quickest of these to take effect, and the one to use mid-panic.",
          mechanism: [
            "A double inhale reopens the tiny collapsed air sacs deep in the lungs, and the long, complete exhale offloads carbon dioxide and triggers the body’s relaxation brake. It can pull the system out of acute panic in a single round — faster than almost anything else.",
          ],
          protocol: [
            { text: "Inhale deeply through the nose." },
            {
              text: "At the top, take a second, short, sharp inhale through the nose, filling the lungs completely.",
            },
            {
              text: "Exhale slowly and fully through the mouth, with a soft sighing sound.",
            },
            { text: "Repeat just 3 times." },
          ],
          layers: ["Physical Body", "Mental Body", "The Vital Body"],
          leverSlug: "breath",
          groupSlug: "calming",
          relatedPractices: ["4-7-8-breathing", "deep-belly-breathing", "coherent-breathing"],
          metaTitle: "The Physiological Sigh — How to Practise It | Sunya",
          metaDescription: "The quickest of these to take effect, and the one to use mid-panic.",
          families: ["H1", "H4"],
          directions: ["calm", "contain", "slow"],
          problems: ["insomnia"],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "4-7-8-breathing",
                reason: "Both are direct sedative practices for acute over-activation.",
              },
              {
                slug: "deep-belly-breathing",
                reason: "Both quickly down-regulate anxiety and restore safety signals.",
              },
              {
                slug: "coherent-breathing",
                reason: "Acute panic control can transition into longer coherence work.",
              },
            ],
          },
        },
        {
          slug: "4-7-8-breathing",
          name: "4-7-8 Breathing",
          subtitle: "the tranquiliser",
          essence: "Strongly calming — for sleep, or for high anxiety.",
          mechanism: [
            "The long hold and the still longer exhale tip the nervous system strongly toward rest, slowing the heart and quieting the mind. It is potent enough to carry many people down into sleep.",
          ],
          protocol: [
            {
              text: "Rest the tip of your tongue against the ridge just behind your upper front teeth.",
            },
            { text: "Inhale through the nose for 4 counts." },
            { text: "Hold the breath for 7 counts." },
            {
              text: "Exhale through the mouth for 8 counts, with a soft audible sound.",
            },
            { text: "Repeat for 4–8 cycles." },
          ],
          layers: ["Physical Body", "Mental Body", "The Vital Body"],
          leverSlug: "breath",
          groupSlug: "calming",
          relatedPractices: ["the-physiological-sigh", "coherent-breathing", "breath-retention"],
          metaTitle: "4-7-8 Breathing — How to Practise It | Sunya",
          metaDescription: "Strongly calming — for sleep, or for high anxiety.",
          families: ["H4", "H1"],
          directions: ["calm", "slow", "contain"],
          problems: ["insomnia"],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "the-physiological-sigh",
                reason: "Both specifically target high arousal and panic-like states.",
              },
              {
                slug: "coherent-breathing",
                reason: "Both move the system toward calm through paced breathing.",
              },
              {
                slug: "breath-retention",
                reason: "All use deliberate timing and pause to quiet mind and body.",
              },
            ],
          },
        },
      ],
    },
    {
      slug: "the-activators",
      name: "The Activators",
      qualifier: "For low energy and lethargy",
      safetyNote: [
        "A note on safety — read before practising any of these. Because they are rapid and forceful, these breaths can leave you light-headed, dizzy, or tingling. Always practise sitting or lying down — never standing, never in or near water, and never while driving. Stop and rest if you feel unwell.",
        "Avoid them in pregnancy, and if you have high blood pressure, a heart condition, or epilepsy. Begin gently and build up slowly.",
      ],
      practices: [
        {
          slug: "bellows-breath",
          name: "Bellows Breath",
          subtitle: "the energising pump",
          essence: "A vigorous pump that floods the system with energy and heat. (Known in the yogic traditions as bhastrika.)",
          mechanism: [
            "The rapid, forceful breathing, paired with the sweeping arm movement, turns the body into a pump. Heat builds quickly; tingling often spreads through the hands and face; and alertness rises without stimulants. It is one of the fastest natural ways to lift energy when the system is dull.",
          ],
          protocol: [
            { text: "Sit tall, with your hands in loose fists by your shoulders." },
            { text: "As you inhale, throw your arms up and open your palms." },
            { text: "As you exhale, pull your arms down sharply and close your fists." },
            {
              text: "Breathe forcefully in and out through the nose, in rhythm with the arms — about one breath per second.",
            },
            {
              text: "Do 20 breaths, then rest and breathe naturally. Build to 2–3 rounds over time.",
            },
          ],
          layers: ["Physical Body", "The Vital Body", "Mental Body"],
          leverSlug: "breath",
          groupSlug: "the-activators",
          relatedPractices: [
            "skull-shining-breath",
            "cyclic-hyperventilation",
            "coherent-breathing",
          ],
          metaTitle: "Bellows Breath — How to Practise It | Sunya",
          metaDescription: "A vigorous pump that floods the system with energy and heat.",
          families: ["L3", "L4", "P3"],
          directions: ["energise", "uplift", "initiate"],
          problems: [],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "skull-shining-breath",
                reason: "Both are high-intensity activating pump practices in the same group.",
              },
              {
                slug: "cyclic-hyperventilation",
                reason: "All three activators build strong charge and heat rapidly.",
              },
              {
                slug: "coherent-breathing",
                reason: "A calming counterbalance after intense activation rounds.",
              },
            ],
          },
        },
        {
          slug: "skull-shining-breath",
          name: "Skull-Shining Breath",
          subtitle: "clarity and charge",
          essence: "Clearing the head and brightening the whole system. (Known in the yogic traditions as kapalabhati.)",
          mechanism: [
            "The short, sharp exhales act as a rapid pump — each one driving stale air from the depths of the lungs and leaving a bright, clear, awake sensation through the head. Many people feel sharper and more alert within a single round.",
          ],
          protocol: [
            { text: "Sit tall." },
            { text: "Let the inhale be passive and effortless." },
            {
              text: "Exhale by snapping the belly sharply inward, pushing the air out through the nose.",
            },
            { text: "Find a rhythm of about one to two pumps per second." },
            { text: "Do 3 rounds of 30 pumps, resting between rounds." },
          ],
          layers: ["Physical Body", "The Vital Body", "Mental Body"],
          leverSlug: "breath",
          groupSlug: "the-activators",
          relatedPractices: ["bellows-breath", "cyclic-hyperventilation", "the-physiological-sigh"],
          metaTitle: "Skull-Shining Breath — How to Practise It | Sunya",
          metaDescription: "Clearing the head and brightening the whole system.",
          families: ["L3", "L4", "P3"],
          directions: ["energise", "uplift", "clarify"],
          problems: [],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "bellows-breath",
                reason: "Both are fast pump-based activators that raise heat and alertness.",
              },
              {
                slug: "cyclic-hyperventilation",
                reason: "Both escalate charge and alertness through vigorous breath cycles.",
              },
              {
                slug: "the-physiological-sigh",
                reason: "Useful down-shift counterpart if activation overshoots.",
              },
            ],
          },
        },
        {
          slug: "cyclic-hyperventilation",
          name: "Cyclic Hyperventilation",
          subtitle: "intense activation",
          essence: "A powerful surge of energy, heat, and elevated mood.",
          mechanism: [
            "Rounds of rapid, deep breathing followed by a long breath-hold reset the body’s chemistry and generate intense internal heat and a heightened, clear state. Energy rises sharply; the body often tingles; mood lifts. It is the most intense of the activating breaths.",
            "Extra caution. Especially powerful — and never to be done in or near water.",
          ],
          protocol: [
            {
              text: "Take 30–40 deep, continuous breaths — inhaling fully into the belly and chest, and letting each breath fall out passively, not forced.",
            },
            {
              text: "After the final exhale, hold the breath out for as long as is comfortable (around 1–3 minutes).",
            },
            {
              text: "Then inhale fully and hold for about 15 seconds before releasing.",
            },
            { text: "Repeat for 3 rounds." },
          ],
          layers: ["Physical Body", "The Vital Body", "Emotional Body", "Mental Body"],
          leverSlug: "breath",
          groupSlug: "the-activators",
          relatedPractices: ["bellows-breath", "skull-shining-breath", "coherent-breathing"],
          metaTitle: "Cyclic Hyperventilation — How to Practise It | Sunya",
          metaDescription: "A powerful surge of energy, heat, and elevated mood.",
          families: ["L3", "L4", "P3"],
          directions: ["energise", "uplift", "initiate"],
          problems: [],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "bellows-breath",
                reason: "Both are high-intensity activators that rapidly build energy and heat.",
              },
              {
                slug: "skull-shining-breath",
                reason: "All activators share rapid pumping and strong charge effects.",
              },
              {
                slug: "coherent-breathing",
                reason: "A stabilising integration practice after intense activation work.",
              },
            ],
          },
        },
      ],
    },
    {
      slug: "deeper-practices",
      name: "Deeper Practices",
      qualifier: "Meditation and deeper states",
      note: "Because these work directly on breath, attention, and the centre of the spine, approach them gently, never forcing, and let them unfold at their own pace.",
      safetyNote: [
        "A note on safety — important. The gentle, equal-count retention is suitable for most people and calming to practise. But as the holds grow longer, and with the Great Lock especially, these build strong internal pressure — so take care: practise seated, never in or near water, and never while driving; lengthen the holds only gradually and never strain; and stop if you feel light-headed.",
        "Avoid the longer holds and the Great Lock in pregnancy, and if you have high blood pressure, a heart condition, glaucoma, or epilepsy. The Great Lock is best learned with an experienced teacher.",
      ],
      practices: [
        {
          slug: "spinal-breathing",
          name: "Spinal Breathing",
          subtitle: "the central line",
          essence:
            "The deepest of the breath practices: attention moves with the breath along a line up the centre of the spine. (Known in the yogic traditions as sushumna kriya.)",
          mechanism: [
            "Breathing deeply with concentrated awareness up and down the spine draws attention and energy slowly along a line through the centre of the body, so that breath and attention move together. Practitioners often report heightened clarity and a steady, quiet alertness as the practice settles.",
          ],
          protocol: [
            { text: "Sit with the spine erect." },
            {
              text: "As you inhale slowly, mentally draw attention up the spine — pulling it, with your whole concentration, from the base of the spine to the centre of the forehead.",
            },
            {
              text: "As you exhale slowly, push it back down, from the centre of the forehead to the base.",
            },
            {
              text: "Keep your entire attention on this rising and falling, moving the energy with your will. It should come to feel as though you are breathing not through the nose but through the spine itself — as though the spine is breathing: drawing up on the in-breath, releasing down on the out-breath.",
            },
            {
              text: "Continue, breath and attention moving as one, up and down the central channel.",
            },
            {
              text: "Optional variation: rather than sweeping the whole spine, you may rest the breath on a single centre — breathing into it and out from it — to open and strengthen that centre in particular.",
            },
          ],
          layers: ["The Vital Body", "Physical Body", "Mental Body", "Consciousness"],
          leverSlug: "breath",
          groupSlug: "deeper-practices",
          relatedPractices: ["alternate-nostril-breathing", "breath-retention", "the-great-lock"],
          metaTitle: "Spinal Breathing — How to Practise It | Sunya",
          metaDescription:
            "The deepest of the breath practices: attention moves with the breath along a line up the centre of the spine.",
          families: ["L3", "M4"],
          directions: ["initiate", "stabilise", "clarify"],
          problems: [],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "alternate-nostril-breathing",
                reason: "Side-to-side balancing foundation before deep spinal-breath work.",
              },
              {
                slug: "breath-retention",
                reason: "Both intensify internal stillness and upward attention along the spine.",
              },
              {
                slug: "the-great-lock",
                reason: "Both gather attention and energy along the centre of the spine.",
              },
            ],
          },
        },
        {
          slug: "breath-retention",
          name: "Breath Retention",
          subtitle: "the pause between",
          essence:
            "The conscious, deliberate pause — where the breath stops and the system opens, settles, and falls quiet.",
          mechanism: [
            "Consciously holding the breath quiets the overthinking mind — and the two holds do different things. Holding after the in-breath builds an inner pressure and a sense of fullness; energy often feels denser and more gathered. Holding after the out-breath builds stillness — opening into a deep, silent, empty quiet, and stilling the chatter of the mind. What matters is that the holding is conscious and willed — the practice is in the deliberate pause, not the shallow breath-catching of an anxious body.",
          ],
          protocol: [
            { text: "Inhale for 4 counts." },
            { text: "Hold the breath in for 4 counts." },
            { text: "Exhale for 4 counts." },
            { text: "Hold the breath out for 4 counts. — That is one round." },
            {
              text: "Once this is easy, lengthen the holds gradually (for example: inhale 4, hold 8, exhale 8, hold 4) — slowly, and never to strain.",
            },
          ],
          layers: ["The Vital Body", "Physical Body", "Mental Body"],
          leverSlug: "breath",
          groupSlug: "deeper-practices",
          relatedPractices: ["the-great-lock", "spinal-breathing", "4-7-8-breathing"],
          metaTitle: "Breath Retention — How to Practise It | Sunya",
          metaDescription:
            "The conscious, deliberate pause — where the breath stops and the system opens, settles, and falls quiet.",
          families: ["H4"],
          directions: ["calm", "contain", "slow"],
          problems: [],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "the-great-lock",
                reason: "Both are lock-stage practices built on controlled holding and pressure.",
              },
              {
                slug: "spinal-breathing",
                reason: "Retention supports deeper concentration along the spinal line.",
              },
              {
                slug: "4-7-8-breathing",
                reason: "Both use deliberate hold ratios to settle and quiet the system.",
              },
            ],
          },
        },
        {
          slug: "the-great-lock",
          name: "The Great Lock",
          subtitle: "the full seal",
          essence:
            "The most powerful of the sealing practices: hold the breath still and engage the body's locks, building internal pressure. The effect is a strong upward pull through the torso and a marked stillness afterwards. (Known in the yogic traditions as maha bandha.)",
          mechanism: [
            "Engaging the three locks of the body — base, belly, and throat — together while the breath is held out creates a strong vacuum and pressure through the torso. The effect is a strong upward pull through the centre of the body and a marked stillness afterwards. It is the most potent of the locks, and the most demanding.",
          ],
          protocol: [
            {
              text: "Take a full, deep inhale; then exhale completely, emptying the lungs.",
            },
            {
              text: "Base lock: contract and draw up the muscles of the pelvic floor (the root lock from Lever 0).",
            },
            {
              text: "Belly lock: pull the belly in and up, under the ribs, creating a hollow.",
            },
            { text: "Throat lock: tuck the chin gently down toward the chest." },
            {
              text: "Hold all three together, breath held out, for as long as is comfortable — without strain.",
            },
            {
              text: "Release in reverse order — chin up, belly soft, base released — then inhale smoothly.",
            },
          ],
          layers: ["The Vital Body", "Physical Body"],
          leverSlug: "breath",
          groupSlug: "deeper-practices",
          relatedPractices: ["the-root-lock", "breath-retention", "spinal-breathing"],
          metaTitle: "The Great Lock — How to Practise It | Sunya",
          metaDescription:
            "The most powerful of the sealing practices: hold the breath still and engage the body's locks, building internal pressure.",
          families: ["L3"],
          directions: ["contain", "initiate"],
          problems: [],
          generated: {
            layersSource: "STATED",
            durationSource: "OMITTED",
            relatedPracticeRationale: [
              {
                slug: "the-root-lock",
                reason: "Great Lock explicitly includes and builds on the root lock base.",
              },
              {
                slug: "breath-retention",
                reason: "Both rely on deliberate holds and sealing to contain pressure.",
              },
              {
                slug: "spinal-breathing",
                reason: "All three support upward attention and steadiness along the spinal line.",
              },
            ],
          },
        },
      ],
    },
  ],
  relatedZones: [
    "survival-crisis",
    "nervous-system-collapse",
    "emotional-accumulation",
    "mental-fragmentation",
  ],
  metaTitle: "Breath — Lever 1 Practice Library | Sunya",
  metaDescription:
    "Breath is the most immediate of all the tools, and for most people the natural place to begin.",
};
