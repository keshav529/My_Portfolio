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
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Contact Page (/contact) — Stage 5
 * Includes:
 * 1. Direct email, phone, Copy Email button + toast feedback, and social links
 * 2. Validated Formspree contact form with accessible errors & status feedback
 */
export function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
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
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // If Formspree ID hasn't been configured yet, run a clear preview/validation state
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORMSPREE_ID')) {
      setStatus('demo');
      setStatusMessage(
        'Form validated! Replace YOUR_FORMSPREE_ID in src/data/portfolioData.ts to receive live submissions, or email me directly.'
      );
      showToast('Validation passed — Formspree ID needed for live delivery');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
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
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setStatusMessage('Thank you! Your message has been sent. I will get back to you soon.');
      setValues({ name: '', email: '', subject: '', message: '' });
      showToast('Message sent successfully');
    } catch {
      setStatus('error');
      setStatusMessage(
        `Unable to send right now. Please email me directly at ${PROFILE.email}.`
      );
    }
  };

  return (
    <PageTransition>
      <section className="page-header-section" aria-labelledby="contact-page-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow-tagline">GET IN TOUCH</p>
            <h1 id="contact-page-title" className="page-hero-title">
              Let&apos;s build something together
            </h1>
            <p className="page-hero-lead">
              Open to web development internships, trainee roles, and project collaborations. Send a message below or reach out directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="home-section home-section-tinted" aria-label="Contact details and form">
        <div className="container">
          <div className="contact-page-grid">
            {/* Left Column: Direct Details, Copy Email & Socials */}
            <Reveal>
              <div className="contact-info-panel">
                <div>
                  <p className="eyebrow-tagline">Direct Contact</p>
                  <h2 className="contact-panel-heading">Reach me directly</h2>
                  <p className="contact-panel-copy">
                    Prefer email or phone? Use any of the links below, or copy my email with one click.
                  </p>
                </div>

                <div className="contact-direct-list">
                  <div className="contact-direct-card">
                    <div className="contact-direct-row">
                      <Mail size={18} className="contact-icon" aria-hidden="true" />
                      <div>
                        <p className="eyebrow-tagline">Email</p>
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
                        <p className="eyebrow-tagline">Phone</p>
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

                <div>
                  <p className="eyebrow-tagline" style={{ marginBottom: '0.85rem' }}>
                    Profiles &amp; Resume
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
                      href={PROFILE.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-editorial"
                    >
                      <span>GitHub</span>
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
                      href={PROFILE.resumeUrl}
                      download
                      className="btn-primary-editorial"
                    >
                      <FileDown size={15} aria-hidden="true" />
                      <span>Resume PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Validated Formspree Form */}
            <Reveal delay={0.08}>
              <div className="contact-form-card">
                <h2 className="contact-panel-heading">Send a message</h2>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-field-row">
                    <div className="form-field">
                      <label htmlFor="contact-name">Your Name *</label>
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
                        <p id="error-name" className="form-error-text" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact-email">Email Address *</label>
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
                        <p id="error-email" className="form-error-text" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject">Subject (Optional)</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="Internship opportunity / Project collaboration"
                      value={values.subject}
                      onChange={(e) =>
                        setValues({ ...values, subject: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell me a little about the role, project, or question..."
                      value={values.message}
                      onChange={(e) => {
                        setValues({ ...values, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                    />
                    {errors.message && (
                      <p id="error-message" className="form-error-text" role="alert">
                        {errors.message}
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
                    className="btn-primary-editorial"
                    disabled={status === 'submitting'}
                    style={{ width: 'fit-content' }}
                  >
                    <Send size={15} aria-hidden="true" />
                    <span>
                      {status === 'submitting' ? 'Sending...' : 'Send message'}
                    </span>
                  </button>
                </form>
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
