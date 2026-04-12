import type { City, CityId, Corridor, CorridorId, Driver, Ride } from "../types";

export const cities: City[] = [
  { id: "dhaka", name: "Dhaka", bangla: "ঢাকা", x: 160, y: 180, region: "Capital hub" },
  { id: "sylhet", name: "Sylhet", bangla: "সিলেট", x: 340, y: 120, region: "North-east" },
  {
    id: "chattogram",
    name: "Chattogram",
    bangla: "চট্টগ্রাম",
    x: 300,
    y: 274,
    region: "Port city"
  },
  {
    id: "coxs-bazar",
    name: "Cox's Bazar",
    bangla: "কক্সবাজার",
    x: 320,
    y: 360,
    region: "Sea coast"
  }
];

export const corridors: Corridor[] = [
  {
    id: "dhaka-sylhet",
    from: "dhaka",
    to: "sylhet",
    duration: "5h 30m",
    fareBand: "Tk700-Tk760",
    pickupLabel: "Kamalapur Rail Gate",
    dropoffLabel: "Sylhet Station Road",
    linePath: "M160 180 C215 150 280 132 340 120",
    story: "A frequent route for students, family visits, and weekend returns."
  },
  {
    id: "sylhet-dhaka",
    from: "sylhet",
    to: "dhaka",
    duration: "5h 40m",
    fareBand: "Tk700-Tk760",
    pickupLabel: "Sylhet Station Road",
    dropoffLabel: "Kamalapur Rail Gate",
    linePath: "M340 120 C280 132 215 150 160 180",
    story: "A strong repeat-demand corridor for return travel back into Dhaka."
  },
  {
    id: "dhaka-chattogram",
    from: "dhaka",
    to: "chattogram",
    duration: "6h 20m",
    fareBand: "Tk800-Tk860",
    pickupLabel: "Gabtoli Coach Link",
    dropoffLabel: "Agrabad CDA Circle",
    linePath: "M160 180 C210 204 250 238 300 274",
    story: "A practical business and student corridor with steady intercity movement."
  },
  {
    id: "chattogram-dhaka",
    from: "chattogram",
    to: "dhaka",
    duration: "6h 30m",
    fareBand: "Tk800-Tk860",
    pickupLabel: "Agrabad CDA Circle",
    dropoffLabel: "Gabtoli Coach Link",
    linePath: "M300 274 C250 238 210 204 160 180",
    story: "A dense return route for riders heading back to the capital."
  },
  {
    id: "dhaka-coxs-bazar",
    from: "dhaka",
    to: "coxs-bazar",
    duration: "8h 35m",
    fareBand: "Tk980-Tk1,060",
    pickupLabel: "Gabtoli Coach Link",
    dropoffLabel: "Kolatoli Beach Road",
    linePath: "M160 180 C214 234 284 308 320 360",
    story: "A leisure-heavy corridor where comfort and coordination matter more."
  },
  {
    id: "coxs-bazar-dhaka",
    from: "coxs-bazar",
    to: "dhaka",
    duration: "8h 45m",
    fareBand: "Tk980-Tk1,060",
    pickupLabel: "Kolatoli Beach Road",
    dropoffLabel: "Gabtoli Coach Link",
    linePath: "M320 360 C284 308 214 234 160 180",
    story: "A long return trip designed for riders who want fewer surprises."
  }
];

export const drivers: Driver[] = [
  {
    id: "tanim-axio",
    name: "Tanim Rahman",
    age: 29,
    rating: 4.9,
    verifiedTrips: 148,
    responseTime: "Replies in 9 min",
    vehicle: "Toyota Axio",
    vehicleColor: "Pearl white",
    bio: "Usually drives between Dhaka and Sylhet on weekends. Riders book with him for punctuality and quiet trips.",
    badges: ["Verified driver", "Pay in app", "Women-friendly", "Low cancellation"],
    accent: "#de6547"
  },
  {
    id: "mahira-fielder",
    name: "Mahira Sultana",
    age: 31,
    rating: 4.8,
    verifiedTrips: 113,
    responseTime: "Replies in 14 min",
    vehicle: "Toyota Fielder",
    vehicleColor: "Slate green",
    bio: "A calm long-distance driver who keeps pickup points precise and shares live ETA updates.",
    badges: ["Verified driver", "Safe pickup point", "Quiet ride", "Top-rated host"],
    accent: "#cea24f"
  },
  {
    id: "nasif-noah",
    name: "Nasif Kabir",
    age: 34,
    rating: 4.9,
    verifiedTrips: 206,
    responseTime: "Replies in 6 min",
    vehicle: "Toyota Noah",
    vehicleColor: "Midnight blue",
    bio: "Popular on the Chattogram route for reliable timing, clean vehicle interiors, and clear communication.",
    badges: ["Verified driver", "Driver paid after trip", "Large luggage", "Consistent timing"],
    accent: "#143f39"
  }
];

