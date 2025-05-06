
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
      
      <div className="relative w-80 h-80 mb-8">
        {/* City map background */}
        <div className="absolute inset-0 bg-slate-100 rounded-lg grid grid-cols-4 grid-rows-4 gap-2 p-3">
          {Array(16).fill(0).map((_, i) => (
            <div key={i} className="bg-slate-200 rounded" />
          ))}
          
          {/* Roads */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-2 bg-slate-300"></div>
            <div className="h-full w-2 bg-slate-300"></div>
          </div>
        </div>
        
        {/* Animated ants carrying trash */}
        <div className="absolute w-12 h-12 animate-bounce left-16 top-16">
          <div className="relative">
            <Truck className="text-purple-700" size={48} />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs">🗑️</div>
          </div>
        </div>
        
        <div className="absolute w-12 h-12 animate-bounce left-48 top-36 animation-delay-150">
          <div className="relative">
            <Truck className="text-purple-700" size={48} />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs">🗑️</div>
          </div>
        </div>
        
        <div className="absolute w-12 h-12 animate-bounce left-28 top-52 animation-delay-300">
          <div className="relative">
            <Truck className="text-purple-700" size={48} />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs">🗑️</div>
          </div>
        </div>
      </div>
      
      <p className="text-slate-600 text-center">
        An intelligent approach to optimize waste collection routes, 
        inspired by the foraging behavior of ants in nature.
      </p>
    </div>
  );
};
