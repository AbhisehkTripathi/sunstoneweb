'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wind, 
  Play, 
  Pause, 
  RotateCcw,
  Timer,
  Waves,
  Zap,
  Heart
} from 'lucide-react';
import { cn } from '@/libs/utils';

const Breathing = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const exercises = [
    {
      id: 'box',
      title: "Box Breathing",
      description: "4-4-4-4 pattern for stress relief and focus",
      duration: "5 minutes",
      difficulty: "Beginner",
      benefits: ["Reduces stress", "Improves focus", "Calms nervous system"],
      pattern: "Inhale 4s → Hold 4s → Exhale 4s → Hold 4s",
      icon: Waves,
      color: "text-primary"
    },
    {
      id: '478',
      title: "4-7-8 Technique", 
      description: "Deep relaxation breathing for better sleep",
      duration: "3 minutes",
      difficulty: "Intermediate",
      benefits: ["Promotes sleep", "Reduces anxiety", "Lowers heart rate"],
      pattern: "Inhale 4s → Hold 7s → Exhale 8s",
      icon: Heart,
      color: "text-secondary"
    },
    {
      id: 'energizing',
      title: "Energizing Breath",
      description: "Quick technique to boost energy and alertness", 
      duration: "2 minutes",
      difficulty: "Advanced",
      benefits: ["Increases energy", "Enhances alertness", "Boosts mood"],
      pattern: "Quick inhale → Quick exhale (30 seconds) → Deep breath",
      icon: Zap,
      color: "text-accent"
    }
  ];

  const quickTechniques = [
    { name: "Three Deep Breaths", time: "30 seconds", icon: Wind },
    { name: "Belly Breathing", time: "2 minutes", icon: Heart },
    { name: "Ocean Breath", time: "1 minute", icon: Waves },
    { name: "Counted Breathing", time: "3 minutes", icon: Timer }
  ];

  const toggleExercise = (exerciseId: string) => {
    if (activeExercise === exerciseId && isPlaying) {
      setIsPlaying(false);
    } else {
      setActiveExercise(exerciseId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in room-journal min-h-screen">
      <div className="container mx-auto p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-wellness mb-8">
          <div className="relative p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Wind className="w-8 h-8 text-foreground" />
              <h1 className="text-3xl font-bold text-foreground">Breathing Exercises</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Master the art of conscious breathing with guided exercises designed to calm, energize, and center your mind.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            const isActive = activeExercise === exercise.id;
            
            return (
              <Card key={exercise.id} className={cn(
                "wellness-card hover-scale transition-all duration-300",
                isActive && isPlaying && "ring-2 ring-primary/50 shadow-wellness-medium"
              )}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 ${exercise.color}`} />
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        {exercise.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-1">
                      <Timer className="w-3 h-3" />
                      <span>{exercise.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base">{exercise.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-wellness-body text-sm">
                    {exercise.description}
                  </p>
                  
                  <div className="p-3 bg-gradient-calm rounded-lg">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Pattern:</div>
                    <div className="text-sm">{exercise.pattern}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-2">Benefits:</div>
                    <div className="flex flex-wrap gap-1">
                      {exercise.benefits.map((benefit, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-muted/50 rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => toggleExercise(exercise.id)}
                      className={cn(
                        "flex-1 group",
                        isActive && isPlaying 
                          ? "bg-primary/20 text-primary border border-primary hover:bg-primary/30" 
                          : "bg-primary hover:bg-primary/80 text-primary-foreground"
                      )}
                      variant={isActive && isPlaying ? "outline" : "default"}
                    >
                      {isActive && isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="icon">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-accent" />
                <span>Quick Techniques</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-wellness-body text-sm mb-4">
                Simple breathing exercises for immediate relief and quick centering.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {quickTechniques.map((technique, index) => {
                  const Icon = technique.icon;
                  return (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="h-auto p-3 flex flex-col items-start space-y-1 hover:bg-accent/10 hover:border-accent"
                    >
                      <div className="flex items-center space-x-2 w-full">
                        <Icon className="w-4 h-4 text-accent" />
                        <span className="text-xs font-medium">{technique.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{technique.time}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-secondary" />
                <span>Session History</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-calm rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Sessions this week</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Box Breathing</span>
                  <span className="text-muted-foreground">Today, 5 min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>4-7-8 Technique</span>
                  <span className="text-muted-foreground">Yesterday, 3 min</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Quick Techniques</span>
                  <span className="text-muted-foreground">2 days ago, 2 min</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View Full History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Breathing;