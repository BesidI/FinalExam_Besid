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
  const [quantities, setQuantities] = useState({});
  const [customProducts, setCustomProducts] = useState([]);

  // Filter logic
  const filteredCards = [...allProducts, { title: "Custom Products", items: customProducts }]
    .filter(card => !categoryFilter || card.title === categoryFilter)
    .map(card => ({
      ...card,
      items: card.items.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(card => card.items.length > 0);

  // Compute overall total
  const overallTotal = filteredCards
    .flatMap(card => card.items)
    .reduce((acc, p) => acc + p.price * (quantities[p.id] || 0), 0);

  return (
    <Router>
      <div className="app-container">
        <h1>🏠 Home Appliance Inventory</h1>

        <Routes>
          {/* Inventory */}
          <Route
            path="/"
            element={
              <>
                {/* Search + Filter */}
                <div className="filter-bar">
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {allProducts.map(card => (
                      <option key={card.title} value={card.title}>
                        {card.title}
                      </option>
                    ))}
                    <option value="Custom Products">Custom Products</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Search product name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Product Cards */}
                <div className="card-section">
                  {filteredCards.map(card => (
                    <Card
                      key={card.title}
                      title={card.title}
                      products={card.items}
                      quantities={quantities}
                      setQuantities={setQuantities}
                    />
                  ))}
                </div>

                {/* Totals */}
                <h2>Total Value: ₱{overallTotal}</h2>

                {/* Add Product Form */}
                <AddProductForm addProduct={setCustomProducts} />
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