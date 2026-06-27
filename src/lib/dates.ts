export function lastMonday(): string {
  const d = new Date();
  const day = d.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const diff = day === 0 ? 6 : day - 1; // days since last Monday
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// The date the site was last built and deployed. `new Date()` here is
// evaluated once when the page is built (the home page is statically
// generated), so the value is frozen into the published page. It only changes
// when the site is rebuilt and pushed live — which only happens when Amy
// deploys, so no one else can change it.
export function lastDeployed(): string {
  return new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
