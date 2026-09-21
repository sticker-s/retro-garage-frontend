import InventoryItem from "./InventoryItem";
function InventoryList({ inventory, editPart, deletePart }) {
    return (
        <ul>
            {inventory.map((part, index) => (
                <InventoryItem key={part._id} part={part} editPart={editPart} deletePart={deletePart} />
            ))}
        </ul>
    );
}

export default InventoryList;  