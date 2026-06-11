function GeneResults({ results }) {
  return (
    <ul>
      {results.map((result) => (
        <li key={`${result.genome_id}:${result.stable_id}`}>
          Symbol: {result.symbol || "-"}
          <br />
          Name: {result.name || "-"}
          <br />
          Stable ID: {result.stable_id}
          <br />
          Unversioned stable ID: {result.unversioned_stable_id}
          <br />
          Genome ID: {result.genome_id}
          <br />
          Release: {result.release}
        </li>
      ))}
    </ul>
  );
}

export default GeneResults;
