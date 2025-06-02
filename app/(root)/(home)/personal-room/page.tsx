"use client";

import { Button } from "@/components/ui/button";
import useGetCallById from "@/hooks/useGetCallById";
import useOrigin from "@/hooks/useOrigin";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="modern-card p-6 space-y-3 hover-lift transition-all duration-300">
    <h3 className="text-lg font-semibold text-gradient bg-gradient-to-r from-blue-300 to-purple-300">
      {title}
    </h3>
    <div className="p-3 glass-morphism-dark rounded-lg border border-white/10 group">
      <h4 className="text-white font-medium break-all group-hover:text-blue-300 transition-colors duration-300">
        {description}
      </h4>
    </div>
  </div>
);

const PersonalRoomPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;
    try {
      const newCall = client.call("default", meetingId!);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }

      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      toast.error("Failed to create meeting!");
    }
  };

  const meetingLink = `${origin}/meeting/${meetingId}?personal=true`;

  const onCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="size-full flex flex-col gap-10 text-white p-6">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300">
          Personal Meeting Room
        </h2>
        <p className="text-gray-400 text-lg">
          Your dedicated space for instant meetings and collaboration
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
      </div>

      <div className="flex w-full flex-col gap-6 xl:max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <Table
            title="Meeting Topic"
            description={`${user?.firstName} ${user?.lastName}'s Personal Room`}
          />
          <Table 
            title="Meeting ID" 
            description={meetingId!} 
          />
          <Table 
            title="Meeting Link" 
            description={meetingLink} 
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button 
          onClick={startRoom}
          className="btn-glow px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 font-medium text-white border-0 hover-lift"
        >
          Start Meeting
        </Button>
        <Button
          variant="outline"
          onClick={onCopy}
          disabled={copied}
          className="px-8 py-3 glass-morphism-dark border border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover-lift"
        >
          {copied ? (
            <>
              <Check className="size-4 mr-2 text-green-400" />
              Copied Successfully!
            </>
          ) : (
            <>
              <Copy className="size-4 mr-2" />
              Copy Invitation Link
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoomPage;
