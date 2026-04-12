export type CityId =
  | "dhaka"
  | "sylhet"
  | "chattogram"
  | "coxs-bazar";

export type CorridorId =
  | "dhaka-sylhet"
  | "sylhet-dhaka"
  | "dhaka-chattogram"
  | "chattogram-dhaka"
  | "dhaka-coxs-bazar"
  | "coxs-bazar-dhaka";

export interface City {
  id: CityId;
  name: string;
  bangla: string;
  x: number;
  y: number;
  region: string;
}

export interface Corridor {
  id: CorridorId;
  from: CityId;
  to: CityId;
  duration: string;
  fareBand: string;
  pickupLabel: string;
  dropoffLabel: string;
  linePath: string;
  story: string;
}

export interface Driver {
  id: string;
  name: string;
  age: number;
  rating: number;
  verifiedTrips: number;
  responseTime: string;
  vehicle: string;
  vehicleColor: string;
  bio: string;
  badges: string[];
  accent: string;
}

export interface Ride {
  id: string;
  corridorId: CorridorId;
  driverId: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  pickupPoint: string;
  dropoffPoint: string;
  price: number;
  seatsLeft: number;
  vehicle: string;
  comfort: string;
  luggage: string;
  rules: string[];
  bookingNote: string;
}

export interface SearchState {
  from: CityId;
  to: CityId;
  date: string;
  seats: number;
}
