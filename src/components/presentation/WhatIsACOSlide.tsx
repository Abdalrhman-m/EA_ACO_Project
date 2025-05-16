
import React from "react";

export const WhatIsACOSlide: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">What is Ant Colony Optimization?</h2>
      
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="relative w-full max-w-lg h-64">
          {/* Nest */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center shadow-md">
            <span className="text-2xl">🏠</span>
          </div>
          
          {/* Food sources */}
          <div className="absolute right-8 top-16 w-12 h-12 rounded-full bg-teal-100 border-2 border-teal-300 flex items-center justify-center shadow-md animate-pulse">
            <span className="text-xl">🍎</span>
          </div>
          
          <div className="absolute right-16 bottom-8 w-12 h-12 rounded-full bg-teal-100 border-2 border-teal-300 flex items-center justify-center shadow-md animate-pulse">
            <span className="text-xl">🍞</span>
          </div>
          
          {/* Pheromone paths */}
          <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
            {/* Path to top food */}
            <path
              d="M 40,120 C 100,80 180,100 280,40"
              stroke="#9333ea"
              strokeWidth="6"
              fill="none"
              strokeDasharray="6 3"
              strokeOpacity="0.6"
              className="animate-pulse"
            />
            
            {/* Path to bottom food */}
            <path
              d="M 40,120 C 100,160 180,180 260,170"
              stroke="#9333ea"
              strokeWidth="8"
              fill="none"
              strokeDasharray="6 3"
              strokeOpacity="0.8"
              className="animate-pulse"
            />
            
            {/* Path between food sources */}
            <path
              d="M 280,40 C 270,80 270,120 260,170"
              stroke="#9333ea"
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 3"
              strokeOpacity="0.4"
            />
          </svg>
          
          {/* Animated ants */}
          <div className="absolute left-1/4 top-1/4 w-4 h-4 bg-purple-800 rounded-full animate-ping" style={{animationDuration: "3s"}}></div>
          <div className="absolute left-1/2 top-1/3 w-3 h-3 bg-purple-800 rounded-full animate-ping" style={{animationDuration: "4s", animationDelay: "1s"}}></div>
          <div className="absolute left-2/3 bottom-1/3 w-3 h-3 bg-purple-800 rounded-full animate-ping" style={{animationDuration: "3.5s", animationDelay: "0.5s"}}></div>
          
          {/* Additional animated ants */}
          <div className="absolute right-1/3 top-1/2 w-3 h-3 bg-purple-800 rounded-full animate-ping" style={{animationDuration: "2.5s", animationDelay: "0.7s"}}></div>
          <div className="absolute right-1/2 bottom-1/4 w-3 h-3 bg-purple-800 rounded-full animate-ping" style={{animationDuration: "3.2s", animationDelay: "1.2s"}}></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-lg">
          <span className="font-semibold">Ants find shortest paths by laying pheromones.</span> 
          More pheromones = more ants follow.
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>Ants randomly explore paths looking for food</li>
          <li>They deposit pheromones along their trail</li>
          <li>Shorter paths accumulate more pheromones over time</li>
          <li>Pheromones evaporate - weak paths fade away</li>
          <li>Eventually, most ants converge on optimal route</li>
        </ul>
        
        <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg p-3 shadow-sm">
          <p className="text-sm text-blue-800">
            In our waste collection simulation, the ants are trucks finding the most efficient routes
            between waste bins in a smart city.
          </p>
        </div>
      </div>
    </div>
  );
};
