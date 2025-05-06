
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SimulationControlsProps {
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  simulationSpeed: number;
  onSpeedChange: (value: number[]) => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  isRunning,
  onPlay,
  onPause,
  onStep,
  onReset,
  simulationSpeed,
  onSpeedChange,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={isRunning ? onPause : onPlay}
              className="h-9 w-9"
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onStep}
              disabled={isRunning}
              className="h-9 w-9"
            >
              <StepForward size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onReset}
              className="h-9 w-9"
            >
              <RotateCcw size={18} />
            </Button>
          </div>
          <div className="flex items-center gap-4 flex-1 ml-4 max-w-[250px]">
            <span className="text-sm">Speed</span>
            <Slider
              value={[simulationSpeed]}
              min={1}
              max={20}
              step={1}
              onValueChange={onSpeedChange}
              className="flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationControls;
