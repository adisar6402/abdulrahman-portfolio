import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Brain, Download } from "lucide-react";

export default function AIResumeReader() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setAnalysis(null);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setAnalysis(`
## AI Resume Analysis

**Overall Score**: 8.5/10

**Key Strengths:**
• Strong technical skills in Machine Learning, Python, and Flutter
• Excellent project portfolio with real-world applications
• Good balance of theoretical knowledge and practical experience
• Active open-source contributor with multiple GitHub repositories

**Experience Summary:**
• **Machine Learning**: Advanced proficiency in TensorFlow, PyTorch, and scikit-learn
• **Mobile Development**: Expert-level Flutter/Dart development
• **Backend**: Strong Python web development skills with Django/Flask
• **AI/ML Projects**: NaijaSmart-AI and other innovative solutions

**Skills Highlight:**
• Programming: Python, Dart, JavaScript, SQL
• Frameworks: Flutter, React, Django, TensorFlow
• Databases: PostgreSQL, MongoDB, Firebase
• Cloud: AWS, Google Cloud Platform

**Recommendations:**
1. Add more quantifiable achievements (e.g., "improved app performance by 40%")
2. Include certifications in AI/ML from recognized platforms
3. Highlight leadership experience in team projects
4. Consider adding publications or research papers

**Best Fit For:**
• Senior ML Engineer positions
• Full-stack developer roles with AI focus
• Mobile app development lead
• Tech startup CTO opportunities
    `);
    
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: "AI has analyzed your resume and provided detailed insights.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="glass hover:bg-white/20 transition-all"
        >
          <Brain className="mr-2 h-4 w-4" />
          AI Resume Reader
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Resume Analysis</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"
            >
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-muted-foreground mb-4">
                Upload a PDF resume and let AI analyze your skills, experience, and career potential.
              </p>
              <label className="cursor-pointer">
                <Button className="mb-2">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose PDF File
                </Button>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground">
                Maximum file size: 10MB
              </p>
            </motion.div>
          )}

          {file && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Analysis Results</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const blob = new Blob([analysis], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'resume-analysis.md';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="mr-2 h-3 w-3" />
                    Export
                  </Button>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/30 p-6 rounded-lg">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: analysis
                        .replace(/^## (.*)/gm, '<h2 class="text-lg font-semibold mb-3 text-primary">$1</h2>')
                        .replace(/^\*\*(.*)\*\*/gm, '<h3 class="font-medium mb-2">$1</h3>')
                        .replace(/^• (.*)/gm, '<li class="mb-1">$1</li>')
                        .replace(/^(\d+)\. (.*)/gm, '<li class="mb-1">$2</li>')
                        .replace(/\n\n/g, '</p><p class="mb-3">')
                        .replace(/^(?!<)/gm, '<p class="mb-3">')
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}