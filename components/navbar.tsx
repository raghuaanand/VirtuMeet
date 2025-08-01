import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex justify-between items-center w-full px-6 py-4 lg:px-10 border-b border-white/20" style={{ backgroundColor: '#1C1C2E' }}>
      <Link href="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
        <div className="relative">
          <Image
            src="/icons/logo.svg"
            width={32}
            height={32}
            alt="VirtuMeet logo"
            className="max-sm:size-8"
          />
        </div>
        <div className="max-sm:hidden">
          <h1 className="text-xl font-bold" style={{ color: '#E0E0E0' }}>VirtuMeet</h1>
          <p className="text-xs -mt-1" style={{ color: '#A0A0A0' }}>Connect. Collaborate. Create.</p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <SignedIn>
          <div className="relative">
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border border-white/20 hover:border-opacity-40 transition-all duration-300",
                  userButtonPopoverCard: "border border-white/20",
                  userButtonPopoverActionButton: "text-white hover:bg-white/10",
                }
              }}
            />
          </div>
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
