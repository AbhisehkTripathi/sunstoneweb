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
  Phone,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/libs/utils';
import { useAuthStore } from '@/store/useAuthStore';
import moment from 'moment';
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
  { label: 'Weekly Progress', value: '+15%', icon: TrendingUp, color: 'text-emerald-500' }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Profile Header */}
        <Card className="border-primary/10 shadow-lg overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              
              {/* Avatar */}
              <div className="relative group shrink-0">
                <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-primary/10">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{user?.name}</h1>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{user?.role}</Badge>
                </div>
                
                <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
                  Wellness enthusiast on a journey to better mental health
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 text-sm">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{user?.email}</span>
                  </div>
                  <div className="hidden sm:block text-muted-foreground">•</div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="text-foreground">San Francisco, CA</span>
                  </div>
                  <div className="hidden sm:block text-muted-foreground">•</div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-foreground">Joined {moment(user?.created_at).format('MMMM Do YYYY')}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  <Edit className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Edit</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-secondary/20 hover:bg-secondary/5"
                >
                  <Settings className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Settings</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wellness Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {wellnessStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-primary/10 hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("p-2 rounded-lg bg-gradient-to-br", 
                      index === 0 && "from-primary/10 to-primary/5",
                      index === 1 && "from-secondary/10 to-secondary/5",
                      index === 2 && "from-accent/10 to-accent/5",
                      index === 3 && "from-emerald-500/10 to-emerald-500/5"
                    )}>
                      <Icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Achievements - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Award className="w-5 h-5 text-accent" />
                  <span>Achievements</span>
                  <Badge variant="outline" className="ml-auto">
                    {achievements.filter(a => a.earned).length} / {achievements.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-300",
                        achievement.earned 
                          ? "bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-sm" 
                          : "bg-muted/30 border-muted/40 opacity-60"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl shrink-0">{achievement.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={cn(
                              "font-semibold text-sm md:text-base truncate",
                              achievement.earned ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {achievement.title}
                            </h3>
                            {achievement.earned && (
                              <Badge className="bg-primary/10 text-primary text-xs shrink-0">✓</Badge>
                            )}
                          </div>
                          <p className={cn(
                            "text-xs md:text-sm line-clamp-2",
                            achievement.earned ? "text-muted-foreground" : "text-muted-foreground/70"
                          )}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-primary/5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">Book Therapy</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-secondary/5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Update Goals</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-accent/5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-accent" />
                    <span className="text-sm">Join Community</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Account</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-muted text-left"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Privacy</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-muted text-left"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-accent" />
                    <span className="text-sm">Notifications</span>
                  </div>
                  <Badge variant="outline" className="text-xs">3</Badge>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-muted text-left"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-primary" />
                    <span className="text-sm">Preferences</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="border-primary/10 bg-gradient-to-br from-muted/30 to-muted/10">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Enhance your account security
                </p>
                <div className="space-y-2">
                  <Button size="sm" className="w-full" disabled>
                    <Shield className="w-4 h-4 mr-2" />
                    Two-Factor Auth
                  </Button>
                  <Button size="sm" variant="outline" className="w-full" disabled>
                    <Mail className="w-4 h-4 mr-2" />
                    Update Email
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Coming soon
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}