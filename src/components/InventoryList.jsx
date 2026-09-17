function InventoryList({ inventory, editPart, deletePart }) {
    return (
        <ul>
            {inventory.map((part, index) => (
                <li key={part._id} style={{ fontFamily: `monospace`, margin: `10px 0` }}>
                    <strong>{part.name}</strong> -Qty: {part.quantity} -${part.price}
                    <button onClick={() => editPart(part._id, part.name)} style={{ marginLeft: '10px' }}>Edit</button>
                    <button onClick={() => deletePart(part._id)} style={{ marginLeft: '5px' }}>X</button>
                </li>
            ))}
        </ul>
    );
}

export default InventoryList;  