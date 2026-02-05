export function RepoCardSkeleton() {
  return (
    <li className="repo-card skeleton">
      <div className="repo-card-header">
        <div className="skeleton-checkbox" />
        <div className="skeleton-title" />
      </div>
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
    </li>
  );
}
