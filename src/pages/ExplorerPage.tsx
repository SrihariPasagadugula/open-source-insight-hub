import { RepoDiscovery } from "../features/discovery/RepoDiscovery";

export function ExplorerPage() {
  return (
    <main className="page">
      <h1 className="page-title">Open-Source Insight Hub</h1>
      <RepoDiscovery />
    </main>
  );
}