export const rides: Ride[] = [
  {
    id: "ride-dhk-syl-1",
    corridorId: "dhaka-sylhet",
    driverId: "tanim-axio",
    date: "2026-04-15",
    departureTime: "07:30",
    arrivalTime: "13:00",
    pickupPoint: "Kamalapur Rail Gate",
    dropoffPoint: "Sylhet Station Road",
    price: 720,
    seatsLeft: 2,
    vehicle: "Toyota Axio",
    comfort: "Air-conditioned, music low",
    luggage: "2 medium bags",
    rules: ["Please arrive 10 minutes early", "No smoking", "Phone payment only"],
    bookingNote: "Driver confirms riders in app before departure."
  },
  {
    id: "ride-dhk-syl-2",
    corridorId: "dhaka-sylhet",
    driverId: "mahira-fielder",
    date: "2026-04-15",
    departureTime: "14:15",
    arrivalTime: "19:50",
    pickupPoint: "Kamalapur Rail Gate",
    dropoffPoint: "Sylhet Station Road",
    price: 740,
    seatsLeft: 3,
    vehicle: "Toyota Fielder",
    comfort: "Roomy back seat, quiet ride",
    luggage: "3 medium bags",
    rules: ["Exact pickup shown after booking", "One stop break", "Seat belt required"],
    bookingNote: "Support is available in app if plans change."
  },
  {
    id: "ride-syl-dhk-1",
    corridorId: "sylhet-dhaka",
    driverId: "tanim-axio",
    date: "2026-04-16",
    departureTime: "08:10",
    arrivalTime: "13:50",
    pickupPoint: "Sylhet Station Road",
    dropoffPoint: "Kamalapur Rail Gate",
    price: 710,
    seatsLeft: 1,
    vehicle: "Toyota Axio",
    comfort: "Fast lane, quiet cabin",
    luggage: "1 large bag",
    rules: ["Riders must confirm in app", "No heavy boxes", "Shared trip timing is fixed"],
    bookingNote: "Driver gets paid only after the trip is marked complete."
  },
  {
    id: "ride-dhk-ctg-1",
    corridorId: "dhaka-chattogram",
    driverId: "nasif-noah",
    date: "2026-04-15",
    departureTime: "06:45",
    arrivalTime: "13:05",
    pickupPoint: "Gabtoli Coach Link",
    dropoffPoint: "Agrabad CDA Circle",
    price: 840,
    seatsLeft: 4,
    vehicle: "Toyota Noah",
    comfort: "Large cabin, cool air",
    luggage: "4 medium bags",
    rules: ["Business travel friendly", "No pickup changes after booking", "One rest stop"],
    bookingNote: "Ideal for riders who want a smoother long-haul trip."
  },
  {
    id: "ride-dhk-ctg-2",
    corridorId: "dhaka-chattogram",
    driverId: "mahira-fielder",
    date: "2026-04-15",
    departureTime: "15:00",
    arrivalTime: "21:25",
    pickupPoint: "Gabtoli Coach Link",
    dropoffPoint: "Agrabad CDA Circle",
    price: 810,
    seatsLeft: 2,
    vehicle: "Toyota Fielder",
    comfort: "Conversation-friendly trip",
    luggage: "2 medium bags",
    rules: ["Meet only at Safe Hub", "Pay in app", "No extra rider changes"],
    bookingNote: "Ride reminders are sent before departure."
  },
  {
    id: "ride-ctg-dhk-1",
    corridorId: "chattogram-dhaka",
    driverId: "nasif-noah",
    date: "2026-04-16",
    departureTime: "09:20",
    arrivalTime: "15:45",
    pickupPoint: "Agrabad CDA Circle",
    dropoffPoint: "Gabtoli Coach Link",
    price: 830,
    seatsLeft: 3,
    vehicle: "Toyota Noah",
    comfort: "Spacious row seating",
    luggage: "4 medium bags",
    rules: ["In-app booking only", "No smoking", "One short fuel stop"],
    bookingNote: "Trusted repeat corridor with frequent return demand."
  },
  {
    id: "ride-dhk-cxb-1",
    corridorId: "dhaka-coxs-bazar",
    driverId: "nasif-noah",
    date: "2026-04-18",
    departureTime: "05:50",
    arrivalTime: "14:25",
    pickupPoint: "Gabtoli Coach Link",
    dropoffPoint: "Kolatoli Beach Road",
    price: 1020,
    seatsLeft: 2,
    vehicle: "Toyota Noah",
    comfort: "Long-haul comfort setup",
    luggage: "4 medium bags + beach bags",
    rules: ["Please travel light", "Two breaks only", "Children allowed with guardian"],
    bookingNote: "A strong fit for weekend and holiday travel."
  },
  {
    id: "ride-dhk-cxb-2",
    corridorId: "dhaka-coxs-bazar",
    driverId: "mahira-fielder",
    date: "2026-04-18",
    departureTime: "22:00",
    arrivalTime: "06:40",
    pickupPoint: "Gabtoli Coach Link",
    dropoffPoint: "Kolatoli Beach Road",
    price: 990,
    seatsLeft: 1,
    vehicle: "Toyota Fielder",
    comfort: "Night trip, softer cabin lighting",
    luggage: "2 medium bags",
    rules: ["Night trip means quiet ride", "Meet 15 minutes early", "Keep ticket in app"],
    bookingNote: "Confirmation includes clear pickup instructions."
  },
  {
    id: "ride-cxb-dhk-1",
    corridorId: "coxs-bazar-dhaka",
    driverId: "mahira-fielder",
    date: "2026-04-20",
    departureTime: "10:30",
    arrivalTime: "19:05",
    pickupPoint: "Kolatoli Beach Road",
    dropoffPoint: "Gabtoli Coach Link",
    price: 1000,
    seatsLeft: 2,
    vehicle: "Toyota Fielder",
    comfort: "Return ride, coastal pickup",
    luggage: "3 medium bags",
    rules: ["In-app support available", "One comfort break", "Safe Hub dropoff only"],
    bookingNote: "Best for riders heading back to Dhaka after a short stay."
  }
];

