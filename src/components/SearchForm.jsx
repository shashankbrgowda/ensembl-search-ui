function SearchForm({
  query,
  loading,
  onQueryChange,
  onSearch,
  onClear,
  canClear,
}) {
  const canSearch = query.trim().length >= 3 && !loading;

  function handleSubmit(event) {
    event.preventDefault();

    if (canSearch) {
      onSearch();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search species, gene, transcript or variant"
        style={{ width: "320px" }}
      />
      <button
        type="submit"
        disabled={!canSearch}
        style={{ marginLeft: "8px" }}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={!canClear}
        style={{ marginLeft: "8px" }}
      >
        Clear
      </button>
    </form>
  );
}

export default SearchForm;
