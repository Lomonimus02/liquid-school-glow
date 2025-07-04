import { Play, Pause, SkipBack, SkipForward, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimationControlsProps } from "./types";
const AnimationControls = ({
  isPlaying,
  speed,
  currentStep,
  totalSteps,
  onPlayPause,
  onSpeedChange,
  onStepChange
}: AnimationControlsProps) => {
  const speedOptions = [0.5, 1, 1.5, 2];
  return;
};
export default AnimationControls;