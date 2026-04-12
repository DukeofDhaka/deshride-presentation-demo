import { corridors, getCity, getCorridor } from "../data/deshrideData";
import type { CorridorId } from "../types";

interface RouteMapProps {
  corridorId: CorridorId;
  compact?: boolean;
}

export function RouteMap({ corridorId, compact = false }: RouteMapProps) {
  const corridor = getCorridor(corridorId);
  const start = getCity(corridor.from);
  const end = getCity(corridor.to);

  return (
    <div className={`route-map ${compact ? "route-map--compact" : ""}`}>
      <svg viewBox="0 0 480 420" role="img" aria-label={`${start.name} to ${end.name} route map`}>
        <defs>
          <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#de6547" />
            <stop offset="100%" stopColor="#cea24f" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="480" height="420" rx="32" fill="rgba(255,255,255,0.72)" />
        <path
          d="M108 74 C180 22 280 32 342 94 C382 134 398 188 388 242 C377 296 342 348 286 372 C224 398 154 388 112 340 C76 302 60 246 74 196 C84 154 88 106 108 74 Z"
          fill="#edf3ef"
        />
        <path
          d="M100 104 C158 60 244 52 314 88 C362 114 392 170 388 228 C384 286 352 338 290 364"
          fill="none"
          stroke="rgba(20,63,57,0.08)"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {corridors.map((item) => (
          <path
            key={item.id}
            d={item.linePath}
            fill="none"
            stroke={item.id === corridorId ? "url(#routeGlow)" : "rgba(20,63,57,0.16)"}
            strokeWidth={item.id === corridorId ? 10 : 5}
            strokeLinecap="round"
            filter={item.id === corridorId ? "url(#softGlow)" : undefined}
            className={item.id === corridorId ? "route-map__active-line" : ""}
          />
        ))}

        {[start, end].map((city) => (
          <g key={city.id}>
            <circle cx={city.x} cy={city.y} r="22" fill="#143f39" opacity="0.12" />
            <circle cx={city.x} cy={city.y} r="10" fill="#143f39" />
            <circle cx={city.x} cy={city.y} r="4" fill="#ffffff" />
          </g>
        ))}

        {[start, end].map((city) => (
          <g key={`${city.id}-label`}>
            <rect
              x={city.x + 16}
              y={city.y - 18}
              width={city.name === "Cox's Bazar" ? 118 : 92}
              height="40"
              rx="16"
              fill="rgba(255,255,255,0.92)"
            />
            <text x={city.x + 30} y={city.y - 1} fill="#143f39" fontSize="14" fontWeight="700">
              {city.name}
            </text>
            <text x={city.x + 30} y={city.y + 14} fill="#6a706e" fontSize="12">
              {city.bangla}
            </text>
          </g>
        ))}
      </svg>

      <div className="route-map__legend">
        <span className="map-kicker">Bangladesh corridor view</span>
        <h3>
          {start.name} to {end.name}
        </h3>
        <p>{corridor.story}</p>
      </div>
    </div>
  );
}
