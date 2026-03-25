import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactSupport from "./pages/ContactSupport";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/support" element={<ContactSupport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;