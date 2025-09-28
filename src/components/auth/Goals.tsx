"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Plus, 
  CheckCircle, 
  Circle,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Clock
} from 'lucide-react';
import { cn } from '@/libs/utils';

const Goals = () => {
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);

  const activeGoals = [
    {
      id: '1',
      title: "Daily Meditation Practice",
      description: "Meditate for 10 minutes every day",
      category: "Mindfulness",
      progress: 65,
      target: 30,
      current: 19,
      unit: "days",
      streak: 5,
      color: "text-primary",
      dueDate: "Dec 31, 2024"
    },
    {
      id: '2', 
      title: "Gratitude Journaling",
      description: "Write 3 gratitudes daily in journal",
      category: "Mental Health",
      progress: 80,
      target: 21,
      current: 17,
      unit: "entries",
      streak: 8,
      color: "text-secondary",
      dueDate: "Dec 15, 2024"
    },
    {
      id: '3',
      title: "Stress-Free Evenings",
      description: "Practice relaxation techniques before bed",
      category: "Sleep & Rest",
      progress: 45,
      target: 14,
      current: 6,
      unit: "sessions",
      streak: 3,
      color: "text-accent",
      dueDate: "Dec 20, 2024"
    }
  ];

  const achievements = [
    { title: "First Week Complete", description: "Completed your first week of meditation", icon: Award, color: "text-yellow-500" },
    { title: "Consistency Champion", description: "7-day streak in journaling", icon: TrendingUp, color: "text-green-500" },
    { title: "Mindful Moments", description: "Completed 50 breathing exercises", icon: Star, color: "text-blue-500" }
  ];

  const toggleGoalComplete = (goalId: string) => {
    setCompletedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <div className="space-y-8 animate-fade-in room-therapy min-h-screen">
      <div className="container mx-auto p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-accent mb-8">
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-accent-foreground" />
                  <h1 className="text-3xl font-bold text-accent-foreground">Wellness Goals</h1>
                </div>
                <p className="text-accent-foreground/80 text-lg">
                  Set meaningful goals and track your progress on your wellness journey.
                </p>
              </div>
              <Button className="bg-accent-foreground/20 hover:bg-accent-foreground/30 text-accent-foreground border border-accent-foreground/30">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {activeGoals.map((goal) => {
            const isCompleted = completedGoals.includes(goal.id);
            
            return (
              <Card key={goal.id} className={cn(
                "wellness-card hover-scale transition-all duration-300",
                isCompleted && "ring-2 ring-green-500/30 bg-green-50/50"
              )}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleGoalComplete(goal.id)}
                        className="p-1 hover:bg-muted rounded-full transition-colors"
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
                        )}
                      </button>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        {goal.category}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{goal.dueDate}</span>
                    </div>
                  </div>
                  <CardTitle className={cn(
                    "text-base transition-all",
                    isCompleted && "line-through text-muted-foreground"
                  )}>
                    {goal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-wellness-body text-sm">
                    {goal.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className={goal.color}>
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={cn(
                          "rounded-full h-2 transition-all duration-500",
                          goal.color.includes('primary') && "bg-primary",
                          goal.color.includes('secondary') && "bg-secondary", 
                          goal.color.includes('accent') && "bg-accent"
                        )}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {goal.progress}% complete
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gradient-calm rounded-lg">
                    <div className="text-sm">
                      Current Streak
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-sm">{goal.streak} days</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Update Progress
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
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="p-3 bg-gradient-calm rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-5 h-5 ${achievement.color} mt-0.5`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Achievements
              </Button>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Weekly Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-xl font-bold text-primary mb-1">3</div>
                  <div className="text-xs text-muted-foreground">Active Goals</div>
                </div>
                <div className="text-center p-3 bg-secondary/10 rounded-lg">
                  <div className="text-xl font-bold text-secondary mb-1">8</div>
                  <div className="text-xs text-muted-foreground">Best Streak</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Goals completed this week</span>
                  <span className="text-green-500 font-medium">2/3</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Average daily progress</span>
                  <span className="text-primary font-medium">63%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Longest active streak</span>
                  <span className="text-accent font-medium">8 days</span>
                </div>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Goal Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Goals;