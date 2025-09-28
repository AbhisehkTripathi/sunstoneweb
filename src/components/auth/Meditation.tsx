"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  Clock, 
  Headphones,
  Heart,
  Brain,
  Moon,
  Zap,
  Leaf,
  Star
} from 'lucide-react';
import { cn } from '@/libs/utils';
import meditationBg from '@/assets/meditation-bg.jpg';

const moodPlaylists = [
  {
    name: 'Calm & Relax',
    icon: Leaf,
    color: 'bg-secondary/20 text-secondary border-secondary/30',
    tracks: 12,
    duration: '45 min',
    description: 'Gentle sounds to ease stress and tension'
  },
  {
    name: 'Focus & Clarity',
    icon: Brain,
    color: 'bg-primary/20 text-primary border-primary/30',
    tracks: 8,
    duration: '32 min',
    description: 'Binaural beats for deep concentration'
  },
  {
    name: 'Sleep & Rest',
    icon: Moon,
    color: 'bg-accent/20 text-accent border-accent/30',
    tracks: 15,
    duration: '60 min',
    description: 'Soothing melodies for peaceful sleep'
  },
  {
    name: 'Energy & Motivation',
    icon: Zap,
    color: 'bg-destructive/20 text-destructive border-destructive/30',
    tracks: 10,
    duration: '28 min',
    description: 'Uplifting rhythms to boost your mood'
  },
];

const featuredTracks = [
  {
    title: 'Morning Mindfulness',
    artist: 'Dr. Sarah Chen',
    duration: '15:30',
    category: 'Guided Meditation',
    isPlaying: false
  },
  {
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    duration: '45:00',
    category: 'Ambient',
    isPlaying: true
  },
  {
    title: 'Breathing Space',
    artist: 'Mindful Moments',
    duration: '10:15',
    category: 'Breathing Exercise',
    isPlaying: false
  },
  {
    title: 'Forest Rain',
    artist: 'Natural Wellness',
    duration: '30:45',
    category: 'Nature Sounds',
    isPlaying: false
  },
];

export default function Meditation() {
  const [currentTrack, setCurrentTrack] = useState<string | null>('Ocean Waves');

  const togglePlay = (trackTitle: string) => {
    setCurrentTrack(currentTrack === trackTitle ? null : trackTitle);
  };

  return (
    <div className="space-y-8 animate-fade-in room-meditation min-h-screen">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-accent mb-8">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${meditationBg})` }}
          />
          <div className="relative p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Headphones className="w-8 h-8 text-accent-foreground" />
              <h1 className="text-3xl font-bold text-accent-foreground">Meditation & Music</h1>
            </div>
            <p className="text-accent-foreground/80 text-lg">
              Curated audio experiences to support your mindfulness journey.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood-Based Playlists */}
            <Card className="wellness-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Music className="w-5 h-5 text-primary" />
                  <span>Choose Your Mood</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {moodPlaylists.map((playlist) => {
                    const Icon = playlist.icon;
                    
                    return (
                      <button
                        key={playlist.name}
                        className={cn(
                          "p-6 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-wellness-medium border-2",
                          playlist.color
                        )}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <Icon className="w-8 h-8" />
                          <Badge variant="outline" className="text-xs">
                            {playlist.tracks} tracks
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
                        <p className="text-sm opacity-80 mb-4">{playlist.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-xs opacity-70">
                            <Clock className="w-3 h-3" />
                            <span>{playlist.duration}</span>
                          </div>
                          <Play className="w-5 h-5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Featured Tracks */}
            <Card className="wellness-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span>Featured Today</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {featuredTracks.map((track, index) => {
                    const isPlaying = currentTrack === track.title;
                    
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:shadow-wellness-soft border",
                          isPlaying 
                            ? "bg-primary/10 border-primary/30" 
                            : "bg-gradient-calm border-border/30 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => togglePlay(track.title)}
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                              isPlaying 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted hover:bg-primary hover:text-primary-foreground"
                            )}
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          
                          <div>
                            <h4 className="font-medium text-foreground">{track.title}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{track.artist}</span>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                {track.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>{track.duration}</span>
                          <Volume2 className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Session */}
            <Card className="wellness-card bg-gradient-wellness">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Headphones className="w-5 h-5 text-primary" />
                  <span>Current Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {currentTrack ? (
                  <>
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <Pause className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{currentTrack}</h3>
                      <p className="text-sm text-muted-foreground">Now playing</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-1/3 transition-all duration-300"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>12:30</span>
                      <span>45:00</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <Music className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Ready to begin?</h3>
                      <p className="text-sm text-muted-foreground">Choose a track to start</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Session Stats */}
            <Card className="wellness-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Minutes Today</span>
                  </div>
                  <Badge className="bg-primary/20 text-primary">23</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Session Streak</span>
                  </div>
                  <Badge className="bg-secondary/20 text-secondary">7 days</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-sm">Total Sessions</span>
                  </div>
                  <Badge className="bg-accent/20 text-accent">42</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                Create Custom Playlist
              </Button>
              <Button variant="outline" className="w-full border-secondary/30 hover:bg-secondary/10">
                Download for Offline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}