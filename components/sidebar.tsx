"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-white/20 p-6 pt-28 text-white max-sm:hidden lg:w-64 xl:w-72" style={{ backgroundColor: '#1C1C2E' }}>
      <div className="flex flex-1 flex-col gap-3">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center p-3 rounded-lg justify-start transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "text-white shadow-lg" 
                  : "hover:shadow-lg"
              )}
              style={{ 
                backgroundColor: isActive ? '#1ABC9C' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#242438';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isActive 
                  ? "bg-white/20 shadow-lg" 
                  : "group-hover:bg-white/10"
              )}>
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "scale-110" : "group-hover:scale-105"
                  )}
                />
              </div>
              
              <p className={cn(
                "text-sm font-medium max-lg:hidden transition-all duration-300",
                isActive ? "text-white" : "text-gray-300 group-hover:text-white"
              )}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      
      {/* Footer */}
      <div className="mt-8 p-3 rounded-lg border border-white/20" style={{ backgroundColor: '#242438' }}>
        <p className="text-xs text-center" style={{ color: '#A0A0A0' }}>
          Powered by VirtuMeet
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
