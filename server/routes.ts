import type { Express } from "express";
import { createServer, type Server } from "http";
import { Resend } from "resend";

export async function registerRoutes(app: Express): Promise<Server> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  app.get("/api/github/user/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
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
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
      if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
      const repos = await response.json();
      const filteredRepos = repos
        .filter((repo: any) => !repo.fork)
        .sort((a: any, b: any) => {
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

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      await resend.emails.send({
        from: process.env.RESEND_SENDER!,
        to: process.env.RESEND_RECEIVER!,
        subject: `📬 Portfolio Contact - Message from ${name}`,
        html: `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}</p><p>${message}</p>`,
      });

      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.post("/api/hire", async (req, res) => {
    try {
      const {
        name,
        email,
        company,
        projectType,
        budget,
        timeline,
        description,
        preferredDay,
        preferredTime,
      } = req.body;

      if (!name || !email || !projectType || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const html = `
        <p><strong>Name:</strong> ${name}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Company:</strong> ${company || "N/A"}<br/>
        <strong>Project Type:</strong> ${projectType}<br/>
        <strong>Budget:</strong> ${budget || "Not specified"}<br/>
        <strong>Timeline:</strong> ${timeline || "Not specified"}<br/>
        <strong>Preferred Day:</strong> ${preferredDay || "Not specified"}<br/>
        <strong>Preferred Time:</strong> ${preferredTime || "Not specified"}</p>
        <p><strong>Description:</strong><br/>${description}</p>
      `;

      await resend.emails.send({
        from: process.env.RESEND_SENDER!,
        to: process.env.RESEND_RECEIVER!,
        subject: `🚀 New Hire Request from ${name}`,
        html,
      });

      res.json({ success: true, message: "Hire request sent successfully!" });
    } catch (error) {
      console.error("Hire Me error:", error);
      res.status(500).json({ error: "Failed to send hire request." });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Email is required" });

      await resend.emails.send({
        from: process.env.RESEND_SENDER!,
        to: process.env.RESEND_RECEIVER!,
        subject: "📬 New Newsletter Signup",
        html: `<p>New subscriber: <strong>${email}</strong></p>`,
      });

      res.json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
      console.error("Newsletter error:", error);
      res.status(500).json({ error: "Failed to subscribe to newsletter." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}