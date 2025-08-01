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
  <div className="bg-[#242438] border border-[#3A3A4A] rounded-lg p-4 space-y-2">
    <h3 className="text-sm font-semibold text-[#1ABC9C]">
      {title}
    </h3>
    <div className="p-3 bg-[#1C1C2E] rounded-lg border border-[#3A3A4A]">
      <h4 className="text-[#E0E0E0] text-sm font-medium break-all">
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
    <section className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#E0E0E0]">
          Personal Meeting Room
        </h1>
        <p className="text-[#A0A0A0] text-sm">
          Your dedicated space for instant meetings and collaboration
        </p>
        <div className="h-px w-16 bg-[#1ABC9C]" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={startRoom}
          className="px-6 py-2 bg-[#1ABC9C] hover:bg-[#1ABC9C]/80 text-white font-medium rounded-lg transition-all duration-200"
        >
          Start Meeting
        </Button>
        <Button
          variant="outline"
          onClick={onCopy}
          disabled={copied}
          className="px-6 py-2 bg-[#242438] border border-[#3A3A4A] text-[#E0E0E0] hover:bg-[#3A3A4A] transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="size-4 mr-2 text-[#1ABC9C]" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoomPage;
