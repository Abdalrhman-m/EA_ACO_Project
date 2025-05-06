
import React from "react";
import { Truck } from "lucide-react";

export const IntroSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-center mb-6">
        Smart Waste Collection with Ant Colony Optimization
      </h1>
      
      <p className="text-xl mb-8 text-center">
        How can ants inspire smart garbage truck routing in a city?
      </p>
      
      <div className="relative w-96 h-96 mb-8">
        {/* City map background */}
        <div className="absolute inset-0 bg-slate-100 rounded-lg grid grid-cols-4 grid-rows-4 gap-3 p-4">
          {Array(16).fill(0).map((_, i) => (
            <div key={i} className="bg-slate-200 rounded-md" />
          ))}
          
          {/* Roads */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-3 bg-slate-300"></div>
            <div className="h-full w-3 bg-slate-300"></div>
          </div>
        </div>
        
        {/* Animated ants carrying trash */}
        <div className="absolute w-16 h-16 animate-bounce left-20 top-20">
          <div className="relative">
            <Truck className="text-purple-700" size={64} />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-md">🗑️</div>
          </div>
        </div>
        
        <div className="absolute w-16 h-16 animate-bounce left-56 top-44 animation-delay-150">
          <div className="relative">
            <Truck className="text-purple-700" size={64} />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-md">🗑️</div>
          </div>
        </div>
        
        <div className="absolute w-16 h-16 animate-bounce left-36 top-64 animation-delay-300">
          <div className="relative">
            <Truck className="text-purple-700" size={64} />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-md">🗑️</div>
          </div>
        </div>
      </div>
      
      <div className="text-slate-600 text-center max-w-2xl">
        <p className="mb-4">
          An intelligent approach to optimize waste collection routes, 
          inspired by the foraging behavior of ants in nature.
        </p>
        <p className="text-sm">
          In this visualization, you'll see how the algorithm slowly discovers 
          and reinforces the most efficient path through the city's waste bins, 
          just like how ants find food in nature through collective intelligence.
        </p>
      </div>
    </div>
  );
};
