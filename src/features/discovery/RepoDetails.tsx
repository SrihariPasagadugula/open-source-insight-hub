import { useEffect, useState } from "react";
import { getRepositoryDetails, GithubApiError } from "../../api/githubApi";
import type { GithubRepoDetails } from "../../api/githubApi";

interface RepoDetailsProps {
  owner: string;
  name: string;
}

export function RepoDetails({ owner, name }: RepoDetailsProps) {
  const [repo, setRepo] = useState<GithubRepoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GithubApiError | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetails() {
      try {
        const data = await getRepositoryDetails(owner, name);
        if (!cancelled) setRepo(data);
      } catch (err) {
        if (!cancelled) {
          if (err instanceof GithubApiError) {
            setError(err);
          } else {
            setError(new GithubApiError("Unexpected error", 0));
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDetails();
    return () => {
      cancelled = true;
    };
  }, [owner, name]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!repo) return null;

  return (
    <div>
      <h3>{repo.full_name}</h3>
      <p>{repo.description}</p>

      <ul>
        <li>⭐ Stars: {repo.stargazers_count}</li>
        <li>🍴 Forks: {repo.forks_count}</li>
        <li>🐞 Open issues: {repo.open_issues_count}</li>
        <li>👀 Subscribers: {repo.subscribers_count}</li>
      </ul>
    </div>
  );
}
