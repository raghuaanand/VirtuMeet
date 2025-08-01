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
        "group p-4 flex flex-col gap-4 w-full h-32 cursor-pointer relative overflow-hidden rounded-lg border border-white/20 transition-all duration-300 hover:border-opacity-40 hover:transform hover:scale-105",
        className
      )}
      onClick={onClick}
      style={{ backgroundColor: '#242438' }}
    >
      {/* Icon and Title Row */}
      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: '#1ABC9C' }}
        >
          <Icon className="size-5 text-white" />
        </div>
        <h3 className="font-semibold text-sm" style={{ color: '#E0E0E0' }}>
          {title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: '#A0A0A0' }}>
        {description}
      </p>
    </div>
  );
};

export default HomeCard;
