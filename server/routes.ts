import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub proxy endpoints to avoid CORS issues
  app.get("/api/github/user/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("GitHub user fetch error:", error);
      res.status(500).json({ error: "Failed to fetch GitHub user data" });
    }
  });

  app.get("/api/github/repos/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
      
      const repos = await response.json();
      
      // Filter out forked repositories and sort by relevance
      const filteredRepos = repos
        .filter((repo: any) => !repo.fork)
        .sort((a: any, b: any) => {
          // Prioritize repos with stars, then by updated date
          if (a.stargazers_count !== b.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
      
      res.json(filteredRepos);
    } catch (error) {
      console.error("GitHub repos fetch error:", error);
      res.status(500).json({ error: "Failed to fetch GitHub repositories" });
    }
  });

  // Contact form endpoint (mock - replace with real email service)
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
      // In a real implementation, you would:
      // 1. Send email via SendGrid, Nodemailer, etc.
      // 2. Store in database
      // 3. Send confirmation email
      
      console.log("Contact form submission:", { name, email, message });
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
