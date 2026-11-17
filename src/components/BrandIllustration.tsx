import { CSSProperties } from 'react';

export type FallbackIllustrationKind =
  | 'desk-notebooks'
  | 'desk-laptop'
  | 'campus'
  | 'stack-roadmap'
  | 'portrait-workspace'
  | 'code-workspace'
  | 'project-grid'
  | 'mobile-view'
  | 'state-detail'
  | 'resume-doc';

interface BrandIllustrationProps {
  kind: FallbackIllustrationKind;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Purpose-built geometric SVG illustrations strictly in the portfolio palette:
 * cream (#e7e2dc, #dfd8d1), accent orange (#ff5330), and dark greys (#121212, #292929, #424242, #525252).
 * Flat shapes, zero faces, zero copyrighted logos.
 */
export function BrandIllustration({
  kind,
  alt,
  className = '',
  style,
}: BrandIllustrationProps) {
  const accessibilityProps = alt
    ? { role: 'img' as const, 'aria-label': alt }
    : { 'aria-hidden': true as const };

  switch (kind) {
    case 'desk-notebooks':
      return (
        <svg
          viewBox="0 0 800 500"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="800" height="500" fill="#292929" />
          {/* Subtle grid backdrop */}
          <rect x="64" y="54" width="672" height="296" rx="18" fill="#1c1c1c" />
          <line x1="64" y1="350" x2="736" y2="350" stroke="#424242" strokeWidth="2" />
          {/* Desk surface */}
          <rect x="44" y="348" width="712" height="34" rx="10" fill="#e7e2dc" />
          <rect x="78" y="382" width="18" height="72" rx="4" fill="#424242" />
          <rect x="704" y="382" width="18" height="72" rx="4" fill="#424242" />

          {/* Stacked books / notebooks left */}
          <rect x="130" y="312" width="196" height="36" rx="6" fill="#dfd8d1" />
          <rect x="148" y="278" width="170" height="34" rx="6" fill="#ff5330" />
          <rect x="164" y="246" width="144" height="32" rx="6" fill="#525252" />
          <line x1="158" y1="295" x2="298" y2="295" stroke="#e7e2dc" strokeWidth="2" opacity="0.65" />

          {/* Open ruled notebook center */}
          <rect x="356" y="206" width="240" height="142" rx="10" fill="#e7e2dc" />
          <line x1="476" y1="206" x2="476" y2="348" stroke="#a3a3a3" strokeWidth="2" />
          <line x1="378" y1="238" x2="454" y2="238" stroke="#ff5330" strokeWidth="4" strokeLinecap="round" />
          <line x1="378" y1="262" x2="450" y2="262" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
          <line x1="378" y1="284" x2="442" y2="284" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
          <line x1="378" y1="306" x2="452" y2="306" stroke="#737373" strokeWidth="3" strokeLinecap="round" />
          <rect x="498" y="234" width="74" height="54" rx="6" fill="#dfd8d1" stroke="#424242" strokeWidth="2" />
          <line x1="498" y1="306" x2="572" y2="306" stroke="#424242" strokeWidth="3" strokeLinecap="round" />

          {/* Diagonal pencil + ruler right */}
          <g transform="translate(636 226) rotate(24)">
            <rect x="0" y="0" width="18" height="110" rx="4" fill="#ff5330" />
            <polygon points="0,110 18,110 9,128" fill="#e7e2dc" />
            <rect x="0" y="0" width="18" height="14" rx="3" fill="#424242" />
          </g>
          <rect x="614" y="324" width="76" height="24" rx="6" fill="#525252" />
          <circle cx="656" cy="118" r="28" fill="#ff5330" opacity="0.9" />
        </svg>
      );

    case 'desk-laptop':
      return (
        <svg
          viewBox="0 0 800 500"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="800" height="500" fill="#292929" />
          <rect x="64" y="54" width="672" height="296" rx="18" fill="#1c1c1c" />
          {/* Desk surface */}
          <rect x="44" y="348" width="712" height="32" rx="10" fill="#e7e2dc" />

          {/* Minimal laptop silhouette */}
          <rect x="242" y="142" width="290" height="184" rx="12" fill="#424242" />
          <rect x="256" y="156" width="262" height="156" rx="6" fill="#121212" />
          {/* Clean layout blocks inside screen */}
          <rect x="274" y="174" width="96" height="14" rx="4" fill="#ff5330" />
          <rect x="274" y="202" width="144" height="50" rx="6" fill="#e7e2dc" />
          <rect x="430" y="202" width="70" height="50" rx="6" fill="#dfd8d1" opacity="0.45" />
          <rect x="274" y="264" width="226" height="28" rx="6" fill="#292929" />
          {/* Laptop base */}
          <path d="M210 326 H604 L582 348 H232 Z" fill="#d6d6d6" />

          {/* Books stack right */}
          <rect x="598" y="314" width="118" height="34" rx="5" fill="#525252" />
          <rect x="606" y="280" width="102" height="34" rx="5" fill="#ff5330" />
          <rect x="616" y="248" width="88" height="32" rx="5" fill="#dfd8d1" />

          {/* Desk lamp left */}
          <rect x="116" y="330" width="68" height="18" rx="6" fill="#525252" />
          <path d="M148 330 L132 216 L186 168" fill="none" stroke="#e7e2dc" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="168,154 222,188 188,208 156,184" fill="#ff5330" />
        </svg>
      );

    case 'campus':
      return (
        <svg
          viewBox="0 0 800 500"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="800" height="500" fill="#dfd8d1" />
          {/* Sky geometric sun */}
          <circle cx="628" cy="126" r="56" fill="#ff5330" />
          {/* Ground plane */}
          <rect x="0" y="384" width="800" height="116" fill="#292929" />
          {/* Left & right campus wings */}
          <rect x="110" y="220" width="150" height="164" rx="6" fill="#424242" />
          <rect x="540" y="220" width="150" height="164" rx="6" fill="#424242" />
          {/* Wing windows */}
          <rect x="136" y="250" width="38" height="44" rx="4" fill="#e7e2dc" />
          <rect x="194" y="250" width="38" height="44" rx="4" fill="#e7e2dc" />
          <rect x="136" y="312" width="38" height="44" rx="4" fill="#e7e2dc" />
          <rect x="194" y="312" width="38" height="44" rx="4" fill="#e7e2dc" />

          <rect x="568" y="250" width="38" height="44" rx="4" fill="#e7e2dc" />
          <rect x="626" y="250" width="38" height="44" rx="4" fill="#e7e2dc" />
          <rect x="568" y="312" width="38" height="44" rx="4" fill="#e7e2dc" />
          <rect x="626" y="312" width="38" height="44" rx="4" fill="#e7e2dc" />

          {/* Central academic building */}
          <rect x="242" y="168" width="316" height="216" rx="8" fill="#121212" />
          <polygon points="222,168 400,98 578,168" fill="#ff5330" />
          <circle cx="400" cy="140" r="14" fill="#e7e2dc" />
          {/* Columns */}
          <rect x="278" y="196" width="22" height="154" rx="3" fill="#e7e2dc" />
          <rect x="336" y="196" width="22" height="154" rx="3" fill="#e7e2dc" />
          <rect x="442" y="196" width="22" height="154" rx="3" fill="#e7e2dc" />
          <rect x="500" y="196" width="22" height="154" rx="3" fill="#e7e2dc" />
          {/* Arch entrance */}
          <path d="M372 350 V268 A28 28 0 0 1 428 268 V350 Z" fill="#ff5330" />
          {/* Steps */}
          <rect x="260" y="350" width="280" height="16" rx="3" fill="#dfd8d1" />
          <rect x="240" y="366" width="320" height="18" rx="3" fill="#e7e2dc" />
        </svg>
      );

    case 'stack-roadmap':
      return (
        <svg
          viewBox="0 0 800 500"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="800" height="500" fill="#181818" />
          {/* Subtle grid */}
          <rect x="36" y="36" width="728" height="428" rx="20" fill="#222222" stroke="#383838" strokeWidth="1.5" />
          <text
            x="76"
            y="96"
            fill="#a3a3a3"
            fontSize="16"
            fontWeight="500"
            fontFamily="Outfit, sans-serif"
            letterSpacing="3"
          >
            LEARNING ROADMAP
          </text>

          {/* Connected step line */}
          <path
            d="M150 250 H650"
            stroke="#424242"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M150 250 H520"
            stroke="#ff5330"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Step 1: React */}
          <g transform="translate(86, 174)">
            <rect width="128" height="152" rx="14" fill="#292929" stroke="#ff5330" strokeWidth="2" />
            <circle cx="64" cy="48" r="18" fill="#ff5330" />
            <text x="64" y="54" textAnchor="middle" fill="#121212" fontSize="14" fontWeight="700" fontFamily="Outfit, sans-serif">
              01
            </text>
            <text x="64" y="102" textAnchor="middle" fill="#fcfcfc" fontSize="22" fontWeight="500" fontFamily="Outfit, sans-serif">
              React
            </text>
            <text x="64" y="128" textAnchor="middle" fill="#a3a3a3" fontSize="12" fontWeight="400" fontFamily="Outfit, sans-serif">
              UI Components
            </text>
          </g>

          {/* Step 2: Node.js */}
          <g transform="translate(248, 174)">
            <rect width="128" height="152" rx="14" fill="#292929" stroke="#525252" strokeWidth="1.5" />
            <circle cx="64" cy="48" r="18" fill="#e7e2dc" />
            <text x="64" y="54" textAnchor="middle" fill="#121212" fontSize="14" fontWeight="700" fontFamily="Outfit, sans-serif">
              02
            </text>
            <text x="64" y="102" textAnchor="middle" fill="#fcfcfc" fontSize="22" fontWeight="500" fontFamily="Outfit, sans-serif">
              Node.js
            </text>
            <text x="64" y="128" textAnchor="middle" fill="#a3a3a3" fontSize="12" fontWeight="400" fontFamily="Outfit, sans-serif">
              REST APIs
            </text>
          </g>

          {/* Step 3: MongoDB */}
          <g transform="translate(410, 174)">
            <rect width="128" height="152" rx="14" fill="#292929" stroke="#525252" strokeWidth="1.5" />
            <circle cx="64" cy="48" r="18" fill="#e7e2dc" />
            <text x="64" y="54" textAnchor="middle" fill="#121212" fontSize="14" fontWeight="700" fontFamily="Outfit, sans-serif">
              03
            </text>
            <text x="64" y="102" textAnchor="middle" fill="#fcfcfc" fontSize="22" fontWeight="500" fontFamily="Outfit, sans-serif">
              MongoDB
            </text>
            <text x="64" y="128" textAnchor="middle" fill="#a3a3a3" fontSize="12" fontWeight="400" fontFamily="Outfit, sans-serif">
              Data Models
            </text>
          </g>

          {/* Step 4: DSA */}
          <g transform="translate(572, 174)">
            <rect width="140" height="152" rx="14" fill="#e7e2dc" />
            <circle cx="70" cy="48" r="18" fill="#ff5330" />
            <text x="70" y="54" textAnchor="middle" fill="#121212" fontSize="14" fontWeight="700" fontFamily="Outfit, sans-serif">
              04
            </text>
            <text x="70" y="102" textAnchor="middle" fill="#121212" fontSize="22" fontWeight="700" fontFamily="Outfit, sans-serif">
              DSA
            </text>
            <text x="70" y="128" textAnchor="middle" fill="#424242" fontSize="12" fontWeight="500" fontFamily="Outfit, sans-serif">
              Problem Solving
            </text>
          </g>
        </svg>
      );

    case 'mobile-view':
      return (
        <svg
          viewBox="0 0 600 600"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="600" height="600" fill="#dfd8d1" />
          {/* Mobile viewport frame */}
          <rect x="176" y="64" width="248" height="472" rx="28" fill="#121212" />
          <rect x="192" y="96" width="216" height="408" rx="16" fill="#e7e2dc" />
          {/* Responsive layout blocks */}
          <rect x="212" y="120" width="96" height="14" rx="4" fill="#121212" />
          <circle cx="380" cy="127" r="10" fill="#ff5330" />
          <rect x="212" y="156" width="176" height="110" rx="10" fill="#292929" />
          <rect x="228" y="182" width="104" height="14" rx="4" fill="#ff5330" />
          <rect x="228" y="210" width="136" height="10" rx="3" fill="#e7e2dc" opacity="0.7" />
          <rect x="212" y="286" width="176" height="72" rx="10" fill="#fafafa" stroke="#d6d6d6" strokeWidth="2" />
          <rect x="212" y="376" width="176" height="72" rx="10" fill="#fafafa" stroke="#d6d6d6" strokeWidth="2" />
          <rect x="264" y="476" width="72" height="6" rx="3" fill="#525252" />
        </svg>
      );

    case 'state-detail':
      return (
        <svg
          viewBox="0 0 600 600"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="600" height="600" fill="#292929" />
          {/* State panel cards */}
          <rect x="76" y="96" width="448" height="116" rx="14" fill="#1c1c1c" stroke="#424242" strokeWidth="2" />
          <circle cx="122" cy="154" r="18" fill="#525252" />
          <rect x="164" y="136" width="180" height="14" rx="4" fill="#e7e2dc" />
          <rect x="164" y="162" width="260" height="10" rx="3" fill="#737373" />

          <rect x="76" y="242" width="448" height="116" rx="14" fill="#e7e2dc" />
          <circle cx="122" cy="300" r="18" fill="#ff5330" />
          <rect x="164" y="282" width="210" height="14" rx="4" fill="#121212" />
          <rect x="164" y="308" width="280" height="10" rx="3" fill="#525252" />

          <rect x="76" y="388" width="448" height="116" rx="14" fill="#1c1c1c" stroke="#ff5330" strokeWidth="2" />
          <circle cx="122" cy="446" r="18" fill="#ff5330" />
          <path d="M114 446 L120 452 L131 439" fill="none" stroke="#121212" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="164" y="428" width="196" height="14" rx="4" fill="#fcfcfc" />
          <rect x="164" y="454" width="244" height="10" rx="3" fill="#a3a3a3" />
        </svg>
      );

    case 'resume-doc':
      return (
        <svg
          viewBox="0 0 600 800"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="600" height="800" fill="#dfd8d1" />
          {/* Paper page */}
          <rect x="56" y="48" width="488" height="704" rx="16" fill="#fcfcfc" stroke="#d6d6d6" strokeWidth="2" />
          {/* Top header bar */}
          <rect x="56" y="48" width="488" height="132" rx="16" fill="#121212" />
          <rect x="56" y="148" width="488" height="32" fill="#121212" />
          <rect x="92" y="92" width="220" height="24" rx="4" fill="#fcfcfc" />
          <rect x="92" y="130" width="160" height="12" rx="3" fill="#ff5330" />
          <circle cx="476" cy="114" r="24" fill="#ff5330" />

          {/* Section 1: Education */}
          <rect x="92" y="216" width="132" height="12" rx="3" fill="#ff5330" />
          <rect x="92" y="246" width="416" height="14" rx="4" fill="#292929" />
          <rect x="92" y="274" width="356" height="10" rx="3" fill="#737373" />
          <rect x="92" y="296" width="380" height="10" rx="3" fill="#737373" />
          <line x1="92" y1="336" x2="508" y2="336" stroke="#e5e5e5" strokeWidth="2" />

          {/* Section 2: Skills */}
          <rect x="92" y="366" width="110" height="12" rx="3" fill="#ff5330" />
          <rect x="92" y="396" width="94" height="30" rx="6" fill="#e7e2dc" />
          <rect x="200" y="396" width="94" height="30" rx="6" fill="#e7e2dc" />
          <rect x="308" y="396" width="94" height="30" rx="6" fill="#e7e2dc" />
          <rect x="416" y="396" width="92" height="30" rx="6" fill="#e7e2dc" />
          <rect x="92" y="438" width="116" height="30" rx="6" fill="#dfd8d1" />
          <rect x="222" y="438" width="116" height="30" rx="6" fill="#dfd8d1" />
          <rect x="352" y="438" width="116" height="30" rx="6" fill="#dfd8d1" />
          <line x1="92" y1="498" x2="508" y2="498" stroke="#e5e5e5" strokeWidth="2" />

          {/* Section 3: Projects */}
          <rect x="92" y="528" width="124" height="12" rx="3" fill="#ff5330" />
          <rect x="92" y="558" width="416" height="14" rx="4" fill="#292929" />
          <rect x="92" y="584" width="372" height="10" rx="3" fill="#737373" />
          <rect x="92" y="616" width="416" height="14" rx="4" fill="#292929" />
          <rect x="92" y="642" width="340" height="10" rx="3" fill="#737373" />
          <rect x="92" y="688" width="144" height="28" rx="6" fill="#ff5330" />
        </svg>
      );

    case 'project-grid':
      return (
        <svg
          viewBox="0 0 800 600"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="800" height="600" fill="#141414" />
          <rect x="56" y="64" width="330" height="220" rx="14" fill="#292929" stroke="#424242" strokeWidth="1.5" />
          <rect x="80" y="92" width="120" height="14" rx="4" fill="#ff5330" />
          <rect x="80" y="124" width="282" height="132" rx="8" fill="#1c1c1c" />
          <rect x="414" y="64" width="330" height="220" rx="14" fill="#e7e2dc" />
          <rect x="438" y="92" width="140" height="14" rx="4" fill="#121212" />
          <rect x="438" y="124" width="282" height="132" rx="8" fill="#dfd8d1" />
          <rect x="56" y="316" width="688" height="220" rx="14" fill="#292929" stroke="#ff5330" strokeWidth="1.5" />
          <rect x="84" y="348" width="200" height="18" rx="4" fill="#fcfcfc" />
          <rect x="84" y="384" width="632" height="120" rx="10" fill="#1c1c1c" />
        </svg>
      );

    case 'code-workspace':
      return (
        <svg
          viewBox="0 0 800 600"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="800" height="600" fill="#1c1c1c" />
          <rect x="64" y="64" width="672" height="472" rx="18" fill="#292929" stroke="#424242" strokeWidth="2" />
          <line x1="64" y1="126" x2="736" y2="126" stroke="#424242" strokeWidth="2" />
          <circle cx="106" cy="95" r="8" fill="#ff5330" />
          <circle cx="134" cy="95" r="8" fill="#737373" />
          <circle cx="162" cy="95" r="8" fill="#525252" />

          {/* Left sidebar */}
          <rect x="92" y="156" width="150" height="346" rx="10" fill="#1c1c1c" />
          <rect x="112" y="182" width="90" height="12" rx="3" fill="#ff5330" />
          <rect x="112" y="214" width="108" height="10" rx="3" fill="#525252" />
          <rect x="112" y="240" width="92" height="10" rx="3" fill="#525252" />
          <rect x="112" y="266" width="102" height="10" rx="3" fill="#e7e2dc" opacity="0.6" />

          {/* Main editor blocks */}
          <rect x="268" y="156" width="440" height="346" rx="10" fill="#121212" />
          <rect x="304" y="196" width="180" height="14" rx="4" fill="#ff5330" />
          <rect x="304" y="230" width="330" height="12" rx="4" fill="#e7e2dc" />
          <rect x="328" y="260" width="280" height="12" rx="4" fill="#737373" />
          <rect x="328" y="290" width="220" height="12" rx="4" fill="#a3a3a3" />
          <rect x="304" y="330" width="360" height="132" rx="10" fill="#292929" stroke="#ff5330" strokeWidth="1.5" />
        </svg>
      );

    case 'portrait-workspace':
    default:
      return (
        <svg
          viewBox="0 0 600 800"
          className={`brand-illustration-svg ${className}`.trim()}
          style={style}
          preserveAspectRatio="xMidYMid slice"
          {...accessibilityProps}
        >
          <rect width="600" height="800" fill="#dfd8d1" />
          <rect x="60" y="64" width="480" height="672" rx="20" fill="#292929" />
          <circle cx="420" cy="180" r="64" fill="#ff5330" />
          <rect x="108" y="130" width="180" height="20" rx="5" fill="#e7e2dc" />
          <rect x="108" y="168" width="130" height="12" rx="4" fill="#a3a3a3" />
          <rect x="108" y="290" width="384" height="240" rx="14" fill="#1c1c1c" stroke="#424242" strokeWidth="2" />
          <rect x="140" y="328" width="150" height="14" rx="4" fill="#ff5330" />
          <rect x="140" y="362" width="310" height="14" rx="4" fill="#e7e2dc" />
          <rect x="140" y="394" width="260" height="14" rx="4" fill="#737373" />
          <rect x="108" y="566" width="384" height="122" rx="14" fill="#e7e2dc" />
          <rect x="136" y="600" width="220" height="16" rx="4" fill="#121212" />
          <rect x="136" y="632" width="140" height="12" rx="4" fill="#ff5330" />
        </svg>
      );
  }
}
