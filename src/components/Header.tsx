import { Link, NavLink } from "react-router-dom";

interface HeaderProps {
  onOpenPostTrip: () => void;
  onOpenHowItWorks: () => void;
}

export function Header({ onOpenPostTrip, onOpenHowItWorks }: HeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand-lockup" to="/">
        <img src={`${import.meta.env.BASE_URL}deshride_logo_primary.png`} alt="DeshRide" />
      </Link>

      <nav className="site-nav" aria-label="Primary">
        <NavLink to="/" className="nav-link">
          Find a ride
        </NavLink>
        <button className="nav-button" type="button" onClick={onOpenPostTrip}>
          Post a trip
        </button>
        <button className="nav-button" type="button" onClick={onOpenHowItWorks}>
          How it works
        </button>
      </nav>
    </header>
  );
}
