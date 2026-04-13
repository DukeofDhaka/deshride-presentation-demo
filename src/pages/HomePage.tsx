import { useNavigate } from "react-router-dom";
import { SearchForm } from "../components/SearchForm";
import { RouteMap } from "../components/RouteMap";
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
    </div>
  );
}
