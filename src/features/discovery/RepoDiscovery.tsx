import { useState } from "react";
import { useRepos } from "../../hooks/useRepos";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { Modal } from "../../components/Modal";
import { RepoDetails } from "./RepoDetails";
import type { GithubRepository } from "../../api/githubApi";
import { RepoComparison } from "./RepoComparison";

export function RepoDiscovery() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<{
    owner: string;
    name: string;
  } | null>(null);
  const [compareRepos, setCompareRepos] = useState<GithubRepository[]>([]);
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

  function toggleCompare(repo: GithubRepository) {
    setCompareRepos((prev) => {
      const exists = prev.find((r) => r.id === repo.id);

      if (exists) {
        return prev.filter((r) => r.id !== repo.id);
      }

      if (prev.length === 2) {
        return [prev[1], repo];
      }

      return [...prev, repo];
    });
  }

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

      {hasSearched && repos.length > 0 && (
        <div className="comparison-helper">
          {compareRepos.length === 0 && (
            <p>Select up to 2 repositories to compare.</p>
          )}

          {compareRepos.length === 1 && (
            <p>1 repository selected. Select one more to compare.</p>
          )}

          {compareRepos.length === 2 && <p>Comparing 2 repositories.</p>}
        </div>
      )}

      <RepoComparison
        repos={compareRepos}
        onRemove={(id) =>
          setCompareRepos((prev) => prev.filter((r) => r.id !== id))
        }
      />

      <ul className="repo-list">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="repo-card"
            onClick={() =>
              setSelectedRepo({
                owner: repo.owner.login,
                name: repo.name,
              })
            }
          >
            <div className="repo-card-header">
              <input
                type="checkbox"
                checked={compareRepos.some((r) => r.id === repo.id)}
                onChange={() => toggleCompare(repo)}
                onClick={(e) => e.stopPropagation()}
              />
              <strong className="repo-title">{repo.full_name}</strong>
            </div>
            <p className="repo-description">{repo.description}</p>
          </li>
        ))}
      </ul>

      <div id="scroll-sentinel" />

      {selectedRepo && (
        <Modal onClose={() => setSelectedRepo(null)}>
          <RepoDetails owner={selectedRepo.owner} name={selectedRepo.name} />
        </Modal>
      )}
    </section>
  );
}
