import type { FamilyCode } from "@/data/levers/types";
import { FAMILY_PROBLEM_META, metaDescriptionFromOpening } from "@/lib/family-labels";
import { PROBLEM_START_HERE } from "@/data/problems/start-here";
import type { ProblemGroupId, ProblemStartHereEntry } from "@/data/problems/types";

/**
 * Written problem pages — SPEC 48.
 * Internal `code` is PRIVATE and must never be rendered.
 * Copy marked final must not be paraphrased.
 */
export type ProblemPage = {
  /** PRIVATE — never render. Present only on the original fifteen family pages. */
  code?: FamilyCode;
  slug: string;
  title: string;
  opening: string;
  stateLine: string;
  bullets: [string, string, string, string];
  mechanism: string;
  group: ProblemGroupId;
  startHere: ProblemStartHereEntry[];
  /** SPEC 48 Part 4 — present on three pages in this ship; Spec 50 fills the rest. */
  evidenceSays?: string;
  /** SPEC 48 Part 5 — six pages. */
  ifSevere?: string;
  /**
   * Also-useful list source beyond family tags.
   * e.g. can't-sleep pulls practices tagged problems: ["insomnia"].
   */
  alsoUsefulProblemTags?: string[];
  metaTitle: string;
  metaDescription: string;
};

function familyPage(
  code: FamilyCode,
  group: ProblemGroupId,
  opening: string,
  stateLine: string,
  bullets: [string, string, string, string],
  mechanism: string,
  extras: Partial<Pick<ProblemPage, "evidenceSays" | "ifSevere" | "alsoUsefulProblemTags">> = {},
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
    group,
    startHere: PROBLEM_START_HERE[meta.slug] ?? [],
    metaTitle: `${meta.title} — What's Actually Happening, and What Helps | Sunya`,
    metaDescription: metaDescriptionFromOpening(opening),
    ...extras,
  };
}

/** SPEC 48/49 pages — recognition, mechanism, and evidence copy are final. */
function newPage(
  slug: string,
  title: string,
  group: ProblemGroupId,
  opening: string,
  bullets: [string, string, string, string],
  mechanism: string,
  extras: Partial<Pick<ProblemPage, "evidenceSays" | "ifSevere" | "alsoUsefulProblemTags">> = {},
): ProblemPage {
  return {
    slug,
    title,
    opening,
    stateLine: opening,
    bullets,
    mechanism,
    group,
    startHere: PROBLEM_START_HERE[slug] ?? [],
    metaTitle: `${title} — What's Actually Happening, and What Helps | Sunya`,
    metaDescription: metaDescriptionFromOpening(opening),
    ...extras,
  };
}

