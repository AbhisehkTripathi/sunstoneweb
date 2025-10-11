"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Calendar, 
  Music, 
  Users, 
  ArrowRight,
  Star,
  Quote,
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Leaf,
  Sun,
  Moon,
  Shield
} from 'lucide-react';
import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
const features = [
  {
    icon: Heart,
    title: 'Daily Mood Tracking',
    description: 'Monitor your emotional journey with gentle check-ins and insightful patterns that help you understand your mental wellness.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20'
  },
  {
    icon: Calendar,
    title: 'Therapy & Consultations',
    description: 'Connect with licensed therapists through our secure platform. Professional support when you need it most.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/20'
  },
  {
    icon: Music,
    title: 'Guided Meditation & Music',
    description: 'Curated audio experiences designed to calm your mind, improve focus, and promote restful sleep.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Join safe spaces where you can share experiences, find encouragement, and build meaningful connections.',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Teacher',
    content: 'Sunstone Mind has become my daily refuge. The meditation library helped me find peace during the most stressful moments.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    content: 'The mood tracking feature opened my eyes to patterns I never noticed. It\'s like having a gentle guide for my emotional wellness.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Healthcare Worker',
    content: 'Finding a therapist through Sunstone Mind was seamless. The platform creates such a safe, nurturing environment.',
    rating: 5
  }
];

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);  
  const router = useRouter();
  const { user } = useUser();
  const [scrollY, setScrollY] = useState(0);
  type SectionKey = 'hero' | 'features' | 'mission' | 'demo' | 'testimonials';
