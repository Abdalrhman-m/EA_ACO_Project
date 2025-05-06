
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
          <div className="col-span-3 bg-white rounded-lg border p-2">
            <div className="text-sm font-medium text-center mb-1 text-slate-500">
              Watch how ants (trucks) explore the city and strengthen the optimal route over time
            </div>
            <CityGrid 
              simulation={simulation}
              width={580} // Reduced from 600 to 580
              height={400} // Reduced from 420 to 400
            />
          </div>
          
          {/* Right side - Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border p-3">
              <h3 className="text-md font-medium mb-3">Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Iteration:</span>
                  <Badge variant="secondary">{currentIteration}/{totalIterations}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Best Distance:</span>
                  <Badge variant="outline" className="bg-teal-50 text-teal-700">
                    {bestRoute ? Math.round(bestRoute.distance * 100) / 100 : 'N/A'}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ants:</span>
                  <Badge variant="outline">{acoParams.antCount}</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-medium">Legend</h3>
              </div>
              <div className="space-y-2 text-sm"> {/* Reduced spacing from space-y-3 to space-y-2 */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-600"></div> {/* Reduced from w-4 h-4 to w-3 h-3 */}
                  <span>Depot (Starting Point)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> {/* Reduced from w-4 h-4 to w-3 h-3 */}
                  <span>High Waste Bins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div> {/* Reduced from w-4 h-4 to w-3 h-3 */}
                  <span>Medium Waste Bins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div> {/* Reduced from w-4 h-4 to w-3 h-3 */}
                  <span>Low Waste Bins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div> {/* Reduced from w-4 h-4 to w-3 h-3 */}
                  <span>Ants (Trucks)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 bg-blue-400 rounded"></div> {/* Reduced from w-12 to w-10 */}
                  <span>Pheromone Trails</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-2 border-2 border-dashed border-teal-500 rounded"></div> {/* Reduced from w-12 to w-10 */}
                  <span>Best Route Found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
