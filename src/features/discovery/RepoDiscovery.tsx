import { useState } from "react";
import { useRepos } from "../../hooks/useRepos";

export function RepoDiscovery() {
  const [query, setQuery] = useState("");
  const { repos, loading, error, fetchRepos, resetRepos } = useRepos();

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
            fetchRepos(query, 0);
          } else {
            resetRepos();
          }
        }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {!loading && !error && repos.length === 0 && (
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
    </section>
  );
}
