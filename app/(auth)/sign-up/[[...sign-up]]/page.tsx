'use client';

import { SignUp, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      redirect("/")
    }
  }, [isSignedIn]);

  return isSignedIn ? null : (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center p-6">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-green-300 via-blue-300 to-purple-300">
            Join VirtuMeet
          </h1>
          <p className="text-gray-400 text-lg">
            Create your account to get started
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto" />
        </div>
        
        <div className="modern-card p-8">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none border-none",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "glass-morphism-dark border border-white/10 text-white hover:bg-white/10",
                formButtonPrimary: "btn-glow bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600",
                formFieldInput: "glass-morphism-dark border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400/50",
                footerActionLink: "text-blue-400 hover:text-blue-300",
                identityPreviewText: "text-white",
                formFieldLabel: "text-gray-300"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
