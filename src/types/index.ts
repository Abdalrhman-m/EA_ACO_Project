
export interface City {
  id: number;
  x: number;
  y: number;
  wasteLevel: number;
}

export interface Route {
  path: number[];
  distance: number;
  pheromoneLevel: number;
}

export interface SimulationState {
  cities: City[];
  ants: Ant[];
  pheromoneMatrix: number[][];
  bestRoute: Route | null;
  currentIteration: number;
  totalIterations: number;
  distanceHistory: number[];
  isRunning: boolean;
}

export interface Ant {
  id: number;
  currentCityId: number;
  visitedCities: number[];
  currentRoute: Route;
}

export interface ACOParameters {
  alpha: number; // pheromone importance
  beta: number;  // distance importance
  rho: number;   // pheromone evaporation rate
  q: number;     // pheromone deposit factor
  antCount: number;
  iterations: number;
}
