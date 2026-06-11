function Pagination({ page, totalPages, loading, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div style={{ marginTop: "12px" }}>
      <button
        type="button"
        disabled={page === 1 || loading}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <span style={{ margin: "0 8px" }}>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
