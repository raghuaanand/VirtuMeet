"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useModalStore from "@/hooks/useModalStore";
import useOrigin from "@/hooks/useOrigin";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Check, Copy } from "lucide-react";
import DatePicker from "react-datepicker";
import { toast } from "sonner";

const ScheduleMeeting = () => {
  const { isOpen, type, onClose } = useModalStore();
  const client = useStreamVideoClient();
  const origin = useOrigin();
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callDetail, setCallDetail] = useState<Call>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
  });

  const meetingLink = `${origin}/meeting/${callDetail?.id}`;

  const handleClick = async () => {
    if (!client || !user) return;
    try {
      setLoading(true);
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      await call.getOrCreate({
        data: {
          starts_at: values.dateTime.toISOString(),
          custom: {
            description: values.description,
          },
        },
      });
      toast.success("Meeting scheduled successfully!");
      setCallDetail(call);
    } catch (error) {
      toast.error("Failed to create Meeting!");
    } finally {
      setLoading(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setCallDetail(undefined);
    setLoading(false);
    setCopied(false);
    setValues({
      dateTime: new Date(),
      description: "",
    });
  };

  return (
    <Dialog
      open={isOpen && type === "schedule-meeting"}
      onOpenChange={handleClose}
    >
      <DialogContent className="modern-card w-full max-w-lg border-none px-6 py-9 text-white shadow-2xl backdrop-blur-xl">
        {callDetail ? (
          <div className="flex flex-col gap-8">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  alt="checked"
                  width={72}
                  height={72}
                  src={"/icons/checked.svg"}
                  className="icon-glow animate-pulse"
                />
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-bold leading-[42px] text-center text-gradient bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300">
              Meeting Scheduled Successfully! 
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 text-center">
                Share this link with participants to join the meeting
              </p>
              <div className="flex items-center gap-2 p-3 glass-morphism-dark rounded-lg border border-white/10">
                <input
                  className="flex-1 px-3 py-2 text-sm rounded-md bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent truncate"
                  value={meetingLink}
                  readOnly
                />
                <Button
                  onClick={onCopy}
                  disabled={copied}
                  className="btn-glow px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 border-0 font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold leading-[42px] text-gradient bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300">
                Schedule Meeting
              </h2>
              <p className="text-gray-400">
                Set up a future meeting with date, time and description
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                  Add a description (optional)
                </Label>
                <Textarea
                  name="description"
                  placeholder="Enter meeting description, agenda, or notes..."
                  value={values.description}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      description: e.target.value,
                    })
                  }
                  className="glass-morphism-dark border border-white/10 focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-white placeholder-gray-400 resize-none backdrop-blur-sm"
                  rows={4}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="datetime" className="text-sm font-medium text-gray-300">
                  Select Date and Time
                </Label>
                <div className="relative">
                  <DatePicker
                    selected={values.dateTime}
                    onChange={(date) => setValues({ ...values, dateTime: date! })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    className="w-full p-3 rounded-lg glass-morphism-dark border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                    placeholderText="Select date and time"
                    popperClassName="date-picker-popper"
                  />
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleClick} 
              isLoading={loading}
              className="btn-glow w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium text-white border-0 hover-lift"
            >
              {loading ? "Scheduling..." : "Schedule Meeting"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;
