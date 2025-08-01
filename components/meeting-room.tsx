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
    <section className="relative h-[100dvh] w-full overflow-hidden pt-4 text-white" style={{ backgroundColor: '#1C1C2E' }}>
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-7xl items-center px-4">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2 rounded-l-lg border-l", {
            "show-block": showParticipants,
          })}
          style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Enhanced Video layout and Call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-4 flex-wrap pb-4 px-4" style={{ backgroundColor: 'rgba(28, 28, 46, 0.95)' }}>
        <div className="flex items-center gap-3 p-2 rounded-lg border" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}>
          <CallControls onLeave={() => router.push("/")} />
          
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-lg px-3 py-2 hover:bg-opacity-80 transition-all duration-200 border" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}>
                <LayoutList size={18} style={{ color: '#E0E0E0' }} />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border rounded-lg" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A', color: '#E0E0E0' }}>
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                    className="hover:bg-opacity-80 cursor-pointer transition-colors duration-200"
                    style={{ color: '#E0E0E0' }}
                  >
                    {item}
                  </DropdownMenuItem>
                  {index < 2 && <DropdownMenuSeparator style={{ borderColor: '#3A3A4A' }} />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <CallStatsButton />
          
          <button
            onClick={() => setShowParticipants((prev) => !prev)}
            className={cn(
              "rounded-lg px-3 py-2 hover:bg-opacity-80 transition-all duration-200 border",
              showParticipants ? "border-[#1ABC9C]" : "border-[#3A3A4A]"
            )}
            style={{ backgroundColor: showParticipants ? '#1ABC9C' : '#242438', color: '#E0E0E0' }}
          >
            <Users size={18} />
          </button>
          
          {!isPersonalRoom && <EndCallBtn />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
