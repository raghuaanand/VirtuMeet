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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1C1C2E' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-6 space-y-2">
          <h1 className="text-3xl font-bold" style={{ color: '#E0E0E0' }}>
            Join VirtuMeet
          </h1>
          <p className="text-lg" style={{ color: '#A0A0A0' }}>
            Create your account to get started
          </p>
        </div>
        
        <div className="rounded-lg border p-6" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}>
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none border-none",
                headerTitle: "#E0E0E0",
                headerSubtitle: "#A0A0A0",
                socialButtonsBlockButton: "bg-[#1C1C2E] border border-[#3A3A4A] text-[#E0E0E0] hover:bg-[#3A3A4A]",
                formButtonPrimary: "bg-[#1ABC9C] hover:bg-[#16A085] text-white border-0",
                formFieldInput: "bg-[#1C1C2E] border border-[#3A3A4A] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#1ABC9C]",
                footerActionLink: "text-[#1ABC9C] hover:text-[#16A085]",
                identityPreviewText: "#E0E0E0",
                formFieldLabel: "#E0E0E0"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
