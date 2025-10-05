"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Smile, 
  Frown, 
  Meh, 
  Sun, 
  Cloud,
  Calendar,
  Target,
  TrendingUp,
  BookOpen,
  User,
  Bell,
  Settings,
  Sparkles,
  Wind
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

const moods = [
  { name: 'Excellent', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50 hover:bg-amber-100' },
  { name: 'Good', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-50 hover:bg-emerald-100' },
  { name: 'Okay', icon: Meh, color: 'text-blue-500', bg: 'bg-blue-50 hover:bg-blue-100' },
  { name: 'Difficult', icon: Cloud, color: 'text-orange-500', bg: 'bg-orange-50 hover:bg-orange-100' },
  { name: 'Struggling', icon: Frown, color: 'text-rose-500', bg: 'bg-rose-50 hover:bg-rose-100' },
];

const todayActivities = [
  { title: 'Morning Meditation', completed: true, time: '7:00 AM', description: '10 min mindfulness' },
  { title: 'Gratitude Journal', completed: true, time: '8:30 AM', description: '3 things I\'m grateful for' },
  { title: 'Therapy Session', completed: false, time: '2:00 PM', description: 'Weekly check-in' },
  { title: 'Evening Reflection', completed: false, time: '9:00 PM', description: 'Daily review' },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [currentTime] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  });
  
  const logout = () => {
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
    router.push('/');
  };

  const getGreeting = () => {
    return `Good ${currentTime}, ${user?.name ?? ''}`;
  };

  const handleButtonPress = (id: string) => {
    setPressedButton(id);
    setTimeout(() => setPressedButton(null), 300);
  };
  
  const ProfileDropdown = () => (
    <div className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-100 p-4 z-50 animate-scale-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold shadow-lg animate-gentle-pulse">
          S
        </div>
        <div>
          <p className="font-semibold text-gray-800">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      <hr className="my-3 border-purple-100" />
      <div className="space-y-1">
        <button className="w-full text-left px-3 py-2 hover:bg-purple-50 rounded-xl text-sm text-gray-700 flex items-center space-x-2 transition-all hover:translate-x-1" onClick={() => setShowProfile(true)}>
          <User className="w-4 h-4" />
          <span>View Profile</span>
        </button>
        <button className="w-full text-left px-3 py-2 hover:bg-rose-50 rounded-xl text-sm text-rose-600 transition-all hover:translate-x-1" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Breathing Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-breathe"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-breathe-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-60 right-1/3 w-64 h-64 bg-violet-200/25 rounded-full blur-3xl animate-breathe-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-indigo-200/25 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating Lotus Petals */}
        <div className="absolute top-10 left-1/4 animate-leaf-fall">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 5C20 5 10 15 10 25C10 30 15 35 20 35C25 35 30 30 30 25C30 15 20 5 20 5Z" 
                  fill="url(#leaf-gradient)" opacity="0.4"/>
            <defs>
              <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute top-20 right-1/3 animate-leaf-fall" style={{ animationDelay: '5s' }}>
          <svg width="35" height="35" viewBox="0 0 40 40" fill="none">
            <path d="M20 5C20 5 10 15 10 25C10 30 15 35 20 35C25 35 30 30 30 25C30 15 20 5 20 5Z" 
                  fill="url(#leaf-gradient2)" opacity="0.4"/>
            <defs>
              <linearGradient id="leaf-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute top-32 left-1/2 animate-leaf-fall" style={{ animationDelay: '8s' }}>
          <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
            <path d="M20 5C20 5 10 15 10 25C10 30 15 35 20 35C25 35 30 30 30 25C30 15 20 5 20 5Z" 
                  fill="url(#leaf-gradient3)" opacity="0.4"/>
            <defs>
              <linearGradient id="leaf-gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute top-5 right-1/4 animate-leaf-fall-slow" style={{ animationDelay: '2s' }}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <path d="M20 5C20 5 10 15 10 25C10 30 15 35 20 35C25 35 30 30 30 25C30 15 20 5 20 5Z" 
                  fill="url(#leaf-gradient4)" opacity="0.35"/>
            <defs>
              <linearGradient id="leaf-gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Zen Circles - Multiple Sets */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-2 border-purple-200/20 rounded-full animate-zen-ripple"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 border-2 border-purple-200/20 rounded-full animate-zen-ripple" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 border-2 border-purple-200/20 rounded-full animate-zen-ripple" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 border-2 border-blue-200/20 rounded-full animate-zen-ripple" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 border-2 border-blue-200/20 rounded-full animate-zen-ripple" style={{ animationDelay: '1.5s' }}></div>

        {/* Floating Bubbles */}
        <div className="absolute bottom-10 left-20 w-8 h-8 bg-purple-300/20 rounded-full animate-bubble-float"></div>
        <div className="absolute bottom-20 left-1/3 w-6 h-6 bg-blue-300/20 rounded-full animate-bubble-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-16 right-1/3 w-10 h-10 bg-teal-300/20 rounded-full animate-bubble-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-32 left-1/2 w-7 h-7 bg-violet-300/20 rounded-full animate-bubble-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-8 right-20 w-9 h-9 bg-indigo-300/20 rounded-full animate-bubble-float" style={{ animationDelay: '3s' }}></div>

        {/* Sparkles */}
        <Sparkles className="absolute top-1/4 right-1/3 w-6 h-6 text-purple-300 animate-twinkle" />
        <Sparkles className="absolute bottom-1/3 left-1/4 w-5 h-5 text-blue-300 animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <Sparkles className="absolute top-2/3 right-1/4 w-4 h-4 text-teal-300 animate-twinkle" style={{ animationDelay: '3s' }} />
        <Sparkles className="absolute top-1/3 left-1/3 w-5 h-5 text-violet-300 animate-twinkle" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute bottom-1/4 right-1/3 w-6 h-6 text-pink-300 animate-twinkle" style={{ animationDelay: '4s' }} />

        {/* Wind Flow */}
        <Wind className="absolute top-1/3 left-10 w-8 h-8 text-blue-200 animate-wind-flow" />
        <Wind className="absolute top-2/3 left-10 w-6 h-6 text-teal-200 animate-wind-flow" style={{ animationDelay: '5s' }} />
        
        {/* Mandala Pattern */}
        <div className="absolute top-1/3 right-10 opacity-5 animate-mandala-rotate">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="70" stroke="url(#mandala-gradient)" strokeWidth="2"/>
            <circle cx="90" cy="90" r="50" stroke="url(#mandala-gradient)" strokeWidth="1.5"/>
            <circle cx="90" cy="90" r="30" stroke="url(#mandala-gradient)" strokeWidth="1"/>
            <path d="M90 20 L90 160 M20 90 L160 90" stroke="url(#mandala-gradient)" strokeWidth="1"/>
            <path d="M40 40 L140 140 M140 40 L40 140" stroke="url(#mandala-gradient)" strokeWidth="1"/>
            <defs>
              <linearGradient id="mandala-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Peaceful Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,60 1200,60 L1200,120 L0,120 Z" 
                  fill="url(#wave-gradient)" className="animate-wave"/>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/60 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center animate-gentle-pulse">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                MindPeace
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleButtonPress('bell')}
                className={cn(
                  "p-2 hover:bg-purple-50 rounded-xl transition-all relative",
                  pressedButton === 'bell' && "scale-90"
                )}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-gentle-pulse"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => {
                    handleButtonPress('profile');
                    setShowProfile(!showProfile);
                  }}
                  className={cn(
                    "w-10 h-10 bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all hover:scale-105",
                    pressedButton === 'profile' && "scale-95"
                  )}
                >
                  S
                </button>
                {showProfile && <ProfileDropdown />}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 relative z-10">
        {/* Welcome Hero */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4 animate-gentle-bounce">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400 rounded-full flex items-center justify-center shadow-2xl animate-gentle-pulse">
              <Heart className="w-10 h-10 text-white animate-heartbeat" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-text-shimmer">
            Welcome to Your Peaceful Space
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Take a moment to breathe deeply and check in with yourself. Your mental wellbeing matters.
          </p>
          <Button 
            onClick={() => handleButtonPress('start')}
            className={cn(
              "bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 text-white px-8 py-6 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105",
              pressedButton === 'start' && "scale-95"
            )}
          >
            Start Your Journey
          </Button>
        </div>

        {/* Mood Check-in */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-gray-800 mb-2">{getGreeting()}</CardTitle>
            <p className="text-gray-600">How are you feeling today?</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
              {moods.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.name;
                
                return (
                  <button
                    key={mood.name}
                    onClick={() => {
                      setSelectedMood(mood.name);
                      handleButtonPress(`mood-${mood.name}`);
                    }}
                    className={cn(
                      "p-4 md:p-6 rounded-2xl text-center transition-all duration-300 hover:scale-110 hover:shadow-lg min-w-[90px] md:min-w-[100px] group",
                      isSelected 
                        ? `${mood.bg} ${mood.color} shadow-xl border-2 border-current scale-105 animate-bounce-gentle` 
                        : `${mood.bg} ${mood.color}`,
                      pressedButton === `mood-${mood.name}` && "scale-90"
                    )}
                  >
                    <Icon className={cn(
                      "w-7 h-7 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 transition-transform group-hover:rotate-12",
                      isSelected && "animate-wiggle"
                    )} />
                    <div className="text-xs md:text-sm font-medium">{mood.name}</div>
                  </button>
                );
              })}
            </div>
            
            {selectedMood && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 rounded-2xl text-center animate-slide-up border border-purple-100">
                <p className="text-gray-700">
                  Thank you for sharing. Your mood has been recorded. 
                  <br />
                  <span className="text-purple-600 font-medium">Remember, every feeling is valid and temporary.</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Today's Activities */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Calendar className="w-6 h-6 text-purple-600 animate-gentle-bounce" />
                <span>Today's Wellness Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayActivities.map((activity, index) => (
                <div
                  key={index}
                  onClick={() => handleButtonPress(`activity-${index}`)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md cursor-pointer hover:scale-102",
                    activity.completed 
                      ? "bg-emerald-50 border border-emerald-200" 
                      : "bg-gray-50 border border-gray-200",
                    pressedButton === `activity-${index}` && "scale-98"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      activity.completed ? "bg-emerald-500 shadow-lg shadow-emerald-200 animate-gentle-pulse" : "bg-gray-400"
                    )} />
                    <div>
                      <p className="font-semibold text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.completed ? "default" : "outline"}
                    className={activity.completed ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}
                  >
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <TrendingUp className="w-6 h-6 text-violet-600 animate-gentle-bounce" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                onClick={() => handleButtonPress('journal')}
                className={cn(
                  "flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 cursor-pointer hover:scale-102 transition-all",
                  pressedButton === 'journal' && "scale-98"
                )}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Journal Entries</p>
                    <p className="text-sm text-gray-500">This week</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700 text-lg px-3 py-1 border border-purple-200 animate-gentle-pulse">5</Badge>
              </div>
              
              <div 
                onClick={() => handleButtonPress('streak')}
                className={cn(
                  "flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 cursor-pointer hover:scale-102 transition-all",
                  pressedButton === 'streak' && "scale-98"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Meditation Streak</p>
                    <p className="text-sm text-gray-500">Keep it going!</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 text-lg px-3 py-1 border border-emerald-200 animate-gentle-pulse">12 days</Badge>
              </div>
              
              <div 
                onClick={() => handleButtonPress('mood')}
                className={cn(
                  "flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100 cursor-pointer hover:scale-102 transition-all",
                  pressedButton === 'mood' && "scale-98"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-violet-600 animate-heartbeat" />
                  <div>
                    <p className="font-semibold text-gray-800">Mood Average</p>
                    <p className="text-sm text-gray-500">Past 7 days</p>
                  </div>
                </div>
                <Badge className="bg-violet-100 text-violet-700 text-lg px-3 py-1 border border-violet-200 animate-gentle-pulse">Good</Badge>
              </div>
              
              <Button 
                onClick={() => handleButtonPress('insights')}
                variant="outline" 
                className={cn(
                  "w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl transition-all hover:scale-105",
                  pressedButton === 'insights' && "scale-95"
                )}
              >
                View Detailed Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showProfile && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowProfile(false)}
        />
      )}

    </div>
  );
}