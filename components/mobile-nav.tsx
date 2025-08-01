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
            className="sm:hidden border rounded-lg"
            style={{ color: '#E0E0E0', borderColor: '#3A3A4A', backgroundColor: '#242438' }}
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="border-r p-0"
          style={{ backgroundColor: '#1C1C2E', borderColor: '#3A3A4A' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#3A3A4A' }}>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/logo.svg"
                width={28}
                height={28}
                alt="VirtuMeet logo"
              />
              <div>
                <h1 className="text-lg font-bold" style={{ color: '#E0E0E0' }}>VirtuMeet</h1>
                <p className="text-xs -mt-1" style={{ color: '#A0A0A0' }}>Connect & Collaborate</p>
              </div>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex h-[calc(100vh-120px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col gap-2 pt-4 px-3" style={{ color: '#E0E0E0' }}>
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex gap-3 items-center p-3 rounded-lg w-full transition-all duration-200",
                          isActive ? "border-[#1ABC9C]" : "border-transparent"
                        )}
                        style={{
                          backgroundColor: isActive ? '#1ABC9C' : 'transparent',
                          borderWidth: '1px',
                          color: isActive ? '#FFFFFF' : '#E0E0E0'
                        }}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={18}
                          height={18}
                        />
                        <p className="font-medium text-sm">
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
            
            {/* Footer */}
            <div className="p-3">
              <div className="p-3 rounded-lg border text-center" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}>
                <p className="text-xs" style={{ color: '#A0A0A0' }}>
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
