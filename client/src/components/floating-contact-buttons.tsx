import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Plus, X } from "lucide-react";

export default function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/2348023155814",
      color: "bg-green-500 hover:bg-green-600",
      hoverText: "Chat on WhatsApp"
    },
    {
      name: "Telegram",
      icon: Send,
      url: "https://t.me/adisar6402",
      color: "bg-blue-500 hover:bg-blue-600",
      hoverText: "Message on Telegram"
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="relative">
        {/* Contact Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-0 space-y-3"
            >
              {contactOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Button
                    asChild
                    className={`w-12 h-12 rounded-full shadow-lg ${option.color} text-white`}
                  >
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <option.icon className="h-5 w-5" />
                    </a>
                  </Button>
                  
                  {/* Tooltip */}
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {option.hoverText}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}