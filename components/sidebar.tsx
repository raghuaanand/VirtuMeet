"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between glass-morphism-dark border-r border-white/10 p-6 pt-28 text-white max-sm:hidden lg:w-72 xl:w-80">
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-2xl justify-start transition-all duration-300 hover-lift group relative overflow-hidden",
                isActive 
                  ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg shadow-blue-500/25" 
                  : "hover:bg-white/5 hover:shadow-lg"
              )}
            >
              {/* Background glow effect for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
              )}
              
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-white/20 shadow-lg" 
                  : "group-hover:bg-white/10"
              )}>
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={24}
                  height={24}
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "scale-110" : "group-hover:scale-105"
                  )}
                />
              </div>
              
              <p className={cn(
                "text-lg font-semibold max-lg:hidden transition-all duration-300",
                isActive ? "text-white" : "text-gray-300 group-hover:text-white"
              )}>
                {item.label}
              </p>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Link>
          );
        })}
      </div>
      
      {/* Footer gradient */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10">
        <p className="text-sm text-gray-400 text-center">
          Powered by VirtuMeet
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
