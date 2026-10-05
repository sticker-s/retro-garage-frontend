import { useState, useEffect } from "react";
import AddPartForm from "./components/AddPartForm";
import InventoryList from "./components/InventoryList";
import './App.css';
function App() {

  const [inventory, setInventory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // const API_URL = "https://retro-garage-backend.onrender.com/api/parts";
  const API_URL = import.meta.env.VITE_URL || "http://localhost:3000/api/parts";

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setInventory(data);

    } catch (error) {
      console.error("error fetching parts from database");
    }
  }

  const addParts = async () => {
    if (!inputValue) return alert("please enter a part name");
    if (price <= 0) return alert("price must be > 0");
    if (quantity <= 0) return alert("quantity must be > 0");
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newPartName: inputValue,
          price: price,
          quantity: quantity
        })
      });
      setInputValue("");
      setPrice(0);
      setQuantity(1);
      fetchInventory();
    } catch (error) {
      console.error("Error adding parts");
    }
  };

  const deletePart = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchInventory();
    } catch (error) {
      console.error("Error deleting Part");
    }
  }

  const editPart = async (id, updatedName, updatedPrice, updatedQuantity) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newName: updatedName,
          newPrice: Number(updatedPrice),
          newQuantity: Number(updatedQuantity)
        })
      });
      fetchInventory();

    } catch (error) {
      console.error("error updating part");
    }
  };

  const filteredInventory = inventory.
    filter((part) => part.name.toLowerCase().includes(searchItem.toLowerCase()))
    .sort((a, b) => {
      if (sortBy == "price-asc") return a.price - b.price;
      if (sortBy == "price-desc") return b.price - a.price;
      if (sortBy == "qty-desc") return b.quantity - a.quantity;
      return 0;
    });


  return (
    <div className="app-container">
      <h1 style={{ fontFamily: 'monospace' }}>Pixel Garage Inventory</h1>
      {/* //* the filter search bar */}
      <input type="text" onChange={(e) => setSearchItem(e.target.value)} placeholder="filer search"
        value={searchItem} style={{ width: "50%", marginBottom: "20px", padding: "5px" }} />

      {/* //* sort dropdown menu */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '5px', fontFamily: "monospace" }} >
        <option value="default">Sort by: Default</option>
        <option value="price-asc">Sort by: Price asc</option>
        <option value="price-desc">Sort by: Price desc</option>
        <option value="qty-desc">Sort by: Quantity desc</option>
      </select>

      {/* //* this is the form for adding the parts */}
      <AddPartForm inputValue={inputValue} setInputValue={setInputValue} onAdd={addParts}
        price={price} setprice={setPrice} quantity={quantity} setQuantity={setQuantity} />

      {/* //* this creates the ul of each parts */}
      <InventoryList inventory={filteredInventory} editPart={editPart} deletePart={deletePart} />
    </div>
  )
}

export default App