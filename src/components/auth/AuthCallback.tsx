'use client';

import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const AuthCallback = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const registerUser = async () => {
      if (user && isSignedIn) {
        try {
          const response = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clerkUserId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              name: `${user.firstName || ""} ${user.lastName || ""}`,
              profile: user.imageUrl,
              createdAt: user.createdAt,
            }),
          });

          await response.json(); // handle if needed
        } catch (err) {
          console.error("Failed to register user:", err);
        }

        router.push("/dashboard");
      }
    };

    registerUser();
  }, [user, isSignedIn, router]);

  return <p>Finishing login...</p>;
};

export default AuthCallback;
