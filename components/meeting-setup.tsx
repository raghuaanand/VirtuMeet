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
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-8 text-white p-6 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300">
            Meeting Setup
          </h2>
          <p className="text-gray-400 text-lg">
            Configure your camera and microphone before joining
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
        </div>

        <div className="w-full max-w-2xl">
          <div className="modern-card p-6 space-y-6">
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm">
              <VideoPreview />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass-morphism-dark rounded-lg border border-white/10">
              <div className="flex items-center space-x-4">
                <Switch
                  id="toggle"
                  className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-600"
                  checked={isMicCamToggled}
                  onCheckedChange={(e) => setisMicCamToggled(e.valueOf())}
                />
                <Label htmlFor="toggle" className="text-white font-medium cursor-pointer">
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
          className="btn-glow px-12 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium text-white border-0 hover-lift"
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
