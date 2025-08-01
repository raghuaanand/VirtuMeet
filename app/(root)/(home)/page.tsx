import MeetingList from "@/components/meeting-list";
import Time from "@/components/time";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <section className="w-full space-y-4">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#1ABC9C] rounded-full"></div>
            <span className="text-sm text-[#A0A0A0] font-medium">
              Welcome back, {user?.firstName} {user?.lastName}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#E0E0E0]">
            Dashboard
          </h1>
        </div>
        
        {/* Quick Status */}
        <div className="text-right">
          <div className="flex items-center gap-2 text-[#1ABC9C]">
            <div className="w-2 h-2 bg-[#1ABC9C] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Time Widget */}
      <div className="bg-[#242438] rounded-lg p-3 border border-[#3A3A4A]">
        <Time />
      </div>

      {/* Meeting Actions */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-[#E0E0E0] mb-1">Quick Actions</h2>
          <p className="text-sm text-[#A0A0A0]">Start or schedule meetings instantly</p>
        </div>
        
        <MeetingList />
      </div>
    </section>
  );
};

export default HomePage;
