"use client";
import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Music, 
  Users, 
  TrendingUp, 
  User,
  Menu,
  X,
  Brain,
  GraduationCap,
  Wind,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

interface NavigationProps {
  currentRoom: string;
  onRoomChange: (room: string) => void;
}

const rooms = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, description: 'Your wellness overview' },
  { id: 'meditation', name: 'Meditation', icon: Music, description: 'Audio & music library' },
  { id: 'journal', name: 'Mind Journal', icon: BookOpen, description: 'Safe space for thoughts' },
  // { id: 'learning', name: 'Learning', icon: GraduationCap, description: 'Courses & articles' },
  { id: 'breathing', name: 'Breathing', icon: Wind, description: 'Guided exercises' },
  // { id: 'goals', name: 'Goals', icon: Target, description: 'Track your progress' },
  // { id: 'therapy', name: 'Therapy', icon: Calendar, description: 'Sessions & booking' },
  // { id: 'quiz', name: 'Wellness Quiz', icon: Brain, description: 'Assessments & insights' },
  // { id: 'community', name: 'Community', icon: Users, description: 'Connect with others' },
  { id: 'progress', name: 'Progress', icon: TrendingUp, description: 'Your wellness journey' },
  { id: 'profile', name: 'Profile', icon: User, description: 'Personal settings' },
];

export default function Navigation({ currentRoom, onRoomChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-card/80 backdrop-blur-sm border-border/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Navigation sidebar */}
      <nav className={cn(
        "fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-lg border-r border-border/50 z-40 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sunstone Mind
            </h1>
            <p className="text-wellness-caption mt-1">Your wellness sanctuary</p>
          </div>

          {/* Room navigation */}
          <div className="space-y-2">
            {rooms.map((room) => {
              const Icon = room.icon;
              const isActive = currentRoom === room.id;
              
              return (
                <button
                  key={room.id}
                  onClick={() => {
                    onRoomChange(room.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-300 group",
                    "hover:shadow-wellness-soft hover:scale-[1.02]",
                    isActive 
                      ? "bg-gradient-primary text-primary-foreground shadow-wellness-medium" 
                      : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-primary-foreground" : "text-primary group-hover:text-primary"
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        "font-medium text-sm",
                        isActive ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {room.name}
                      </div>
                      <div className={cn(
                        "text-xs truncate",
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {room.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current user info */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-wellness">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">Welcome back</div>
                <div className="text-xs text-muted-foreground">Ready for wellness?</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}