
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
      <CardContent className="pt-4"> {/* Reduced padding from pt-6 to pt-4 */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={isRunning ? onPause : onPlay}
              className="h-8 w-8" /* Reduced from h-9 w-9 to h-8 w-8 */
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />} {/* Reduced icon size from 18 to 16 */}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onStep}
              disabled={isRunning}
              className="h-8 w-8" /* Reduced from h-9 w-9 to h-8 w-8 */
            >
              <StepForward size={16} /> {/* Reduced icon size from 18 to 16 */}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onReset}
              className="h-8 w-8" /* Reduced from h-9 w-9 to h-8 w-8 */
            >
              <RotateCcw size={16} /> {/* Reduced icon size from 18 to 16 */}
            </Button>
          </div>
          <div className="flex items-center gap-3 flex-1 ml-3 max-w-[230px]"> {/* Reduced gap and margin, and max width */}
            <span className="text-sm whitespace-nowrap">Speed</span>
            <Slider
              value={[simulationSpeed]}
              min={0.5}
              max={10}
              step={0.5}
              onValueChange={onSpeedChange}
              className="flex-1"
            />
            <span className="text-xs font-mono w-7 text-right">{simulationSpeed}x</span> {/* Reduced width from w-8 to w-7 */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationControls;
