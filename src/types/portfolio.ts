/** Domain model for the portfolio content. All copy lives in `src/data`. */

export type ProjectStatus =
  | "publicado"
  | "em-desenvolvimento"
  | "mvp"
  | "conceito"
  | "estudo";

export type ProjectLinkKind = "demo" | "repo" | "site";

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: string;
  href: string;
}

export interface ProjectShot {
  src: string;
  alt: string;
  /** Rendered aspect ratio, so the browser reserves space before loading. */
  width: number;
  height: number;
}

export interface ProjectHighlight {
  /** Two to four words, used as the card fact title. */
  title: string;
  description: string;
}

export interface ProjectDetailBlock {
  title: string;
  /** Short prose paragraph; optional when `items` carries the content. */
  body?: string;
  items?: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** One line under the project name. */
  tagline: string;
  /** 1–2 sentence card summary. */
  summary: string;
  /** What the system solves. */
  problem: string;
  /** How it solves it. */
  solution: string;
  highlights: ProjectHighlight[];
  stack: string[];
  status: ProjectStatus;
  /** Honest scope note shown next to the status. */
  statusNote: string;
  links: ProjectLink[];
  shots?: ProjectShot[];
  /** Visual treatment for the card header. */
  accent: "electric" | "cyan" | "violet";
  featured: boolean;
  details: ProjectDetailBlock[];
}

export interface StackGroup {
  id: string;
  label: string;
  /** Why this group exists in the portfolio, in one line. */
  note: string;
  items: string[];
}

export interface EngineeringPrinciple {
  id: string;
  title: string;
  description: string;
  /** Concrete, verifiable evidence from the audited repositories. */
  evidence: string;
  /** Project names the evidence comes from. */
  projects: string[];
}
