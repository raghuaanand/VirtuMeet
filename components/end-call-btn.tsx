"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallBtn = () => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push("/");
  };

  return (
    <Button 
      onClick={endCall} 
      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 transition-all duration-300 hover-lift btn-glow font-medium"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallBtn;
