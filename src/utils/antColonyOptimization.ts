
import { City, Ant, Route, SimulationState, ACOParameters } from "../types";

// Default ACO parameters
export const defaultACOParams: ACOParameters = {
  alpha: 1.0,    // importance of pheromone
  beta: 2.0,     // importance of distance
  rho: 0.5,      // evaporation rate
  q: 100,        // pheromone deposit factor
  antCount: 10,  // number of ants
  iterations: 100
};

// Calculate Euclidean distance between two cities
export const calculateDistance = (city1: City, city2: City): number => {
  return Math.sqrt(Math.pow(city2.x - city1.x, 2) + Math.pow(city2.y - city1.y, 2));
};

// Calculate the total distance of a route
export const calculateRouteDistance = (route: number[], cities: City[]): number => {
  let distance = 0;
  
  for (let i = 0; i < route.length - 1; i++) {
    const city1 = cities.find(c => c.id === route[i])!;
    const city2 = cities.find(c => c.id === route[i + 1])!;
    distance += calculateDistance(city1, city2);
  }
  
  // Return to depot (first city)
  if (route.length > 0) {
    const firstCity = cities.find(c => c.id === route[0])!;
    const lastCity = cities.find(c => c.id === route[route.length - 1])!;
    distance += calculateDistance(lastCity, firstCity);
  }
  
  return distance;
};

// Initialize a simulation state
export const initializeSimulation = (
  cityCount: number,
  gridSize: number,
  params: ACOParameters = defaultACOParams
): SimulationState => {
  // Generate random cities
  const cities: City[] = Array.from({ length: cityCount }, (_, i) => {
    // First city is always the depot at the center
    if (i === 0) {
      return {
        id: i,
        x: gridSize / 2,
        y: gridSize / 2,
        wasteLevel: 0, // depot has no waste
      };
    }
    
    return {
      id: i,
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
      wasteLevel: Math.floor(Math.random() * 100),
    };
  });

  // Initialize pheromone matrix with small values
  const pheromoneMatrix: number[][] = Array(cityCount)
    .fill(0)
    .map(() => Array(cityCount).fill(0.1));

  // Initialize ants at the depot (city 0)
  const ants: Ant[] = Array.from({ length: params.antCount }, (_, i) => ({
    id: i,
    currentCityId: 0, // Start at depot
    visitedCities: [0], // Already visited depot
    currentRoute: { path: [0], distance: 0, pheromoneLevel: 0 },
  }));

  return {
    cities,
    ants,
    pheromoneMatrix,
    bestRoute: null,
    currentIteration: 0,
    totalIterations: params.iterations,
    distanceHistory: [],
    isRunning: false,
  };
};

