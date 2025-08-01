"use client";

import useModalStore from "@/hooks/useModalStore";
import { Calendar, Plus, UserPlus, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import HomeCard from "./home-card";

const MeetingList = () => {
  const router = useRouter();
  const { onOpen } = useModalStore();

  return (
    <section className="w-full">
      {/* Compact grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <HomeCard
          Icon={Plus}
          title="New Meeting"
          description="Start an instant meeting now"
          onClick={() => onOpen("instant-meeting")}
        />
        <HomeCard
          Icon={UserPlus}
          title="Join Meeting"
          description="Join a meeting via invitation link"
          onClick={() => onOpen("join-meeting")}
        />
        <HomeCard
          Icon={Calendar}
          title="Schedule Meeting"
          description="Plan your meeting for later"
          onClick={() => onOpen("schedule-meeting")}
        />
        <HomeCard
          Icon={Video}
          title="View Recordings"
          description="Access your recorded meetings"
          onClick={() => router.push("/recordings")}
        />
      </div>
    </section>
  );
};

export default MeetingList;
