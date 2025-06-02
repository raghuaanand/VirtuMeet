"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            size="icon" 
            variant="ghost"
            className="sm:hidden text-white hover:bg-white/10 border border-white/10 backdrop-blur-sm"
          >
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="glass-morphism-dark border-r border-white/10 p-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/icons/logo.svg"
                  width={32}
                  height={32}
                  alt="VirtuMeet logo"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">VirtuMeet</h1>
                <p className="text-xs text-gray-400 -mt-1">Connect & Collaborate</p>
              </div>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex h-[calc(100vh-140px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col gap-3 pt-8 px-4 text-white">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-2xl w-full transition-all duration-300 group relative overflow-hidden",
                          {
                            "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg shadow-blue-500/25": isActive,
                            "hover:bg-white/5 hover:shadow-lg": !isActive,
                          }
                        )}
                      >
                        {/* Background glow for active state */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
                        )}
                        
                        {/* Icon container */}
                        <div className={cn(
                          "p-2 rounded-xl transition-all duration-300",
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
                          "font-semibold transition-all duration-300",
                          isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                        )}>
                          {item.label}
                        </p>
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
            
            {/* Footer */}
            <div className="p-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  Powered by VirtuMeet
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
