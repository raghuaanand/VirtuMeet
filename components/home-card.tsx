import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick: () => void;
};

const HomeCard = ({ Icon, title, description, onClick, className }: Props) => {
  return (
    <div
      className={cn(
        "group modern-card p-6 flex flex-col justify-between w-full xl:max-w-80 min-h-72 cursor-pointer relative overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Icon container with enhanced glassmorphism */}
      <div className="relative z-10">
        <div className="glassmorphism size-16 rounded-2xl flex justify-center items-center mb-6 group-hover:scale-110 transition-all duration-300">
          <Icon className="size-8 text-white drop-shadow-lg" />
          {/* Icon glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
          {title}
        </h2>
        <p className="text-base font-medium text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-sm animate-pulse"></div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
    </div>
  );
};

export default HomeCard;
