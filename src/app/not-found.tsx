'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Home } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname(); // Next.js way to get current path
  const router = useRouter();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-52 h-52 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 text-center px-6">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-10 h-10 text-primary mr-3 animate-spin-slow" />
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <p className="text-2xl md:text-3xl text-foreground mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-muted-foreground mb-10">
          Let’s guide you back to a peaceful place 🌿
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => router.push("/")} // Next.js navigation
            size="lg"
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 text-lg rounded-2xl shadow-wellness-medium hover:shadow-wellness-large transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/explore-features")}
            className="border-primary/30 text-primary hover:bg-primary/5 px-8 py-4 text-lg rounded-2xl"
          >
            Explore Features
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
