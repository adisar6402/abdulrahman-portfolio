import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";

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

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS!,
        },
      });

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `📬 Portfolio Contact - Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      };

      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      });
    } catch (error) {
      console.error("Nodemailer Error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Hire Me form endpoint
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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS!,
        },
      });

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `🚀 New Hire Request from ${name}`,
        text: `
📨 New Hire Me Submission

Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Project Type: ${projectType}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}
Preferred Day: ${preferredDay || "Not specified"}
Preferred Time: ${preferredTime || "Not specified"}

🔍 Project Description:
${description}
        `,
      };

      await transporter.sendMail(mailOptions);

      res.json({ success: true, message: "Hire request sent successfully!" });
    } catch (error) {
      console.error("Hire Me Error:", error);
      res.status(500).json({ error: "Failed to send hire request." });
    }
  });

  // Newsletter signup endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS!,
        },
      });

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: "📬 New Newsletter Signup",
        text: `A new user has subscribed to your newsletter.\n\nEmail: ${email}`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
      console.error("Newsletter Signup Error:", error);
      res.status(500).json({ error: "Failed to subscribe to newsletter." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}