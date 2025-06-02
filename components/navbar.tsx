import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex justify-between items-center w-full glass-morphism-dark px-6 py-4 lg:px-10 border-b border-white/10">
      <Link href="/" className="flex items-center gap-3 hover-lift">
        <div className="relative">
          <Image
            src="/icons/logo.svg"
            width={40}
            height={40}
            alt="VirtuMeet logo"
            className="max-sm:size-10"
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur animate-pulse"></div>
        </div>
        <div className="max-sm:hidden">
          <h1 className="text-2xl font-bold text-gradient">VirtuMeet</h1>
          <p className="text-xs text-gray-400 -mt-1">Connect. Collaborate. Create.</p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <SignedIn>
          <div className="relative">
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-blue-500/30 hover:ring-blue-400/50 transition-all duration-300",
                  userButtonPopoverCard: "glass-morphism-dark border border-white/10",
                  userButtonPopoverActionButton: "text-white hover:bg-white/10",
                }
              }}
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-sm animate-pulse"></div>
          </div>
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
