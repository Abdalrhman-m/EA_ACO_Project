
import React from "react";
import CityGrid from "@/components/CityGrid";
import { SimulationState, ACOParameters } from "../../types";
import SimulationControls from "@/components/SimulationControls";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface LiveVisualizationSlideProps {
  simulation: SimulationState;
  acoParams: ACOParameters;
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  simulationSpeed: number;
  onSpeedChange: (value: number[]) => void;
  cityCount: number;
  onCityCountChange: (value: number) => void;
}

export const LiveVisualizationSlide: React.FC<LiveVisualizationSlideProps> = ({
  simulation,
  acoParams,
  isRunning,
  onPlay,
  onPause,
  onStep,
  onReset,
  simulationSpeed,
  onSpeedChange,
  cityCount,
  onCityCountChange,
}) => {
  const { bestRoute, currentIteration, totalIterations } = simulation;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">ACO in Action</h2>
      
      <div className="flex-1 flex flex-col gap-4">
        <SimulationControls
          isRunning={isRunning}
          onPlay={onPlay}
          onPause={onPause}
          onStep={onStep}
          onReset={onReset}
          simulationSpeed={simulationSpeed}
          onSpeedChange={onSpeedChange}
        />
        
        <div className="flex-1 grid grid-cols-4 gap-4">
          {/* Left side - Grid visualization */}
          <div className="col-span-3 bg-white rounded-lg border p-2 relative">
            <div className="text-sm font-medium text-center mb-1 text-slate-500">
              Watch how ants (trucks) explore the city and strengthen the optimal route over time
            </div>
            <CityGrid 
              simulation={simulation}
              width={580}
              height={420}
            />
            
            {/* Animated overlay tip */}
            <div className="absolute top-2 right-2 bg-blue-50 border border-blue-100 rounded-lg p-2 text-xs text-blue-700 max-w-[200px] shadow-sm animate-pulse">
              The brightness of lines shows pheromone strength
            </div>
          </div>
          
          {/* Right side - Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border p-3 shadow-sm">
              <h3 className="text-md font-medium mb-3">Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Iteration:</span>
                  <Badge variant="secondary" className="animate-pulse">
                    {currentIteration}/{totalIterations}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Best Distance:</span>
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 font-mono">
                    {bestRoute ? Math.round(bestRoute.distance * 100) / 100 : 'N/A'}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ants:</span>
                  <Badge variant="outline">{acoParams.antCount}</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-medium">Legend</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                  <span className="text-xs">Depot (Starting Point)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">High Waste Bins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">Medium Waste Bins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  <span className="text-xs">Low Waste Bins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                  <span className="text-xs">Ants (Trucks)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 bg-blue-400 rounded"></div>
                  <span className="text-xs">Pheromone Trails</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 border-2 border-dashed border-teal-500 rounded"></div>
                  <span className="text-xs">Best Route Found</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block bg-teal-50 border border-teal-100 p-2 rounded-lg shadow-sm">
              <h4 className="font-medium text-sm text-teal-800 mb-1">Did you know?</h4>
              <p className="text-xs text-teal-700">
                Ant Colony Optimization was inspired by how real ants find the shortest path between their nest and food sources using pheromone trails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
