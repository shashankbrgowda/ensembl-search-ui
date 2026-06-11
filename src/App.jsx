import { useEffect, useState } from "react";

import IndexStats from "./components/IndexStats";
import Pagination from "./components/Pagination";
import SearchCategory from "./components/SearchCategory";
import SearchForm from "./components/SearchForm";
import GeneResults from "./components/results/GeneResults";
import SpeciesResults from "./components/results/SpeciesResults";
import TranscriptResults from "./components/results/TranscriptResults";
import VariantResults from "./components/results/VariantResults";
import {
  createEmptyResults,
  searchAll,
  searchCategory,
} from "./searchApi";
import { getIndexStats } from "./statsApi";


function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(createEmptyResults);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [indexStats, setIndexStats] = useState(null);

  useEffect(() => {
    getIndexStats()
      .then(setIndexStats)
      .catch(() => setIndexStats(null));
  }, []);

  async function handleSearch() {
    setLoading(true);
    setSelectedCategory("");

    let results;
    try {
      results = await searchAll(query.trim());
    } catch {
      results = createEmptyResults();
    }

    let defaultCategory = "";
    if (results.species.total > 0) {
      defaultCategory = "species";
    } else if (results.genes.total > 0) {
      defaultCategory = "genes";
    } else if (results.transcripts.total > 0) {
      defaultCategory = "transcripts";
    } else if (results.variants.total > 0) {
      defaultCategory = "variants";
    }

    setSearchResults(results);
    setSelectedCategory(defaultCategory);
    setSearchedQuery(query.trim());
    setSearched(true);
    setLoading(false);
  }

  async function handlePageChange(page) {
    const category = selectedCategory;
    setPageLoading(true);

    try {
      const results = await searchCategory(
        category,
        searchedQuery,
        page,
      );
      setSearchResults((current) => ({
        ...current,
        [category]: results,
      }));
    } catch (error) {
      setSearchResults((current) => ({
        ...current,
        [category]: {
          ...current[category],
          error: error.message,
        },
      }));
    } finally {
      setPageLoading(false);
    }
  }

  function handleClear() {
    setQuery("");
    setSearchResults(createEmptyResults());
    setSelectedCategory("");
    setSearchedQuery("");
    setSearched(false);
    setLoading(false);
    setPageLoading(false);
  }

  const hasResults =
    searchResults.species.total > 0 ||
    searchResults.genes.total > 0 ||
    searchResults.transcripts.total > 0 ||
    searchResults.variants.total > 0;
  const selectedResults = searchResults[selectedCategory];

  return (
    <main>
      <IndexStats stats={indexStats} />

      <SearchForm
        query={query}
        loading={loading}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        canClear={Boolean(query || searched)}
      />

      {searched && (
        <>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <SearchCategory
              label="Species"
              data={searchResults.species}
              selected={selectedCategory === "species"}
              onClick={() => setSelectedCategory("species")}
            />
            <SearchCategory
              label="Genes"
              data={searchResults.genes}
              selected={selectedCategory === "genes"}
              onClick={() => setSelectedCategory("genes")}
            />
            <SearchCategory
              label="Transcripts"
              data={searchResults.transcripts}
              selected={selectedCategory === "transcripts"}
              onClick={() => setSelectedCategory("transcripts")}
            />
            <SearchCategory
              label="Variants"
              data={searchResults.variants}
              selected={selectedCategory === "variants"}
              onClick={() => setSelectedCategory("variants")}
            />
          </div>

          {!hasResults && <p>No results</p>}

          {selectedResults && (
            <Pagination
              page={selectedResults.page}
              totalPages={selectedResults.total_pages}
              loading={pageLoading}
              onPageChange={handlePageChange}
            />
          )}

          {selectedCategory === "species" && (
            <SpeciesResults results={searchResults.species.results} />
          )}
          {selectedCategory === "genes" && (
            <GeneResults results={searchResults.genes.results} />
          )}
          {selectedCategory === "transcripts" && (
            <TranscriptResults
              results={searchResults.transcripts.results}
            />
          )}
          {selectedCategory === "variants" && (
            <VariantResults results={searchResults.variants.results} />
          )}
        </>
      )}

    </main>
  );
}

export default App;
