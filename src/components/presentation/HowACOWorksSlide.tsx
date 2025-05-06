
import React from "react";
import { Trash2, Truck, Building } from "lucide-react";

export const HowACOWorksSlide: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">How ACO Works in Waste Collection</h2>
      
      <div className="flex flex-1 gap-8">
        <div className="w-1/2">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                <Trash2 className="text-slate-600" />
              </div>
              <div>
                <span className="font-semibold">Cities = waste bins</span>
                <p className="text-sm text-slate-600">Each bin is a node to visit</p>
              </div>
            </li>
            
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Truck className="text-slate-600" />
              </div>
              <div>
                <span className="font-semibold">Trucks = ants</span>
                <p className="text-sm text-slate-600">Trucks follow pheromone trails</p>
              </div>
            </li>
            
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22V16M12 8V2M4 12H2M6.3 6.3L4.9 4.9M6.3 17.7L4.9 19.1M22 12H20M19.1 6.3L17.7 4.9M19.1 17.7L17.7 19.1M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-semibold">Distance = time or fuel</span>
                <p className="text-sm text-slate-600">Optimization target</p>
              </div>
            </li>
            
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 16L14 10L10 14L4 8M22 12V4H14" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-semibold">Pheromones guide routes</span>
                <p className="text-sm text-slate-600">Higher probability of choosing stronger trails</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="w-1/2">
          <div className="border rounded-lg p-4 h-full">
            <h3 className="text-lg font-medium mb-4">Example Grid</h3>
            
            <div className="relative h-[220px]">
              {/* Grid background */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
                {Array(16).fill(0).map((_, i) => (
                  <div key={i} className="border border-dashed border-slate-400"></div>
                ))}
              </div>
              
              {/* Depot */}
              <div className="absolute left-[45%] top-[45%]">
                <div className="w-10 h-10 rounded-lg bg-teal-100 border border-teal-300 flex items-center justify-center">
                  <Building className="text-teal-700" size={20} />
                </div>
                <div className="absolute -bottom-6 left-0 w-full text-center text-xs">Depot</div>
              </div>
              
              {/* Waste bins */}
              <div className="absolute left-[20%] top-[20%]">
                <div className="w-8 h-8 rounded-full bg-red-100 border border-red-300 flex items-center justify-center">
                  <Trash2 className="text-red-600" size={16} />
                </div>
              </div>
              
              <div className="absolute left-[70%] top-[15%]">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                  <Trash2 className="text-amber-600" size={16} />
                </div>
              </div>
              
              <div className="absolute left-[80%] top-[60%]">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                  <Trash2 className="text-amber-600" size={16} />
                </div>
              </div>
              
              <div className="absolute left-[15%] top-[75%]">
                <div className="w-8 h-8 rounded-full bg-red-100 border border-red-300 flex items-center justify-center">
                  <Trash2 className="text-red-600" size={16} />
                </div>
              </div>
              
              {/* Optimal path */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 100,100 L 45,45 L 140,30 L 160,120 L 30,150 Z"
                  stroke="#0d9488"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
