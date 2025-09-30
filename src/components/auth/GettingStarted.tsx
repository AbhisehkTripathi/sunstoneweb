'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Target, 
  Calendar, 
  Users, 
  ArrowRight,
  CheckCircle,
  Play,
  Sparkles,
  User,
  Mail,
  Lock
} from 'lucide-react';
import { cn } from '@/libs/utils';

const journeySteps = [
  {
    title: 'Set Your Wellness Goals',
    description: 'Define what mental wellness means to you and set achievable targets',
    icon: Target,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    title: 'Complete Your Wellness Assessment',
    description: 'Help us understand your current state and personalize your experience',
    icon: Heart,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    title: 'Build Your Daily Routine',
    description: 'Create sustainable habits with meditation, journaling, and check-ins',
    icon: Calendar,
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    title: 'Connect with Community',
    description: 'Find support and encouragement from others on similar journeys',
    icon: Users,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10'
  }
];

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < journeySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wellness-calm to-wellness-peace">
      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Start Your Journey</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="border-primary/30 hover:bg-primary/5"
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Progress indicator */}
      <div className="p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            {journeySteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-2",
                  index < journeySteps.length - 1 && "flex-1"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  index <= currentStep 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{index + 1}</span>
                  )}
                </div>
                {index < journeySteps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 rounded-full mx-4 transition-all duration-300",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="p-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="wellness-card shadow-wellness-large">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center",
                  journeySteps[currentStep].bgColor
                )}>
                  {(() => {
                    const Icon = journeySteps[currentStep].icon;
                    return <Icon className={cn("w-10 h-10", journeySteps[currentStep].color)} />;
                  })()}
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                {journeySteps[currentStep].title}
              </CardTitle>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {journeySteps[currentStep].description}
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Step-specific content */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">What would you like to focus on?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Reduce stress and anxiety',
                      'Improve sleep quality',
                      'Build mindfulness habits',
                      'Enhance emotional awareness',
                      'Manage work-life balance',
                      'Develop coping strategies'
                    ].map((goal, index) => (
                      <button
                        key={index}
                        className="p-4 text-left rounded-xl bg-muted/50 hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-foreground font-medium">{goal}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Quick Wellness Check</h3>
                  <div className="space-y-4">
                    {[
                      'How would you rate your current stress level? (1-10)',
                      'How many hours of sleep do you typically get?',
                      'How often do you practice mindfulness or meditation?',
                      'What time of day do you feel most energetic?'
                    ].map((question, index) => (
                      <Card key={index} className="p-4">
                        <p className="text-foreground mb-3">{question}</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Customize Your Daily Routine</h3>
                  <div className="grid gap-4">
                    {[
                      { time: 'Morning (7:00 AM)', activity: '5-minute breathing exercise', icon: '🌅' },
                      { time: 'Midday (12:00 PM)', activity: 'Mood check-in', icon: '☀️' },
                      { time: 'Evening (8:00 PM)', activity: 'Gratitude journaling', icon: '🌙' },
                      { time: 'Night (9:30 PM)', activity: 'Sleep meditation', icon: '✨' }
                    ].map((routine, index) => (
                      <Card key={index} className="p-4 hover:bg-primary/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{routine.icon}</span>
                            <div>
                              <Badge variant="outline" className="mb-1">{routine.time}</Badge>
                              <p className="text-foreground font-medium">{routine.activity}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Customize</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">You're All Set!</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Your personalized wellness sanctuary is ready. Connect with our supportive community 
                    and begin your journey to better mental health.
                  </p>
                  
                  {/* Auth placeholder */}
                  <Card className="max-w-md mx-auto p-6 bg-gradient-to-br from-card to-card/80">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Create Your Account</h4>
                      <p className="text-sm text-muted-foreground">
                        To save your progress and connect with the community, please create an account.
                      </p>
                      <div className="space-y-3">
                        <Button className="w-full" disabled>
                          <User className="w-4 h-4 mr-2" />
                          Sign Up (Coming Soon)
                        </Button>
                        <Button variant="outline" className="w-full" disabled>
                          <Mail className="w-4 h-4 mr-2" />
                          Continue as Guest
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Authentication requires Supabase integration
                      </p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-8 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="border-primary/30 hover:bg-primary/5"
                >
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary-dark"
                >
                  {currentStep === journeySteps.length - 1 ? 'Enter Your Sanctuary' : 'Continue'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}