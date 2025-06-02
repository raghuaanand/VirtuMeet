import CallList from "@/components/call-list";

const UpComingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white p-6">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r from-green-300 via-blue-300 to-purple-300">
          Upcoming Meetings
        </h2>
        <p className="text-gray-400 text-lg">
          View and manage your scheduled upcoming meetings
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
      </div>
      <div className="flex-1">
        <CallList type="Upcoming" />
      </div>
    </section>
  );
};

export default UpComingPage;
