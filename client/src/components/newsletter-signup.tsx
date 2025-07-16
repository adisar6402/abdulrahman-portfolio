import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Simulate newsletter signup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscribed!",
        description: "Thanks for subscribing to my newsletter. You'll receive updates about my latest projects and tech insights.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass p-6 rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
          <Mail className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-lg">Stay Updated</h3>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">
        Get the latest updates on my projects, tech insights, and industry trends.
      </p>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-background/50 border-muted-foreground/20 focus:border-primary"
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  );
}