export const featuredRideIds = [
  "ride-dhk-syl-1",
  "ride-dhk-ctg-1",
  "ride-dhk-cxb-1"
];

export function getCity(cityId: CityId): City {
  const city = cities.find((item) => item.id === cityId);
  if (!city) {
    throw new Error(`Missing city: ${cityId}`);
  }
  return city;
}

export function getCorridor(corridorId: CorridorId): Corridor {
  const corridor = corridors.find((item) => item.id === corridorId);
  if (!corridor) {
    throw new Error(`Missing corridor: ${corridorId}`);
  }
  return corridor;
}

export function findCorridor(from: CityId, to: CityId): Corridor | undefined {
  return corridors.find((item) => item.from === from && item.to === to);
}

export function getDriver(driverId: string): Driver {
  const driver = drivers.find((item) => item.id === driverId);
  if (!driver) {
    throw new Error(`Missing driver: ${driverId}`);
  }
  return driver;
}

export function getRide(rideId: string): Ride | undefined {
  return rides.find((item) => item.id === rideId);
}

export function getRidesForCorridor(corridorId: CorridorId): Ride[] {
  return rides
    .filter((item) => item.corridorId === corridorId)
    .sort((left, right) => left.departureTime.localeCompare(right.departureTime));
}

export function getAvailableDestinations(from: CityId): City[] {
  const destinationIds = corridors
    .filter((item) => item.from === from)
    .map((item) => item.to);
  return cities.filter((item) => destinationIds.includes(item.id));
}

export function formatMoney(value: number): string {
  return `Tk${value.toLocaleString("en-US")}`;
}

export function formatRouteLabel(from: CityId, to: CityId): string {
  return `${getCity(from).name} to ${getCity(to).name}`;
}
