function SearchCategory({ label, data, selected, onClick }) {
  const disabled = data.total === 0;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: disabled ? "default" : "pointer",
        backgroundColor: selected ? "#ddd" : undefined,
        fontWeight: selected ? "bold" : "normal",
      }}
    >
      {label}: {data.total}
    </button>
  );
}

export default SearchCategory;
