const GITHUB_API_BASE = "https://api.github.com";

export async function fetchGitHubUser(username: string) {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchGitHubRepos(username: string) {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=20`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${response.statusText}`);
  }
  
  const repos = await response.json();
  
  // Filter out forked repositories and sort by stars/recency
  return repos
    .filter((repo: any) => !repo.fork)
    .sort((a: any, b: any) => {
      // Prioritize repos with stars, then by updated date
      if (a.stargazers_count !== b.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
}
