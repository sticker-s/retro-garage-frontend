import { useState, useEffect } from "react";
import AddPartForm from "./components/AddPartForm";
import InventoryList from "./components/InventoryList";
import './App.css';
function App() {

  const [inventory, setInventory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // const API_URL = "https://retro-garage-backend.onrender.com/api/parts";
  const API_URL = "http://localhost:3000/api/parts";

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
          newPart: inputValue,
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

  const editPart = async (id, oldName) => {
    const newName = prompt("Enter a new name for this part: ", oldName);
    if (newName && newName !== oldName) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newName: newName })
        });
        fetchInventory();

      } catch (error) {
        console.error("error updating part");
      }
    }
  };

  return (
    <div className="app-container">
      <h1 style={{ fontFamily: 'monospace' }}>Pixel Garage Inventory</h1>

      {/* //* this is the form for adding the parts */}
      <AddPartForm inputValue={inputValue} setInputValue={setInputValue} onAdd={addParts}
        price={price} setprice={setPrice} quantity={quantity} setQuantity={setQuantity} />

      {/* //* this creates the ul of each parts */}
      <InventoryList inventory={inventory} editPart={editPart} deletePart={deletePart} />
    </div>
  )
}

export default App