import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#1C1C2E] min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex w-full min-h-[100dvh] flex-1 flex-col px-4 pb-4 pt-24 max-md:pb-12 sm:px-6 md:px-8 xl:px-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
