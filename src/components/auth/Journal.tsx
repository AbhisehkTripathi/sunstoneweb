"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Heart, 
  Smile, 
  Meh, 
  Frown, 
  Sun,
  Cloud,
  Save,
  Calendar,
  Tag
} from 'lucide-react';
import { cn } from '@/libs/utils';
import journalBg from '@/assets/journal-bg.jpg';

const moodTags = [
  { name: 'Grateful', icon: Heart, color: 'bg-secondary/20 text-secondary' },
  { name: 'Peaceful', icon: Sun, color: 'bg-primary/20 text-primary' },
  { name: 'Reflective', icon: BookOpen, color: 'bg-accent/20 text-accent' },
  { name: 'Anxious', icon: Cloud, color: 'bg-muted text-muted-foreground' },
  { name: 'Sad', icon: Frown, color: 'bg-destructive/20 text-destructive' },
  { name: 'Happy', icon: Smile, color: 'bg-secondary/30 text-secondary-dark' },
];

const recentEntries = [
  {
    date: 'Today, 2:30 PM',
    preview: 'Feeling grateful for the small moments of peace I found during my morning walk...',
    tags: ['Grateful', 'Peaceful'],
    mood: 'Good'
  },
  {
    date: 'Yesterday, 8:15 PM',
    preview: 'Today was challenging, but I managed to practice breathing exercises when I felt overwhelmed...',
    tags: ['Reflective', 'Anxious'],
    mood: 'Okay'
  },
  {
    date: '2 days ago, 7:00 AM',
    preview: 'Morning pages feel so cleansing. There\'s something magical about putting thoughts on paper...',
    tags: ['Grateful', 'Happy'],
    mood: 'Excellent'
  },
];

export default function Journal() {
  const [entryText, setEntryText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  return (
    <div className="space-y-8 animate-fade-in room-journal min-h-screen">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-secondary mb-8">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${journalBg})` }}
          />
          <div className="relative p-8">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-secondary-foreground" />
              <h1 className="text-3xl font-bold text-secondary-foreground">Mind Journal</h1>
            </div>
            <p className="text-secondary-foreground/80 text-lg">
              A safe, private space for your thoughts, feelings, and reflections.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="wellness-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>New Entry</span>
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind today? Remember, this is your safe space to express any thoughts or feelings without judgment..."
                  value={entryText}
                  onChange={(e) => setEntryText(e.target.value)}
                  className="min-h-[300px] bg-gradient-calm border-border/30 focus:border-secondary resize-none text-base leading-relaxed"
                />
                
                {/* Mood Tags */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>How are you feeling? (Select any that resonate)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moodTags.map((tag) => {
                      const Icon = tag.icon;
                      const isSelected = selectedTags.includes(tag.name);
                      
                      return (
                        <button
                          key={tag.name}
                          onClick={() => toggleTag(tag.name)}
                          className={cn(
                            "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1",
                            isSelected 
                              ? `${tag.color} shadow-wellness-soft border-2 border-current` 
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{tag.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-muted-foreground">
                    {entryText.length} characters • Auto-saved
                  </div>
                  <Button 
                    className="bg-secondary hover:bg-secondary-dark text-secondary-foreground"
                    disabled={!entryText.trim()}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Entries Sidebar */}
          <div className="space-y-6">
            <Card className="wellness-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Entries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gradient-calm border border-border/30 hover:shadow-wellness-soft transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-muted-foreground">{entry.date}</div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          entry.mood === 'Excellent' && "border-secondary/50 text-secondary",
                          entry.mood === 'Good' && "border-primary/50 text-primary",
                          entry.mood === 'Okay' && "border-accent/50 text-accent"
                        )}
                      >
                        {entry.mood}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-foreground/80 line-clamp-3 mb-3 group-hover:text-foreground transition-colors">
                      {entry.preview}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4 border-secondary/30 hover:bg-secondary/10">
                  View All Entries
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="wellness-card bg-gradient-wellness">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>Journaling Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p>• Write without judgment - let your thoughts flow freely</p>
                  <p>• There's no right or wrong way to journal</p>
                  <p>• Even a few sentences can be meaningful</p>
                  <p>• Focus on how you feel, not just what happened</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}