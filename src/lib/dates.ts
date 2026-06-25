export function lastMonday(): string {
  const d = new Date();
  const day = d.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const diff = day === 0 ? 6 : day - 1; // days since last Monday
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
