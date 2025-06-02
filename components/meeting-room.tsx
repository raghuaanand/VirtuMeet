"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EndCallBtn from "./end-call-btn";
import Loader from "./loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const client = useStreamVideoClient();
  const call = useCall();
  const { user } = useUser();
  const callingState = useCallCallingState();

  useEffect(() => {
    const unsubscribe = client?.on("call.ended", () => {
      if (call?.state.createdBy?.id !== user?.id) {
        toast.info("The Meeting has been ended by the host!");
        router.push("/");
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [client, call?.state.createdBy?.id, router, user?.id]);

  if (callingState !== CallingState.JOINED)
    return (
      <div className="h-[100dvh] w-full">
        <Loader />
      </div>
    );

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden pt-4 text-white bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-7xl items-center px-4">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2 glass-morphism-dark rounded-l-2xl border-l border-white/10", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Enhanced Video layout and Call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-4 flex-wrap pb-6 px-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-lg">
        <div className="flex items-center gap-4 p-3 glass-morphism-dark rounded-2xl border border-white/10">
          <CallControls onLeave={() => router.push("/")} />
          
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-xl glass-morphism-dark px-4 py-3 hover:bg-white/10 transition-all duration-300 hover-lift border border-white/10">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="glass-morphism-dark border border-white/20 text-white backdrop-blur-xl">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                    className="hover:bg-white/10 cursor-pointer transition-colors duration-200"
                  >
                    {item}
                  </DropdownMenuItem>
                  {index < 2 && <DropdownMenuSeparator className="border-white/10" />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <CallStatsButton />
          
          <button
            onClick={() => setShowParticipants((prev) => !prev)}
            className={cn(
              "rounded-xl glass-morphism-dark px-4 py-3 hover:bg-white/10 transition-all duration-300 hover-lift border border-white/10",
              showParticipants && "bg-blue-500/20 border-blue-400/30"
            )}
          >
            <Users size={20} className="text-white" />
          </button>
          
          {!isPersonalRoom && <EndCallBtn />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
