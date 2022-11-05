export function getSafeButton(): number {
  const bottom = getComputedStyle(document.documentElement).getPropertyValue('--sab');
  if (bottom) {
    return Number(bottom.replace('px', ''));
  }
  return 0;
}

export function getRootFontSize(): number {
  const fontSize = getComputedStyle(document.documentElement).getPropertyValue('font-size');
  if (fontSize) {
    return Number(fontSize.replace('px', ''));
  }
  return 0;
}
