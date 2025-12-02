import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./Card";
import ProductDetail from "./productsDetails";
import "./app.css";
import {
  AirCirculatingProducts,
  MajorProducts,
  CookingAppliancesProducts
} from "./products";

const allProducts = [
  { title: "Air Circulating Appliance", items: AirCirculatingProducts },
  { title: "Major Appliance", items: MajorProducts },
  { title: "Cooking Appliance", items: CookingAppliancesProducts }
  
];

function App() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredCards = allProducts
    .filter(card => !categoryFilter || card.title === categoryFilter)
    .map(card => ({
      ...card,
      items: card.items.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(card => card.items.length > 0);

  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "24px",
          boxSizing: "border-box",
          backgroundColor: "#f0f0f0"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
          Home Appliance Inventory
        </h1>

        <Routes>
          {/* Inventory */}
          <Route
            path="/"
            element={
              <>
                {/* Search bar */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    style={{ padding: "8px", fontSize: "16px" }}
                  >
                    <option value="">All Categories</option>
                    {allProducts.map(card => (
                      <option key={card.title} value={card.title}>
                        {card.title}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Product name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ padding: "8px", fontSize: "16px", width: "240px" }}
                  />
                </div>

                {/* Filtered product */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: "1200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                  }}
                >
                  {filteredCards.map(card => (
                    <Card key={card.title} title={card.title} products={card.items} />
                  ))}
                </div>
              </>
            }
          />

          {/* Product details */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;