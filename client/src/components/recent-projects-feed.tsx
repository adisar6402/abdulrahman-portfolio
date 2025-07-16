import { motion } from "framer-motion";
import { useGitHubRepos } from "@/hooks/use-github-data";
import { Github, Clock, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function RecentProjectsFeed() {
  const { data: repos, isLoading } = useGitHubRepos();

  const recentRepos = repos?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg mb-4">Recently Updated</h3>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="glass p-4 rounded-xl animate-pulse">
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Github className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Recently Updated</h3>
      </div>
      
      {recentRepos.map((repo: any, index: number) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="glass p-4 rounded-xl hover:bg-white/20 transition-all cursor-pointer group"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                {repo.name}
              </h4>
              {repo.stargazers_count > 0 && (
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="h-3 w-3" />
                  <span className="text-xs">{repo.stargazers_count}</span>
                </div>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {repo.description || "No description available"}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                {repo.language && (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {repo.language}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </a>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center pt-2"
      >
        <a
          href="https://github.com/adisar6402"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          View all projects →
        </a>
      </motion.div>
    </motion.div>
  );
}