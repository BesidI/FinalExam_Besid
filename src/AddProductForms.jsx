import { useState } from "react";

function AddProductForm({ addProduct }) {
  const [form, setForm] = useState({
    name: "", price: "", quantity: "", image: "", description: "", category: "", rating: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.quantity || !form.image || !form.description) {
      alert("Please fill all required fields!");
      return;
    }
    const newProduct = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity)
    };
    addProduct(prev => [...prev, newProduct]);
    setForm({ name: "", price: "", quantity: "", image: "", description: "", category: "", rating: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h2>Add New Product</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;