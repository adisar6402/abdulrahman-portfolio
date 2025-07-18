# 🚀 Abdulrahman Adisa Amuda - Personal Portfolio

Welcome to my professional developer portfolio — a full-stack, production-ready platform showcasing my skills, projects, and services with integrated AI and powerful forms. Built using **Vite + React + TypeScript + Express.js**.

🌐 **Live URL**: [https://abdulrahman-portfolio.onrender.com](https://abdulrahman-portfolio.onrender.com)

---

## ✨ Features

- 🔥 **Modern UI**: Clean, animated interface with responsive design (desktop + mobile)
- 🧠 **AI Resume Reader**: Upload a resume and get AI-generated feedback (mocked demo)
- 📬 **Contact Form**: Send me a message directly from the website
- 💼 **Hire Me Form**: Share your project needs and get in touch for work
- 📧 **Newsletter Signup**: Subscribe to receive updates
- 🌍 **GitHub Proxy API**: Fetch and showcase repositories & profile via secure API
- 🔒 **Secure with Environment Variables**: Secrets managed via `.env`
- 🛠️ **Vite + Express Setup**: Optimized SSR-like static site served from backend

---

## 🗂️ Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| Frontend      | React, TypeScript, Tailwind CSS, Vite           |
| Backend       | Node.js, Express, TypeScript                    |
| UI Animations | Framer Motion                                   |
| Email         | Nodemailer (Gmail SMTP)                         |
| Build Tools   | Esbuild, Cross-env, tsx                         |
| Hosting       | Render (free web service)                       |

---

## 📁 Folder Structure

```
/
├── public/                 # Static assets
├── src/                   # Frontend React components
├── server/
│   ├── index.ts           # Express server entry point
│   ├── routes.ts          # API routes (contact, hire, resume)
│   ├── vite.ts            # Vite static serving setup
│   ├── storage.ts         # Temp/in-memory storage (e.g. stats)
│   └── .env               # Email credentials (not committed)
├── dist/                  # Compiled server build
├── package.json
└── README.md
```

---

## ⚙️ Getting Started Locally

> Prerequisites: Node.js v18+, npm, Git

```bash
# Clone the repo
git clone https://github.com/adisar6402/abdulrahman-portfolio.git
cd abdulrahman-portfolio

# Install dependencies
npm install

# Create environment file
echo "EMAIL_USER=youremail@gmail.com" >> server/.env
echo "EMAIL_PASS=your_app_password" >> server/.env

# Run dev server
npm run dev
```

---

## 🚀 Deployment

Deployed on [Render](https://render.com/) as a **Web Service**

### 📦 Build Command:
```bash
npm install && npm run build
```

### 🚀 Start Command:
```bash
npm run start
```

> Note: `start` command uses dynamic port and 0.0.0.0 host for Render compatibility.

---

## 🛡️ Environment Variables

All sensitive data is stored in `server/.env`:

```env
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
```

Do **NOT** commit `.env`. Ensure this is in your `.gitignore`:

```bash
server/.env
```

---

## 📄 License

This project is **not open-source** and is for personal/professional use only. © Abdulrahman Adisa Amuda

---

## 🙌 Author

**Abdulrahman Adisa Amuda**

- 🧠 Full-Stack Developer | AI/ML Enthusiast
- 🧰 Building impactful tech with React, Flutter, Python, and Node
- 🐙 GitHub: [github.com/adisar6402](https://github.com/adisar6402)

---

> Built with 💻, ☕, and lots of 🚀 energy.
