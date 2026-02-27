// Swiply — "Obsidian Market" Design System
// Primary: Deep Indigo + Electric Blue accents
// Secondary: Amber/Gold highlights
// Style: Dark Premium, Outline icons

export const COLORS = {
  // === PRIMARY — Indigo/Electric Blue ===
  primary: '#6C8EFF',        // Electric indigo — main CTA, active states
  primaryLight: '#8FA8FF',   // Lighter for hover/tints
  primaryDark: '#4B6EE8',    // Pressed states

  // === ACCENT — Amber Gold ===
  accent: '#F5A623',         // Gold — likes, badges, highlights
  accentLight: '#F7C26B',    // Soft gold
  accentDark: '#D4891A',     // Deep amber

  // === BACKGROUND — Obsidian Scale ===
  background: '#0D0D14',     // Near-black base
  surface: '#13131F',        // Cards and panels
  surfaceElevated: '#1C1C2E',// Modals, headers
  surfaceBorder: '#252540',  // Subtle borders

  // === TEXT ===
  white: '#FFFFFF',
  black: '#0D0D14',
  text: '#E8E8F0',           // Primary text
  textSecondary: '#8888AA',  // Muted labels
  textTertiary: '#55556A',   // Placeholder, disabled

  // === SEMANTIC ===
  success: '#4ADE80',        // Green
  error: '#FF5E6D',          // Red
  warning: '#F5A623',        // Reuse amber

  // === LEGACY ALIASES (backwards compat) ===
  gray: '#8888AA',
  lightGray: '#252540',
  primaryDarkAlias: '#4B6EE8',
};

// Light theme — "Pearl" variant
export const LIGHT_COLORS = {
  primary: '#4B6EE8',
  primaryLight: '#6C8EFF',
  primaryDark: '#3451C7',
  accent: '#F5A623',
  accentLight: '#FDE8BF',
  accentDark: '#D4891A',
  background: '#F4F4FB',
  surface: '#FFFFFF',
  surfaceElevated: '#EEEEF8',
  surfaceBorder: '#DDDDF0',
  white: '#FFFFFF',
  black: '#0D0D14',
  text: '#1A1A2E',
  textSecondary: '#6666AA',
  textTertiary: '#AAAACC',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F5A623',
  gray: '#6666AA',
  lightGray: '#DDDDF0',
  primaryDarkAlias: '#3451C7',
};

export default COLORS;
