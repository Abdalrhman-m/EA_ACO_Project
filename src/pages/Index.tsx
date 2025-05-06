
import React, { useState, useEffect, useCallback } from "react";
import CityGrid from "@/components/CityGrid";
import ControlPanel from "@/components/ControlPanel";
import ACOPresentation from "@/components/ACOPresentation";
import { ACOParameters, SimulationState } from "@/types";
import { 
  initializeSimulation, 
  runIteration, 
  resetSimulation, 
  defaultACOParams 
} from "@/utils/antColonyOptimization";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Simulation parameters
  const [acoParams, setAcoParams] = useState<ACOParameters>({
    ...defaultACOParams,
    iterations: 100,
    antCount: 10
  });
  const [simulationSpeed, setSimulationSpeed] = useState(5); // iterations per second
  const [cityCount, setCityCount] = useState(10);

  // Simulation state
  const [simulation, setSimulation] = useState<SimulationState>(() => 
    initializeSimulation(cityCount, 100, acoParams)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  
  // Active tab
  const [activeTab, setActiveTab] = useState<string>("visualizer");

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

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presentation">Interactive Presentation</TabsTrigger>
            <TabsTrigger value="visualizer">ACO Visualizer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="presentation" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm border" style={{ height: '70vh' }}>
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
          </TabsContent>
          
          <TabsContent value="visualizer" className="mt-4">
            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-4`}>
              {/* City Grid Visualization */}
              <div className={`${isMobile ? "" : "col-span-2"} bg-white rounded-lg shadow-sm border`}>
                <CityGrid 
                  simulation={simulation} 
                  width={isMobile ? 350 : 700} 
                  height={500}
                />
              </div>

              {/* Control Panel */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <ControlPanel
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

            <div className="bg-white p-4 rounded-lg shadow-sm border text-sm text-slate-600 mt-4">
              <h3 className="font-medium mb-2">How it works:</h3>
              <p className="mb-2">
                This visualization demonstrates the Ant Colony Optimization algorithm for waste collection in smart cities:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Blue dots are waste bins with varying waste levels</li>
                <li>Purple trucks are ants (collection vehicles) finding routes</li>
                <li>Blue lines show pheromone trails - brighter means stronger</li>
                <li>Green dashed line shows the current best route</li>
                <li>Adjust parameters to see how they affect route optimization</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
