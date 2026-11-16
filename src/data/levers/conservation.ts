import type { Lever } from "@/data/levers/types";

export const conservationLever: Lever = {
  slug: "conservation",
  number: 0,
  name: "Conservation",
  subtitle: "The Prerequisite",
  layerLine: "The prerequisite for all twelve",
  summaryLine: "Conservation helps you stabilise your life and build the energy needed to fuel lasting transformation. Without this step, you may find that you quickly lose whatever inner progress you have made, or that you do not have enough energy to start or maintain steady practice. Through energy conservation, inner practice becomes consistent and transformation happens faster.",
  intro: [],
  leadEssence:
    "Before you can raise your energy, you must stop wasting it. Most people live with the tap running — leaking energy faster than they could ever build it. Conservation is the simple discipline of plugging the leaks, so that energy is no longer drained away but allowed to gather. It comes before everything else, because there is no use generating more energy into a vessel that cannot hold it.",
  leadMechanism:
    "Stop the draining and the effect compounds. What you are not spending is still there — in energy, in attention, in patience. Conservation forces nothing; it removes the constant leaking that keeps the system low. The gathering happens on its own.",
  leadBridgeLine:
    "Energy leaks through a handful of predictable outlets. Each practice below seals one of them.",
  practices: [
    {
      slug: "silence",
      name: "Silence",
      essence:
        "Speech takes more out of you than most people notice. It keeps attention turned outward, and much of what gets said is unnecessary. The practice is not a rule of silence but spending speech deliberately.",
      mechanism: [
        "You can hear this directly: a person brimming with energy speaks with a strong, vivid voice, while a depleted person speaks slowly and faintly. The voice broadcasts the state of the energy, and spends it in the broadcasting.",
        "Notice, too, that you cannot speak and breathe freely at the same time — speech interrupts the very breath that feeds the system.",
        "The drain also runs in both directions. Excessive speech, particularly idle chatter and gossip, leaves the mind restless. The restless mind then reaches for more speech, which agitates it further. Most of this happens unconsciously — we rarely notice what our talking is doing to our energy, our clarity, or our state of mind.",
        "The practice is periods of deliberate silence — not strain or suppression, but resting the voice, and with it the restless mind that drives it. In that silence, two things happen at once: the leaking of energy stops, and a natural clarity arises. Energy settles and begins to reorganise itself. You perceive more clearly and act with more composure, because there is finally something in the system to act from.",
        "There is a further effect, easily observed in others. Words spoken constantly lose their weight — when someone talks without pause, their speech carries less gravity and is received with less attention. The words become cheap. Speech drawn from silence carries meaning and lands.",
      ],
      protocol: [
        {
          text: "Let silence be your default mode: Most people hold the reverse — speaking is what is happening, with brief gaps of silence in between. Invert it. Silence is the resting state; speech is what temporarily interrupts it. This single shift does more than any rule, and it deepens meditation on its own.",
        },
        {
          text: "Speak only with reason: From that ground, speak only when there is something meaningful to communicate. Not suppression — simply no longer speaking without reason. Idle speech agitates the mind, and the agitated mind reaches for more speech.",
        },
        {
          text: "Set aside daily silence: Take a stretch of time each day, or a longer period each week, in which you simply do not speak, or reduce speech to what is necessary. In that time, observe rather than comment — notice how much more you see when you are not preparing to speak.",
        },
        {
          text: "Take longer periods: Where possible, several days or a week of complete silence. The effect deepens considerably beyond the first day.",
        },
      ],
      layers: ["The Vital Body", "Mental Body", "Physical Body"],
      leverSlug: "conservation",
      relatedPractices: ["sensory-rest", "deep-belly-breathing", "coherent-breathing"],
      metaTitle: "Silence — How to Practise It | Sunya",
      metaDescription:
        "Speech takes more out of you than most people notice. It keeps attention turned outward, and much of what gets said is unnecessary.",
      families: ["L1", "H2", "H4"],
      directions: ["restore", "reduce", "calm"],
      problems: [],
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
        "The senses reach outward all day toward stimulation — screens, noise, endless input. Sensory rest withdraws them: deliberate breaks from input, letting things settle back to a natural level.",
      mechanism: [
        "Overstimulation always has an effect on the system.",
        "You already know this from taste. Heavy sugar or salt gives you a spike and then a crash, and the tongue adapts — so next time you need more of it to feel the same satisfaction. Every sense works the same way. Loud music, constant visual novelty, a stream of bad news. Each one raises the level of stimulation you need before anything registers at all, and leaves the system agitated in between.",
        "There is also a subtler cost, and it is easy to miss. When the eyes roam, you are not simply seeing. You are labelling, comparing, critiquing, projecting, agreeing, objecting. The mind is constantly enmeshed with whatever the senses land on, and almost none of it is chosen. It runs on its own.",
        "For anyone not yet conscious of the deeper essence, the senses are effectively everything, and so are their objects. Attached to them, you are easily distracted. Meditation becomes difficult and stillness feels unavailable — not because you are failing at it, but because the system is being pulled outward all day.",
        "Reduce the input and things begin to settle by themselves. And in the space that opens, awareness can turn back toward itself — toward consciousness, toward silence, toward what is aware.",
      ],
      protocol: [
        {
          text: "Cut what serves nothing: Not all stimulation, only the kind you never actually chose. The scroll, the background noise, the news you did not need to read. Start with whatever has become most habitual.",
        },
        {
          text: "Lower the gaze: Let the eyes rest instead of roaming. Stop labelling and critiquing whatever falls in front of them. This alone quiets a surprising amount of mental activity.",
        },
        {
          text: "Take deliberate breaks: Set aside periods in the day with no screen, no music, and no input at all. Let the senses settle into quiet rather than waiting for the next thing.",
        },
        {
          text: "Lower the intensity: Eat less heavily stimulating food. Avoid music that is jarring or negatively charged. Spend time in quieter rooms. This is not deprivation — you are lowering the threshold so that ordinary things can register again.",
        },
        {
          text: "Turn the freed attention inward: The point is not the quiet itself, but what becomes noticeable within it.",
        },
      ],
      layers: ["Mental Body", "The Vital Body", "Environment"],
      leverSlug: "conservation",
      relatedPractices: ["silence", "coherent-breathing", "alternate-nostril-breathing"],
      metaTitle: "Sensory Rest — How to Practise It | Sunya",
      metaDescription:
        "The senses reach outward all day toward stimulation — screens, noise, endless input. Sensory rest withdraws them.",
      families: ["H2", "H4", "M4"],
      directions: ["reduce", "simplify", "calm"],
      problems: ["insomnia"],
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "silence",
            reason: "Both reduce outward engagement and preserve energy.",
          },
          {
            slug: "coherent-breathing",
            reason: "A quieter sensory field supports sustained rhythmic regulation.",
          },
          {
            slug: "alternate-nostril-breathing",
            reason: "Sensory quiet pairs naturally with concentrated balancing breathwork.",
          },
        ],
      },
    },
    {
      slug: "fasting",
      name: "Fasting",
      essence:
        "A great deal of the body’s energy goes into digestion. Periodic fasting frees that energy, and the effects reach every layer at once — body, vital body, and mind.",
      mechanism: [
        "Start with the body. Digestion is constant work, and eating every day means the body rarely gets to stop and attend to itself. Fasting gives it that time. Instead of breaking food down, it turns to maintenance — repairing, cleansing, consuming damaged cells, restoring itself. Inflammation drops. The body gets lighter and stronger.",
        "In the vital body, the same shift happens. When there is no food to digest, the freed energy is available to rise. Emptiness itself contributes to this: with nothing sitting in the system, energy moves upward more easily and begins to reorganise into its natural flow.",
        "The mind quiets too. The weight of food in the body and the activity of digesting it both register mentally, whether or not you notice. When that stops, there is simply less going on. The body moves into a healing state rather than a working one, and the mind tends to settle with it.",
        "There is also the plain matter of time and attention. Fasting removes the thinking about food, the cooking, the eating, the cleaning up. All of that attention becomes available for practice.",
        "And it makes the relationship with eating conscious again. Most eating happens on autopilot. Stopping shows you what was actually habit.",
        "Nearly every tradition discovered this independently — Lent, Ramadan, the fasting days of yoga. Science has since described the same mechanisms from the other direction.",
      ],
      protocol: [
        {
          text: "Do as much as is comfortable: There is no fixed rule here, and no version that is more correct than another. Some people fast for part of each day, some for a full day, some for several days on water or fruit alone. Begin where you can and let it develop.",
        },
        {
          text: "Start with a daily eating window: The simplest entry point. Confine eating to certain hours and leave the rest of the day clear, so the body enters recovery every single day rather than occasionally.",
        },
        {
          text: "Take longer fasts periodically: A full day, or several. The deeper effects — the cleansing, the rising energy, the quiet — become much more noticeable beyond the first day.",
        },
        {
          text: "Use the time for practice: The point is not only the physical rest. Fasting frees attention as well as energy, and that attention is best turned toward practice rather than distraction.",
        },
        {
          text: "Break it gently: Return to food slowly and lightly. How you come out of a fast matters as much as the fast itself.",
        },
      ],
      layers: ["Physical Body", "The Vital Body", "Mental Body"],
      leverSlug: "conservation",
      relatedPractices: ["sexual-conservation", "deep-belly-breathing", "coherent-breathing"],
      metaTitle: "Fasting — How to Practise It | Sunya",
      metaDescription: "A great deal of the body’s energy goes into digestion.",
      families: ["L1", "H2"],
      directions: ["restore", "reduce"],
      problems: [],
      generated: {
        layersSource: "INFERRED",
        durationSource: "OMITTED",
        relatedPracticeRationale: [
          {
            slug: "sexual-conservation",
            reason: "Both are direct conservation practices that reduce major vitality drains.",
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
        "A natural drive, and a strong one. The practice is not suppression — that tends to come out sideways — but moderation, and putting attention into work, training, relationship warmth and practice instead. Forced frequency targets lower enjoyment; shame-driven abstinence streaks often make things worse.",
      mechanism: [
        "This drive is a natural part of the human system. The first step is to recognise it rather than push it under the carpet.",
        "What the evidence actually supports is narrower than internet mythology. In committed relationships, sexual frequency tracks with well-being up to about once a week, and much of that link runs through everyday physical affection rather than intercourse alone. Instructing couples to double how often they have sex lowers happiness and enjoyment — turning intimacy into a quota removes intrinsic desire.",
        "Claims that holding back ejaculation produces a lasting testosterone boost rest on a 2003 study that was formally retracted in 2021. There is no solid evidence that semen retention builds physiological “superpowers.” Stepping back from compulsive pornography can restore a sense of self-control when paired with ordinary habit changes and support; shame-heavy online abstinence forums are linked to higher anxiety, erectile worries and post-slip distress.",
        "No suppression and no repression. Suppressed, the drive tends to come out sideways. But there is equally no need to make it the whole of life, or to be ruled by it. Balance is the key.",
      ],
      protocol: [
        {
          text: "Begin with balance: Not abstinence as a rule imposed from outside. Notice whether sexual activity is driven by desire, boredom, loneliness or habit — and whether everyday affection is present without a quota.",
        },
        {
          text: "If you pause pornography or solo habits: Run a calm 14-to-30-day behavioural check rather than an all-or-nothing streak. Change bedtime routines, remove triggers, and replace boredom with something real. Drop streak counting if a slip becomes a crisis of worth.",
        },
        {
          text: "Limit the exposure: Avoid what triggers compulsive use. Audit what you consume and who you follow — anything that keeps you looping goes. This matters more than willpower does, because once arousal arises it is much harder to resist the second time.",
        },
        {
          text: "Build non-sexual connection: Much of compulsive activity is driven by boredom or loneliness rather than genuine desire. Friendships, people you see regularly, and touch that has nothing sexual in it meet the need underneath.",
        },
        {
          text: "Have something you are building: Something that captures your focus so completely that sexual activity becomes secondary — not through struggle, but because you are absorbed in what you are doing.",
        },
        {
          text: "Never fight nature: If nature calls, yield to it and move on. Then return to what you were doing. Spending your time fighting and resisting is itself another loss.",
        },
      ],
      beforeYouStart: [
        "If an abstinence attempt makes you obsessive, self-hating or hopeless after a slip, leave shame-heavy online forums and drop streak counting.",
        "Worry about sexual performance — rather than frequency itself — strongly predicts erectile difficulties; framing ordinary arousal shifts as permanent damage worsens anxiety.",
        "Never use frequency targets or unilateral abstinence as leverage or punishment inside a relationship.",
        "If sexual urges or pornography use feel genuinely out of control, cause serious harm, or tie into trauma, seek qualified care rather than an unguided online challenge.",
      ],
      layers: ["Physical Body"],
      leverSlug: "conservation",
      relatedPractices: ["the-root-lock", "fasting", "spinal-breathing"],
      metaTitle: "Sexual Conservation — How to Practise It | Sunya",
      metaDescription:
        "Moderation and attention rather than suppression or quotas — with affection evidence kept and retracted testosterone myths removed.",
      families: ["L1"],
      directions: ["contain", "restore", "reduce"],
      problems: [],
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
            reason: "Each practice reduces a major drain.",
          },
          {
            slug: "spinal-breathing",
            reason: "Conserved force is naturally paired with upward spinal-breath practices.",
          },
        ],
      },
    },
    {
      slug: "the-root-lock",
      name: "The Root Lock",
      essence:
        "A gentle contraction at the base of the pelvis, held briefly during seated practice. (Known in the yogic traditions as mula bandha.) Its evidence as an inner practice for mood, attention or autonomic balance is traditional rather than clinical — keep contractions brief, and release fully between breaths.",
      mechanism: [
        "In rehabilitation medicine, the same muscles are trained for stress urinary incontinence and related weakness. That physical use is well evidenced. As an inner practice aimed at mood, attention, meditation depth or autonomic balance, there are no controlled trials showing the contraction does anything on its own.",
        "The traditional instruction treats the lock as a physical cue during breath retention and seated stillness — a brief lift at the pelvic base, then a complete release. It does not validate claims that holding a tight contraction forces sensation or awareness up the spine.",
        "A real harm sits on the other side of overuse: many people already hold excess tension in these muscles under stress. Repeated squeezing or holding a tight lock on top of high resting tone can trigger or worsen pelvic pain, urinary urgency and constipation. If you have those symptoms, stop contracting and seek pelvic-health assessment — the required training is usually relaxation, not tightening.",
      ],
      protocol: [
        {
          text: "Sit with the spine erect: Cross-legged on the floor or upright in a chair.",
        },
        {
          text: "Find the muscles: The pelvic floor — specifically the muscles between the genitals and the anus. The same ones you would use to stop the flow of urine. Contract them gently once or twice to locate them.",
        },
        {
          text: "Breathe in and squeeze lightly: Take a full breath in, then contract the pelvic floor muscles upward. Everything else stays relaxed — shoulders, jaw, abdomen.",
        },
        {
          text: "Hold briefly: Keep the breath and the contraction together for a few seconds, without strain. If you are gripping hard or the jaw is tightening, ease off.",
        },
        {
          text: "Release completely and exhale: Let the contraction go fully as you breathe out. Sit for a breath or two with the pelvic floor soft.",
        },
        {
          text: "Repeat gently: Continue for a few rounds only. Do not turn this into a sustained clamp through the day.",
        },
      ],
      beforeYouStart: [
        "If you have pelvic pain, painful sex, difficulty emptying the bladder, urinary urgency or constipation, do not practise tightening. Those symptoms often mean the pelvic floor is already overactive; the needed work is usually down-training with a clinician, not more squeezing.",
        "Avoid forceful locking with breath-holding if you are pregnant, recovering from pelvic or abdominal surgery, or have hernias, haemorrhoids, high blood pressure or glaucoma.",
      ],
      layers: ["Physical Body"],
      leverSlug: "conservation",
      relatedPractices: ["breath-retention", "the-great-lock", "spinal-breathing"],
      metaTitle: "The Root Lock — How to Practise It | Sunya",
      metaDescription:
        "A brief pelvic-floor contraction used in traditional practice. Evidence for inner effects is traditional, not clinical; release fully between breaths.",
      families: ["L1", "L3"],
      directions: ["contain", "initiate"],
      problems: [],
      generated: {
        layersSource: "STATED",
        durationSource: "OMITTED",
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
            reason: "Root sealing complements upward movement along the centre of the spine.",
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
