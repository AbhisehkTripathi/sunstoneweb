"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Calendar, 
  Target, 
  Award, 
  Settings, 
  Bell,
  Shield,
  Heart,
  TrendingUp,
  Edit,
  Camera,
  MapPin,
  Phone
} from 'lucide-react';
import { cn } from '@/libs/utils';

const achievements = [
  { title: '7-Day Streak', description: 'Completed daily check-ins for a week', icon: '🔥', earned: true },
  { title: 'Mindful Moments', description: '50 meditation sessions completed', icon: '🧘', earned: true },
  { title: 'Journal Keeper', description: 'Written 25 journal entries', icon: '📝', earned: true },
  { title: 'Community Helper', description: 'Helped 10 community members', icon: '🤝', earned: false },
  { title: 'Wellness Warrior', description: '30-day wellness journey', icon: '⭐', earned: false },
  { title: 'Sleep Master', description: 'Consistent sleep schedule for 2 weeks', icon: '😴', earned: false }
];

const wellnessStats = [
  { label: 'Current Streak', value: '12 days', icon: Target, color: 'text-primary' },
  { label: 'Total Sessions', value: '47', icon: Calendar, color: 'text-secondary' },
  { label: 'Mood Average', value: 'Good', icon: Heart, color: 'text-accent' },
  { label: 'Weekly Progress', value: '+15%', icon: TrendingUp, color: 'text-destructive' }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <Card className="wellness-card">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="w-32 h-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">Jane Doe</h1>
                <Badge className="bg-primary/20 text-primary">Pro Member</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Wellness enthusiast on a journey to better mental health
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-foreground">jane.doe@example.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="text-foreground">San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-foreground">Joined March 2024</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
                className="border-primary/30 hover:bg-primary/5"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="border-secondary/30 hover:bg-secondary/5">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wellnessStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="wellness-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <Icon className={cn("w-8 h-8 mx-auto mb-3", stat.color)} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Achievements */}
        <div className="lg:col-span-2">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-accent" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300",
                      achievement.earned 
                        ? "bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20 shadow-wellness-soft" 
                        : "bg-muted/30 border-muted/50 opacity-60"
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <h3 className={cn(
                        "font-semibold",
                        achievement.earned ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {achievement.title}
                      </h3>
                      {achievement.earned && (
                        <Badge className="bg-primary/20 text-primary text-xs">Earned</Badge>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm",
                      achievement.earned ? "text-muted-foreground" : "text-muted-foreground/70"
                    )}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account & Preferences */}
        <div className="space-y-6">
          {/* Account Settings */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-secondary" />
                    <span className="text-foreground">Privacy Settings</span>
                  </div>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-4 h-4 text-accent" />
                    <span className="text-foreground">Notifications</span>
                  </div>
                  <Badge variant="outline">3 active</Badge>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Preferences</span>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/5">
                <Calendar className="w-4 h-4 mr-3" />
                Book Therapy Session
              </Button>
              <Button variant="outline" className="w-full justify-start border-secondary/30 hover:bg-secondary/5">
                <Target className="w-4 h-4 mr-3" />
                Update Goals
              </Button>
              <Button variant="outline" className="w-full justify-start border-accent/30 hover:bg-accent/5">
                <Heart className="w-4 h-4 mr-3" />
                Join Community Chat
              </Button>
            </CardContent>
          </Card>

          {/* Auth Placeholder */}
          <Card className="wellness-card bg-gradient-to-br from-muted/50 to-muted/30">
            <CardHeader>
              <CardTitle className="text-center">Account Security</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect with Supabase to enable full account features
              </p>
              <div className="space-y-2">
                <Button className="w-full" disabled>
                  <Shield className="w-4 h-4 mr-2" />
                  Two-Factor Auth
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  <Mail className="w-4 h-4 mr-2" />
                  Update Email
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Requires Supabase integration
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}