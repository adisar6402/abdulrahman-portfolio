import { motion } from "framer-motion";
import { useGitHubData } from "@/hooks/use-github-data";
import {
  SiPython,
  SiFlutter,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGithub,
  SiTailwindcss,
  SiReact,
} from "react-icons/si";

export default function AboutSection() {
  const { data: githubData } = useGitHubData();

  const techStack = [
    { icon: SiPython, name: "Python", color: "text-blue-500" },
    { icon: SiFlutter, name: "Flutter", color: "text-cyan-500" },
    { icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
    { icon: SiReact, name: "React", color: "text-blue-400" },
    { icon: SiHtml5, name: "HTML5", color: "text-orange-500" },
    { icon: SiCss3, name: "CSS3", color: "text-blue-600" },
    { icon: SiTailwindcss, name: "Tailwind CSS", color: "text-cyan-400" },
    { icon: SiGithub, name: "GitHub", color: "text-gray-700 dark:text-gray-300" },
  ];

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
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm Abdulrahman Adisa Amuda — a Machine Learning Engineer, Mobile App
            Developer (Flutter), and Full Stack Python Developer passionate about
            building impactful digital solutions. I specialize in web, mobile, and
            AI-powered applications, with strong hands-on experience using Flutter,
            Dart, Python, and modern JavaScript stacks. I'm IBM-certified and
            currently focused on high-impact projects across fintech, logistics,
            and public service.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-16"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="tech-icon glass p-6 rounded-2xl text-center cursor-pointer"
            >
              <tech.icon className={`text-4xl ${tech.color} mb-3 mx-auto`} />
              <p className="font-semibold text-sm">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="glass p-8 rounded-2xl text-center"
          >
            <div className="text-4xl font-bold text-blue-500 mb-2">295</div>
            <p className="text-muted-foreground">GitHub Contributions</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="glass p-8 rounded-2xl text-center"
          >
            <div className="text-4xl font-bold text-emerald-500 mb-2">
              {githubData?.public_repos || "6+"}
            </div>
            <p className="text-muted-foreground">Public Repositories</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="glass p-8 rounded-2xl text-center"
          >
            <div className="text-4xl font-bold text-purple-500 mb-2">
              {githubData?.followers || "1"}
            </div>
            <p className="text-muted-foreground">GitHub Followers</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
