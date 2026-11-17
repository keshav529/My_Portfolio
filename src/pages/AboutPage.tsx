import { Link } from 'react-router-dom';
import { ArrowRight, FileDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import {
  EDUCATION_TIMELINE,
  PROFILE,
  SKILL_GROUPS,
} from '../data/portfolioData';

/**
 * About Page (/about) — Stage 4
 * Includes:
 * 1. Keshav's story and portrait photo
 * 2. Animated vertical Education Timeline (Class 10, Class 12, BCA)
 * 3. Grouped Skills (Using Now, Learning Next, Soft Skills)
 */
export function AboutPage() {
  return (
    <PageTransition>
      {/* Top Intro + Portrait */}
      <section className="page-header-section" aria-labelledby="about-page-title">
        <div className="container">
          <div className="about-hero-grid">
            <Reveal>
              <div>
                <p className="eyebrow-tagline">ABOUT &bull; BACKGROUND &bull; SKILLS</p>
                <h1 id="about-page-title" className="page-hero-title">
                  Curious builder focused on clean web fundamentals
                </h1>
                <p className="about-story-text">
                  I&apos;m {PROFILE.fullName}, a {PROFILE.degree} at {PROFILE.college}. I started by exploring how HTML and CSS bring layouts to life, then moved into building interactive JavaScript tools like my Currency Converter, Stopwatch, Calculator, and Tic-Tac-Toe game.
                </p>
                <p className="about-story-text" style={{ marginTop: '1rem' }}>
                  Today, I&apos;m strengthening my full-stack foundation with React, Node.js, MongoDB, and Data Structures &amp; Algorithms while designing clean, accessible user interfaces in Figma.
                </p>

                <div className="stage-cta-row" style={{ marginTop: '2rem' }}>
                  <Link to="/work" className="btn-primary-editorial">
                    <span>Explore my projects</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <a
                    href={PROFILE.resumeUrl}
                    download
                    className="btn-secondary-editorial"
                  >
                    <FileDown size={16} aria-hidden="true" />
                    <span>Download resume</span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="stage-image-card">
                <div className="stage-image-frame">
                  <img
                    src={PROFILE.profilePhoto}
                    alt="Portrait of Keshav Anand"
                  />
                </div>
                <div className="stage-image-meta">
                  <span>{PROFILE.fullName}</span>
                  <span className="mono-meta">Rohtak, India</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education Vertical Timeline */}
      <section className="home-section home-section-tinted" aria-labelledby="education-timeline-title">
        <div className="container">
          <div className="timeline-layout">
            <Reveal>
              <div>
                <p className="eyebrow-tagline">Academic Path</p>
                <h2 id="education-timeline-title" className="editorial-section-title">
                  Education timeline
                </h2>
                <p className="editorial-section-note" style={{ marginTop: '1rem' }}>
                  My academic progression from school foundations in Kalanaur to my Bachelor of Computer Applications in Rohtak.
                </p>
              </div>
            </Reveal>

            <ol className="education-timeline">
              {EDUCATION_TIMELINE.map((item, idx) => (
                <Reveal key={item.id} delay={idx * 0.08}>
                  <li className="timeline-item">
                    <span className="timeline-marker" aria-hidden="true" />
                    <div className="timeline-card">
                      <div className="timeline-card-meta">
                        <span>{item.period}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{item.result}</span>
                      </div>
                      <h3 className="timeline-card-title">{item.qualification}</h3>
                      <p className="timeline-card-school">{item.institution}</p>
                      <p className="timeline-card-notes">{item.notes}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Grouped Skills Grid */}
      <section className="home-section" aria-labelledby="skills-overview-title">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <div>
                <p className="eyebrow-tagline">Capabilities</p>
                <h2 id="skills-overview-title" className="editorial-section-title">
                  Skills &amp; tools
                </h2>
              </div>
              <p className="editorial-section-note">
                Organized honestly into tools I use right now, technologies I am learning next, and core soft skills.
              </p>
            </div>
          </Reveal>

          <div className="skill-groups-stack">
            {SKILL_GROUPS.map((group, groupIdx) => (
              <Reveal key={group.id} delay={groupIdx * 0.06}>
                <div className="skill-group-block">
                  <div className="skill-group-header">
                    <h3 className="skill-group-title">{group.title}</h3>
                    <p className="skill-group-subtitle">{group.subtitle}</p>
                  </div>

                  <div className="skill-cards-grid">
                    {group.items.map((skill) => (
                      <div key={skill.name} className="skill-card">
                        <div className="skill-icon-wrap">
                          <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <p className="skill-card-name">{skill.name}</p>
                          <p className="skill-card-focus">{skill.focus}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
