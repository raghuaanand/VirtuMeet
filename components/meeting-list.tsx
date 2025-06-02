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
      {/* Section header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Quick <span className="text-gradient">Actions</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Start or schedule your meetings with one click
        </p>
      </div>
      
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        <HomeCard
          Icon={Plus}
          title="New Meeting"
          description="Start an instant meeting with enhanced video quality"
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/30 border border-orange-500/20 hover:border-orange-400/40"
          onClick={() => onOpen("instant-meeting")}
        />
        <HomeCard
          Icon={UserPlus}
          title="Join Meeting"
          description="Join via invitation link or meeting ID"
          onClick={() => onOpen("join-meeting")}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-500/20 hover:border-blue-400/40"
        />
        <HomeCard
          Icon={Calendar}
          title="Schedule Meeting"
          description="Plan your meeting with advanced scheduling options"
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/30 border border-purple-500/20 hover:border-purple-400/40"
          onClick={() => onOpen("schedule-meeting")}
        />
        <HomeCard
          Icon={Video}
          title="View Recordings"
          description="Access and manage your recorded meetings"
          className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 border border-yellow-500/20 hover:border-yellow-400/40"
          onClick={() => router.push("/recordings")}
        />
      </div>
    </section>
  );
};

export default MeetingList;
