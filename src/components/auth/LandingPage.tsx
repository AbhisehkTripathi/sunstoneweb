'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
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
  Shield,
  User,
  Mail
} from 'lucide-react';
import { cn } from '@/libs/utils';
import heroBackground from '@/assets/hero-background.jpg';
import aboutIllustration from '@/assets/about-illustration.jpg';
import appMockup1 from '@/assets/app-mockup-1.jpg';
import appMockup2 from '@/assets/app-mockup-2.jpg';

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
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/20'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Teacher',
    content: 'Sunstone Mind has become my daily refuge. The meditation library helped me find peace during the most stressful moments.',
    rating: 5,
    bgColor: 'bg-gradient-to-br from-primary/10 to-primary/5'
  },
  {
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    content: 'The mood tracking feature opened my eyes to patterns I never noticed. It\'s like having a gentle guide for my emotional wellness.',
    rating: 5,
    bgColor: 'bg-gradient-to-br from-secondary/10 to-secondary/5'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Healthcare Worker',
    content: 'Finding a therapist through Sunstone Mind was seamless. The platform creates such a safe, nurturing environment.',
    rating: 5,
    bgColor: 'bg-gradient-to-br from-accent/10 to-accent/5'
  }
];

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const router = useRouter();
  const { user } = useUser();

  const handleExploreFeatures = () => {
    router.push('/explore-features');
  };

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
      router.replace('/auth?mode=sign-in');
    }
  };
  
    const handleSignIn = () => {
      router.replace('/auth?mode=sign-in');
    };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sunstone Mind
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <SignedOut>
              <Button variant="ghost" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button onClick={handleStartJourney} className="rounded-2xl">
                Get Started
              </Button>
            </SignedOut>
            
            <SignedIn>
              <div className="flex items-center space-x-4">
                <Button onClick={() => router.push('/dashboard')} variant="ghost">
                  Dashboard
                </Button>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-lg animate-pulse delay-500" />
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary mr-3" />
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-4 py-2">
                Your Wellness Sanctuary
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Bring Light and
              </span>
              <br />
              <span className="text-foreground">Calmness to Your Mind</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              A digital sanctuary where mindfulness meets modern technology. 
              Discover therapy, meditation, and community support designed to nurture your mental wellness journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleStartJourney}
                className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 text-lg rounded-2xl shadow-wellness-medium hover:shadow-wellness-large transition-all duration-300 hover:scale-105"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleExploreFeatures}
                className="border-primary/30 text-primary hover:bg-primary/5 px-8 py-4 text-lg rounded-2xl"
              >
                <Play className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-wellness-calm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in">
            <Badge variant="outline" className="text-secondary border-secondary/30 bg-secondary/5 mb-6">
              Wellness Tools
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Everything You Need for
              <span className="block text-secondary">Mental Wellness</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughtfully designed features that adapt to your unique wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <Card 
                  key={index}
                  className={cn(
                    "wellness-card hover:scale-[1.02] transition-all duration-500 border-2 group cursor-pointer",
                    feature.borderColor,
                    feature.bgColor
                  )}
                >
                  <CardContent className="p-8">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
                      feature.bgColor.replace('/10', '/20')
                    )}>
                      <Icon className={cn("w-8 h-8", feature.color)} />
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <div className={cn(
                      "flex items-center text-sm font-medium transition-colors group-hover:translate-x-2 transition-transform duration-300",
                      feature.color
                    )}>
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About/Mission Section */}
      <section className="py-24 bg-gradient-to-r from-wellness-healing to-wellness-peace">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-8 animate-slide-up">
              <div>
                <Badge variant="outline" className="text-accent border-accent/30 bg-accent/5 mb-6">
                  Our Mission
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Mental Health Should Be
                  <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
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
            
            <div className="relative animate-scale-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" />
              <Image
                src={aboutIllustration} 
                alt="Mental wellness illustration" 
                className="relative w-full h-auto rounded-2xl shadow-wellness-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots/Demo Section */}
      <section className="py-24 bg-gradient-to-b from-background to-wellness-warmth">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in">
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 mb-6">
              See It In Action
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              A Glimpse Into Your
              <span className="block text-primary">Wellness Sanctuary</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how Sunstone Mind creates a seamless, calming experience for your mental wellness journey
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Mobile mockup */}
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-primary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gradient-to-br from-card to-card/80 p-8 rounded-3xl shadow-wellness-large">
                  <Image 
                    src={appMockup1} 
                    alt="Sunstone Mind mobile app dashboard" 
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-wellness-medium"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Daily Wellness Dashboard</h3>
                    <p className="text-muted-foreground">Track your mood, meditation progress, and wellness goals</p>
                  </div>
                </div>
              </div>

              {/* Tablet mockup */}
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-secondary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gradient-to-br from-card to-card/80 p-8 rounded-3xl shadow-wellness-large">
                  <Image 
                    src={appMockup2} 
                    alt="Sunstone Mind meditation library" 
                    className="w-full rounded-2xl shadow-wellness-medium"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Meditation & Music Library</h3>
                    <p className="text-muted-foreground">Curated audio experiences for every mood and moment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-wellness-peace to-wellness-calm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="outline" className="text-accent border-accent/30 bg-accent/5 mb-6">
              User Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Real People,
              <span className="block text-accent">Real Transformations</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="relative overflow-hidden rounded-3xl">
              <Card className={cn(
                "wellness-card border-none p-12 text-center transition-all duration-500",
                testimonials[currentTestimonial].bgColor
              )}>
                <CardContent className="space-y-8">
                  <Quote className="w-12 h-12 text-accent mx-auto opacity-60" />
                  
                  <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-2">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  <div>
                    <div className="font-semibold text-lg text-foreground">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-accent/30 hover:bg-accent/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      currentTestimonial === index 
                        ? "bg-accent scale-125" 
                        : "bg-accent/30 hover:bg-accent/50"
                    )}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"  
                onClick={nextTestimonial}
                className="rounded-full border-accent/30 hover:bg-accent/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90" />
        
        {/* Floating elements */}
        <div className="absolute top-16 left-16 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center mb-8">
              <Sun className="w-8 h-8 text-white mr-3" />
              <Moon className="w-8 h-8 text-white ml-3" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Your Mind Deserves Peace.
              <span className="block">Start Today.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands who have found their path to mental wellness. 
              Your journey to inner peace begins with a single step.
            </p>

            {/* Auth Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4 text-lg">Create Your Account</h3>
                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-white text-primary hover:bg-white/90 px-6 py-3 text-lg rounded-xl"
                    disabled
                  >
                    <User className="w-5 h-5 mr-2" />
                    Sign Up Free
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full border-white/30 text-white hover:bg-white/10 px-6 py-3 text-lg rounded-xl"
                    disabled
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                  
                  <p className="text-xs text-white/70 text-center mt-2">
                    Requires Supabase integration
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-white/80 mb-3">Or explore as guest</div>
                <Button 
                  size="lg"
                  onClick={handleStartJourney}
                  className="bg-white text-primary hover:bg-white/95 px-8 py-4 text-xl rounded-2xl shadow-wellness-large hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Get Started Free
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex justify-center items-center space-x-8 text-white/60 text-sm flex-wrap gap-4">
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