"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useModalStore from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UserPlus, Link2 } from "lucide-react";

type Inputs = {
  link: string;
};

const JoinMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { link } = data;
    onClose();
    reset();

    router.push(link.includes("/meeting/") ? link : `/meeting/${link}`);
  };

  return (
    <Dialog open={isOpen && type === "join-meeting"} onOpenChange={onClose}>
      <DialogContent className="bg-[#242438] border border-[#3A3A4A] w-full max-w-md p-6 text-white outline-none">
        <div className="flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="p-4 rounded-full bg-[#1ABC9C]/10">
            <UserPlus className="w-8 h-8 text-[#1ABC9C]" />
          </div>
          
          {/* Content */}
          <div className="text-center space-y-2 w-full">
            <h2 className="text-xl font-bold text-[#E0E0E0]">
              Join Meeting
            </h2>
            <p className="text-[#A0A0A0] text-sm">
              Enter the meeting ID or paste the invitation link
            </p>
            
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A0A0A0]" />
                <Input
                  className="pl-10 pr-4 py-2 bg-[#1C1C2E] border border-[#3A3A4A] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#1ABC9C] focus:ring-0"
                  placeholder="Enter meeting ID or paste link..."
                  {...register("link", {
                    required: "Meeting ID or link is required",
                    minLength: {
                      value: 3,
                      message: "Meeting ID must be at least 3 characters"
                    }
                  })}
                />
                {errors.link && (
                  <p className="text-red-400 text-xs mt-1 text-left">{errors.link.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-2 bg-[#1ABC9C] hover:bg-[#1ABC9C]/80 text-white font-medium rounded-lg transition-all duration-200"
              >
                Join Meeting
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinMeeting;
