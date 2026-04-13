import { useNavigate, useSearchParams } from "react-router-dom";
import { RideCard } from "../components/RideCard";
import { RouteMap } from "../components/RouteMap";
import { SearchForm } from "../components/SearchForm";
import { findCorridor, getCity, getRidesForCorridor } from "../data/deshrideData";
import type { CityId, SearchState } from "../types";

function getSearchState(params: URLSearchParams): SearchState {
  return {
    from: (params.get("from") as CityId) || "dhaka",
    to: (params.get("to") as CityId) || "sylhet",
    date: params.get("date") || "2026-04-15",
    seats: Number(params.get("seats") || "1")
  };
}

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchState = getSearchState(searchParams);
  const corridor = findCorridor(searchState.from, searchState.to);
  const rides = corridor ? getRidesForCorridor(corridor.id) : [];

  function handleSearch(state: SearchState) {
    const params = new URLSearchParams({
      from: state.from,
      to: state.to,
      date: state.date,
      seats: String(state.seats)
    });
    navigate(`/search?${params.toString()}`);
  }

  if (!corridor) {
    return (
      <section className="page">
        <div className="empty-state">
          <p className="section-kicker">Search</p>
          <h1>No route published yet</h1>
          <p>
            DeshRide is starting corridor by corridor. Try another city pair from the main screen.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page page--search">
      <div className="search-banner">
        <div>
          <p className="section-kicker">Search results</p>
          <h1>
            {getCity(searchState.from).name} to {getCity(searchState.to).name}
          </h1>
          <p>
            {searchState.date} · {searchState.seats} seat{searchState.seats > 1 ? "s" : ""} ·{" "}
            {rides.length} departures
          </p>
        </div>

        <div className="search-banner__compact-map">
          <RouteMap corridorId={corridor.id} compact />
        </div>
      </div>

      <div className="search-toolbar">
        <SearchForm
          key={`${searchState.from}-${searchState.to}-${searchState.date}-${searchState.seats}`}
          initialState={searchState}
          compact
          submitLabel="Update search"
          onSubmit={handleSearch}
        />

        <div className="results-summary">
          <div>
            <p className="section-kicker">Available rides</p>
            <h2>Choose a driver</h2>
          </div>
          <p>{corridor.story}</p>
          <div className="trust-strip trust-strip--compact">
            <span>Pay in app</span>
            <span>Verified driver</span>
            <span>Safe pickup point</span>
          </div>
        </div>
      </div>

      <div className="results-heading">
        <p>
          Tap any ride card to open the full driver details, pickup point, and booking screen.
        </p>
      </div>

      <div className="ride-list">
        {rides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            queryDate={searchState.date}
            querySeats={searchState.seats}
          />
        ))}
      </div>
    </section>
  );
}
