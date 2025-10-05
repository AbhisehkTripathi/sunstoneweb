"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Lock, User, Mail, Eye, EyeOff } from "lucide-react";
import { useRegister, useLogin } from "@/hooks/useAuth";
import { useUser, useAuth } from "@clerk/clerk-react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

type ApiUser = {
  user_id: number;
  name: string;
  email: string;
  role?: string | null;
  profile?: string | null;
  // ...other fields
};

type ApiPayload = {
  user: ApiUser;
  token: any; // may be "" if backend returns empty
};


type ApiResponse = {
  success: boolean;
  message: string;
  data: ApiPayload;
};

const AuthPage = () => {
  const { setAuth,setAuthLogin } = useAuthStore();
  const router = useRouter();
  const [authMode, setAuthMode] = useState("sign-in");
  const [useClerkAuth, setUseClerkAuth] = useState(false);
  
  // Clerk hooks
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  
  // Sign Up State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  
  // Error States
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  // Handle Clerk authentication
  useEffect(() => {
    if (user && isSignedIn && useClerkAuth) {
      registerMutation.mutate(
        {
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "User",
          email: user.primaryEmailAddress?.emailAddress || "",
          password_hash: user.id, // Using Clerk user ID as password for OAuth users
        },
        {
          onSuccess: (res) => {
            console.log("Clerk registration success:", res);
            setAuthMode("sign-in"); 
            setSignInEmail(signUpEmail);
          },
          onError: (err: any) => {
            console.error("Clerk registration failed:", err);
            // If user already exists, just redirect to dashboard
            if (err?.message?.includes("already exists") || err?.message?.includes("duplicate")) {
              router.push("/dashboard");
            }
          },
        }
      );
    }
  }, [user, isSignedIn, useClerkAuth]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError("");

    if (!signInEmail) {
      setSignInError("Please fill in all fields");
      return;
    }

    loginMutation.mutate(
      {
        email: signInEmail,
      },
      {
        onSuccess: (res) => {
          console.log("Login success:", res);
            if (res?.data?.token) {
            Cookies.set("authToken", res?.data?.token, {
              expires: 7,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            });
            const wrapper = res?.data;
            const payload: ApiPayload | undefined = (wrapper && (wrapper as any).data)  ?? wrapper;
            const user = payload?.user;
            const token = payload?.token;
            console.log("User data:", user);
            console.log("Token:", token);
            setAuthLogin(user, token);
          }
          
          router.push("/dashboard");
        },
        onError: (err: any) => {
          console.error("Login failed:", err);
          setSignInError(err?.response?.data?.message || "Login failed. Please try again.");
        },
      }
    );
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");

    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      setSignUpError("Please fill in all fields");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError("Passwords do not match");
      return;
    }

    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters long");
      return;
    }

    registerMutation.mutate(
      {
        name: signUpName,
        email: signUpEmail,
        password_hash: signUpPassword,
      },
      {
        onSuccess: (res) => {
          setAuthMode("sign-in"); 
          setSignInEmail(signUpEmail);
          toast.success("Registration successful");
          const data = res?.data;

          if (data) {
            const user = {
              id: data.user_id?.toString(),
              name: data.name,
              email: data.email,
              profile: data.profile,
              role: data.role,
            };
            setAuth(user, null); 
          }
        },
        onError: (err: any) => {
          console.error("Registration failed:", err);
          setSignUpError(err?.response?.data?.message || "Registration failed. Please try again.");
        },
      }
    );
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  if (useClerkAuth && isSignedIn && registerMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <Card className="w-full max-w-md p-8 text-center">
          <CardContent className="space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <h3 className="text-lg font-semibold">Setting up your account...</h3>
            <p className="text-muted-foreground">
              Please wait while we prepare your wellness journey.
            </p>
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
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">
              Sunstone Mind
            </h1>
          </div>
          <p className="text-base text-muted-foreground font-medium mt-2">
            {authMode === "sign-in"
              ? "Welcome back to your wellness sanctuary"
              : "Begin your journey to mental wellness"}
          </p>
        </CardHeader>

        <CardContent className="pt-2 pb-7 px-6">
          <div className="border-t border-primary/10 mb-6" />
          <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl shadow-inner p-4">
            <Tabs value={authMode} onValueChange={setAuthMode} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg overflow-hidden bg-white/60 border border-primary/10">
                <TabsTrigger
                  value="sign-in"
                  className="flex items-center gap-2 font-semibold text-primary"
                >
                  <Lock className="w-4 h-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="sign-up"
                  className="flex items-center gap-2 font-semibold text-primary"
                >
                  <User className="w-4 h-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="sign-in" className="space-y-4">
                {!useClerkAuth ? (
                  // Email/Password Sign In Form
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@example.com"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    {/* <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type={showSignInPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          className="pl-10 pr-10"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                        >
                          {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div> */}

                    {signInError && (
                      <p className="text-sm text-red-500 font-medium">{signInError}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gradient-to-br from-accent/10 to-secondary/10 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setUseClerkAuth(true)}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign in with Google
                    </Button>
                  </form>
                ) : (
                  // Clerk Sign In Component
                  <div>
                    <SignIn
                      appearance={{
                        elements: {
                          rootBox: "mx-auto",
                          card: "shadow-none",
                        },
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full mt-4"
                      onClick={() => setUseClerkAuth(false)}
                    >
                      ← Back to email sign in
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="sign-up" className="space-y-4">
                {!useClerkAuth ? (
                  // Email/Password Sign Up Form
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showSignUpPassword ? "text" : "password"}
                          placeholder="Create a password (min. 6 characters)"
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          className="pl-10 pr-10"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                        >
                          {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type={showSignUpPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    {signUpError && (
                      <p className="text-sm text-red-500 font-medium">{signUpError}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gradient-to-br from-accent/10 to-secondary/10 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setUseClerkAuth(true)}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign up with Google
                    </Button>
                  </form>
                ) : (
                  // Clerk Sign Up Component
                  <div>
                    <SignUp
                      appearance={{
                        elements: {
                          rootBox: "mx-auto",
                          card: "shadow-none",
                        },
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full mt-4"
                      onClick={() => setUseClerkAuth(false)}
                    >
                      ← Back to email sign up
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-7 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <span className="text-primary font-semibold">Terms of Service</span>{" "}
              and{" "}
              <span className="text-primary font-semibold">Privacy Policy</span>
            </p>
          </div>
          <div className="mt-5 text-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
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