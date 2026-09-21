import { useState } from "react";

function InventoryItem({ part, editPart, deletePart }) {

    const [isEditing, setIsEditing] = useState(false);

    const [editName, setEditName] = useState(part.name);
    const [editPrice, setEditPrice] = useState(part.price);
    const [editQuantity, setEditQuantity] = useState(part.quantity);

    const handleSave = () => {
        editPart(part._id, editName, editPrice, editQuantity);
        setIsEditing(false);
    }
    if (isEditing) {
        return (
            <li style={{ fontFamily: 'monospace', margin: `10px 0` }}>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} style={{ width: '100px' }} />
                <input type="number" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} style={{ width: '50px' }} />
                <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} style={{ width: '60px' }} />
                <button onClick={handleSave} style={{ marginLeft: '10px' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ marginLeft: '5px' }}>Cancel</button>

            </li>
        );

    }
    return (
        <li style={{ fontFamily: 'monospace', margin: '10px 0' }}>
            <strong>{part.name}</strong> -Qty: {part.quantity} -${part.price}
            <button onClick={() => setIsEditing(true)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => deletePart(part._id)} style={{ marginLeft: '5px' }}>X</button>
        </li>
    )
}
export default InventoryItem;