
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IntroSlide } from "./presentation/IntroSlide";
import { WhatIsACOSlide } from "./presentation/WhatIsACOSlide";
import { HowACOWorksSlide } from "./presentation/HowACOWorksSlide";
import { AlgorithmParamsSlide } from "./presentation/AlgorithmParamsSlide";
import { LiveVisualizationSlide } from "./presentation/LiveVisualizationSlide";
import { ResultsSlide } from "./presentation/ResultsSlide";
import { SimulationState, ACOParameters } from "../types";

interface ACOPresentationProps {
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

const ACOPresentation: React.FC<ACOPresentationProps> = ({
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Introduction",
      component: <IntroSlide />
    },
    {
      title: "What is ACO?",
      component: <WhatIsACOSlide />
    },
    {
      title: "ACO in Waste Collection",
      component: <HowACOWorksSlide />
    },
    {
      title: "Algorithm Parameters",
      component: 
        <AlgorithmParamsSlide 
          acoParams={acoParams}
          updateAcoParams={updateAcoParams}
          isRunning={isRunning}
        />
    },
    {
      title: "Live Visualization",
      component: 
        <LiveVisualizationSlide 
          simulation={simulation}
          acoParams={acoParams}
          isRunning={isRunning}
          onPlay={onPlay}
          onPause={onPause}
          onStep={onStep}
          onReset={onReset}
          simulationSpeed={simulationSpeed}
          onSpeedChange={onSpeedChange}
          cityCount={cityCount}
          onCityCountChange={onCityCountChange}
        />
    },
    {
      title: "Results & Insights",
      component: <ResultsSlide simulation={simulation} />
    }
  ];

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full">
      <Carousel 
        className="w-full h-full" 
        setApi={(api) => {
          api?.on("select", () => {
            const selectedIndex = api.selectedScrollSnap();
            setCurrentSlide(selectedIndex);
          });
        }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="h-full p-1">
                <Card className="border rounded-xl shadow-md overflow-hidden h-full">
                  <div className="flex flex-col h-full">
                    <div className="bg-primary text-white p-4">
                      <h2 className="text-xl font-bold">{slide.title}</h2>
                      <div className="flex mt-2">
                        {slides.map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full mx-1 ${
                              i === currentSlide ? "bg-white" : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                      {slide.component}
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default ACOPresentation;
