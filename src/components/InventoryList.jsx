function InventoryList({ inventory, editPart, deletePart }) {
    return (
        <ul>
            {inventory.map((part, index) => (
                <li key={index} style={{ fontFamily: `monospace`, margin: `10px 0` }}>
                    {part}
                    <button onClick={() => editPart(part)} style={{ marginLeft: '10px' }}>Edit</button>
                    <button onClick={() => deletePart(part)} style={{ marginLeft: '5px' }}>X</button>
                </li>
            ))}
        </ul>
    );
}

export default InventoryList;  