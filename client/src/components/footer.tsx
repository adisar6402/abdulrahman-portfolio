import { motion } from "framer-motion";
import { useGitHubData } from "@/hooks/use-github-data";
import VisitorCounter from "@/components/visitor-counter";
import NewsletterSignup from "@/components/newsletter-signup";

export default function Footer() {
  const { data: githubData } = useGitHubData();

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="font-bold text-xl">Abdulrahman Adisa Amuda</span>
            </div>
            <p className="text-muted-foreground">
              Machine Learning Engineer, Mobile App Developer, and Full Stack
              Developer passionate about building impactful digital solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg mb-4">GitHub Stats</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <span className="font-semibold text-blue-500">
                  {githubData?.public_repos || "6+"}
                </span>{" "}
                Public Repositories
              </p>
              <p>
                <span className="font-semibold text-emerald-500">
                  {githubData?.followers || "1"}
                </span>{" "}
                Followers
              </p>
              <p>
                <span className="font-semibold text-purple-500">295</span>{" "}
                Contributions this year
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <NewsletterSignup />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-border pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-center md:text-left">
              Crafted by Abdulrahman Adisa Amuda © 2025. Built with React, Tailwind CSS, and passion.
            </p>
            <VisitorCounter />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
