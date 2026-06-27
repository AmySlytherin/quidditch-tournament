const STORAGE_KEY = 'hq_predictions';

export type PredictionMap = Record<string, string>; // matchId → teamId

export function loadPredictions(): PredictionMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function savePrediction(matchId: string, teamId: string): PredictionMap {
  const map = loadPredictions();
  map[matchId] = teamId;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  window.dispatchEvent(new CustomEvent('prediction-saved'));
  return map;
}
