
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ACOParameters } from "../../types";

interface AlgorithmParamsSlideProps {
  acoParams: ACOParameters;
  updateAcoParams: (params: Partial<ACOParameters>) => void;
  isRunning: boolean;
}

export const AlgorithmParamsSlide: React.FC<AlgorithmParamsSlideProps> = ({
  acoParams,
  updateAcoParams,
  isRunning
}) => {
  
  const parameterInfo = [
    {
      name: "Alpha (α)",
      key: "alpha" as keyof ACOParameters,
      value: acoParams.alpha,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Importance of pheromone trails. Higher values make ants follow existing trails more closely."
    },
    {
      name: "Beta (β)",
      key: "beta" as keyof ACOParameters,
      value: acoParams.beta,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Importance of distances. Higher values make ants prefer shorter paths more strongly."
    },
    {
      name: "Evaporation Rate (ρ)",
      key: "rho" as keyof ACOParameters,
      value: acoParams.rho,
      min: 0.01,
      max: 0.99,
      step: 0.01,
      description: "How quickly pheromones evaporate. Higher values = faster evaporation = more exploration."
    },
    {
      name: "Number of Ants",
      key: "antCount" as keyof ACOParameters,
      value: acoParams.antCount,
      min: 1,
      max: 50,
      step: 1,
      description: "Number of artificial ants (trucks) exploring routes. More ants = more exploration but slower computation."
    },
    {
      name: "Iterations",
      key: "iterations" as keyof ACOParameters,
      value: acoParams.iterations,
      min: 10,
      max: 500,
      step: 10,
      description: "Number of algorithm cycles to run. More iterations = more optimization but longer runtime."
    }
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-2">Algorithm Parameters</h2>
      <p className="mb-4 text-slate-600">
        Adjust these parameters to see how they affect the optimization process.
      </p>
      
      <div className="grid gap-6">
        {parameterInfo.map((param) => (
          <Card key={param.key} className="overflow-visible">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-md font-medium">{param.name}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[250px] p-3">
                        <p>{param.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="w-12 text-right font-mono text-sm">
                  {Number.isInteger(param.value) ? param.value : param.value.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[param.value]}
                min={param.min}
                max={param.max}
                step={param.step}
                onValueChange={(values) => {
                  const updateParam: Partial<ACOParameters> = {};
                  updateParam[param.key] = values[0];
                  updateAcoParams(updateParam);
                }}
                disabled={isRunning}
                className="py-1"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>{param.min}</span>
                <span>{param.max}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800">Finding the Right Balance</h3>
        <p className="text-sm text-blue-700 mt-1">
          Try different parameter combinations to see their effects. Higher alpha favors exploitation 
          (following known good paths), while lower evaporation rates encourage exploration of new routes.
        </p>
      </div>
    </div>
  );
};
