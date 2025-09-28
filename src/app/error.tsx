'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("500 Error: Unexpected issue occurred", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-rose-100">
          {/* floating orbs for MindPeace vibe */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-red-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-52 h-52 bg-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative z-10 text-center px-6">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500 mr-3 animate-bounce" />
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                500
              </h1>
            </div>

            <p className="text-2xl md:text-3xl text-foreground mb-6">
              Something went wrong on our side 🛠️
            </p>
            <p className="text-muted-foreground mb-10">
              Take a breath 🌿 — we’re working to bring peace back.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => reset()}
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg rounded-2xl shadow-wellness-medium hover:shadow-wellness-large transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/")}
                className="border-red-400/30 text-red-500 hover:bg-red-50 px-8 py-4 text-lg rounded-2xl"
              >
                Return Home
                <Home className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
