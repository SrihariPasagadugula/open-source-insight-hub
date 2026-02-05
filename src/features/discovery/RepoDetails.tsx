import { useEffect, useState } from "react";
import { getRepositoryDetails, GithubApiError } from "../../api/githubApi";
import type { GithubRepoDetails } from "../../api/githubApi";
import { RepoDetailsSkeleton } from "../../components/RepoDetailsSkeleton";

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

  if (loading) return <RepoDetailsSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!repo) return null;

  return (
    <div className="repo-details">
      <h3 className="repo-details-title">{repo.full_name}</h3>
      <p className="repo-details-description">{repo.description}</p>

      <ul className="repo-stats">
        <li>
          ⭐ Stars <strong>{repo.stargazers_count}</strong>
        </li>
        <li>
          🍴 Forks <strong>{repo.forks_count}</strong>
        </li>
        <li>
          🐞 Open Issues <strong>{repo.open_issues_count}</strong>
        </li>
        <li>
          👀 Subscribers <strong>{repo.subscribers_count}</strong>
        </li>
      </ul>
    </div>
  );
}
