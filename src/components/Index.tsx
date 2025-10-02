"use client";
import { useState } from 'react';
import Navigation from '@/components/auth/Navigation';
import Dashboard from '@/components/auth/Dashboard';
import Journal from '@/components/auth/Journal';
import Meditation from '@/components/auth/Meditation';
import Quiz from '@/components/auth/Quiz';
import Learning from '@/components/auth/Learning';
import Breathing from '@/components/auth/Breathing';
import Goals from '@/components/auth/Goals';
import Profile from '@/components/auth/Profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  User,
  Clock,
  Heart,
  CheckCircle,
  MessageCircle,
  BarChart3,
  Settings
} from 'lucide-react';
import { cn } from '@/libs/utils';

// Placeholder components for other rooms
const TherapyRoom = () => (
  <div className="space-y-8 animate-fade-in room-therapy min-h-screen">
    <div className="container mx-auto p-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-accent mb-8">
        <div className="relative p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-accent-foreground" />
            <h1 className="text-3xl font-bold text-accent-foreground">Therapy & Sessions</h1>
          </div>
          <p className="text-accent-foreground/80 text-lg">
            Professional support when you need it most. Book sessions with certified therapists.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span>Book a Session</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-wellness-body mb-4">
              Connect with licensed therapists who understand your journey.
            </p>
            <Button className="w-full bg-accent hover:bg-accent-dark text-accent-foreground">
              Find Available Times
            </Button>
          </CardContent>
        </Card>
        
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Upcoming Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-calm rounded-lg">
                <div className="font-medium text-sm">Dr. Sarah Johnson</div>
                <div className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</div>
              </div>
              <Button variant="outline" className="w-full">View All Sessions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const CommunityRoom = () => (
  <div className="space-y-8 animate-fade-in room-meditation min-h-screen">
    <div className="container mx-auto p-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-secondary mb-8">
        <div className="relative p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-secondary-foreground" />
            <h1 className="text-3xl font-bold text-secondary-foreground">Community Space</h1>
          </div>
          <p className="text-secondary-foreground/80 text-lg">
            Connect with others on similar wellness journeys in a safe, supportive environment.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-secondary" />
              <span>Discussion Groups</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <div className="font-medium text-sm">Mindfulness & Meditation</div>
                <div className="text-xs text-muted-foreground">127 members • Active now</div>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <div className="font-medium text-sm">Anxiety Support Circle</div>
                <div className="text-xs text-muted-foreground">89 members • 3 new posts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>Group Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-wellness-body mb-4">
              Join guided group therapy and wellness activities.
            </p>
            <Button className="w-full bg-secondary hover:bg-secondary-dark text-secondary-foreground">
              Browse Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const ProgressRoom = () => (
  <div className="space-y-8 animate-fade-in room-therapy min-h-screen">
    <div className="container mx-auto p-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary mb-8">
        <div className="relative p-8">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-3xl font-bold text-primary-foreground">Progress & Insights</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">
            Track your wellness journey with meaningful insights and progress metrics.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Mood Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-calm rounded-lg flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Chart visualization here</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-secondary" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-sm">7-day meditation streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">First journal entry</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-accent" />
              <span>Wellness Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">8.2</div>
              <div className="text-sm text-muted-foreground">Overall wellness this week</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const ProfileRoom = () => (
  <div className="space-y-8 animate-fade-in room-journal min-h-screen">
    <div className="container mx-auto p-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-wellness mb-8">
        <div className="relative p-8">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-8 h-8 text-foreground" />
            <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Personalize your wellness sanctuary and manage your preferences.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-medium">Welcome, Friend</div>
                <div className="text-sm text-muted-foreground">Member since today</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>
        
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-accent" />
              <span>Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Daily reminders</span>
              <div className="w-8 h-4 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0 transform transition-transform"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Sound notifications</span>
              <div className="w-8 h-4 bg-muted rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-0 transform transition-transform"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState('dashboard');

  const renderRoom = () => {
    switch (currentRoom) {
      case 'dashboard':
        return <Dashboard />;
      case 'journal':
        return <Journal />;
      case 'quiz':
        return <Quiz />;
      case 'learning':
        return <Learning />;
      case 'breathing':
        return <Breathing />;
      case 'goals':
        return <Goals />;
      case 'therapy':
        return <TherapyRoom />;
      case 'meditation':
        return <Meditation />;
      // case 'community':
      //   return <CommunityRoom />;
      case 'progress':
        return <ProgressRoom />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      currentRoom === 'dashboard' && "room-dashboard",
      currentRoom === 'journal' && "room-journal",
      currentRoom === 'quiz' && "room-meditation",
      currentRoom === 'learning' && "room-dashboard", 
      currentRoom === 'breathing' && "room-journal",
      currentRoom === 'goals' && "room-therapy",
      currentRoom === 'therapy' && "room-therapy",
      currentRoom === 'meditation' && "room-meditation",
      currentRoom === 'community' && "room-meditation",
      currentRoom === 'progress' && "room-therapy",
      currentRoom === 'profile' && "room-journal"
    )}>
      <Navigation currentRoom={currentRoom} onRoomChange={setCurrentRoom} />
      
      <main className="md:ml-80 transition-all duration-300">
        <div className="animate-fade-in">
          {renderRoom()}
        </div>
      </main>
    </div>
  );
};

export default Index;