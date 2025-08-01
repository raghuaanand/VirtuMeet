"use client";

import useGetCalls from "@/hooks/useGetCalls";
import useOrigin from "@/hooks/useOrigin";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "./loader";
import MeetingCard from "./meeting-card";

type Props = {
  type: "Ended" | "Upcoming" | "Recordings";
};

const CallList = ({ type }: Props) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const origin = useOrigin();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [loadingRecordings, setLoadingRecordings] = useState(false);

  const getCalls = () => {
    switch (type) {
      case "Ended":
        return endedCalls;
      case "Recordings":
        return recordings;
      case "Upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "Ended":
        return "No Previous Calls";
      case "Upcoming":
        return "No Upcoming Calls";
      case "Recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useLayoutEffect(() => {
    const fetchRecordings = async () => {
      try {
        setLoadingRecordings(true);
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast.error("Please try again later!");
      } finally {
        setLoadingRecordings(false);
      }
    };

    if (type === "Recordings") fetchRecordings();
  }, [type, callRecordings]);

  if (isLoading || loadingRecordings) {
    return <Loader />;
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="w-full">
      {calls && calls.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {calls.map((meeting: Call | CallRecording) => (
            <MeetingCard
              key={(meeting as Call).id || crypto.randomUUID()}
              icon={
                type === "Ended"
                  ? "/icons/previous.svg"
                  : type === "Upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom?.description ||
                (meeting as CallRecording).filename ||
                "No Description"
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time
              }
              isPreviousMeeting={type === "Ended"}
              link={
                type === "Recordings"
                  ? (meeting as CallRecording).url
                  : `${origin}/meeting/${(meeting as Call).id}`
              }
              ButtonIcon={type === "Recordings" ? Play : undefined}
              buttonText={type === "Recordings" ? "Play" : "Start"}
              handleClick={
                type === "Recordings"
                  ? () => router.push((meeting as CallRecording).url)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-lg border flex items-center justify-center" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}>
            <span className="text-xl">📅</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold" style={{ color: '#E0E0E0' }}>{noCallsMessage}</h3>
            <p className="max-w-md text-sm" style={{ color: '#A0A0A0' }}>
              {type === "Ended" && "Your completed meetings will appear here"}
              {type === "Upcoming" && "Schedule a meeting to see it here"}
              {type === "Recordings" && "Your recorded meetings will appear here"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallList;
