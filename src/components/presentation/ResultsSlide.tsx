
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulationState } from "../../types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

interface ResultsSlideProps {
  simulation: SimulationState;
}

export const ResultsSlide: React.FC<ResultsSlideProps> = ({ simulation }) => {
  const { bestRoute, distanceHistory, currentIteration, totalIterations, cities } = simulation;
  
  // Calculate improvement percentage
  const initialDistance = distanceHistory.length > 0 ? distanceHistory[0] : 0;
  const finalDistance = bestRoute?.distance || 0;
  const improvementPct = initialDistance > 0 
    ? Math.round(((initialDistance - finalDistance) / initialDistance) * 100) 
    : 0;
  
  // Prepare route order data
  const routeOrder = bestRoute?.path.map(cityId => {
    const city = cities.find(c => c.id === cityId);
    return {
      id: cityId,
      wasteLevel: city?.wasteLevel || 0,
      isDepot: cityId === 0
    };
  }) || [];

  // Prepare chart data
  const chartData = distanceHistory.map((distance, index) => ({
    iteration: index + 1,
    distance: Math.round(distance * 100) / 100,
  }));

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="text-2xl font-bold">Results & Insights</h2>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Final Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Final Best Distance:</span>
                <Badge variant="outline" className="bg-teal-50 text-teal-700">
                  {bestRoute ? Math.round(bestRoute.distance * 100) / 100 : 'N/A'}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Improvement:</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {improvementPct}%
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Iterations Completed:</span>
                <span className="text-sm">{currentIteration} of {totalIterations}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cities Visited:</span>
                <span className="text-sm">{cities.length}</span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-1">Route Order:</h3>
                <div className="flex flex-wrap gap-1">
                  {routeOrder.map((city, idx) => (
                    <Badge 
                      key={idx} 
                      className={
                        city.isDepot 
                          ? "bg-teal-100 text-teal-800 border-teal-200" 
                          : city.wasteLevel > 75 
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                      }
                      variant="outline"
                    >
                      {city.isDepot ? "D" : city.id}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distance Evolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, bottom: 20, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="iteration" 
                    label={{ 
                      value: "Iteration", 
                      position: "insideBottom", 
                      offset: -5 
                    }} 
                  />
                  <YAxis 
                    label={{ 
                      value: "Distance", 
                      angle: -90, 
                      position: "insideLeft" 
                    }}
                    width={35}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="distance"
                    stroke="#0d9488"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-4">
          <h3 className="font-medium mb-2">Insights & Conclusions</h3>
          <div className="text-sm space-y-2">
            <p>
              The Ant Colony Optimization (ACO) algorithm successfully found an efficient route with 
              {improvementPct > 0 ? ` a ${improvementPct}% improvement ` : ' an improvement '}
              over the initial random path.
            </p>
            <p>
              This bio-inspired approach demonstrates how simple rules followed by many agents can lead to 
              emergent intelligent behavior - finding near-optimal solutions to complex routing problems without 
              exhaustive search.
            </p>
            <p className="font-medium">
              In real-world applications, this translates to reduced fuel consumption, lower emissions, and more 
              efficient waste collection services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
