const namePrefixes = [
  'Shadow', 'Silver', 'Crimson', 'Storm', 'Bright',
  'Night', 'Fire', 'Wind', 'Iron', 'Gold',
];

const nameSuffixes = [
  'runner', 'mane', 'hoof', 'bolt', 'flame',
  'dash', 'flash', 'strider', 'blaze', 'wing',
];

export function generateHorseName(): string {
  const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
  const suffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
  return prefix + suffix.charAt(0).toUpperCase() + suffix.slice(1);
}