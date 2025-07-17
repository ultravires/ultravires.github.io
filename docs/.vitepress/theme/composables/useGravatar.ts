import { sha256 } from 'js-sha256';

// CRITICAL: Generate the SHA256 hash correctly for all Gravatar operations
export function getGravatarHash(email: string): string {
  // Trim and lowercase the email - BOTH steps are required
  email = email.trim().toLowerCase();

  // Create SHA256 hash using js-sha256
  const hash = sha256(email);

  return hash;
}

export function getAvatarUrl(email: string = '', size: number = 100): string {
  // This single hash is used for BOTH avatars AND profile data
  const hash = getGravatarHash(email);
  return `https://0.gravatar.com/avatar/${hash}?size=${size}`;
}
