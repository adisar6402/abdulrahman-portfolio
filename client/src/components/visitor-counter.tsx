import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching visitor count
    // In a real implementation, this would connect to your analytics service
    const storedCount = localStorage.getItem("portfolio-visitor-count");
    const currentCount = storedCount ? parseInt(storedCount) + 1 : Math.floor(Math.random() * 500) + 200;
    
    setTimeout(() => {
      setVisitorCount(currentCount);
      localStorage.setItem("portfolio-visitor-count", currentCount.toString());
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Eye className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
    >
      <Eye className="h-4 w-4" />
      <span className="text-sm font-medium">
        {visitorCount.toLocaleString()} visitors this week
      </span>
    </motion.div>
  );
}