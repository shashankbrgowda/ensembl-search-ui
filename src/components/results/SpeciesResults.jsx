function SpeciesResults({ results }) {
  return (
    <ul>
      {results.map((result) => (
        <li key={result.genome_id}>
          Common name: {result.common_name}
          <br />
          Scientific name: {result.scientific_name}
          <br />
          Taxonomy ID: {result.species_taxonomy_id}
          <br />
          Genome ID: {result.genome_id}
          <br />
          Release: {result.release}
        </li>
      ))}
    </ul>
  );
}

export default SpeciesResults;
