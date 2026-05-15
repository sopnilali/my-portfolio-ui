import { ApiResponse, fetchJson } from './http';

export interface About {
  id?: string;
  nameTitle?: string;
  imageUrl?: string;
  professonName?: string;
  shortdescription?: string;
  /** Highlights: comma, pipe or newline-separated, or a JSON array string like `["A","B"]` */
  highlights?: string;

  githubUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;

  /** Primary hero CTA (defaults: Start a project → /contact) */
  primaryCtaText?: string;
  primaryCtaUrl?: string;

  resumeUrl?: string;
  cvUrl?: string;
  resumeCtaText?: string;
  cvCtaText?: string;

  /** Small pills above the headline */
  portfolioBadge?: string;
  availabilityBadge?: string;
}

export async function getAboutList(): Promise<About[]> {
  const res = await fetchJson<ApiResponse<About[]>>('/about');
  return res.data ?? [];
}

/** Image when `About.imageUrl` is empty */
export const ABOUT_HERO_IMAGE_FALLBACK =
  'https://i.postimg.cc/MKD6gcRS/Whats-App-Image-2025-12-13-at-19-07-19-fb8f2939.png';

const HERO_NAME_FALLBACK = 'Md. Abdul Adud';
const HERO_ROLE_FALLBACK = 'Full Stack Developer';
const HERO_DESC_FALLBACK =
  'I am a web developer focused on building scalable, maintainable, and high-quality web applications. I have a deep love for learning and always strive to improve my skills.';

const HIGHLIGHTS_FALLBACK = [
  'Product-grade UI',
  'APIs & data layers',
  'Performance & DX',
];

const DEFAULT_RESUME_URL =
  'https://drive.google.com/drive/folders/1vWfEtq0rSp613hx5l8rwE4flmtPgWw9W';
const DEFAULT_CV_URL =
  'https://drive.google.com/drive/folders/1GJG5ksMd4glEUwPrbSJQwVRm8iRjmD6D';

export type HeroSocialIcon =
  | 'github'
  | 'linkedin'
  | 'facebook'
  | 'twitter'
  | 'instagram';

export interface HeroSocialLink {
  url: string;
  label: string;
  icon: HeroSocialIcon;
}

export interface HeroButton {
  text: string;
  link: string;
  primary?: boolean;
}

const DEFAULT_SOCIAL_LINKS: HeroSocialLink[] = [
  {
    url: 'https://github.com/sopnilali',
    label: 'GitHub',
    icon: 'github',
  },
  {
    url: 'https://www.linkedin.com/in/ami-abdul-adud',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  {
    url: 'https://www.facebook.com/cse.wadud',
    label: 'Facebook',
    icon: 'facebook',
  },
];

/** Parses `About.highlights` into a cleaned list (API-driven + fallback chips). */
export function parseHeroHighlights(about: About | null): string[] {
  const raw = about?.highlights?.trim();
  if (!raw) return [...HIGHLIGHTS_FALLBACK];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item): item is string => typeof item === 'string')
        .map((s) => s.trim())
        .filter(Boolean);
    }
  } catch {
    // treat as delimiter-separated plain text
  }
  return raw
    .split(/\s*[,|;]\s*|\s*\n+\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function heroDisplayName(about: About | null): string {
  return about?.nameTitle?.trim() || HERO_NAME_FALLBACK;
}

export function heroDisplayRole(about: About | null): string {
  return about?.professonName?.trim() || HERO_ROLE_FALLBACK;
}

export function heroDisplayBio(about: About | null): string {
  return about?.shortdescription?.trim() || HERO_DESC_FALLBACK;
}

export function heroImageSrc(about: About | null): string {
  return about?.imageUrl?.trim() || ABOUT_HERO_IMAGE_FALLBACK;
}

export function heroImageAlt(about: About | null): string {
  return about?.nameTitle?.trim() || HERO_NAME_FALLBACK;
}

export function heroPortfolioBadge(about: About | null): string {
  return about?.portfolioBadge?.trim() || 'Portfolio';
}

export function heroAvailabilityBadge(about: About | null): string {
  return about?.availabilityBadge?.trim() || 'Open to collaboration';
}

export function getHeroButtons(about: About | null): HeroButton[] {
  const primaryLabel = about?.primaryCtaText?.trim() || 'Start a project';
  const primaryHref = about?.primaryCtaUrl?.trim() || '/contact';
  const resumeHref = about?.resumeUrl?.trim() || DEFAULT_RESUME_URL;
  const cvHref = about?.cvUrl?.trim() || DEFAULT_CV_URL;

  return [
    { text: primaryLabel, link: primaryHref, primary: true },
    { text: about?.resumeCtaText?.trim() || 'Resume', link: resumeHref },
    { text: about?.cvCtaText?.trim() || 'CV', link: cvHref },
  ];
}

/** Social links from About when present; otherwise default list */
export function getHeroSocialLinks(about: About | null): HeroSocialLink[] {
  const pairs: HeroSocialLink[] = [];
  const g = about?.githubUrl?.trim();
  const li = about?.linkedinUrl?.trim();
  const fb = about?.facebookUrl?.trim();
  const tw = about?.twitterUrl?.trim();
  const ig = about?.instagramUrl?.trim();

  if (g) pairs.push({ url: g, label: 'GitHub', icon: 'github' });
  if (li) pairs.push({ url: li, label: 'LinkedIn', icon: 'linkedin' });
  if (fb) pairs.push({ url: fb, label: 'Facebook', icon: 'facebook' });
  if (tw) pairs.push({ url: tw, label: 'Twitter', icon: 'twitter' });
  if (ig) pairs.push({ url: ig, label: 'Instagram', icon: 'instagram' });

  return pairs.length > 0 ? pairs : [...DEFAULT_SOCIAL_LINKS];
}
