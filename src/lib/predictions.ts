// Match-winner guesses on the Schedule page are deliberately EPHEMERAL: they
// live only in memory for the current visit, so they clear on refresh, on
// opening a new window/tab, and when you leave the Schedule page. (Previously
// they were kept in sessionStorage, which survived refreshes — not wanted.)

export type PredictionMap = Record<string, string>; // matchId → teamId

// Shared in-memory store for this page load. A plain module variable means
// every prediction card + the summary tally see the same data and stay in
// sync, but nothing is persisted — a full reload starts the module over empty.
let predictions: PredictionMap = {};

export function loadPredictions(): PredictionMap {
  return predictions;
}

export function savePrediction(matchId: string, teamId: string): PredictionMap {
  predictions[matchId] = teamId;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('prediction-saved'));
  }
  return predictions;
}

/** Forget every guess — used when leaving the Schedule page so it starts fresh. */
export function clearPredictions(): void {
  predictions = {};
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('prediction-saved'));
  }
}
