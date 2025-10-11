"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Calendar, 
  Music, 
  Users, 
  BookOpen,
  Target,
  Brain,
  Wind,
  TrendingUp,
  ArrowRight,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/libs/utils';

const featureCategories = [
  {
    title: 'Mental Health Tools',
    description: 'Evidence-based practices for emotional wellbeing',
    features: [
      {
        icon: Heart,
        title: 'Mood Tracking',
        description: 'Daily emotional check-ins with personalized insights and pattern recognition',
        benefits: ['Track emotional patterns', 'Identify triggers', 'Celebrate progress'],
        color: 'text-primary',
        bgColor: 'bg-primary/10'
      },
      {
        icon: BookOpen,
        title: 'Mind Journal',
        description: 'Safe space for thoughts, reflections, and gratitude practices',
        benefits: ['Process emotions', 'Practice gratitude', 'Track growth'],
        color: 'text-secondary',
        bgColor: 'bg-secondary/10'
      },
      {
        icon: Brain,
        title: 'Wellness Assessments',
        description: 'Comprehensive quizzes to understand your mental health journey',
        benefits: ['Self-awareness', 'Personalized recommendations', 'Progress tracking'],
        color: 'text-accent',
        bgColor: 'bg-accent/10'
      }
    ]
  },
  {
    title: 'Mindfulness & Relaxation',
    description: 'Guided practices for inner peace and stress relief',
    features: [
      {
        icon: Music,
        title: 'Meditation Library',
        description: 'Curated collection of guided meditations and calming soundscapes',
        benefits: ['Reduce stress', 'Improve focus', 'Better sleep'],
        color: 'text-primary',
        bgColor: 'bg-primary/10'
      },
      {
        icon: Wind,
        title: 'Breathing Exercises',
        description: 'Science-backed breathing techniques for anxiety and stress management',
        benefits: ['Instant calm', 'Anxiety relief', 'Improved focus'],
        color: 'text-secondary',
        bgColor: 'bg-secondary/10'
      }
    ]
  },
  {
    title: 'Professional Support',
    description: 'Connect with licensed mental health professionals',
    features: [
      {
        icon: Users,
        title: 'Community Support',
        description: 'Join safe spaces with others on similar wellness journeys',
        benefits: ['Peer support', 'Shared experiences', 'Anonymous options'],
        color: 'text-destructive',
        bgColor: 'bg-destructive/10'
      }
    ]
  },
  {
    title: 'Personal Growth',
    description: 'Tools and resources for continuous improvement',
    features: [
      {
        icon: Target,
        title: 'Goal Setting',
        description: 'Set and track meaningful wellness goals with smart milestones',
        benefits: ['Clear objectives', 'Progress tracking', 'Motivation boost'],
        color: 'text-primary',
        bgColor: 'bg-primary/10'
      },
      {
        icon: TrendingUp,
        title: 'Progress Analytics',
        description: 'Detailed insights into your wellness journey and improvements',
        benefits: ['Visual progress', 'Pattern recognition', 'Celebrate wins'],
        color: 'text-secondary',
        bgColor: 'bg-secondary/10'
      }
    ]
  }
];

export default function ExploreFeatures() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const router = useRouter();

  const currentCategory = featureCategories[selectedCategory];
  const currentFeature = currentCategory.features[selectedFeature];

  const nextCategory = () => {
    setSelectedCategory((prev) => (prev + 1) % featureCategories.length);
    setSelectedFeature(0);
  };

  const prevCategory = () => {
    setSelectedCategory((prev) => (prev - 1 + featureCategories.length) % featureCategories.length);
    setSelectedFeature(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wellness-calm to-wellness-peace">
      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Explore Features</h1>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => router.push('/getstarted')}
              className="border-primary/30 hover:bg-primary/5"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Category navigation */}
      <div className="p-6 bg-card/50 border-b border-border/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevCategory}
              className="border-primary/30 hover:bg-primary/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <Badge variant="outline" className="mb-2">
                {selectedCategory + 1} of {featureCategories.length}
              </Badge>
              <h2 className="text-3xl font-bold text-foreground">{currentCategory.title}</h2>
              <p className="text-muted-foreground mt-1">{currentCategory.description}</p>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextCategory}
              className="border-primary/30 hover:bg-primary/5"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Feature tabs */}
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {currentCategory.features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  selectedFeature === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main feature showcase */}
      <main className="p-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="wellness-card shadow-wellness-large overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Feature details */}
              <div className="p-8 lg:p-12">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                  currentFeature.bgColor
                )}>
                  {(() => {
                    const Icon = currentFeature.icon;
                    return <Icon className={cn("w-8 h-8", currentFeature.color)} />;
                  })()}
                </div>
                
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {currentFeature.title}
                </h3>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {currentFeature.description}
                </p>

                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-foreground">Key Benefits:</h4>
                  <div className="space-y-3">
                    {currentFeature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={cn("w-2 h-2 rounded-full", currentFeature.color.replace('text-', 'bg-'))} />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    size="lg"
                    onClick={() => router.push('/register-user')}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Try This Feature
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => router.push('/')}
                    className="border-primary/30 hover:bg-primary/5"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Feature preview/demo */}
              <div className={cn(
                "p-8 lg:p-12 relative overflow-hidden",
                currentFeature.bgColor.replace('/10', '/5')
              )}>
                <div className="relative z-10">
                  <Card className="wellness-card p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      {(() => {
                        const Icon = currentFeature.icon;
                        return <Icon className={cn("w-5 h-5", currentFeature.color)} />;
                      })()}
                      <h5 className="font-medium text-foreground">Live Preview</h5>
                    </div>
                    
                    {/* Feature-specific preview content */}
                    {currentFeature.title === 'Mood Tracking' && (
                      <div className="space-y-4">
                        <p className="text-muted-foreground text-sm">How are you feeling today?</p>
                        <div className="grid grid-cols-3 gap-2">
                          {['😊', '😐', '😔'].map((mood, index) => (
                            <button
                              key={index}
                              className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 text-center transition-colors"
                            >
                              <div className="text-2xl mb-1">{mood}</div>
                              <div className="text-xs text-muted-foreground">
                                {['Great', 'Okay', 'Tough'][index]}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentFeature.title === 'Meditation Library' && (
                      <div className="space-y-3">
                        {['Morning Mindfulness', 'Stress Relief', 'Sleep Stories'].map((meditation, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <span className="text-sm text-foreground">{meditation}</span>
                            <Play className="w-4 h-4 text-primary" />
                          </div>
                        ))}
                      </div>
                    )}

                    {currentFeature.title === 'Goal Setting' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10">
                          <span className="text-sm text-foreground">Daily meditation</span>
                          <Badge className="bg-secondary/20 text-secondary">7/7 days</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm text-foreground">Journal entries</span>
                          <Badge variant="outline">3/5 days</Badge>
                        </div>
                      </div>
                    )}

                    {!['Mood Tracking', 'Meditation Library', 'Goal Setting'].includes(currentFeature.title) && (
                      <div className="p-8 text-center">
                        {(() => {
                          const Icon = currentFeature.icon;
                          return <Icon className={cn("w-12 h-12 mx-auto mb-4", currentFeature.color)} />;
                        })()}
                        <p className="text-muted-foreground">Interactive preview coming soon</p>
                      </div>
                    )}
                  </Card>
                </div>
                
                {/* Background decoration */}
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-gradient-to-br from-secondary/10 to-transparent opacity-50" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}