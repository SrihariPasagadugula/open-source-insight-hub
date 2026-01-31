import type { GithubRepository } from "../../api/githubApi";

interface RepoComparisonProps {
  repos: GithubRepository[];
  onRemove: (id: number) => void;
}

export function RepoComparison({ repos, onRemove }: RepoComparisonProps) {
  if (repos.length < 2) return null;

  return (
    <section className="comparison">
      <h3>Repository Comparison</h3>

      <table>
        <thead>
          <tr>
            <th>Metric</th>
            {repos.map((repo) => (
              <th key={repo.id}>
                {repo.full_name}
                <button onClick={() => onRemove(repo.id)}>✕</button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>⭐ Stars</td>
            {repos.map((repo) => (
              <td key={repo.id}>{repo.stargazers_count}</td>
            ))}
          </tr>

          <tr>
            <td>🍴 Forks</td>
            {repos.map((repo) => (
              <td key={repo.id}>{repo.forks_count}</td>
            ))}
          </tr>

          <tr>
            <td>🐞 Open Issues</td>
            {repos.map((repo) => (
              <td key={repo.id}>{repo.open_issues_count}</td>
            ))}
          </tr>

          <tr>
            <td>🕒 Last Updated</td>
            {repos.map((repo) => (
              <td key={repo.id}>
                {new Date(repo.updated_at).toLocaleDateString()}
              </td>
            ))}
          </tr>

          <tr>
            <td>💻 Language</td>
            {repos.map((repo) => (
              <td key={repo.id}>{repo.language ?? "—"}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
