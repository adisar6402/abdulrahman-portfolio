import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, X } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Abdulrahman's AI assistant. Ask me about his projects, skills, or experience!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responses: Record<string, string> = {
    "What's your best project?": "I'd say NaijaSmart-AI is my standout project! It's a responsive AI productivity web app that showcases my skills in JavaScript, HTML, and CSS. It features a simulated AI chatbot, note summarizer, and task generator. You can check it out on my GitHub!",
    "Show me Flutter work": "While I'm passionate about Flutter development, most of my current public repositories focus on web technologies. I'm actively working on Flutter projects and will be sharing them soon. My experience includes building cross-platform mobile apps with Dart and Flutter framework.",
    "Tell me about skills": "I specialize in Machine Learning, Mobile App Development with Flutter/Dart, and Full Stack Python development. I'm proficient in JavaScript, HTML5, CSS3, and have experience with modern frameworks. I'm also IBM-certified and passionate about leveraging technology for environmental sustainability.",
  };

  const quickQuestions = [
    "What's your best project?",
    "Show me Flutter work",
    "Tell me about skills",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (message: string): string => {
    const normalizedMessage = message.toLowerCase();
    
    // Check for exact matches first
    const exactMatch = Object.keys(responses).find(
      key => key.toLowerCase() === normalizedMessage
    );
    if (exactMatch) return responses[exactMatch];

    // Check for partial matches
    if (normalizedMessage.includes("project") || normalizedMessage.includes("best")) {
      return responses["What's your best project?"];
    }
    if (normalizedMessage.includes("flutter") || normalizedMessage.includes("mobile")) {
      return responses["Show me Flutter work"];
    }
    if (normalizedMessage.includes("skill") || normalizedMessage.includes("technology")) {
      return responses["Tell me about skills"];
    }
    if (normalizedMessage.includes("experience") || normalizedMessage.includes("background")) {
      return "Abdulrahman has experience in Machine Learning, Full Stack Python development, and Flutter/Dart mobile app development. He's IBM-certified and has worked on projects across fintech, logistics, and public service domains.";
    }
    if (normalizedMessage.includes("contact") || normalizedMessage.includes("hire") || normalizedMessage.includes("work")) {
      return "You can reach out to Abdulrahman through the contact form on this site, or connect with him on GitHub, LinkedIn, or via email at adisar6402@gmail.com. He's always open to discussing new opportunities!";
    }

    return "That's a great question! I'd recommend checking out Abdulrahman's GitHub profile or reaching out through the contact form for more specific information about his work and experience.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-full shadow-2xl"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 h-96 glass rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <span className="font-semibold">AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-hide h-64">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex space-x-2 ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                    message.isUser 
                      ? "bg-slate-400" 
                      : "bg-gradient-to-r from-blue-500 to-emerald-500"
                  }`}>
                    {message.isUser ? "👤" : <Bot className="h-3 w-3" />}
                  </div>
                  <div className={`p-3 rounded-xl max-w-xs text-sm ${
                    message.isUser 
                      ? "bg-blue-500 text-white" 
                      : "glass"
                  }`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex space-x-2"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                    <Bot className="h-3 w-3" />
                  </div>
                  <div className="glass p-3 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex space-x-2 mb-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-background/50 border-muted-foreground/20 text-sm"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs px-2 py-1 h-auto bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                  >
                    {question.split(" ").slice(0, 2).join(" ")}?
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
