function TranscriptResults({ results }) {
  return (
    <ul>
      {results.map((result) => (
        <li key={`${result.genome_id}:${result.stable_id}`}>
          Stable ID: {result.stable_id}
          <br />
          Unversioned stable ID: {result.unversioned_stable_id}
          <br />
          Symbol: {result.symbol || "-"}
          <br />
          Genome ID: {result.genome_id}
        </li>
      ))}
    </ul>
  );
}

export default TranscriptResults;