const sectionKeys: SectionKey[] = ['features', 'mission', 'demo', 'testimonials'];
const [isVisible, setIsVisible] = useState<Record<SectionKey, boolean>>({
    hero: false,
    features: false,
    mission: false,
    demo: false,
    testimonials: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Check visibility of sections
      sectionKeys.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
          if (isInView && !isVisible[section]) {
            setIsVisible((prev) => ({ ...prev, [section]: true }));
          }
        }
      });
    };

    setIsVisible(prev => ({ ...prev, hero: true }));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleStartJourney = () => {
    if (user) {
      router.push('/getstarted');
    } else {
      router.replace('/register-user');
    }
  };
  
    const handleSignIn = () => {
      router.replace('/register-user');
    };


  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-wellness-calm/20 to-background">
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div 
          className="mx-auto max-w-7xl px-6 py-4 transition-all duration-500"
          style={{
            backgroundColor: scrollY > 50 ? 'rgba(250, 252, 253, 0.95)' : 'transparent',
            backdropFilter: scrollY > 50 ? 'blur(12px)' : 'none',
            boxShadow: scrollY > 50 ? '0 2px 8px rgba(167, 228, 224, 0.06)' : 'none',
            borderRadius: scrollY > 50 ? '0 0 24px 24px' : '0'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-float-gentle">
              <img src="/happy.svg" alt="Happy" className="w-10 h-10" />
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300" onClick={handleSignIn}>
                Sign In
              </button>
              <button className="px-6 py-2 text-sm font-medium bg-gradient-primary text-foreground rounded-full hover:shadow-wellness-medium transition-all duration-300 hover:-translate-y-0.5" onClick={handleStartJourney}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-gentle"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute bottom-32 right-16 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-gentle"
            style={{ animationDelay: '2s' }}
          />
          <div 
            className="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary/5 rounded-full blur-2xl animate-float-gentle"
            style={{ animationDelay: '1s' }}
          />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div 
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <Sparkles className="w-6 h-6 text-primary mr-3 animate-pulse-glow" />
              <span className="px-5 py-2 text-sm font-medium text-primary border border-primary/20 bg-primary/5 rounded-full">
                Your Wellness Sanctuary
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in" style={{ lineHeight: '1.25' }}>
              <span 
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-shimmer mb-1 pb-2"
                style={{ backgroundSize: '200% auto' }}
              >Bring Light and
              </span>
              <span className="block text-foreground/90">Calmness to Your Mind</span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: '300ms' }}
            >
              A digital sanctuary where mindfulness meets modern technology. 
              Discover therapy, meditation, and community support designed to nurture your mental wellness journey.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in"
              style={{ animationDelay: '600ms' }}
            >
              <button className="group px-8 py-4 text-lg font-medium bg-gradient-primary text-foreground rounded-2xl shadow-wellness-soft hover:shadow-wellness-medium transition-all duration-500 hover:-translate-y-1 flex items-center" onClick={handleStartJourney}>
                <Leaf className="w-5 h-5 mr-2 animate-float-gentle" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group px-8 py-4 text-lg font-medium text-primary border border-primary/30 rounded-2xl hover:bg-primary/5 transition-all duration-500 flex items-center" onClick={handleStartJourney}>
                <Play className="w-5 h-5 mr-2" />
                Explore Features
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-5 py-2 text-sm font-medium text-secondary border border-secondary/20 bg-secondary/5 rounded-full mb-6">
              Wellness Tools
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Everything You Need for
              <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mt-2">
                Mental Wellness
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughtfully designed features that adapt to your unique wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div
                  key={index}
                  className={`group relative bg-card border border-border rounded-3xl p-8 hover:shadow-wellness-medium transition-all duration-700 cursor-pointer ${
                    isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-float-gentle`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <div className={`flex items-center text-sm font-medium ${feature.color} group-hover:translate-x-2 transition-transform duration-300`}>
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-gradient-to-br from-wellness-healing/20 to-wellness-peace/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div 
              className={`space-y-8 transition-all duration-1000 ${
                isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div>
                <span className="inline-block px-5 py-2 text-sm font-medium text-accent border border-accent/20 bg-accent/5 rounded-full mb-6">
                  Our Mission
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Mental Health Should Be
                  <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mt-2">
                    Accessible to Everyone
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We believe that everyone deserves a safe space to nurture their mental wellness. 
                  Sunstone Mind was born from the understanding that healing happens when we combine 
                  professional support with personal reflection and community connection.
                </p>
                
                <p>
                  Our platform brings together evidence-based practices, licensed professionals, 
                  and a supportive community to create a comprehensive wellness ecosystem that 
                  adapts to your unique journey.
                </p>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Licensed Therapists</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">4.9★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>
            
            <div 
              className={`relative transition-all duration-1000 ${
                isVisible.mission ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 text-primary mx-auto animate-float-gentle" />
                  <p className="text-2xl font-semibold text-foreground">Your Wellness Journey</p>
                  <p className="text-muted-foreground">Starts with a single step</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24">
        <div className="container mx-auto px-6">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible.demo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-5 py-2 text-sm font-medium text-primary border border-primary/20 bg-primary/5 rounded-full mb-6">
              See It In Action
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              A Glimpse Into Your
              <span className="block text-primary mt-2">Wellness Sanctuary</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how Sunstone Mind creates a seamless, calming experience
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {[
                { title: 'Daily Wellness Dashboard', desc: 'Track your mood, meditation progress, and wellness goals' },
                { title: 'Meditation & Music Library', desc: 'Curated audio experiences for every mood and moment' }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-1000 ${
                    isVisible.demo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute -inset-6 bg-gradient-primary rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative bg-card border border-border rounded-3xl p-8 hover:shadow-wellness-large transition-all duration-500">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-6 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto flex items-center justify-center animate-float-gentle">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">App Preview</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-r from-wellness-peace/20 to-wellness-calm/20">
        <div className="container mx-auto px-6">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-5 py-2 text-sm font-medium text-accent border border-accent/20 bg-accent/5 rounded-full mb-6">
              User Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Real People,
              <span className="block text-accent mt-2">Real Transformations</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-card border border-border rounded-3xl p-12 shadow-wellness-medium">
              <Quote className="w-12 h-12 text-accent/40 mx-auto mb-6" />
              
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed text-center mb-8">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              <div className="text-center">
                <div className="font-semibold text-lg text-foreground">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-muted-foreground">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center hover:bg-accent/10 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-accent" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === index 
                        ? 'w-8 bg-accent' 
                        : 'w-2 bg-accent/30 hover:bg-accent/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center hover:bg-accent/10 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-accent" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/90 to-accent/90" />
        
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-gentle" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8 animate-float-gentle">
              <Sun className="w-8 h-8 text-white/90 mr-3" />
              <Moon className="w-8 h-8 text-white/90 ml-3" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Your Mind Deserves Peace.
              <span className="block mt-2">Start Today.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands who have found their path to mental wellness. 
              Your journey to inner peace begins with a single step.
            </p>

            <button className="group px-10 py-5 text-xl font-medium bg-white text-primary hover:bg-white/95 rounded-2xl shadow-wellness-large hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex items-center mx-auto">
              <Sparkles className="w-6 h-6 mr-3 animate-pulse-glow" />
              Get Started Free
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <div className="flex justify-center items-center space-x-8 text-white/70 text-sm mt-12 flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>10K+ Happy Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}