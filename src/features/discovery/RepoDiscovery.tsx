import { useState } from "react";
import { useRepos } from "../../hooks/useRepos";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export function RepoDiscovery() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const {
    repos,
    totalCount,
    loading,
    error,
    fetchRepos,
    loadMore,
    resetRepos,
  } = useRepos();

  const hasMore = hasSearched && repos.length < totalCount;

  useInfiniteScroll({
    hasMore,
    onLoadMore: () => loadMore(query),
  });

  return (
    <section>
      <h2>Discover Repositories</h2>

      <input
        type="text"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={() => {
          if (query.trim()) {
            setHasSearched(true);
            fetchRepos(query, 0);
          } else {
            setHasSearched(false);
            resetRepos();
          }
        }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {!loading && !error && !hasSearched && (
        <p>Enter a search term and click Search to discover repositories.</p>
      )}

      {!loading && !error && hasSearched && repos.length === 0 && (
        <p>No repositories found.</p>
      )}

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>

      <div id="scroll-sentinel" />
    </section>
  );
}
