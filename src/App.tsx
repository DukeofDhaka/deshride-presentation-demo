import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { ModalSheet } from "./components/ModalSheet";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { RidePage } from "./pages/RidePage";
import { BookingPage } from "./pages/BookingPage";

type SheetKey = "post" | "how" | null;

function SheetContent({ sheetKey }: { sheetKey: Exclude<SheetKey, null> }) {
  if (sheetKey === "post") {
    return (
      <>
        <div className="info-stack">
          <div className="info-tile">
            <strong>Driver-side is coming next</strong>
            <p>
              For this class prototype, the full experience is built around the rider journey:
              searching, trusting, and booking.
            </p>
          </div>
          <div className="info-tile">
            <strong>What the driver flow will include</strong>
            <p>Trip posting, seat control, payout tracking, and verified vehicle details.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="info-stack">
      <div className="info-tile">
        <strong>1. Search a route</strong>
        <p>Start with where you are going, not with a long sign-up process.</p>
      </div>
      <div className="info-tile">
        <strong>2. Check the ride</strong>
        <p>Compare departure times, pickup points, driver habits, and remaining seats.</p>
      </div>
      <div className="info-tile">
        <strong>3. Book in app</strong>
        <p>The rider pays in app and the driver is only paid after the trip is completed.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [sheetKey, setSheetKey] = useState<SheetKey>(null);

  return (
    <div className="app-shell">
      <Header
        onOpenPostTrip={() => setSheetKey("post")}
        onOpenHowItWorks={() => setSheetKey("how")}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/ride/:rideId" element={<RidePage />} />
          <Route path="/book/:rideId" element={<BookingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {sheetKey && (
        <ModalSheet
          title={sheetKey === "post" ? "Post a trip" : "How DeshRide works"}
          description={
            sheetKey === "post"
              ? "The driver-side flow is intentionally lightweight for now so the rider journey stays sharp."
              : "This demo stays close to what a real rider would do on their phone."
          }
          onClose={() => setSheetKey(null)}
        >
          <SheetContent sheetKey={sheetKey} />
        </ModalSheet>
      )}
    </div>
  );
}
