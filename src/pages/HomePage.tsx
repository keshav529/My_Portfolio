import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { Hero } from '../components/Hero';
import { ServiceTabs } from '../components/ServiceTabs';
import { WorkCard } from '../components/WorkCard';
import { Accordion } from '../components/Accordion';
import {
  HOME_FAQS,
  LEARNING_AND_PEER_CARDS,
  PROFILE,
  PROJECTS,
  SERVICES,
  WHY_WORK_WITH_ME,
} from '../data/portfolioData';

/**
 * Full Editorial Home Page (Stage 2)
 * Follows a high-whitespace editorial rhythm modeled on the reference layout,
 * populated exclusively with Keshav's real projects, skills, and honest placeholders.
 */
export function HomePage() {
  const featuredWork = PROJECTS.slice(0, 4);

  return (
    <PageTransition>
      {/* 1. Hero with Tagline, Giant Headline, Dual CTAs & Parallax Portrait */}
      <Hero />

      {/* 2. Short Intro Statement */}
      <section className="home-section home-intro-band" aria-labelledby="intro-statement">
        <div className="container">
          <Reveal>
            <div className="intro-statement-grid">
              <p className="eyebrow-tagline">About my focus</p>
              <div>
                <h2 id="intro-statement" className="intro-statement-title">
                  I partner with student teams, startups, and mentors to craft clear, responsive web interfaces that feel effortless to use.
                </h2>
                <p className="intro-statement-body">
                  Every project I build starts with clean structure, readable code, and thoughtful spacing—combining my foundation in HTML, CSS, JavaScript, Bootstrap, and Figma with ongoing practice in React, Node.js, MongoDB, and Data Structures.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. How I Can Help You (4 Interactive Service Tabs) */}
      <section className="home-section home-section-tinted" aria-labelledby="services-heading">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <div>
                <p className="eyebrow-tagline">Capabilities</p>
                <h2 id="services-heading" className="editorial-section-title">
                  How I can help you
                </h2>
              </div>
              <p className="editorial-section-note">
                Select a capability below to explore the deliverables and approach behind each area.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ServiceTabs services={SERVICES} />
          </Reveal>
        </div>
      </section>

      {/* 4. Work, Case Studies (Numbered Project Grid) */}
      <section className="home-section" aria-labelledby="work-preview-heading">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <div>
                <p className="eyebrow-tagline">Work, case studies</p>
                <h2 id="work-preview-heading" className="editorial-section-title">
                  Selected projects
                </h2>
              </div>
              <Link to="/work" className="see-more-link">
                <span>See more work</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="work-preview-grid">
            {featuredWork.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <WorkCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why I Build This Way (Honest 8-Point Checklist) */}
      <section className="home-section home-section-tinted" aria-labelledby="why-heading">
        <div className="container">
          <div className="why-grid">
            <Reveal>
              <div>
                <p className="eyebrow-tagline">Standards</p>
                <h2 id="why-heading" className="editorial-section-title">
                  Why I build this way
                </h2>
                <p className="editorial-section-note" style={{ marginTop: '1rem' }}>
                  As an early-career developer, consistency matters. Here are the habits I bring to every repository and layout.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="why-checklist">
                {WHY_WORK_WITH_ME.map((point) => (
                  <li key={point} className="why-checklist-item">
                    <CheckCircle2
                      size={20}
                      className="why-check-icon"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. What I'm Learning / Mentors & Peers (Transparent Placeholders) */}
      <section className="home-section" aria-labelledby="notes-heading">
        <div className="container">
          <Reveal>
            <div className="section-header-row">
              <div>
                <p className="eyebrow-tagline">Growth &amp; Feedback</p>
                <h2 id="notes-heading" className="editorial-section-title">
                  What I&apos;m learning &amp; peer notes
                </h2>
              </div>
              <p className="editorial-section-note">
                Honest learning milestones alongside clearly marked placeholders for future mentor and teammate quotes.
              </p>
            </div>
          </Reveal>

          <div className="peer-notes-grid">
            {LEARNING_AND_PEER_CARDS.map((card, index) => (
              <Reveal key={card.id} delay={index * 0.06}>
                <article
                  className={`peer-note-card ${
                    card.id.includes('placeholder') ? 'is-placeholder' : ''
                  }`}
                >
                  <p className="eyebrow-tagline">{card.label}</p>
                  <h3 className="peer-note-title">{card.title}</h3>
                  <p className="peer-note-body">{card.body}</p>
                  <p className="peer-note-author">{card.authorNote}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Downloadable Resume Banner */}
      <section className="home-section home-section-tinted" aria-labelledby="resume-banner-heading">
        <div className="container">
          <Reveal>
            <div className="resume-banner-card">
              <div className="resume-banner-content">
                <p className="eyebrow-tagline">Curriculum Vitae</p>
                <h2 id="resume-banner-heading" className="resume-banner-title">
                  Download my resume
                </h2>
                <p className="resume-banner-copy">
                  Get a concise overview of my BCA coursework, technical skills across HTML/CSS/JS and Java, academic record, and project links in PDF format.
                </p>
                <div className="stage-cta-row">
                  <a
                    href={PROFILE.resumeUrl}
                    download
                    className="btn-primary-editorial"
                  >
                    <FileDown size={16} aria-hidden="true" />
                    <span>Download PDF Resume</span>
                  </a>
                  <Link to="/resources" className="btn-secondary-editorial">
                    <span>View Resources</span>
                  </Link>
                </div>
              </div>

              <div className="resume-cover-frame">
                <img
                  src={PROFILE.resumeCover}
                  alt="Preview cover of Keshav's resume document"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="home-section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="faq-layout-grid">
            <Reveal>
              <div>
                <p className="eyebrow-tagline">FAQ</p>
                <h2 id="faq-heading" className="editorial-section-title">
                  Common questions
                </h2>
                <p className="editorial-section-note" style={{ marginTop: '1rem' }}>
                  Quick answers about my stack, availability for internships, and how I collaborate on projects.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Accordion items={HOME_FAQS} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. Big Editorial Call-To-Action Band */}
      <section className="home-cta-band" aria-labelledby="final-cta-heading">
        <div className="container">
          <Reveal>
            <div className="home-cta-inner">
              <p className="eyebrow-tagline" style={{ color: 'var(--color-dark-ink-muted)' }}>
                Open to internships &amp; junior roles
              </p>
              <h2 id="final-cta-heading" className="home-cta-title">
                Let&apos;s build something together
              </h2>
              <p className="home-cta-copy">
                Looking for an enthusiastic developer who cares about clean code and user experience? I&apos;d love to hear from you.
              </p>
              <div className="stage-cta-row" style={{ justifyContent: 'center' }}>
                <Link to="/contact" className="btn-accent-editorial">
                  <span>Get in touch</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="btn-ghost-dark"
                >
                  <span>{PROFILE.email}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
