import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  SignIn, 
  SignUp, 
  useUser, 
  useAuth
} from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sparkles, Lock, User } from 'lucide-react';

const AuthPage = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const initialMode = searchParams.get('mode') || 'sign-in';
  const [authMode, setAuthMode] = useState(initialMode);

  // Handle successful authentication
  useEffect(() => {
    console.log("User is signed in", user, isSignedIn);
    if (user && isSignedIn) {
      alert("User is signed in");
      handleUserRegistration(user);
    }
  }, [user, isSignedIn]);


  const handleUserRegistration = async (userData: any) => {
    setIsRegistering(true);
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkUserId: userData.id,
          email: userData.primaryEmailAddress?.emailAddress,
          name: `${userData.firstName || ""} ${userData.lastName || ""}`,
          profile: userData.imageUrl,
          createdAt: userData.createdAt,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('User registered successfully:', result);
        router.push('/dashboard');
      } else {
        const error = await response.json();
        console.error('Registration failed:', error);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsRegistering(false);
    }
  };


  if (isRegistering) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <Card className="w-full max-w-md p-8 text-center">
          <CardContent className="space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <h3 className="text-lg font-semibold">Setting up your account...</h3>
            <p className="text-muted-foreground">Please wait while we prepare your wellness journey.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-6">
      <Card className="w-full max-w-lg border border-primary/10 shadow-xl rounded-2xl bg-white/95">
        <CardHeader className="text-center space-y-4 pb-0">
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-md mb-2">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">Sunstone Mind</h1>
          </div>
          <p className="text-base text-muted-foreground font-medium mt-2">
            {authMode === 'sign-in' 
              ? 'Welcome back to your wellness sanctuary' 
              : 'Begin your journey to mental wellness'
            }
          </p>
        </CardHeader>
        
        <CardContent className="pt-2 pb-7 px-6">
          <div className="border-t border-primary/10 mb-6" />
          <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl shadow-inner p-4">
            <Tabs value={authMode} onValueChange={setAuthMode} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg overflow-hidden bg-white/60 border border-primary/10">
                <TabsTrigger value="sign-in" className="flex items-center gap-2 font-semibold text-primary">
                  <Lock className="w-4 h-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="sign-up" className="flex items-center gap-2 font-semibold text-primary">
                  <User className="w-4 h-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="space-y-4">
                <SignIn
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg',
                      card: 'shadow-none border-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'border-input hover:bg-accent hover:text-accent-foreground',
                      socialButtonsBlockButtonText: 'font-medium',
                      formFieldInput: 'border-input focus:border-primary focus:ring-primary',
                      footerActionLink: 'text-primary hover:text-primary/80'
                    },
                    layout: {
                      socialButtonsPlacement: 'top'
                    }
                  }}
                  signUpUrl="?mode=sign-up"
                  afterSignInUrl="/auth-callback"
                />
              </TabsContent>
              <TabsContent value="sign-up" className="space-y-4">
                <SignUp
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg',
                      card: 'shadow-none border-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'border-input hover:bg-accent hover:text-accent-foreground',
                      socialButtonsBlockButtonText: 'font-medium',
                      formFieldInput: 'border-input focus:border-primary focus:ring-primary',
                      footerActionLink: 'text-primary hover:text-primary/80'
                    },
                    layout: {
                      socialButtonsPlacement: 'top'
                    }
                  }}
                  afterSignInUrl="/auth-callback"
                  signInUrl="?mode=sign-in"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-7 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our <span className="text-primary font-semibold">Terms of Service</span> and <span className="text-primary font-semibold">Privacy Policy</span>
            </p>
          </div>
          <div className="mt-5 text-center">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-sm text-muted-foreground hover:text-primary font-medium"
            >
              ← Back to home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;