"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Video, Zap } from "lucide-react";

const InstantMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();
  const router = useRouter();

  const handleClick = async () => {
    if (!client || !user) return;
    try {
      setLoading(true);
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = new Date(Date.now()).toISOString();
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: "Instant Meeting",
          },
        },
      });
      onClose();
      router.push(`/meeting/${call.id}`);
      toast.success("Meeting Created Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Meeting!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen && type === "instant-meeting"} onOpenChange={onClose}>
      <DialogContent className="bg-[#242438] border border-[#3A3A4A] w-full max-w-md p-6 text-white outline-none">
        <div className="flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="p-4 rounded-full bg-[#1ABC9C]/10">
            <Video className="w-8 h-8 text-[#1ABC9C]" />
          </div>
          
          {/* Content */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-[#E0E0E0]">
              Start Instant Meeting
            </h2>
            <p className="text-[#A0A0A0] text-sm">
              Create and join a meeting immediately
            </p>
          </div>
          
          {/* Action button */}
          <Button 
            onClick={handleClick} 
            disabled={loading}
            className="w-full py-2 bg-[#1ABC9C] hover:bg-[#1ABC9C]/80 text-white font-medium rounded-lg transition-all duration-200"
          >
            {loading ? "Creating..." : "Start Meeting Now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstantMeeting;
