import React from "react";
import { Routes, Route } from "react-router-dom";

import GoldPrices from "./GoldPrices";
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";
import Services from "./Services";

export default function AppRoutes({ data, loading, lastUpdate }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<GoldPrices data={data} loading={loading} lastUpdate={lastUpdate} />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}
