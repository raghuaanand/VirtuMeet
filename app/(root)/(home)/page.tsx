import MeetingList from "@/components/meeting-list";
import Time from "@/components/time";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <section className="size-full flex flex-col gap-8 text-white">
      {/* Hero Section with enhanced design */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 px-6 sm:px-8 py-8 md:py-12 rounded-3xl bg-hero bg-cover bg-center overflow-hidden">
        {/* Enhanced overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between md:px-6 md:py-8">
          {/* Welcome message with enhanced styling */}
          <div className="glassmorphism w-fit rounded-2xl px-6 py-3 backdrop-blur-xl">
            <h2 className="text-lg md:text-xl font-semibold text-center">
              Welcome back, 
              <span className="text-gradient font-bold ml-1">
                {user?.firstName} {user?.lastName}
              </span> 
              <span className="ml-2">👋</span>
            </h2>
          </div>
          
          {/* Time component container */}
          <div className="flex justify-center items-end">
            <div className="glassmorphism rounded-3xl p-4 backdrop-blur-xl">
              <Time />
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-pink-500/20 rounded-full blur-md animate-pulse delay-500"></div>
      </div>
      
      {/* Meeting List Section */}
      <div className="w-full">
        <MeetingList />
      </div>
    </section>
  );
};

export default HomePage;
