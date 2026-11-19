import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { FORMSPREE_ENDPOINT, PROFILE } from '../data/portfolioData';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
}

/**
 * Stage 3 Contact Page (/contact):
 * - 2-column rounded dark panel (border-radius 1.25rem, padding 2.5em, #292929)
 * - Left column: h1 heading + email/phone pinned at the bottom
 * - Right column: Formspree form with transparent inputs, 1px #a3a3a3 border, .875rem radius,
 *   min-height 3rem, text #d6d6d6, placeholder #737373, white focus border, 11.25rem textarea,
 *   orange consent checkbox, accessible status feedback
 * - Below panel: 2-column contact info section (Email + 1-click Copy, Phone, LinkedIn, LeetCode, GitHub)
 */
export function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'demo' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      showToast('Email copied to clipboard');
    } catch {
      showToast(`Email: ${PROFILE.email}`);
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = 'Please write a short message (at least 10 characters).';
    }
    if (!values.consent) {
      nextErrors.consent = 'Please confirm you agree to share your details for a reply.';
    }
    return nextErrors;
  };

  const [customFormId, setCustomFormId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('formspree_custom_id') || '';
  });
  const [tempFormId, setTempFormId] = useState(customFormId);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    const envId = import.meta.env.VITE_FORMSPREE_ID?.trim() || 'xnpddnez';
    const activeId = (customFormId || envId).trim();
    const endpoint = `https://formspree.io/f/${activeId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim() || 'Portfolio inquiry',
          message: values.message.trim(),
          submitted_at: new Date().toLocaleString(undefined, {
            dateStyle: 'full',
            timeStyle: 'long',
          }),
          client_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Form submission failed');
      }

      setStatus('success');
      setStatusMessage('Thank you! Your message has been sent directly to your Formspree database.');
      setValues({ name: '', email: '', subject: '', message: '', consent: false });
      showToast('Message sent to Formspree successfully');
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(
        err?.message || `Unable to send to Formspree right now. Please check your Formspree Form ID or email me at ${PROFILE.email}.`
      );
    }
  };

  return (
    <PageTransition>
      {/* Top 2-Column Rounded Dark Panel (#292929) */}
      <section className="contact-dark-section" aria-labelledby="contact-page-title">
        <div className="container">
          <Reveal>
            <div className="contact-dark-panel">
              {/* Left Column: h1 + Email & Phone pinned to bottom */}
              <div className="contact-dark-left">
                <div>
                  <h1 id="contact-page-title" className="contact-dark-heading">
                    Let&apos;s build something together
                  </h1>
                  <p className="contact-dark-lead">
                    Open to web development internships, trainee roles, and project collaborations.
                  </p>
                </div>

                <div className="contact-dark-pinned">
                  <div className="contact-dark-detail">
                    <span className="contact-dark-label">Email</span>
                    <a href={`mailto:${PROFILE.email}`} className="contact-dark-link">
                      {PROFILE.email}
                    </a>
                  </div>

                  <div className="contact-dark-detail">
                    <span className="contact-dark-label">Phone</span>
                    <a
                      href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}
                      className="contact-dark-link"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Transparent Formspree Form inside Dark Panel */}
              <form className="contact-dark-form" onSubmit={handleSubmit} noValidate>
                {FORMSPREE_ENDPOINT.includes('YOUR_FORMSPREE_ID') && !customFormId && (
                  <div className="formspree-config-banner">
                    <p className="formspree-config-text">
                      <strong>Connect Formspree Database:</strong> Enter your Formspree Form ID (from formspree.io) below so submissions appear in your dashboard:
                    </p>
                    <div className="formspree-config-row">
                      <input
                        type="text"
                        placeholder="e.g. xpwz..."
                        value={tempFormId}
                        onChange={(e) => setTempFormId(e.target.value)}
                        className="formspree-config-input"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const trimmed = tempFormId.trim();
                          if (trimmed) {
                            setCustomFormId(trimmed);
                            localStorage.setItem('formspree_custom_id', trimmed);
                            showToast('Formspree ID saved successfully');
                          }
                        }}
                        className="btn-primary-editorial"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      >
                        Save ID
                      </button>
                    </div>
                  </div>
                )}
                <div className="contact-dark-row">
                  <div className="contact-dark-field">
                    <label htmlFor="contact-name">Your name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Ananya Sharma"
                      value={values.name}
                      onChange={(e) => {
                        setValues({ ...values, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                    />
                    {errors.name && (
                      <p id="error-name" className="contact-dark-error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="contact-dark-field">
                    <label htmlFor="contact-email">Email address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                    {errors.email && (
                      <p id="error-email" className="contact-dark-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="contact-dark-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Internship opportunity / Project collaboration"
                    value={values.subject}
                    onChange={(e) => setValues({ ...values, subject: e.target.value })}
                  />
                </div>

                <div className="contact-dark-field">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about the role, project, or question..."
                    value={values.message}
                    onChange={(e) => {
                      setValues({ ...values, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                  />
                  {errors.message && (
                    <p id="error-message" className="contact-dark-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="contact-consent-block">
                  <label className="contact-consent-label">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => {
                        setValues({ ...values, consent: e.target.checked });
                        if (errors.consent) setErrors({ ...errors, consent: undefined });
                      }}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'error-consent' : undefined}
                    />
                    <span>I agree to share these details so Keshav can reply to my message.</span>
                  </label>
                  {errors.consent && (
                    <p id="error-consent" className="contact-dark-error" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {statusMessage && (
                  <div
                    className={`form-status-banner ${
                      status === 'error' ? 'is-error' : 'is-success'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-dark-submit"
                  disabled={status === 'submitting'}
                >
                  <Send size={16} aria-hidden="true" />
                  <span>{status === 'submitting' ? 'Sending...' : 'Send message'}</span>
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Below Panel: 2-Column Direct Contact & Social Profiles */}
      <section className="contact-below-section" aria-label="Direct contact channels">
        <div className="container">
          <div className="contact-below-grid">
            <Reveal>
              <div className="contact-below-col">
                <h2 className="contact-below-heading">Direct channels</h2>

                <div className="contact-direct-list">
                  <div className="contact-direct-card">
                    <div className="contact-direct-row">
                      <Mail size={18} className="contact-icon" aria-hidden="true" />
                      <div>
                        <span className="contact-channel-label">Email</span>
                        <a href={`mailto:${PROFILE.email}`} className="contact-direct-link">
                          {PROFILE.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="copy-email-btn"
                      aria-label="Copy email address"
                    >
                      <Copy size={15} aria-hidden="true" />
                      <span>Copy</span>
                    </button>
                  </div>

                  <div className="contact-direct-card">
                    <div className="contact-direct-row">
                      <Phone size={18} className="contact-icon" aria-hidden="true" />
                      <div>
                        <span className="contact-channel-label">Phone</span>
                        <a
                          href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}
                          className="contact-direct-link"
                        >
                          {PROFILE.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="contact-below-col">
                <h2 className="contact-below-heading">Profiles &amp; CV</h2>
                <p className="contact-below-copy">
                  Explore my code repositories, LeetCode practice, and academic background, or download my PDF resume directly.
                </p>

                <div className="contact-social-row">
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-editorial"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <a
                    href={PROFILE.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-editorial"
                  >
                    <span>LeetCode</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <a
                    href={PROFILE.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-editorial"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <a
                    href={PROFILE.resumeUrl}
                    download
                    className="btn-primary-editorial"
                  >
                    <FileDown size={15} aria-hidden="true" />
                    <span>Resume PDF</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="portfolio-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
          >
            <Check size={16} aria-hidden="true" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
