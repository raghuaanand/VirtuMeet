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
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white border border-red-700 transition-all duration-200 font-medium text-sm rounded-lg"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallBtn;
