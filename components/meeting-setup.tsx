"use client";

import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import Alert from "./ui/alert";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggled, setisMicCamToggled] = useState(false);
  const call = useCall();

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component!"
    );
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call?.camera, call?.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-6 text-white p-4" style={{ backgroundColor: '#1C1C2E' }}>
      <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold" style={{ color: '#E0E0E0' }}>
            Meeting Setup
          </h2>
          <p className="text-lg" style={{ color: '#A0A0A0' }}>
            Configure your camera and microphone before joining
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="p-4 space-y-4 rounded-lg border" style={{ backgroundColor: '#242438', borderColor: '#3A3A4A' }}>
            <div className="aspect-video rounded-lg overflow-hidden border" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: '#3A3A4A' }}>
              <VideoPreview />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-lg border" style={{ backgroundColor: '#1C1C2E', borderColor: '#3A3A4A' }}>
              <div className="flex items-center space-x-3">
                <Switch
                  id="toggle"
                  className="data-[state=checked]:bg-[#1ABC9C] data-[state=unchecked]:bg-gray-600"
                  checked={isMicCamToggled}
                  onCheckedChange={(e) => setisMicCamToggled(e.valueOf())}
                />
                <Label htmlFor="toggle" className="font-medium cursor-pointer" style={{ color: '#E0E0E0' }}>
                  Join with mic and camera off
                </Label>
              </div>
              <DeviceSettings />
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
          className="px-8 py-3 text-lg font-medium text-white border-0 transition-all duration-200 rounded-lg"
          style={{ backgroundColor: '#1ABC9C' }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
