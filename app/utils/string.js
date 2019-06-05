export function firstUpperCase(string) {
  return string.replace(/^\w/, c => c.toUpperCase());
}