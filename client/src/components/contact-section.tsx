import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, GraduationCap } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    toast({
      title: "Error",
      description: "There was a problem sending your message. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/adisar6402",
      icon: Github,
      color: "bg-gray-700 hover:bg-gray-600",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abdulrahman--engineering-ai-ml",
      icon: Linkedin,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      url: "https://x.com/RahmanAdis42469",
      icon: Twitter,
      color: "bg-blue-400 hover:bg-blue-500",
    },
    {
      name: "ORCID",
      url: "https://orcid.org/0009-0009-1207-8458",
      icon: GraduationCap,
      color: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background/50 border-muted-foreground/20 focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background/50 border-muted-foreground/20 focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-background/50 border-muted-foreground/20 focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full magnetic-btn bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-6 text-lg"
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">adisar6402@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-muted-foreground">Abuja, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${social.color} text-white rounded-xl p-4 flex items-center space-x-3 transition-colors hover:underline`}
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
