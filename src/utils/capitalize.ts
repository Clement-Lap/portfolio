// Source - https://stackoverflow.com/a/1026087
// Posted by Steve Harrison, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-13, License - CC BY-SA 4.0

export default function capitalize(str: string) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}
