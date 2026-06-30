import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import PrototypePicker from "./prototypes/PrototypePicker";
import P1Classic from "./prototypes/P1Classic";
import P2Sidebar from "./prototypes/P2Sidebar";
import P3FullHero from "./prototypes/P3FullHero";
import P4Timeline from "./prototypes/P4Timeline";
import P5Bento from "./prototypes/P5Bento";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrototypePicker />} />
          <Route path="/p1" element={<P1Classic />} />
          <Route path="/p2" element={<P2Sidebar />} />
          <Route path="/p3" element={<P3FullHero />} />
          <Route path="/p4" element={<P4Timeline />} />
          <Route path="/p5" element={<P5Bento />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
