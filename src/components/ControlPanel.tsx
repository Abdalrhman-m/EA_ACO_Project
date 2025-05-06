
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SimulationState, ACOParameters } from "../types";
import RouteChart from "./RouteChart";
import SimulationControls from "./SimulationControls";
import { Slider } from "@/components/ui/slider";
import { 
  Badge, 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/";

interface ControlPanelProps {
  simulation: SimulationState;
  acoParams: ACOParameters;
  updateAcoParams: (params: Partial<ACOParameters>) => void;
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

const ControlPanel: React.FC<ControlPanelProps> = ({
  simulation,
  acoParams,
  updateAcoParams,
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
  const { bestRoute, currentIteration, totalIterations, distanceHistory } = simulation;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Simulation Controls */}
      <SimulationControls
        isRunning={isRunning}
        onPlay={onPlay}
        onPause={onPause}
        onStep={onStep}
        onReset={onReset}
        simulationSpeed={simulationSpeed}
        onSpeedChange={onSpeedChange}
      />

      {/* Statistics Card */}
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Simulation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Current Iteration:</span>
              <Badge variant="secondary">{currentIteration} / {totalIterations}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Best Distance:</span>
              <Badge variant="outline" className="bg-teal-50 text-teal-700">
                {bestRoute ? Math.round(bestRoute.distance * 100) / 100 : 'N/A'}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Number of Ants:</span>
              <Badge variant="outline">{acoParams.antCount}</Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium">City Count</label>
                  <span className="text-sm text-muted-foreground">{cityCount}</span>
                </div>
                <Slider
                  value={[cityCount]}
                  min={5}
                  max={20}
                  step={1}
                  onValueChange={(values) => onCityCountChange(values[0])}
                  disabled={isRunning}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium">Alpha (α)</label>
                  <span className="text-sm text-muted-foreground">{acoParams.alpha.toFixed(1)}</span>
                </div>
                <Slider
                  value={[acoParams.alpha]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={(values) => updateAcoParams({ alpha: values[0] })}
                  disabled={isRunning}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium">Beta (β)</label>
                  <span className="text-sm text-muted-foreground">{acoParams.beta.toFixed(1)}</span>
                </div>
                <Slider
                  value={[acoParams.beta]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={(values) => updateAcoParams({ beta: values[0] })}
                  disabled={isRunning}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium">Evaporation Rate (ρ)</label>
                  <span className="text-sm text-muted-foreground">{acoParams.rho.toFixed(2)}</span>
                </div>
                <Slider
                  value={[acoParams.rho]}
                  min={0.01}
                  max={0.99}
                  step={0.01}
                  onValueChange={(values) => updateAcoParams({ rho: values[0] })}
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Evolution Chart */}
      <div className="flex-1">
        <RouteChart
          distanceHistory={distanceHistory}
          currentIteration={currentIteration}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
