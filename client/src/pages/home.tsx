import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AIChatAssistant from "@/components/ai-chat-assistant";
import FloatingContactButtons from "@/components/floating-contact-buttons";
import RecentProjectsFeed from "@/components/recent-projects-feed";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <div>
            <ProjectsSection />
            <BlogSection />
            <ContactSection />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <RecentProjectsFeed />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
      <AIChatAssistant />
      <FloatingContactButtons />
    </div>
  );
}
