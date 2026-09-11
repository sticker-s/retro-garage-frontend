function AddPartForm({ inputValue, setInputValue, onAdd }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a part.."
            />
            <button onClick={onAdd} style={{ marginLeft: '10px' }}>Add Part</button>
        </div>
    );
}

export default AddPartForm;