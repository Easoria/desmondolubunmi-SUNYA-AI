import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import {
  EVIDENCE_INDEX_CARD_COUNT,
  EVIDENCE_INDEX_CARD_GROUPS,
  GRADE_DOT,
  type EvidenceIndexCard,
  type IndexGradeChip,
} from "@/data/evidence/index-cards";
import { buildSeoHead, buildBreadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/evidence")({
  head: ({ matches }) => {
    if (!matches?.length || matches[matches.length - 1]?.routeId !== "/evidence") {
      return {};
    }
    return {
      ...buildSeoHead({
        title: "What actually works, and how well | Sunya",
        description:
          "Every practice works through something — a change in the body, or in how the mind handles a thought. Each mechanism below with what the research shows, including where it shows very little.",
        path: "/evidence",
        ogType: "website",
        imageKind: "core",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbSchema([{ name: "Evidence", path: "/evidence" }]),
          ),
        },
      ],
    };
  },
  component: EvidenceRoutePage,
});

function EvidenceRoutePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/evidence" && pathname !== "/evidence/") {
    return <Outlet />;
  }

  return <EvidenceIndexPage />;
}

function GradeDot({ grade }: { grade: IndexGradeChip }) {
  const spec = GRADE_DOT[grade];
  if (spec.kind === "ring") {
    return (
      <span
        aria-hidden
        className="evidence-grade-dot evidence-grade-dot--ring"
        style={{ borderColor: spec.color }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="evidence-grade-dot"
      style={{ backgroundColor: spec.color }}
    />
  );
}

function MechanismCard({ card }: { card: EvidenceIndexCard }) {
  return (
    <Link
      to="/evidence/$slug"
      params={{ slug: card.slug }}
      className={
        card.core
          ? "evidence-mech-card evidence-mech-card--core"
          : "evidence-mech-card"
      }
    >
      <div className="evidence-mech-card__top">
        <span className="evidence-mech-card__grade">
          <GradeDot grade={card.grade} />
          <span>{card.grade}</span>
        </span>
        {card.core ? <span className="evidence-mech-card__core">Core mechanism</span> : null}
      </div>
      <div className="evidence-mech-card__name">{card.name}</div>
      <p className="evidence-mech-card__note">{card.note}</p>
    </Link>
  );
}

function EvidenceIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      <Nav />
      <Breadcrumb />
      <main className="evidence-index">
        {/* 1 · Masthead */}
        <header className="evidence-index__masthead">
          <div className="evidence-index__eyebrow">Evidence</div>
          <h1 className="evidence-index__h1">What actually works, and how well</h1>
          <p className="evidence-index__standfirst">
            Every practice here works through something — a change in the body, or in how the mind
            handles a thought. There are far fewer of those than there are practices. Each one is
            set out below with what the research shows, including where it shows very little.
          </p>
        </header>

        {/* 2 · Opening statement */}
        <aside className="evidence-index__opening" aria-label="The thing the numbers hide">
          <p>
            <strong>The thing the numbers hide.</strong> A study gives one practice to a room of
            people whose problems differ. For most of them it is the wrong practice — their limit
            is money, or sleep, or who they live with — and their non-response goes into the
            average. What gets reported as the effect of breathing is largely a measure of how many
            people in that room happened to be limited by their breathing.
          </p>
          <p>
            Wellbeing fails at its weakest point, and almost nothing offered for it addresses more
            than one point. That is what this framework exists to close.
          </p>
        </aside>

        {/* 3 · The two families */}
        <section className="evidence-index__families" aria-labelledby="families-heading">
          <h2 id="families-heading" className="evidence-index__h2">
            Nearly every inner practice does one of two things
          </h2>
          <p className="evidence-index__section-lead">
            It either quiets the thinking, or it changes how aroused your body is. Knowing which
            one you need is the difference between a practice working and a practice disappointing
            you.
          </p>

          <div className="evidence-family-row">
            <div className="evidence-family-panel evidence-family-panel--quieting">
              <h3 className="evidence-index__h3">Quieting repetitive thought</h3>
              <p className="evidence-family-panel__intro">
                Four steps, each going further than the last.{" "}
                <strong>The further you go, the less research there is</strong> — you can see that
                in the colour fading down.
              </p>

              <div className="evidence-depth-bars">
                <Link
                  to="/evidence/$slug"
                  params={{ slug: "decentering" }}
                  className="evidence-depth-bar"
                  style={{
                    backgroundColor: "#7ec8e32e",
                    borderLeft: "3px solid #7ec8e3",
                  }}
                >
                  <div className="evidence-depth-bar__head">
                    <span className="evidence-depth-bar__label">1 · Decentering</span>
                    <span className="evidence-depth-bar__chip">Strong</span>
                  </div>
                  <p className="evidence-depth-bar__line">
                    Seeing a thought as just a thought. Cut the chance of falling back into
                    depression from 62% to 36%.
                  </p>
                </Link>

                <Link
                  to="/evidence/$slug"
                  params={{ slug: "rumination-and-mind-wandering" }}
                  className="evidence-depth-bar"
                  style={{
                    backgroundColor: "#7ec8e32e",
                    borderLeft: "3px solid #7ec8e3",
                  }}
                >
                  <div className="evidence-depth-bar__head">
                    <span className="evidence-depth-bar__label">2 · Rumination and mind-wandering</span>
                    <span className="evidence-depth-bar__chip">Strongest here</span>
                  </div>
                  <p className="evidence-depth-bar__line">
                    Breaking the loop. Training aimed straight at thought spirals beat standard
                    therapy.
                  </p>
                </Link>

                <Link
                  to="/evidence/$slug"
                  params={{ slug: "self-referential-processing" }}
                  className="evidence-depth-bar"
                  style={{
                    backgroundColor: "#7ec8e314",
                    borderLeft: "3px solid #4a7ea3",
                  }}
                >
                  <div className="evidence-depth-bar__head">
                    <span className="evidence-depth-bar__label">3 · Self-referential processing</span>
                    <span className="evidence-depth-bar__chip">Moderate</span>
                  </div>
                  <p className="evidence-depth-bar__line">
                    The commentary about you goes quiet. Beat exercise at softening harsh
                    self-judgement.
                  </p>
                </Link>

                <Link
                  to="/evidence/$slug"
                  params={{ slug: "awareness-without-thought" }}
                  className="evidence-depth-bar evidence-depth-bar--dashed"
                  style={{
                    backgroundColor: "transparent",
                    borderLeft: "3px dashed #ffffff33",
                  }}
                >
                  <div className="evidence-depth-bar__head">
                    <span className="evidence-depth-bar__label">4 · Awareness without thought</span>
                    <span className="evidence-depth-bar__chip">Barely studied</span>
                  </div>
                  <p className="evidence-depth-bar__line">
                    Described the same way by thousands of meditators. Research mostly cannot reach
                    it, and we say so.
                  </p>
                </Link>
              </div>

              <Link
                to="/evidence/$slug"
                params={{ slug: "quieting-repetitive-thought" }}
                className="evidence-family-panel__footer"
              >
                How these four fit together →
              </Link>
            </div>

            <div className="evidence-family-panel evidence-family-panel--arousal">
              <h3 className="evidence-index__h3">Regulating arousal</h3>
              <p className="evidence-family-panel__intro">
                Nothing to do with thinking. This calms the body when it is aroused, or energises
                it when it is flat.
              </p>

              <div className="evidence-depth-bars">
                <Link
                  to="/evidence/$slug"
                  params={{ slug: "regulating-arousal" }}
                  className="evidence-depth-bar"
                  style={{
                    backgroundColor: "#7ec8e32e",
                    borderLeft: "3px solid #7ec8e3",
                  }}
                >
                  <div className="evidence-depth-bar__head">
                    <span className="evidence-depth-bar__label">Calming the body</span>
                    <span className="evidence-depth-bar__chip">Strong</span>
                  </div>
                  <p className="evidence-depth-bar__line">
                    Slow breathing lowers blood pressure by as much as some first-line treatments.
                  </p>
                  <p className="evidence-depth-bar__sub">
                    Slow and paced breathing · Progressive muscle relaxation
                  </p>
                </Link>

                <Link
                  to="/evidence/$slug"
                  params={{ slug: "activating-breathwork" }}
                  className="evidence-depth-bar"
                  style={{
                    backgroundColor: "#2e6db43d",
                    borderLeft: "3px solid #2e6db4",
                  }}
                >
                  <div className="evidence-depth-bar__head">
                    <span className="evidence-depth-bar__label">Activating the body</span>
                    <span className="evidence-depth-bar__chip">Strong</span>
                  </div>
                  <p className="evidence-depth-bar__line">
                    Ten days of fast breathing halved the body&apos;s inflammatory response in a
                    controlled test.
                  </p>
                  <p className="evidence-depth-bar__sub">Activating breathwork</p>
                </Link>
              </div>

              <aside className="evidence-arousal-note">
                If your problem is anxiety, start here rather than with meditation. Anxiety sits
                mostly in the body, and sitting practice is a tool for the mind.
              </aside>

              <Link
                to="/evidence/$slug"
                params={{ slug: "regulating-arousal" }}
                className="evidence-family-panel__footer"
              >
                Which direction do I need? →
              </Link>
            </div>
          </div>
        </section>

        {/* 4 · All 41 mechanisms */}
        <section className="evidence-index__mechanisms" aria-labelledby="mechanisms-heading">
          <h2 id="mechanisms-heading" className="evidence-index__h2">
            All {EVIDENCE_INDEX_CARD_COUNT}, and how good the evidence is
          </h2>
          <p className="evidence-index__section-lead">
            Click any one to see the studies, what they found, how much you would need to do, and
            what the research does not show.
          </p>

          <ul className="evidence-grade-legend">
            <li>
              <GradeDot grade="Strong" />
              <div>
                <div className="evidence-grade-legend__label">Strong</div>
                <div className="evidence-grade-legend__gloss">Many good studies agree</div>
              </div>
            </li>
            <li>
              <GradeDot grade="Moderate" />
              <div>
                <div className="evidence-grade-legend__label">Moderate</div>
                <div className="evidence-grade-legend__gloss">
                  Decent evidence, smaller or less certain
                </div>
              </div>
            </li>
            <li>
              <GradeDot grade="Early" />
              <div>
                <div className="evidence-grade-legend__label">Early</div>
                <div className="evidence-grade-legend__gloss">
                  A few small studies, nothing settled
                </div>
              </div>
            </li>
            <li>
              <GradeDot grade="Nothing found" />
              <div>
                <div className="evidence-grade-legend__label">Nothing found</div>
                <div className="evidence-grade-legend__gloss">We looked. There isn&apos;t any.</div>
              </div>
            </li>
          </ul>

          {EVIDENCE_INDEX_CARD_GROUPS.map((group) => (
            <div key={group.id} className="evidence-mech-group">
              <h3 className="evidence-mech-group__heading">{group.label}</h3>
              {group.id === "expected-weak" ? (
                <p className="evidence-mech-group__note">
                  These are here on purpose. Being honest about what does not work is what makes
                  the rest worth believing.
                </p>
              ) : null}
              <div
                className={
                  group.id === "expected-weak"
                    ? "evidence-mech-grid evidence-mech-grid--weak"
                    : "evidence-mech-grid"
                }
              >
                {group.cards.map((card) =>
                  group.id === "expected-weak" ? (
                    <Link
                      key={card.slug}
                      to="/evidence/$slug"
                      params={{ slug: card.slug }}
                      className="evidence-mech-card evidence-mech-card--weak"
                    >
                      <div className="evidence-mech-card__top">
                        <span className="evidence-mech-card__grade">
                          <GradeDot grade={card.grade} />
                          <span>{card.grade}</span>
                        </span>
                      </div>
                      <div className="evidence-mech-card__name">{card.name}</div>
                      <p className="evidence-mech-card__note">{card.note}</p>
                    </Link>
                  ) : (
                    <MechanismCard key={card.slug} card={card} />
                  ),
                )}
              </div>
            </div>
          ))}
        </section>

        {/* 5 · If you want the detail */}
        <section className="evidence-index__detail" aria-labelledby="detail-heading">
          <h2 id="detail-heading" className="evidence-index__h2">
            If you want the detail
          </h2>

          <div className="evidence-detail-list">
            <details className="evidence-detail">
              <summary>Why nothing here has big effects</summary>
              <div className="evidence-detail__body">
                <p>
                  It is not these practices. It is the whole field. Antidepressants beat a dummy
                  pill by a small margin too, and they are the flagship treatment in psychiatry. So
                  when something here looks modest, the right reading is{" "}
                  <em>about as useful as the things doctors already prescribe</em>.
                </p>
                <p>
                  Three other things make the numbers look smaller than they are. Studies test one
                  practice at a time, so someone whose real problem is debt or four hours of sleep
                  gets nothing from breathing — and their nothing goes into the average. Studies
                  run for eight weeks while these practices are meant for years. And an average
                  hides the people in it: one study here had tiny average effects while nearly half
                  the people who started badly were fine three months later.
                </p>
                <p>
                  Small effects also stack. Sleep, movement, breathing, people, money — each modest
                  on its own, and they add up rather than averaging out.
                </p>
              </div>
            </details>

            <details className="evidence-detail">
              <summary>How we grade things</summary>
              <div className="evidence-detail__body">
                <p>
                  Two separate marks. One for how good the research is. One for how long and how
                  widely the practice has been used by traditions that never met each other.
                </p>
                <p>
                  They do not substitute for one another. Chanting has thin research and
                  extraordinary history. Morning light has excellent research and almost no
                  history. Both facts are worth knowing.
                </p>
              </div>
            </details>

            <details className="evidence-detail">
              <summary>Some things cannot be measured, and we say which</summary>
              <div className="evidence-detail__body">
                <p>
                  &quot;Nobody has studied it yet&quot; and &quot;this cannot be studied&quot; are
                  different, and the difference gets abused constantly.
                </p>
                <p>
                  So we hold the line tightly. Anxiety can be measured. Sleep can be measured.
                  Blood pressure can be measured. Any claim about those is backed up here or it is
                  not made. What cannot be measured is whether what you find at the far end of this
                  work is what the traditions say it is — and that page says so instead of
                  pretending.
                </p>
              </div>
            </details>

            <details className="evidence-detail">
              <summary>The only test that is actually yours</summary>
              <div className="evidence-detail__body">
                <p>
                  Research tells you what happened to people on average. Tradition tells you what
                  many people have found over a very long time. Neither tells you what will happen
                  to you.
                </p>
                <p>
                  That part costs two weeks to find out, and it is the only evidence that is
                  actually about you.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* 6 · Closing */}
        <section className="evidence-index__closing" aria-labelledby="closing-heading">
          <h2 id="closing-heading" className="evidence-index__h2">
            What none of this proves
          </h2>
          <p>
            Everything above tests one practice at a time, for a few weeks, on people picked at
            random. Sunya claims something different: find where your life is actually failing,
            work there, keep at it for a long time. Nobody has tested that. It could be tested, and
            it has not been.
          </p>
          <p>
            Anyone telling you their wellbeing system is proven to transform lives is describing
            research that does not exist. Including, for now, this one.
          </p>
        </section>

        {/* 7 · References */}
        <section className="evidence-index__refs" aria-labelledby="refs-heading">
          <h2 id="refs-heading" className="evidence-index__h2">
            References
          </h2>
          <p className="evidence-index__refs-note">
            <em>APA 7th.</em>
          </p>
          <ol className="evidence-index__refs-list">
            <li>
              Cipriani, A., Furukawa, T. A., Salanti, G., Chaimani, A., Atkinson, L. Z., Ogawa, Y.,
              Leucht, S., Ruhe, H. G., Turner, E. H., Higgins, J. P. T., Egger, M., Takeshima, N.,
              Hayasaka, Y., Imai, H., Shinohara, K., Tajika, A., Ioannidis, J. P. A., &amp; Geddes,
              J. R. (2018). Comparative efficacy and acceptability of 21 antidepressant drugs for
              the acute treatment of adults with major depressive disorder: A systematic review and
              network meta-analysis. <em>The Lancet, 391</em>(10128), 1357–1366.{" "}
              <a href="https://doi.org/10.1016/S0140-6736(17)32802-7">
                https://doi.org/10.1016/S0140-6736(17)32802-7
              </a>
            </li>
            <li>
              Ngandu, T., Lehtisalo, J., Solomon, A., Levälahti, E., Ahtiluoto, S., Antikainen, R.,
              Bäckman, L., Hänninen, T., Jula, A., Laatikainen, T., Lindström, J., Mangialasche,
              F., Paajanen, T., Pajala, S., Peltonen, M., Rauramaa, R., Stigsdotter-Neely, A.,
              Strandberg, T., Tuomilehto, J., Soininen, H., &amp; Kivipelto, M. (2015). A 2 year
              multidomain intervention of diet, exercise, cognitive training, and vascular risk
              monitoring versus control to prevent cognitive decline in at-risk elderly people
              (FINGER): A randomised controlled trial. <em>The Lancet, 385</em>(9984), 2255–2263.{" "}
              <a href="https://doi.org/10.1016/S0140-6736(15)60461-5">
                https://doi.org/10.1016/S0140-6736(15)60461-5
              </a>
            </li>
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
