import { Link, createSearchParams } from "react-router-dom";
import { formatMoney, getCorridor, getDriver } from "../data/deshrideData";
import type { Ride } from "../types";

interface RideCardProps {
  ride: Ride;
  queryDate: string;
  querySeats: number;
}

export function RideCard({ ride, queryDate, querySeats }: RideCardProps) {
  const corridor = getCorridor(ride.corridorId);
  const driver = getDriver(ride.driverId);
  const rideSearch = createSearchParams({
    date: queryDate,
    seats: String(querySeats)
  }).toString();

  return (
    <Link
      className="ride-card ride-card--interactive"
      to={{
        pathname: `/ride/${ride.id}`,
        search: rideSearch
      }}
      aria-label={`Open details for ${driver.name}'s ${corridor.pickupLabel} to ${corridor.dropoffLabel} ride`}
    >
      <div className="ride-card__top">
        <div className="ride-card__route">
          <p className="ride-card__time">
            {ride.departureTime} <span>→</span> {ride.arrivalTime}
          </p>
          <h3>
            {corridor.pickupLabel} to {corridor.dropoffLabel}
          </h3>
          <p className="ride-card__subtle">{corridor.duration} · {ride.comfort}</p>
        </div>

        <div className="ride-card__price">
          <strong>{formatMoney(ride.price)}</strong>
          <span>{ride.seatsLeft} seats left</span>
        </div>
      </div>

      <div className="ride-card__driver">
        <div className="avatar" style={{ backgroundColor: driver.accent }}>
          {driver.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div>
          <p className="ride-card__driver-name">{driver.name}</p>
          <p className="ride-card__subtle">
            {driver.rating.toFixed(1)} ★ · {driver.verifiedTrips} verified trips · {driver.responseTime}
          </p>
        </div>
      </div>

      <div className="ride-card__badges">
        {driver.badges.slice(0, 3).map((badge) => (
          <span key={badge} className="pill">
            {badge}
          </span>
        ))}
      </div>

      <div className="ride-card__footer">
        <p>{ride.bookingNote}</p>
        <div className="ride-card__hint" aria-hidden="true">
          <span>Select this ride</span>
          <span className="ride-card__chevron">→</span>
        </div>
      </div>
    </Link>
  );
}
