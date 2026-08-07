import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Skill from "../pages/Skill";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/skill/:name" element={<Skill />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
