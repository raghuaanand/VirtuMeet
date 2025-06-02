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
    <section className="modern-card min-h-64 w-full flex flex-col justify-between p-6 group">
      {/* Header */}
      <article className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="glassmorphism p-3 rounded-2xl">
            <Image 
              src={icon} 
              alt="meeting-image" 
              width={28} 
              height={28}
              className="group-hover:scale-110 transition-transform duration-300" 
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300 line-clamp-2">
            {title}
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <p className="text-base font-medium text-gray-300">{meetingDate}</p>
          </div>
        </div>
      </article>
      
      {/* Actions */}
      <article className="flex flex-col gap-4 mt-6">
        {!isPreviousMeeting && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleClick}
              className="btn-glow flex-1"
              size="default"
            >
              {ButtonIcon && <ButtonIcon className="size-4 mr-2" />}
              {buttonText}
            </Button>
            
            <Button 
              onClick={onCopy} 
              variant="outline" 
              disabled={copied}
              className="flex-1 sm:flex-none bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
            >
              {!copied ? (
                <>
                  <Copy className="size-4 mr-2" />
                  Copy Link
                </>
              ) : (
                <>
                  <Check className="size-4 mr-2 text-green-400" />
                  Copied!
                </>
              )}
            </Button>
          </div>
        )}
        
        {isPreviousMeeting && (
          <div className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
            <p className="text-sm text-gray-400 text-center">
              Meeting completed
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
