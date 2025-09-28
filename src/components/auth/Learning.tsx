"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star,
  ArrowRight,
  Bookmark,
  Users,
  Award
} from 'lucide-react';

const Learning = () => {
  const courses = [
    {
      title: "Understanding Anxiety",
      description: "Learn about anxiety triggers, symptoms, and evidence-based coping strategies",
      duration: "45 minutes",
      lessons: 6,
      rating: 4.8,
      category: "Mental Health Basics",
      progress: 0,
      icon: BookOpen,
      color: "text-primary"
    },
    {
      title: "Mindfulness Foundations",
      description: "Build a strong foundation in mindfulness practices and meditation techniques",
      duration: "1 hour 20 minutes", 
      lessons: 8,
      rating: 4.9,
      category: "Mindfulness",
      progress: 25,
      icon: Star,
      color: "text-secondary"
    },
    {
      title: "Stress Management Toolkit",
      description: "Practical tools and techniques for managing daily stress and pressure",
      duration: "35 minutes",
      lessons: 5,
      rating: 4.7,
      category: "Stress Relief",
      progress: 60,
      icon: Award,
      color: "text-accent"
    }
  ];

  const articles = [
    { title: "5 Breathing Exercises for Instant Calm", readTime: "3 min", category: "Quick Tips" },
    { title: "The Science Behind Gratitude Practice", readTime: "5 min", category: "Research" },
    { title: "Creating Healthy Sleep Habits", readTime: "4 min", category: "Wellness" },
    { title: "Dealing with Social Anxiety", readTime: "6 min", category: "Mental Health" }
  ];

  return (
    <div className="space-y-8 animate-fade-in room-dashboard min-h-screen">
      <div className="container mx-auto p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-primary mb-8">
          <div className="relative p-8">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
              <h1 className="text-3xl font-bold text-primary-foreground">Wellness Learning</h1>
            </div>
            <p className="text-primary-foreground/80 text-lg">
              Expand your knowledge with expert-curated courses, articles, and resources for mental wellness.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Card key={index} className="wellness-card hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-5 h-5 ${course.color}`} />
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        {course.category}
                      </span>
                    </div>
                    <Bookmark className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  </div>
                  <CardTitle className="text-base">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-wellness-body text-sm">
                    {course.description}
                  </p>
                  
                  {course.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <Button className={`w-full group ${course.progress > 0 ? 'bg-secondary hover:bg-secondary/80 text-secondary-foreground' : 'bg-primary hover:bg-primary/80 text-primary-foreground'}`}>
                    {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
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
                <BookOpen className="w-5 h-5 text-secondary" />
                <span>Featured Articles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {articles.map((article, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-gradient-calm rounded-lg hover:shadow-wellness-soft transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm group-hover:text-primary transition-colors">
                          {article.title}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Browse All Articles
              </Button>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-accent" />
                <span>Study Groups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-wellness-body text-sm">
                Join others in structured learning groups and share insights together.
              </p>
              
              <div className="space-y-2">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <div className="font-medium text-sm">Anxiety Support Learning Circle</div>
                  <div className="text-xs text-muted-foreground">12 members • Meets Tuesdays</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="font-medium text-sm">Mindfulness Practice Group</div>
                  <div className="text-xs text-muted-foreground">8 members • Daily check-ins</div>
                </div>
              </div>
              
              <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
                Join a Study Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Learning;