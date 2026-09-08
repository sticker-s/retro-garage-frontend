import { useState, useEffect } from "react";
import './App.css';
function App() {

  const [inventory, setInventory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const API_URL = "https://retro-garage-backend.onrender.com/api/parts";

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

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPart: inputValue })
      });
      setInputValue("");
      fetchInventory();
    } catch (error) {
      console.error("Error adding parts");
    }
  };

  const deletePart = async (partName) => {
    try {
      await fetch(`${API_URL}/${partName}`, { method: 'DELETE' });
      fetchInventory();
    } catch (error) {
      console.error("Error deleting Part");
    }
  }

  const editPart = async (oldName) => {
    const newName = prompt("Enter a new name for this part: ", oldName);
    if (newName && newName !== oldName) {
      try {

        await fetch(`${API_URL}/${oldName}`, {
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

      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a part..."
        />

        <button onClick={addParts}>Add Part</button>
      </div>

      <ul>
        {inventory.map((part, index) => (
          <li key={index} style={{ fontFamily: 'monospace', margin: '10px 0' }}>
            {part}
            <button onClick={() => editPart(part)} style={{ marginLeft: '10px' }}>  Edit</button>
            <button onClick={() => deletePart(part)} style={{ marginLeft: '5px' }}> X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App