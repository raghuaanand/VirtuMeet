"use client";

import { Check, Copy, LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { format } from "date-fns";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  ButtonIcon?: LucideIcon;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  ButtonIcon,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const [copied, setCopied] = useState(false);

  const meetingDate = format(new Date(date), "MMM dd, yyyy • h:mm a");

  const onCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="bg-[#242438] border border-[#3A3A4A] rounded-lg p-4 flex flex-col justify-between min-h-[140px]">
      {/* Header */}
      <article className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#1ABC9C]/10">
            <Image 
              src={icon} 
              alt="meeting-image" 
              width={20} 
              height={20}
              className="text-[#1ABC9C]" 
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-[#E0E0E0] line-clamp-2">
            {title}
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#1ABC9C] rounded-full"></div>
            <p className="text-xs text-[#A0A0A0]">{meetingDate}</p>
          </div>
        </div>
      </article>
      
      {/* Actions */}
      <article className="flex flex-col gap-2 mt-3">
        {!isPreviousMeeting && (
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleClick}
              className="w-full py-2 bg-[#1ABC9C] hover:bg-[#1ABC9C]/80 text-white text-xs font-medium rounded-lg transition-all duration-200"
              size="sm"
            >
              {ButtonIcon && <ButtonIcon className="w-3 h-3 mr-1" />}
              {buttonText}
            </Button>
            
            <Button 
              onClick={onCopy} 
              variant="outline" 
              disabled={copied}
              size="sm"
              className="w-full py-2 bg-[#1C1C2E] border border-[#3A3A4A] text-[#E0E0E0] hover:bg-[#3A3A4A] text-xs"
            >
              {!copied ? (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Link
                </>
              ) : (
                <>
                  <Check className="w-3 h-3 mr-1 text-[#1ABC9C]" />
                  Copied!
                </>
              )}
            </Button>
          </div>
        )}
        
        {isPreviousMeeting && (
          <div className="p-2 rounded-lg bg-[#1C1C2E] border border-[#3A3A4A]">
            <p className="text-xs text-[#A0A0A0] text-center">
              Meeting completed
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
