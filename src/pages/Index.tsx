
import React, { useState, useEffect, useCallback } from "react";
import ACOPresentation from "@/components/ACOPresentation";
import { ACOParameters, SimulationState } from "@/types";
import { 
  initializeSimulation, 
  runIteration, 
  resetSimulation, 
  defaultACOParams 
} from "@/utils/antColonyOptimization";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  // Simulation parameters
  const [acoParams, setAcoParams] = useState<ACOParameters>({
    ...defaultACOParams,
    iterations: 100,
    antCount: 10
  });
  const [simulationSpeed, setSimulationSpeed] = useState(2); // Slower default speed of 2 instead of 5
  const [cityCount, setCityCount] = useState(10);

  // Simulation state
  const [simulation, setSimulation] = useState<SimulationState>(() => 
    initializeSimulation(cityCount, 100, acoParams)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  
  // Initialize simulation when parameters change
  useEffect(() => {
    if (!isRunning) {
      setSimulation(initializeSimulation(cityCount, 100, acoParams));
    }
  }, [cityCount, acoParams.iterations, acoParams.antCount]);

  // Run simulation loop
  const runSimulation = useCallback((timestamp: number) => {
    if (!lastUpdateTime || (timestamp - lastUpdateTime) >= (1000 / simulationSpeed)) {
      setLastUpdateTime(timestamp);
      
      setSimulation(prevState => {
        // Stop if we've reached the total iterations
        if (prevState.currentIteration >= prevState.totalIterations) {
          setIsRunning(false);
          toast({
            title: "Simulation complete!",
            description: `Best distance found: ${
              prevState.bestRoute 
                ? Math.round(prevState.bestRoute.distance * 100) / 100 
                : 'N/A'
            }`,
            variant: "default",
          });
          return prevState;
        }
        
        return runIteration(prevState, acoParams);
      });
    }
    
    const id = requestAnimationFrame(runSimulation);
    setAnimationFrameId(id);
    return () => cancelAnimationFrame(id);
  }, [simulationSpeed, lastUpdateTime, acoParams, toast]);

  // Start/stop simulation
  useEffect(() => {
    if (isRunning) {
      const id = requestAnimationFrame(runSimulation);
      setAnimationFrameId(id);
      return () => cancelAnimationFrame(id);
    } else if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }, [isRunning, runSimulation]);

  // Handle play/pause
  const handlePlay = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  // Handle step
  const handleStep = () => {
    setSimulation(prevState => runIteration(prevState, acoParams));
  };

  // Handle reset
  const handleReset = () => {
    setIsRunning(false);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    setSimulation(resetSimulation(simulation, acoParams));
    setLastUpdateTime(0);
  };

  // Handle speed change
  const handleSpeedChange = (values: number[]) => {
    setSimulationSpeed(values[0]);
  };

  // Handle parameter changes
  const updateAcoParams = (params: Partial<ACOParameters>) => {
    setAcoParams(prev => ({ ...prev, ...params }));
  };

  // Handle city count change
  const handleCityCountChange = (value: number) => {
    setCityCount(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Smart City Waste Collection</h1>
          <p className="text-slate-600">
            Ant Colony Optimization visualized for optimal waste collection routes
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border" style={{ height: '75vh' }}>
          <ACOPresentation
            simulation={simulation}
            acoParams={acoParams}
            updateAcoParams={updateAcoParams}
            isRunning={isRunning}
            onPlay={handlePlay}
            onPause={handlePause}
            onStep={handleStep}
            onReset={handleReset}
            simulationSpeed={simulationSpeed}
            onSpeedChange={handleSpeedChange}
            cityCount={cityCount}
            onCityCountChange={handleCityCountChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
