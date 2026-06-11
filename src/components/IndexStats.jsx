const labels = {
  species: "Species",
  genes: "Genes",
  transcripts: "Transcripts",
  variants: "Variants",
};

function formatSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function IndexStats({ stats }) {
  if (!stats) {
    return null;
  }

  return (
    <section style={{ marginBottom: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Documents</th>
            <th>Segments</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([name, values]) => (
            <tr key={name}>
              <td>{labels[name]}</td>
              <td>{values.documents.toLocaleString()}</td>
              <td>{values.segments.toLocaleString()}</td>
              <td>{formatSize(values.size_bytes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default IndexStats;
