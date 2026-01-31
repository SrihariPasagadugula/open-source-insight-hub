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
    <section className="discovery">
      <h2 className="section-title">Discover Repositories</h2>

      <div className="search-bar">
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
      </div>

      <div className="status">
        {loading && <p>Loading...</p>}

        {error && <p className="error">Error: {error.message}</p>}

        {!loading && !error && !hasSearched && (
          <p>Enter a search term and click Search to discover repositories.</p>
        )}

        {!loading && !error && hasSearched && repos.length === 0 && (
          <p>No repositories found.</p>
        )}
      </div>

      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-card">
            <strong className="repo-title">{repo.full_name}</strong>
            <p className="repo-description">{repo.description}</p>
          </li>
        ))}
      </ul>

      <div id="scroll-sentinel" />
    </section>
  );
}
