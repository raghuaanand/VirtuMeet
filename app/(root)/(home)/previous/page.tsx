import CallList from "@/components/call-list";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white p-6">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r from-purple-300 via-pink-300 to-red-300">
          Previous Meetings
        </h2>
        <p className="text-gray-400 text-lg">
          Review your completed meetings and call history
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
      </div>
      <div className="flex-1">
        <CallList type="Ended" />
      </div>
    </section>
  );
};

export default PreviousPage;
