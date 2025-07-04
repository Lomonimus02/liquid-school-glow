import InteractiveBackground from "@/components/InteractiveBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScheduleAnimationSection from "@/components/ScheduleAnimation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Interactive animated background */}
      <InteractiveBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>
        
        {/* Features Section */}
        <section id="features">
          <FeaturesSection />
        </section>
        
        {/* Schedule Animation Section */}
        <section id="schedule">
          <ScheduleAnimationSection />
        </section>
        
        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
