import { useNavigate } from "react-router-dom";
import { featuredRideIds, getCity, getRide } from "../data/deshrideData";
import { SearchForm } from "../components/SearchForm";
import { RouteMap } from "../components/RouteMap";
import { RideCard } from "../components/RideCard";
import type { SearchState } from "../types";

const defaultSearch: SearchState = {
  from: "dhaka",
  to: "sylhet",
  date: "2026-04-15",
  seats: 1
};

export function HomePage() {
  const navigate = useNavigate();

  function handleSearch(state: SearchState) {
    const params = new URLSearchParams({
      from: state.from,
      to: state.to,
      date: state.date,
      seats: String(state.seats)
    });
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__copy">
          <div className="hero__label">Public rider demo · বাংলাদেশ first</div>
          <h1>Find a safer intercity ride without the bus-line chaos.</h1>
          <p className="hero__lead">
            DeshRide helps riders search corridor-based rides, pay in app, meet at safe pickup
            points, and travel with verified drivers who are only paid after the trip is completed.
          </p>

          <SearchForm initialState={defaultSearch} onSubmit={handleSearch} />

          <div className="trust-strip">
            <span>Pay in app</span>
            <span>Verified driver</span>
            <span>Safe pickup point</span>
            <span>Support if plans change</span>
          </div>
        </div>

        <div className="hero__visual">
          <RouteMap corridorId="dhaka-sylhet" />
        </div>
      </section>

      <section className="section-shell">
        <div className="section-shell__heading">
          <div>
            <p className="section-kicker">What riders see first</p>
            <h2>Search a route, compare rides, tap into the one that feels right.</h2>
          </div>
          <p>
            The DeshRide flow is simple on purpose: start with where you are going, not with
            platform theory.
          </p>
        </div>

        <div className="feature-row">
          <div className="feature-card">
            <strong>{getCity(defaultSearch.from).name}</strong>
            <span>Start from a known city hub</span>
          </div>
          <div className="feature-card">
            <strong>{getCity(defaultSearch.to).name}</strong>
            <span>Preview a believable arrival point</span>
          </div>
          <div className="feature-card">
            <strong>Ride confidence</strong>
            <span>See ratings, rules, and driver habits before you book</span>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--tight">
        <div className="section-shell__heading">
          <div>
            <p className="section-kicker">Featured rides</p>
            <h2>Popular departures right now</h2>
          </div>
          <p>These are sample rides for the public prototype, but the booking flow feels real.</p>
        </div>

        <div className="ride-list">
          {featuredRideIds
            .map((rideId) => getRide(rideId))
            .filter((ride): ride is Exclude<typeof ride, undefined> => ride !== undefined)
            .map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                queryDate={defaultSearch.date}
                querySeats={defaultSearch.seats}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