export const PROBLEM_PAGES: ProblemPage[] = [
  // —— Thinking and attention ——
  familyPage(
    "H1",
    "thinking-and-attention",
    "You are looping and replaying future scenarios in your mind, worried about things that have not yet happened.",
    "You are scanning. The threat is in the future and you are already there.",
    [
      "You rehearse conversations that have not happened yet",
      "You check and re-check things that are already fine",
      "Someone reassures you and it lasts about ten minutes",
      "Your body stays tense even when the day is going well",
    ],
    "Your system has decided something is unsafe, and it is doing its job — scanning, rehearsing, preparing. The difficulty is that it cannot tell the difference between a real threat and an imagined one, so it treats a thought about next week the same way it would treat a danger in the room. This is why reasoning with it does not work. The alarm is not in your thinking. It is in your breath and your nervous system, and that is where it has to be met.",
  ),
  familyPage(
    "H4",
    "thinking-and-attention",
    "Your body is tired but your thoughts will not stop, especially when you are trying to sleep.",
    "You are on. The day has not powered down.",
    [
      "You lie down tired and your mind starts working",
      "The thoughts are not important — a song lyric, something you should have said years ago",
      "Lying still and waiting for it to stop makes it louder",
      "You know you are exhausted and still cannot drop",
    ],
    "Your system is running at a speed it cannot bring down by itself. The thoughts are not the problem — they are the exhaust. Underneath them is momentum that has not discharged, and the mind keeps producing material to burn it on. This is why you cannot think your way out: thinking is the thing that is running. It has to be interrupted at the level of the body, which is slower and more reachable than the mind.",
  ),
  familyPage(
    "M3",
    "thinking-and-attention",
    "You start things and lose them halfway, and cannot hold your attention on one thing.",
    "Too many threads are open. None of them can finish.",
    [
      "You open a tab to check one thing and forty minutes later have eleven",
      "You start a sentence and lose it halfway",
      "You read the same paragraph three times and take in none of it",
      "It is not that you cannot think — you cannot hold one thing long enough to finish it",
    ],
    "Too many threads are open and none of them can complete. This looks like a focus problem but it is a problem of order: the system is trying to run everything at once, so nothing gets enough attention to finish. Forcing concentration on a scattered system does not work — it adds another thread. What works is structure. One thing, given a shape, until the field settles.",
  ),
  familyPage(
    "M1",
    "thinking-and-attention",
    "You feel confused. You have been going back and forth on a decision and cannot settle it.",
    "You are pulling in two directions, so you cannot move in either.",
    [
      "Some days it is obviously yes, and the next morning it is obviously no",
      "You have made the list, and both columns are convincing",
      "You have stopped asking people, because the advice no longer changes anything",
      "The deciding has cost more than either choice would have",
    ],
    "You are pulling in two directions at once, which means you cannot move in either. This is why more thinking does not help — thinking gives both sides more to say, and the division gets better argued rather than resolved. A divided system cannot see clearly. Settle the system first, and the answer is often already there, and has been for a while.",
  ),
  familyPage(
    "L3",
    "thinking-and-attention",
    "Deep down you know exactly what needs to be done, and you want to do it, but you do not.",
    "Your system has decided the task is a threat, and it is backing away.",
    [
      "The task takes twenty minutes and you have not done it in three weeks",
      "You think about it daily, which already costs more than doing it would",
      "You have energy for other things",
      "You made a good plan, and did not do the thing",
    ],
    "Avoidance is not laziness. It is the system backing away from something it has judged threatening — failure, exposure, difficulty, or simply discomfort. And every day you avoid it, the system takes the avoidance as proof it was right to avoid, so the task grows. This is why motivation does not break it. What does is making the entry so small that nothing in you objects to starting.",
  ),

  // —— Mood and feeling ——
  familyPage(
    "L4",
    "mood-and-feeling",
    "You feel uninspired and do not want to do anything. Getting through the day takes everything.",
    "There is weight in the system and no lift.",
    [
      "Getting dressed takes a decision",
      "Things that used to matter feel flat, and you cannot remember when that changed",
      "Nothing is wrong, which makes it harder to explain to anyone",
      "You are functioning, and it is taking everything you have",
    ],
    "There is weight in the system and not enough movement to carry it. This is not a thinking problem, and that is why reasoning your way toward feeling lighter does not work — the heaviness is not made of thoughts. It lifts through the body first: through movement, breath, daylight, and contact with other people. The mind follows afterwards, usually without being asked. It rarely goes the other way.",
    {
      ifSevere:
        "If this has lasted more than two weeks, or you are finding it hard to see the point, that is worth taking to a GP. Practice and treatment are not alternatives.",
    },
  ),
  familyPage(
    "M2",
    "mood-and-feeling",
    "You replay your own mistakes and speak to yourself in a way you never would to anyone else.",
    "Part of you has turned against another part.",
    [
      "You replay the moment, and the way you looked saying it",
      "You would never speak to another person this way",
      "Being told it was fine does not land",
      "The voice has been running so long you stopped hearing it as separate from you",
    ],
    "Part of you has turned against another part. That is what makes this so exhausting — the attacker and the target are both you, so there is nowhere to go and no rest from it. Arguing with the voice makes it louder, because arguing means engaging on its terms. What loosens it is not winning. It is enough space to see the voice as something happening in you, rather than as the truth about you.",
  ),
  familyPage(
    "H3",
    "mood-and-feeling",
    "You feel annoyed and irritable with people and situations, especially those that would not normally bother you.",
    "Something is blocked, and the force has nowhere to go.",
    [
      "Someone takes too long at the checkout and you feel the heat rise",
      "You know at the time that the reaction is bigger than the cause",
      "Small sounds and small delays land much harder than they should",
      "Holding it in leaves you drained rather than calm",
    ],
    "Anger is energy that has met a wall. Something is being blocked or resisted, the force has nowhere to go, and it discharges at whatever is nearest — which is why the trigger is so often trivial. Suppressing it does not remove it; it stores it, and stored anger is what leaves you tired. What works is giving the energy somewhere to go, through the body rather than through understanding. Once it moves, the thing underneath usually becomes visible on its own.",
  ),
  familyPage(
    "L2",
    "mood-and-feeling",
    "You find it hard to feel or express emotion. The heart space is closed, and you feel emotionally unresponsive.",
    "The volume has been turned down. It has not come back up.",
    [
      "Something good happens and you notice you should be pleased",
      "You say the right things and nobody notices anything is wrong",
      "You are not sad either, which is the confusing part",
      "You would rather feel something difficult than nothing",
    ],
    "This is protection rather than damage. At some point there was more feeling than the system could hold, so it turned the volume down — and it has stayed down, because nothing has told it that it is safe to come back up. The door closed for a reason. It does not open by force or by deciding to feel more. It opens slowly, through the body, when there is enough steadiness to risk it.",
    {
      evidenceSays:
        "These practices sit on the Heart lever because that is where the framework places numbness — not because trials have tested them for this state. Heart Coherence's evidenced mechanism is respiratory rather than emotional, which the mechanism link will show. The honest position is that none of these three is evidenced for numbness specifically. This is the thinnest page in the set, and it should be read that way.",
    },
  ),
  newPage(
    "grief",
    "Grief",
    "mood-and-feeling",
    "Someone or something is gone, and the loss is still shaping your days.",
    [
      "You are fine for most of a day and then undone by something small",
      "You keep reaching for them before you remember",
      "People have stopped asking, and you have stopped mentioning it",
      "You are not sure how long you are allowed to still feel this",
    ],
    "Your mind built a world with them in it, and every part of that world now has to be revised — not as an idea you accept once, but in thousands of small corrections, each one its own small shock. That is what the waves are. They are not you failing to move on. They are the work happening.\n\nGrief is not a problem the system is having. It is the system doing something very hard, and doing it correctly. Nothing on this page is trying to shorten it. What practice can do is make it possible to carry — to be with what arrives without bracing against it, and to not be alone while you do.",
    {
      ifSevere:
        "Grief is not a malfunction and nothing on this page is trying to shorten it. If it has stopped moving at all, grief-specific support exists and is different from general therapy.",
      evidenceSays:
        "There is very little here, and what exists mostly says the same thing: grief is not a disorder, and treating it as one does not help. The practices on this page are not evidenced as treatments for grief, because grief is not the kind of thing those trials are built to measure. Two findings are worth carrying anyway. Social connection is among the strongest things in this entire evidence base, and bereavement is exactly when it tends to thin out. And movement has the best intervention evidence of anything here for low mood — not the same as grief, but it often travels alongside. Beyond that, the honest answer is that what helps is time, company, and not being told you should be further along than you are.",
    },
  ),
  newPage(
    "emptiness-and-meaninglessness",
    "Emptiness and meaninglessness",
    "mood-and-feeling",
    "Things are broadly fine and none of it seems to be for anything.",
    [
      "You got the thing you wanted and felt almost nothing",
      "You can describe your life as good and not feel it",
      "You are waiting for something to start, without knowing what",
      "Asking what the point is has stopped feeling like a question and started feeling like a fact",
    ],
    "Nothing is wrong, which is the confusing part. There is no event to point at and nothing obvious to fix, so the state gets no sympathy, including from you.\n\nWhat has usually happened is that the things you organised your life around have either been reached or seen through, and nothing has replaced them. Meaning is not a feeling that arrives on its own. It is mostly a by-product of being committed to something beyond yourself and being useful to other people, and when both of those thin out, this is what is left.\n\nIt is also, across every contemplative tradition, the most common point at which people start looking inward seriously. Which is to say: it is uncomfortable, and it is not a bad sign.",
    {
      evidenceSays:
        "This is one of the thinnest pages in the set for evidence and one of the most important states in the framework, and that gap is worth stating rather than hiding. Nobody has run a trial on meaninglessness — partly because it is hard to measure, partly because it is not a clinical category. What has been studied is adjacent: volunteering and prosocial behaviour show reasonably consistent associations with wellbeing, and work that lines up with what a person values is linked to better outcomes than work that does not. Both are observational rather than randomised, so treat them as pointers rather than proof. The deeper claim — that this state resolves when attention rests in awareness rather than in what it holds — sits outside what these methods can reach, and this framework says so rather than dressing it up as something tested.",
    },
  ),
  newPage(
    "fear-of-death",
    "Fear of death",
    "mood-and-feeling",
    "The fact that you will die is present to you, and it frightens you.",
    [
      "It arrives at night, or in gaps, and you get busy to make it go",
      "You have caught yourself working out roughly how many years are left",
      "A symptom becomes a search, and the search becomes hours",
      "You cannot say any of this out loud without it sounding dramatic",
    ],
    "Most people hold this at arm's length for most of their lives, and the arrangement works until something breaks it — an illness, a death, a birthday, or nothing in particular.\n\nWhat you are looking at now is not a distortion. It is accurate. That is precisely why reassurance does not touch it: there is nothing false to correct, so every comforting thing anyone says slides off.\n\nThe traditions are unanimous that this is not resolved by argument. It is approached by examining the thing that is afraid — what it actually is, and whether it is as solid as it takes itself to be. That is slow work, and it is the deepest work on this site. It is also where this framework can promise least, which the evidence note below says plainly.",
    {
      ifSevere:
        "If this comes with compulsive checking of your body or repeated reassurance-seeking, that is a health-anxiety presentation and the anxiety page is the better door — and it responds well to proper treatment.",
      evidenceSays:
        "This is the clearest place on the site where the research runs out. Death anxiety has been studied in clinical settings, but the practices on this page — sustained contemplation of mortality, and inquiry into what is afraid — have essentially no trial evidence behind them, and the mechanism they work through is the least-evidenced one in the library.\n\nThere is a reason for that beyond neglect. What these practices aim at is a change in how the self is experienced, which is reportable but not measurable from the outside. So what is on offer here is a traditional claim with a long and remarkably consistent history and almost no modern verification. That is a weaker position than anywhere else on this site. Weigh it accordingly.",
    },
  ),

  // —— The body ——
  familyPage(
    "L1",
    "the-body",
    "You feel deeply tired and low on energy. Ordinary tasks take longer than they should.",
    "You have been spending more than you take in, for long enough that the reserve is gone.",
    [
      "You sleep a full night and wake up as tired as when you went to bed",
      "Replying to a message sits on your list for days",
      "You get through the working day and have nothing left for the evening",
      "Rest helps a little, and never quite resolves it",
    ],
    "You are not low on motivation. You are low on energy, and the difference matters — motivation responds to pressure, and energy does not. The system has been spending more than it takes in for long enough that the reserves are gone, so pushing harder deepens it rather than fixing it. What restores it is stopping the leaks and letting the system fill again. This one is slow, and there is no way to make it fast.",
    {
      ifSevere:
        "Persistent exhaustion has medical causes that practice does not touch — thyroid function, iron levels, sleep apnoea among them. If this has been going on for weeks, get bloods done before working on habits.",
    },
  ),
  familyPage(
    "P3",
    "the-body",
    "Your body feels heavy and sluggish. You want to lie down rather than move.",
    "A body that does not move produces less energy to move with.",
    [
      "You are not sleepy, you are heavy and slow to start",
      "Movement has become something you should do rather than want to do",
      "You have been sitting most of the day, most days, for a while",
      "The less you move, the less you want to",
    ],
    "Energy is generated by moving, not stored by resting. A body that sits still receives a signal that less is needed and produces less accordingly — which makes moving harder, which produces less again. The loop is self-reinforcing and it tightens quietly. Breaking it is small and physical: enough movement to interrupt the signal. The energy arrives after the movement, not before it, which is why waiting to feel like it never works.",
  ),
  familyPage(
    "P1",
    "the-body",
    "You unconsciously tense parts of your body — shoulders, jaw, neck — and breathe in a shallow pattern.",
    "The body braced for something and never stood down.",
    [
      "You notice your shoulders are raised only when something makes you stop",
      "Your jaw is clenched and your breathing is shallow without you deciding either",
      "A massage helps, and by midweek it is exactly as it was",
      "Nothing is injured, and nothing releases",
    ],
    "Tension is a held position. At some point the body braced for something and never received the signal to stand down, so it kept holding — and holding became the resting state. Stretching does not reach it, because the holding is not in the muscle but in the instruction the body never cancelled. What releases it is contracting deliberately and then letting go, so the system is reminded what release actually feels like.",
  ),
  familyPage(
    "P2",
    "the-body",
    "Your body has lost its flexibility and range of motion. Movement is no longer smooth and free.",
    "The range you stopped using is the range you lost.",
    [
      "Getting up from the floor involves a plan",
      "You used to sit cross-legged without thinking about it",
      "Certain movements are simply no longer available to you",
      "There is no injury and no pain, only restriction",
    ],
    "The body keeps the range it uses and quietly releases the rest. This is efficient, and it is why stiffness arrives without injury and without age being the cause. Nothing is damaged — the range is unclaimed. Movement takes it back, but not by force: by visiting the edges often enough that the body decides they are worth keeping.",
  ),
  newPage(
    "cant-sleep",
    "Can't sleep",
    "the-body",
    "You cannot fall asleep, or you wake and cannot get back.",
    [
      "You are exhausted all day and wide awake the moment you lie down",
      "You do the maths on how many hours are left",
      "You sleep fine on the sofa and badly in bed",
      "Trying harder to sleep is reliably the thing that keeps you up",
    ],
    "Your bed has become a place where you lie awake, and your body has learned it.\n\nThat sounds too simple to be the answer, and it is the central finding of the entire sleep literature. After enough bad nights the bed itself becomes a cue for alertness rather than for sleep — which is why you can drift off on the sofa and then lose it completely in the thirty seconds between the sofa and the bedroom.\n\nOn top of that sits the effort. Sleep is one of the few things that recedes the harder you chase it, because chasing is an aroused state and sleep requires the opposite. So the work is not to sleep better tonight. It is to break the association and take the pressure off, and let the body's own sleep pressure do what it does without you supervising it.",
    {
      // Spec 48 Part 4 — not restated in Spec 49
      evidenceSays:
        "The strongest finding in the sleep research is also the least fashionable: what works is changing what your bed means to your body, not optimising the room it sits in. Sleep-hygiene checklists — temperature, screens, caffeine timing — are the weakest-evidenced part of this literature, and they are what nearly every source leads with. They are on this page, further down, because some of them help some people. They are not first, because the evidence does not put them first.",
      alsoUsefulProblemTags: ["insomnia"],
    },
  ),
  newPage(
    "craving-and-restlessness",
    "Craving and restlessness",
    "the-body",
    "You reach for things — food, your phone, the next thing — before deciding to.",
    [
      "Your hand has the phone before you knew you wanted it",
      "You eat standing up, and not because you were hungry",
      "The thing you wanted is good for about four minutes",
      "Sitting with nothing to do is the hardest part of the day",
    ],
    "The reaching is not really for the thing. It is for the end of a feeling that was there a second before you reached — and usually you never noticed the feeling at all, only the reaching.\n\nThis is why willpower works so badly here. You are blocking the behaviour while leaving the discomfort it was solving completely untouched, so the urge simply finds another door. And the discomfort is almost always ordinary and low-grade: boredom, restlessness, a flat patch, being slightly alone. Nothing dramatic enough to take seriously, which is exactly why it goes unexamined.\n\nThe work is to get the gap back between the feeling and the hand. That is a matter of noticing, not of resisting.",
    {
      ifSevere:
        "If this is alcohol or drug dependence, this page is not the resource and will not be enough. That needs proper support, and it exists.",
      evidenceSays:
        "The practices here work on attention and on tolerating discomfort, and that is where their evidence sits — reducing what competes for attention, and learning to be with a feeling rather than act on it. What has not been tested is whether that reduces craving specifically.\n\nTwo cautions about things you will read elsewhere. Restriction-based approaches — fasting, strict rules — can raise the pressure rather than lower it, and are deliberately left off this page for that reason. And nothing here is a treatment for dependence; see the note below.",
    },
  ),

  // —— The conditions of your life ——
  newPage(
    "money-pressure",
    "Money pressure",
    "conditions-of-life",
    "There is not enough, or there might not be, and it is on you constantly.",
    [
      "You check the balance already knowing what it says",
      "An unexpected bill is not an inconvenience, it is a crisis",
      "You have run the sums for a situation that has not happened",
      "It is the first thing in the morning and the last thing at night",
    ],
    "Some of this is not psychological and should not be handled as if it were. If there is genuinely not enough, the pressure you feel is an accurate reading of your situation, and no amount of inner work will make the numbers different. That part is addressed by changing the numbers — lowering what your life costs to run, and building something you can charge for.\n\nBut scarcity does a second thing, and this part is less obvious. The fear outlasts the shortage. It keeps running after the danger has passed, it pulls attention onto the immediate, and it quietly degrades exactly the long-range decisions that would get you out.\n\nSo there are two jobs here and they are not the same. Change the numbers where you can. And separately, stop the fear from making the decisions, because it makes them badly.",
    {
      // Spec 48 Part 4 — not restated in Spec 49
      evidenceSays:
        "Financial insecurity is the single strongest thing in this evidence base — stronger than any practice on this site. It is also where the tested interventions are weakest: giving people money produces much smaller improvements in wellbeing than the size of the problem would predict. Both of those are true at once, and the practical consequence is worth being plain about. **No practice here fixes a shortage of money.** What these practices do is lower what your life costs to run, stop the fear from distorting decisions it should not be touching, and build the capacity to earn. That is a smaller claim than you will see elsewhere, and it is the one the evidence supports.",
      ifSevere:
        "If rent or food is genuinely at risk, that is not a practice problem. In Ireland, MABS gives free, confidential money advice. Do that first and come back to this page after.",
    },
  ),
  newPage(
    "loneliness",
    "Loneliness",
    "conditions-of-life",
    "You are not known by anyone, or not as well as you need to be.",
    [
      "You can go a whole weekend without a conversation that is about anything",
      "You have people, and none of them know how you actually are",
      "Starting now would mean explaining too much",
      "You are always the one who has to organise it",
    ],
    "Loneliness is not a shortage of people. It is the gap between the connection you have and the connection you need, which is why it survives a full calendar and a crowded house.\n\nTwo things make it self-sustaining. It is uncomfortable to be seen when you already feel unseen, so the instinct is to withdraw slightly further. And it makes you a harsher reader of other people — you register the short reply and miss the invitation. Both of those are normal, and both make it worse.\n\nWhich means the opening move is almost never to go and find new people. It is to be more honest with one person you already have, and to put yourself somewhere regularly enough that familiarity does the work you cannot force.",
    {
      // Spec 48 Part 4 — not restated in Spec 49
      evidenceSays:
        "The observational evidence here is among the strongest in the whole library: social isolation predicts mortality at a level comparable to well-known medical risk factors. The interventions tested to *reduce* loneliness are substantially weaker than that finding would suggest. So the target is right and the tools are uncertain. What that means in practice is to treat this as seriously as the evidence says — more seriously than most people treat it — while holding the specific methods loosely.",
    },
  ),
  familyPage(
    "H2",
    "conditions-of-life",
    "You are struggling to keep up with the demands of life, pressured by having so much to do.",
    "The volume has exceeded what you can sort. So nothing gets sorted.",
    [
      "You open the laptop and do none of the twelve things",
      "Picking one makes the other eleven louder",
      "You check your phone instead, and feel worse",
      "You have handled more than this before, which makes it harder to explain",
    ],
    "More is coming in than the system can sort, and when that happens it stops sorting altogether. This is not a discipline problem, and it does not respond to trying harder — effort is what is already failing. The system needs less input before it can work again. Reduce what is coming in, and the ability to act returns on its own, usually faster than you expect.",
  ),
  familyPage(
    "M4",
    "conditions-of-life",
    "You push hard for a stretch, then crash, then push again, and nothing holds.",
    "The system swings between full output and shutdown, with nothing in between.",
    [
      "Monday you are on, and by Thursday you are done",
      "You cancel the weekend and cannot explain why to anyone, including yourself",
      "You cannot sustain what you start, however well it begins",
      "Every time it comes back, you believe this will be the time it holds",
    ],
    "You are not failing at consistency. You are running a system that swings between full output and collapse with nothing in between, and the crash is not weakness — it is the necessary correction to the push. Each phase causes the next, which is why discipline during the up phase makes the following crash worse rather than better. The way out is taking less at the top, so there is less to fall from.",
  ),
];

export const PROBLEM_PAGE_BY_SLUG = Object.fromEntries(
  PROBLEM_PAGES.map((p) => [p.slug, p]),
) as Record<string, ProblemPage>;

/** Old / ad-hoc problem URLs → canonical pages (301). */
export const PROBLEM_SLUG_REDIRECTS: Record<string, string> = {
  insomnia: "cant-sleep",
  "people-pleasing": "self-criticism-and-shame",
  "chronic-stress": "overwhelm",
  "decision-fatigue": "feeling-torn",
  // Renamed tag / page slugs
  "feeling-overwhelmed": "overwhelm",
  "a-mind-that-wont-switch-off": "a-racing-mind",
  "numbness-and-disconnection": "emotional-numbness",
  "avoidance-and-procrastination": "procrastination-and-avoidance",
  "self-criticism": "self-criticism-and-shame",
  burnout: "burnout-cycles",
};

/** Lever order for Also useful — canonical site order. */
export const PROBLEM_PRACTICE_LEVER_ORDER = [
  "conservation",
  "breath",
  "movement",
  "mind",
  "sound",
  "heart",
  "awareness",
  "sustenance",
  "sleep",
  "nutrition",
  "connection",
  "nature",
  "environment",
] as const;
