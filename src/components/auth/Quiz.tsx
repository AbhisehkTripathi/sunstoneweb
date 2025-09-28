"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  Star,
  Target,
  ArrowRight
} from 'lucide-react';

const Quiz = () => {
  const quizzes = [
    {
      title: "Stress Level Assessment",
      description: "Understand your current stress patterns and get personalized recommendations",
      duration: "5 minutes",
      questions: 15,
      difficulty: "Beginner",
      icon: Brain,
      color: "text-primary"
    },
    {
      title: "Anxiety Awareness Check",
      description: "Evaluate your anxiety levels and discover coping strategies",
      duration: "7 minutes", 
      questions: 20,
      difficulty: "Intermediate",
      icon: Target,
      color: "text-secondary"
    },
    {
      title: "Mindfulness Readiness",
      description: "Assess your mindfulness practices and readiness for meditation",
      duration: "4 minutes",
      questions: 12,
      difficulty: "Beginner", 
      icon: Star,
      color: "text-accent"
    }
  ];

  const recentResults = [
    { name: "Daily Mood Check", score: "Good", date: "Today", color: "text-secondary" },
    { name: "Sleep Quality", score: "7/10", date: "Yesterday", color: "text-primary" },
    { name: "Stress Assessment", score: "Moderate", date: "3 days ago", color: "text-accent" }
  ];

  return (
    <div className="space-y-8 animate-fade-in room-meditation min-h-screen">
      <div className="container mx-auto p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-secondary mb-8">
          <div className="relative p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-secondary-foreground" />
              <h1 className="text-3xl font-bold text-secondary-foreground">Wellness Quizzes</h1>
            </div>
            <p className="text-secondary-foreground/80 text-lg">
              Discover insights about your mental wellness through guided assessments and personalized feedback.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {quizzes.map((quiz, index) => {
            const Icon = quiz.icon;
            return (
              <Card key={index} className="wellness-card hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 ${quiz.color}`} />
                      <span className="text-base">{quiz.title}</span>
                    </div>
                    <div className="text-xs px-2 py-1 bg-muted rounded-full">
                      {quiz.difficulty}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-wellness-body text-sm">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{quiz.duration}</span>
                    </div>
                    <span>{quiz.questions} questions</span>
                  </div>
                  
                  <Button className={`w-full group bg-secondary hover:bg-secondary/80 text-secondary-foreground`}>
                    Start Quiz
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Recent Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-calm rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{result.name}</div>
                      <div className="text-xs text-muted-foreground">{result.date}</div>
                    </div>
                    <div className={`font-bold text-sm ${result.color}`}>
                      {result.score}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Results
              </Button>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-accent" />
                <span>Quick Daily Check-In</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-wellness-body text-sm">
                How are you feeling today? Take a quick 2-minute check-in to track your daily wellness.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {['Great', 'Good', 'Okay', 'Struggling'].map((mood) => (
                  <Button 
                    key={mood}
                    variant="outline" 
                    size="sm"
                    className="hover:bg-accent/20 hover:border-accent"
                  >
                    {mood}
                  </Button>
                ))}
              </div>
              
              <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
                Complete Check-In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;