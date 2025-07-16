import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGitHubRepos } from "@/hooks/use-github-data";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { format } from "date-fns";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: repos, isLoading } = useGitHubRepos();

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ml", label: "Machine Learning" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
  ];

  const categorizeProject = (repo: any) => {
    const name = repo.name.toLowerCase();
    const description = repo.description?.toLowerCase() || "";
    
    if (name.includes("ai") || name.includes("ml") || description.includes("ai") || description.includes("machine learning")) {
      return ["ml", "web"];
    }
    if (name.includes("flutter") || name.includes("mobile") || description.includes("flutter") || description.includes("mobile")) {
      return ["mobile"];
    }
    return ["web"];
  };

  const filteredRepos = repos?.filter((repo: any) => {
    if (activeFilter === "all") return true;
    const categories = categorizeProject(repo);
    return categories.includes(activeFilter);
  }) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">
            A showcase of my latest work in Machine Learning, Web Development, and Mobile Apps
          </p>
        </motion.div>

        {/* Project Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                  : "glass hover:bg-white/20"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="glass p-6 rounded-2xl animate-pulse">
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="flex space-x-2 mb-4">
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="flex space-x-2">
                    <div className="h-4 w-4 bg-muted rounded"></div>
                    <div className="h-4 w-4 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredRepos.map((repo: any) => (
                <motion.div
                  key={repo.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="project-card glass p-6 rounded-2xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl">
                        {repo.name.toLowerCase().includes("ai") ? "🤖" : 
                         repo.name.toLowerCase().includes("flutter") ? "📱" : "🌐"}
                      </div>
                      <h3 className="text-xl font-bold">{repo.name}</h3>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">{repo.stargazers_count}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics?.slice(0, 2).map((topic: string) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Updated {format(new Date(repo.updated_at), "MMM d, yyyy")}
                    </span>
                    <div className="flex space-x-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            className="magnetic-btn glass hover:bg-white/20 px-8 py-6 text-lg"
          >
            <a
              href="https://github.com/adisar6402"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
