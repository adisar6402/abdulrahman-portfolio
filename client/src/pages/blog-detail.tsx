import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { useLocation } from "wouter";

interface BlogDetailProps {
  params: { slug: string };
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const [, setLocation] = useLocation();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === params.slug);
    setPost(foundPost || null);
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8 p-0 h-auto font-normal text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>

          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
            />

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/^# /gm, '<h1 class="text-3xl font-bold mb-6 mt-8">')
                  .replace(/^## /gm, '<h2 class="text-2xl font-semibold mb-4 mt-6">')
                  .replace(/^### /gm, '<h3 class="text-xl font-medium mb-3 mt-4">')
                  .replace(/^\- /gm, '<li>')
                  .replace(/^\d+\. /gm, '<li>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^(?!<)/gm, '<p class="mb-4">')
                  .replace(/<p class="mb-4">(<h[1-6])/g, '$1')
                  .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
              }}
            />
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-semibold mb-2">About the Author</h3>
                <p className="text-muted-foreground">
                  Abdulrahman Adisa Amuda - Machine Learning Engineer, Mobile App Developer, and Full Stack Developer
                </p>
              </div>
              <Button onClick={() => setLocation("/#contact")}>
                Get in Touch
              </Button>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}