// Run a single iteration of the ACO algorithm
export const runIteration = (
  state: SimulationState,
  params: ACOParameters = defaultACOParams
): SimulationState => {
  const { cities, ants, pheromoneMatrix } = state;
  
  // Create a copy of the state
  const newState = { ...state };
  
  // For each ant, construct a complete tour
  for (let antIndex = 0; antIndex < ants.length; antIndex++) {
    const ant = { ...ants[antIndex] };
    
    // Reset ant if it has completed a tour
    if (ant.visitedCities.length === cities.length) {
      // Return to depot to complete the tour
      const newPath = [...ant.visitedCities, 0]; // Return to depot (0)
      const routeDistance = calculateRouteDistance(newPath, cities);
      
      // Update best route if this is better
      if (!newState.bestRoute || routeDistance < newState.bestRoute.distance) {
        newState.bestRoute = {
          path: newPath,
          distance: routeDistance,
          pheromoneLevel: params.q / routeDistance,
        };
      }
      
      // Reset ant for next iteration
      newState.ants[antIndex] = {
        ...ant,
        currentCityId: 0, // Reset to depot
        visitedCities: [0],
        currentRoute: { path: [0], distance: 0, pheromoneLevel: 0 },
      };
      continue;
    }
    
    // Choose next city for this ant
    const currentCityId = ant.currentCityId;
    const unvisitedCities = cities
      .filter(city => !ant.visitedCities.includes(city.id))
      .map(city => city.id);

    if (unvisitedCities.length === 0) {
      continue;
    }
    
    // Calculate probabilities for next city selection
    let probabilities: { cityId: number; probability: number }[] = [];
    let probabilitiesSum = 0;
    
    for (const cityId of unvisitedCities) {
      const pheromone = pheromoneMatrix[currentCityId][cityId];
      const distance = calculateDistance(
        cities.find(c => c.id === currentCityId)!,
        cities.find(c => c.id === cityId)!
      );
      
      // Avoid division by zero
      const heuristic = 1 / (distance + 0.0001);
      
      // Calculate probability based on ACO formula
      const probability = Math.pow(pheromone, params.alpha) * Math.pow(heuristic, params.beta);
      probabilities.push({ cityId, probability });
      probabilitiesSum += probability;
    }
    
    // Normalize probabilities
    probabilities = probabilities.map(item => ({
      ...item,
      probability: item.probability / probabilitiesSum,
    }));
    
    // Select next city using roulette wheel selection
    let selectedCityId: number;
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const { cityId, probability } of probabilities) {
      cumulativeProbability += probability;
      if (random <= cumulativeProbability) {
        selectedCityId = cityId;
        break;
      }
    }
    
    // Default to first city if selection fails (should rarely happen)
    if (selectedCityId === undefined && probabilities.length > 0) {
      selectedCityId = probabilities[0].cityId;
    }
    
    // Move ant to next city
    if (selectedCityId !== undefined) {
      const newVisitedCities = [...ant.visitedCities, selectedCityId];
      const newPath = [...newVisitedCities];
      const newDistance = calculateRouteDistance(newPath, cities);
      
      newState.ants[antIndex] = {
        ...ant,
        currentCityId: selectedCityId,
        visitedCities: newVisitedCities,
        currentRoute: {
          path: newPath,
          distance: newDistance,
          pheromoneLevel: 0,
        },
      };
    }
  }
  
  // Update pheromone trails
  const newPheromoneMatrix = [...pheromoneMatrix.map(row => [...row])];
  
  // Evaporate pheromones
  for (let i = 0; i < newPheromoneMatrix.length; i++) {
    for (let j = 0; j < newPheromoneMatrix[i].length; j++) {
      newPheromoneMatrix[i][j] *= (1 - params.rho);
    }
  }
  
  // Add new pheromones based on ant routes
  for (const ant of newState.ants) {
    const { visitedCities } = ant;
    const routeDistance = calculateRouteDistance(visitedCities, cities);
    
    if (routeDistance > 0) {
      const pheromoneDeposit = params.q / routeDistance;
      
      // Add pheromones to each edge in the route
      for (let i = 0; i < visitedCities.length - 1; i++) {
        const fromCity = visitedCities[i];
        const toCity = visitedCities[i + 1];
        
        newPheromoneMatrix[fromCity][toCity] += pheromoneDeposit;
        newPheromoneMatrix[toCity][fromCity] += pheromoneDeposit; // Symmetric matrix
      }
    }
  }
  
  // Update state with new pheromone matrix
  newState.pheromoneMatrix = newPheromoneMatrix;
  
  // Update iteration counter
  newState.currentIteration += 1;
  
  // Add current best distance to history
  if (newState.bestRoute) {
    newState.distanceHistory.push(newState.bestRoute.distance);
  }
  
  return newState;
};

// Generate a set of random cities
export const generateRandomCities = (count: number, gridSize: number): City[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * gridSize,
    y: Math.random() * gridSize,
    wasteLevel: i === 0 ? 0 : Math.floor(Math.random() * 100), // First city is depot with no waste
  }));
};

// Reset simulation
export const resetSimulation = (
  state: SimulationState, 
  params: ACOParameters = defaultACOParams
): SimulationState => {
  return initializeSimulation(
    state.cities.length,
    Math.max(...state.cities.map(city => Math.max(city.x, city.y))),
    params
  );
};
