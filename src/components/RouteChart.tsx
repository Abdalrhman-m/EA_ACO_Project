
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RouteChartProps {
  distanceHistory: number[];
  currentIteration: number;
}

const RouteChart: React.FC<RouteChartProps> = ({ 
  distanceHistory, 
  currentIteration 
}) => {
  // Prepare data for the chart
  const chartData = distanceHistory.map((distance, index) => ({
    iteration: index + 1,
    distance: Math.round(distance * 100) / 100,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="text-sm font-medium">Iteration {label}</p>
          <p className="text-sm text-teal-600">
            Distance: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Route Evolution</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
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
                domain={["auto", "auto"]} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="distance"
                stroke="#0d9488"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 5 }}
                animationDuration={300}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteChart;
