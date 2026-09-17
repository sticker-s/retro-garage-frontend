function AddPartForm({ inputValue, setInputValue, onAdd, price, setprice, quantity, setQuantity }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a part"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setprice(Number(e.target.value))}
                placeholder="Enter a price"
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Enter a quantity"
            />
            <button onClick={onAdd} style={{ marginLeft: '10px' }}>Add Part</button>
        </div>
    );
}

export default AddPartForm;