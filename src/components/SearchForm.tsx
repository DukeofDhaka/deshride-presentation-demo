import { useState } from "react";
import { cities, findCorridor, getAvailableDestinations } from "../data/deshrideData";
import type { CityId, SearchState } from "../types";

interface SearchFormProps {
  initialState: SearchState;
  compact?: boolean;
  submitLabel?: string;
  onSubmit: (state: SearchState) => void;
}

export function SearchForm({
  initialState,
  compact = false,
  submitLabel = "Find a ride",
  onSubmit
}: SearchFormProps) {
  const [from, setFrom] = useState<CityId>(initialState.from);
  const [to, setTo] = useState<CityId>(initialState.to);
  const [date, setDate] = useState(initialState.date);
  const [seats, setSeats] = useState(initialState.seats);
  const destinations = getAvailableDestinations(from);

  function handleFromChange(nextFrom: CityId) {
    setFrom(nextFrom);
    if (!findCorridor(nextFrom, to)) {
      setTo(getAvailableDestinations(nextFrom)[0].id);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ from, to, date, seats });
  }

  return (
    <form className={`search-form ${compact ? "search-form--compact" : ""}`} onSubmit={handleSubmit}>
      <div className="search-form__grid">
        <label>
          <span>From</span>
          <select value={from} onChange={(event) => handleFromChange(event.target.value as CityId)}>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>To</span>
          <select value={to} onChange={(event) => setTo(event.target.value as CityId)}>
            {destinations.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Date</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>

        <label>
          <span>Seats</span>
          <select value={seats} onChange={(event) => setSeats(Number(event.target.value))}>
            {[1, 2, 3, 4].map((count) => (
              <option key={count} value={count}>
                {count} seat{count > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button className="primary-button" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
