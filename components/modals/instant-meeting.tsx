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
      <DialogContent className="modern-card w-full max-w-lg p-8 text-white outline-none border-none">
        <div className="flex flex-col items-center gap-8">
          {/* Icon with glow effect */}
          <div className="relative">
            <div className="glassmorphism p-6 rounded-3xl">
              <Video className="size-12 text-blue-400" />
            </div>
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl animate-pulse"></div>
          </div>
          
          {/* Content */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gradient">
              Start Instant Meeting
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Create and join a meeting immediately with HD video quality
            </p>
          </div>
          
          {/* Action button */}
          <Button 
            onClick={handleClick} 
            isLoading={loading}
            className="btn-glow w-full py-4 text-lg font-semibold"
            size="lg"
          >
            {!loading && <Zap className="size-5 mr-2" />}
            {loading ? "Creating Meeting..." : "Start Meeting Now"}
          </Button>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4 w-full text-sm text-gray-400">
            <div className="text-center">
              <div className="text-blue-400 font-semibold">HD Quality</div>
              <div>Crystal clear video</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-semibold">Instant</div>
              <div>No waiting time</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstantMeeting;
