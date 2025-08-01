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
    <section className="flex items-center justify-center h-[100dvh] p-4" style={{ backgroundColor: '#1C1C2E' }}>
      <Card className="w-full max-w-lg border rounded-lg shadow-lg" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 text-center">
            <div className="flex flex-col gap-4">
              {iconUrl && (
                <div className="flex items-center justify-center">
                  <Image 
                    src={iconUrl} 
                    width={60} 
                    height={60} 
                    alt="icon"
                  />
                </div>
              )}
              <p className="text-lg font-semibold" style={{ color: '#E0E0E0' }}>
                {title}
              </p>
            </div>

            <Link 
              href="/" 
              className="px-6 py-3 font-medium text-white border-0 transition-all duration-200 rounded-lg inline-flex items-center justify-center"
              style={{ backgroundColor: '#1ABC9C' }}
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
