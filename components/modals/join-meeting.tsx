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
      <DialogContent className="modern-card w-full max-w-lg p-8 text-white outline-none border-none">
        <div className="flex flex-col items-center gap-8">
          {/* Icon with glow effect */}
          <div className="relative">
            <div className="glassmorphism p-6 rounded-3xl">
              <UserPlus className="size-12 text-blue-400" />
            </div>
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl animate-pulse"></div>
          </div>
          
          {/* Content */}
          <div className="text-center space-y-4 w-full">
            <h2 className="text-3xl font-bold text-gradient">
              Join Meeting
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Enter the meeting ID or paste the invitation link
            </p>
            
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-8">
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  className="modern-card pl-12 pr-4 py-4 text-lg border-white/10 focus:border-blue-400/50 bg-white/5 backdrop-blur-sm"
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
                  <p className="text-red-400 text-sm mt-2 text-left">{errors.link.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="btn-glow w-full py-4 text-lg font-semibold"
                size="lg"
              >
                <UserPlus className="size-5 mr-2" />
                Join Meeting
              </Button>
            </form>
          </div>
          
          {/* Help text */}
          <div className="text-center text-sm text-gray-400 space-y-2">
            <p>Accepted formats:</p>
            <div className="grid grid-cols-1 gap-1 text-xs">
              <div>• Meeting ID: abc123</div>
              <div>• Full URL: https://virtumeet.com/meeting/abc123</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinMeeting;
