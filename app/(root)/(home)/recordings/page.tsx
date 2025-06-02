import CallList from "@/components/call-list";
import { CallRecordingList } from "@stream-io/video-react-sdk";

const RecordingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white p-6">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300">
          Recorded Meetings
        </h2>
        <p className="text-gray-400 text-lg">
          Access and manage your recorded video calls and meetings
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>
      <div className="flex-1">
        <CallList type="Recordings" />
      </div>
    </section>
  );
};

export default RecordingsPage;
