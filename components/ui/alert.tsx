import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "./button";
import { Card, CardContent } from "./card";

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex items-center justify-center h-[100dvh] bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-6">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <Card className="relative z-10 w-full max-w-lg modern-card border-none p-8 text-white shadow-2xl">
        <CardContent className="p-0">
          <div className="flex flex-col gap-8 text-center">
            <div className="flex flex-col gap-6">
              {iconUrl && (
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <Image 
                      src={iconUrl} 
                      width={75} 
                      height={75} 
                      alt="icon" 
                      className="icon-glow"
                    />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
                  </div>
                </div>
              )}
              <p className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300">
                {title}
              </p>
            </div>

            <Link 
              href="/" 
              className="btn-glow px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium text-white border-0 hover-lift rounded-lg inline-flex items-center justify-center"
            >
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
