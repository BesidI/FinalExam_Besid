import { Link } from "react-router-dom";
import "./card.css";

function Card({ title, products, quantities, setQuantities }) {
  const handleChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + delta, 0)
    }));
  };

  return (
    <div className="card-container">
      <h2>{title}</h2>

      <div className="card-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            {/* Image + Cart */}
            <div className="image-wrapper">
              <img src={p.image} alt={p.name} />
              <button
                className="add-to-cart-icon"
                disabled={(quantities[p.id] || 0) === 0}
                onClick={() => alert(`${p.name} added to cart!`)}
              >
                🛒
              </button>
            </div>

            <h3>{p.name}</h3>
            <p>Price: ₱{p.price}</p>
            <p style={{ color: (quantities[p.id] || 0) < 5 ? "red" : "black" }}>
              Quantity: {quantities[p.id] || 0} {(quantities[p.id] || 0) < 5 && "(Low Stock)"}
            </p>
            <p>Subtotal: ₱{p.price * (quantities[p.id] || 0)}</p>

            {/* Quantity Controls */}
            <div className="quantity-controls">
              <button
                onClick={() => handleChange(p.id, -1)}
                disabled={(quantities[p.id] || 0) === 0}
              >
                −
              </button>
              <button onClick={() => handleChange(p.id, 1)}>+</button>
            </div>

            {/* Details Page */}
            <Link to={`/product/${p.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;