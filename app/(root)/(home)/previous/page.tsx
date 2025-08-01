import CallList from "@/components/call-list";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-6 text-white p-4">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold" style={{ color: '#E0E0E0' }}>
          Previous Meetings
        </h2>
        <p className="text-sm" style={{ color: '#A0A0A0' }}>
          Review your completed meetings and call history
        </p>
        <div className="h-px w-16 rounded-full" style={{ backgroundColor: '#1ABC9C' }} />
      </div>
      <div className="flex-1">
        <CallList type="Ended" />
      </div>
    </section>
  );
};

export default PreviousPage;
