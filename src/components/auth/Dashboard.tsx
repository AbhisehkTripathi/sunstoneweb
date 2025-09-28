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
// Utility function for conditional classnames
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const moods = [
  { name: 'Excellent', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50 hover:bg-yellow-100' },
  { name: 'Good', icon: Smile, color: 'text-green-500', bg: 'bg-green-50 hover:bg-green-100' },
  { name: 'Okay', icon: Meh, color: 'text-blue-500', bg: 'bg-blue-50 hover:bg-blue-100' },
  { name: 'Difficult', icon: Cloud, color: 'text-orange-500', bg: 'bg-orange-50 hover:bg-orange-100' },
  { name: 'Struggling', icon: Frown, color: 'text-red-500', bg: 'bg-red-50 hover:bg-red-100' },
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
    <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          S
        </div>
        <div>
          <p className="font-semibold text-gray-800">Sarah Johnson</p>
          <p className="text-sm text-gray-500">sarah@example.com</p>
        </div>
      </div>
      <hr className="my-3 border-gray-100" />
      <div className="space-y-2">
        <button onClick={() => router.push('/profile')} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>View Profile</span>
        </button>
        <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700">
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  S
                </button>
                {showProfile && <ProfileDropdown />}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Hero - Simplified */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Peaceful Space
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Take a moment to breathe deeply and check in with yourself. Your mental wellbeing matters.
          </p>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
            Start Your Journey
          </Button>
        </div>

        {/* Mood Check-in - Centered and Spacious */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-gray-800 mb-2">{getGreeting()}</CardTitle>
            <p className="text-gray-600">How are you feeling today?</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="flex justify-center gap-6 mb-6">
              {moods.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.name;
                
                return (
                  <button
                    key={mood.name}
                    onClick={() => setSelectedMood(mood.name)}
                    className={cn(
                      "p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-md min-w-[100px]",
                      isSelected 
                        ? `${mood.bg} ${mood.color} shadow-lg border-2 border-current` 
                        : `${mood.bg} ${mood.color}`
                    )}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3" />
                    <div className="text-sm font-medium">{mood.name}</div>
                  </button>
                );
              })}
            </div>
            
            {selectedMood && (
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl text-center animate-in slide-in-from-bottom duration-300">
                <p className="text-gray-700">
                  Thank you for sharing. Your mood has been recorded. 
                  <br />
                  <span className="text-indigo-600">Remember, every feeling is valid and temporary. 💙</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Grid - More Spacious */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Activities */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <span>Today's Wellness Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayActivities.map((activity, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md",
                    activity.completed 
                      ? "bg-green-50 border border-green-200" 
                      : "bg-gray-50 border border-gray-200"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      activity.completed ? "bg-green-500" : "bg-gray-400"
                    )} />
                    <div>
                      <p className="font-semibold text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.completed ? "default" : "outline"}
                    className={activity.completed ? "bg-green-100 text-green-700" : ""}
                  >
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Journal Entries</p>
                    <p className="text-sm text-gray-500">This week</p>
                  </div>
                </div>
                <Badge className="bg-indigo-100 text-indigo-700 text-lg px-3 py-1">5</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Meditation Streak</p>
                    <p className="text-sm text-gray-500">Keep it going!</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 text-lg px-3 py-1">12 days</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Mood Average</p>
                    <p className="text-sm text-gray-500">Past 7 days</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700 text-lg px-3 py-1">Good</Badge>
              </div>
              
              <Button variant="outline" className="w-full mt-6 border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                View Detailed Insights
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives."
          </p>
          <p className="text-sm text-gray-500">- William James</p>
        </div> */}
      </div>
      
      {/* Click outside to close profile */}
      {showProfile && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}