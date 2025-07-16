import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser, fetchGitHubRepos } from "@/lib/github-api";

export function useGitHubData() {
  return useQuery({
    queryKey: ["github-user"],
    queryFn: () => fetchGitHubUser("adisar6402"),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useGitHubRepos() {
  return useQuery({
    queryKey: ["github-repos"],
    queryFn: () => fetchGitHubRepos("adisar6402"),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
