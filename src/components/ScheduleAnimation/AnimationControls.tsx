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

  return (
    <div className="glass-card p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="text-stellar-accent hover:text-stellar-primary"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onPlayPause}
          className="text-stellar-accent hover:text-stellar-primary"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={currentStep === totalSteps - 1}
          className="text-stellar-accent hover:text-stellar-primary"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Gauge className="w-4 h-4 text-stellar-accent" />
        <span className="text-sm text-text-secondary">Скорость:</span>
        <div className="flex gap-1">
          {speedOptions.map((option) => (
            <Button
              key={option}
              variant={speed === option ? "default" : "ghost"}
              size="sm"
              onClick={() => onSpeedChange(option)}
              className="text-xs min-w-[40px]"
            >
              {option}x
            </Button>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-text-secondary">
        Этап {currentStep + 1} из {totalSteps}
      </div>
    </div>
  );
};

export default AnimationControls;