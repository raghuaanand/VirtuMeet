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
import { Check, Copy, Calendar } from "lucide-react";
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
      <DialogContent className="bg-[#242438] border border-[#3A3A4A] w-full max-w-md p-6 text-white outline-none">
        {callDetail ? (
          <div className="flex flex-col gap-6 items-center">
            <div className="p-4 rounded-full bg-[#1ABC9C]/10">
              <Image
                alt="checked"
                width={48}
                height={48}
                src={"/icons/checked.svg"}
                className="text-[#1ABC9C]"
              />
            </div>
            <h2 className="text-xl font-bold text-center text-[#E0E0E0]">
              Meeting Scheduled!
            </h2>
            <div className="space-y-3 w-full">
              <p className="text-[#A0A0A0] text-center text-sm">
                Share this link with participants
              </p>
              <div className="flex items-center gap-2 p-3 bg-[#1C1C2E] rounded-lg border border-[#3A3A4A]">
                <input
                  className="flex-1 bg-transparent text-[#E0E0E0] text-sm focus:outline-none"
                  value={meetingLink}
                  readOnly
                />
                <Button
                  onClick={onCopy}
                  disabled={copied}
                  size="sm"
                  className="px-3 py-1 bg-[#1ABC9C] hover:bg-[#1ABC9C]/80 text-white text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="text-center space-y-2">
              <div className="p-4 rounded-full bg-[#1ABC9C]/10 mx-auto w-fit">
                <Calendar className="w-8 h-8 text-[#1ABC9C]" />
              </div>
              <h2 className="text-xl font-bold text-[#E0E0E0]">
                Schedule Meeting
              </h2>
              <p className="text-[#A0A0A0] text-sm">
                Set up a future meeting with date and time
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-[#E0E0E0]">
                  Description (optional)
                </Label>
                <Textarea
                  name="description"
                  placeholder="Enter meeting description..."
                  value={values.description}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      description: e.target.value,
                    })
                  }
                  className="bg-[#1C1C2E] border border-[#3A3A4A] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#1ABC9C] focus:ring-0"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="datetime" className="text-sm font-medium text-[#E0E0E0]">
                  Date and Time
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
                    className="w-full p-3 rounded-lg bg-[#1C1C2E] border border-[#3A3A4A] text-[#E0E0E0] placeholder-[#A0A0A0] focus:outline-none focus:border-[#1ABC9C]"
                    placeholderText="Select date and time"
                  />
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleClick} 
              disabled={loading}
              className="w-full py-2 bg-[#1ABC9C] hover:bg-[#1ABC9C]/80 text-white font-medium rounded-lg transition-all duration-200"
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
