
import React, { useRef, useEffect } from "react";
import { City, Route, SimulationState } from "../types";
import { Trash2, Truck, Building } from "lucide-react";

interface CityGridProps {
  simulation: SimulationState;
  width: number;
  height: number;
}

const CityGrid: React.FC<CityGridProps> = ({ simulation, width, height }) => {
  const { cities, pheromoneMatrix, bestRoute, ants } = simulation;
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate scale factors to fit all cities within the viewport
  const getScaleFactor = () => {
    const maxX = Math.max(...cities.map(city => city.x));
    const maxY = Math.max(...cities.map(city => city.y));
    // Reduced scaling factor to make elements smaller (from 0.75 to 0.65)
    const scaleX = (width - 100) / maxX;
    const scaleY = (height - 100) / maxY;
    return Math.min(scaleX, scaleY) * 0.65; 
  };

  // Scale coordinates to fit SVG viewport
  const scaleCoords = (city: City) => {
    const scale = getScaleFactor();
    return {
      x: city.x * scale + 50,
      y: city.y * scale + 50,
    };
  };

  // Calculate pheromone intensity for visualization
  const getPheromoneIntensity = (cityId1: number, cityId2: number) => {
    if (!pheromoneMatrix || !pheromoneMatrix[cityId1] || !pheromoneMatrix[cityId1][cityId2]) {
      return 0;
    }

    // Find maximum pheromone value for normalization
    let maxPheromone = 0;
    for (let i = 0; i < pheromoneMatrix.length; i++) {
      for (let j = 0; j < pheromoneMatrix[i].length; j++) {
        maxPheromone = Math.max(maxPheromone, pheromoneMatrix[i][j]);
      }
    }

    // Normalize pheromone value (0.2 to 1)
    const normalizedValue = maxPheromone > 0 
      ? 0.2 + 0.8 * (pheromoneMatrix[cityId1][cityId2] / maxPheromone) 
      : 0.2;
    
    return normalizedValue;
  };

  // Draw pheromone trails between all cities
  const renderPheromoneTrails = () => {
    const lines = [];

    if (pheromoneMatrix) {
      for (let i = 0; i < cities.length; i++) {
        for (let j = i + 1; j < cities.length; j++) {
          const intensity = getPheromoneIntensity(i, j);
          if (intensity > 0) {
            const city1 = scaleCoords(cities[i]);
            const city2 = scaleCoords(cities[j]);
            
            lines.push(
              <line
                key={`pheromone-${i}-${j}`}
                x1={city1.x}
                y1={city1.y}
                x2={city2.x}
                y2={city2.y}
                stroke="rgba(14, 165, 233, 0.7)"
                strokeWidth={intensity * 4} // Reduced from 5 to 4
                opacity={intensity}
                className="pheromone-line"
              />
            );
          }
        }
      }
    }

    return lines;
  };

  // Render the best route if available
  const renderBestRoute = () => {
    if (!bestRoute) return null;

    const pathCoordinates = bestRoute.path.map(cityId => {
      const city = cities.find(c => c.id === cityId);
      if (!city) return null;
      const coords = scaleCoords(city);
      return `${coords.x},${coords.y}`;
    }).filter(Boolean).join(' L ');

    // Close the loop back to start
    const firstCity = cities.find(c => c.id === bestRoute.path[0]);
    if (firstCity) {
      const firstCoords = scaleCoords(firstCity);
      pathCoordinates + ` L ${firstCoords.x},${firstCoords.y}`;
    }

    return (
      <polyline
        points={`M ${pathCoordinates}`}
        fill="none"
        stroke="#0d9488"
        strokeWidth="4" // Reduced from 5 to 4
        strokeDasharray="8,4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="best-route"
      />
    );
  };

  // Render the cities (waste bins)
  const renderCities = () => {
    return cities.map((city) => {
      const { x, y } = scaleCoords(city);
      
      // Determine city type icon (depot, high waste, low waste)
      let CityIcon = Trash2;
      let iconColor = "#64748b";
      let size = 28; // Reduced from 34 to 28
      
      if (city.id === 0) {
        CityIcon = Building;
        iconColor = "#0d9488";
        size = 34; // Reduced from 42 to 34
      } else if (city.wasteLevel > 75) {
        iconColor = "#ef4444"; // Red for high waste
        size = 30; // Reduced from 38 to 30
      } else if (city.wasteLevel > 25) {
        iconColor = "#f59e0b"; // Amber for medium waste
        size = 29; // Reduced from 36 to 29
      }

      return (
        <g key={`city-${city.id}`} transform={`translate(${x - size/2}, ${y - size/2})`} className="city-node">
          <title>
            {city.id === 0 
              ? `Depot (ID: ${city.id})` 
              : `Waste Bin ${city.id} - Waste Level: ${city.wasteLevel}%`}
          </title>
          <CityIcon size={size} color={iconColor} />
          <text
            x={size/2}
            y={size + 16} // Reduced from 18 to 16
            textAnchor="middle"
            fontSize="14" // Reduced from 16 to 14
            fontWeight="500"
            fill="#64748b"
          >
            {city.id}
          </text>
        </g>
      );
    });
  };

  // Render the ants
  const renderAnts = () => {
    return ants.map((ant) => {
      const city = cities.find(c => c.id === ant.currentCityId);
      if (!city) return null;
      
      const { x, y } = scaleCoords(city);
      const antSize = 26; // Reduced from 32 to 26
      
      return (
        <g key={`ant-${ant.id}`} className="ant pulse" transform={`translate(${x - antSize/2}, ${y - antSize/2})`}>
          <title>Ant {ant.id} at City {ant.currentCityId}</title>
          <circle cx={antSize/2} cy={antSize/2} r={antSize/2 + 3} fill="rgba(126, 34, 206, 0.2)" /> {/* Reduced highlight radius from 4 to 3 */}
          <Truck size={antSize} color="#7e22ce" />
        </g>
      );
    });
  };

  return (
    <div className="border rounded-lg shadow-md bg-white p-4 w-full h-full overflow-hidden">
      <svg 
        ref={svgRef}
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="rounded-md"
      >
        {/* Pheromone trails */}
        <g className="pheromone-trails">
          {renderPheromoneTrails()}
        </g>
        
        {/* Best route */}
        <g className="best-route">
          {renderBestRoute()}
        </g>
        
        {/* Cities (waste bins) */}
        <g className="cities">
          {renderCities()}
        </g>
        
        {/* Ants */}
        <g className="ants">
          {renderAnts()}
        </g>
      </svg>
    </div>
  );
};

export default CityGrid;
