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
  Settings
} from 'lucide-react';
import { useRouter } from "next/navigation";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

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
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [currentTime] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  });

  const getGreeting = () => {
    return `Good ${currentTime}, Sarah`;
  };

  const router = useRouter();
  
  const ProfileDropdown = () => (
    <div className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-100 p-4 z-50 animate-in slide-in-from-top duration-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
          S
        </div>
        <div>
          <p className="font-semibold text-gray-800">Sarah Johnson</p>
          <p className="text-sm text-gray-500">sarah@example.com</p>
        </div>
      </div>
      <hr className="my-3 border-purple-100" />
      <div className="space-y-1">
        <button onClick={() => router.push('/profile')} className="w-full text-left px-3 py-2 hover:bg-purple-50 rounded-xl text-sm text-gray-700 flex items-center space-x-2 transition-colors">
          <User className="w-4 h-4" />
          <span>View Profile</span>
        </button>
        <button className="w-full text-left px-3 py-2 hover:bg-purple-50 rounded-xl text-sm text-gray-700 flex items-center space-x-2 transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button className="w-full text-left px-3 py-2 hover:bg-rose-50 rounded-xl text-sm text-rose-600 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Animated Brain SVG */}
        <div className="absolute top-1/4 right-10 opacity-10 animate-pulse-slow">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 40C85 40 75 50 75 65C75 55 65 45 50 45C35 45 25 55 25 70C25 85 35 95 50 95C50 110 40 120 40 135C40 150 50 160 65 160C65 170 75 180 90 180C105 180 115 170 115 155C130 155 140 145 140 130C155 130 165 120 165 105C165 90 155 80 140 80C140 65 130 55 115 55C115 45 105 40 100 40Z" 
                  stroke="url(#brain-gradient)" 
                  strokeWidth="3" 
                  fill="none"
                  className="animate-draw"/>
            <defs>
              <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-float-particle"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-float-particle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-teal-300 rounded-full animate-float-particle" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="bg-white/60 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-purple-50 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-10 h-10 bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
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
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Peaceful Space
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Take a moment to breathe deeply and check in with yourself. Your mental wellbeing matters.
          </p>
          <Button className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 text-white px-8 py-6 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            Start Your Journey
          </Button>
        </div>

        {/* Mood Check-in */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-xl">
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
                    onClick={() => setSelectedMood(mood.name)}
                    className={cn(
                      "p-4 md:p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[90px] md:min-w-[100px]",
                      isSelected 
                        ? `${mood.bg} ${mood.color} shadow-xl border-2 border-current scale-105` 
                        : `${mood.bg} ${mood.color}`
                    )}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-2 md:mb-3" />
                    <div className="text-xs md:text-sm font-medium">{mood.name}</div>
                  </button>
                );
              })}
            </div>
            
            {selectedMood && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 rounded-2xl text-center animate-in slide-in-from-bottom duration-300 border border-purple-100">
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
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
                <span>Today's Wellness Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayActivities.map((activity, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md",
                    activity.completed 
                      ? "bg-emerald-50 border border-emerald-200" 
                      : "bg-gray-50 border border-gray-200"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      activity.completed ? "bg-emerald-500 shadow-lg shadow-emerald-200" : "bg-gray-400"
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
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <TrendingUp className="w-6 h-6 text-violet-600" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Journal Entries</p>
                    <p className="text-sm text-gray-500">This week</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700 text-lg px-3 py-1 border border-purple-200">5</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Meditation Streak</p>
                    <p className="text-sm text-gray-500">Keep it going!</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 text-lg px-3 py-1 border border-emerald-200">12 days</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-violet-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Mood Average</p>
                    <p className="text-sm text-gray-500">Past 7 days</p>
                  </div>
                </div>
                <Badge className="bg-violet-100 text-violet-700 text-lg px-3 py-1 border border-violet-200">Good</Badge>
              </div>
              
              <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl">
                View Detailed Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Click outside to close profile */}
      {showProfile && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowProfile(false)}
        />
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-15px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-100px); opacity: 0.8; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        @keyframes draw {
          0% { stroke-dasharray: 0, 1000; }
          100% { stroke-dasharray: 1000, 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 3s ease-in-out infinite alternate;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}