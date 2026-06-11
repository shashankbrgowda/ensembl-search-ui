function VariantResults({ results }) {
  return (
    <ul>
      {results.map((result) => (
        <li key={`${result.rsid}:${result.region}:${result.start}`}>
          RSID: {result.rsid}
          <br />
          Region: {result.region}
          <br />
          Start: {result.start}
          <br />
          Genome ID: {result.genome_id}
        </li>
      ))}
    </ul>
  );
}

export default VariantResults;
