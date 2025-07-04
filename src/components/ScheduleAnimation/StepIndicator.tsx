import { ScheduleStep } from "./types";

interface StepIndicatorProps {
  steps: ScheduleStep[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute left-8 top-8 w-0.5 bg-glass-border z-0" style={{ height: 'calc(100% - 200px)' }}>
        <div 
          className="w-full bg-stellar-accent transition-all duration-1000 ease-out"
          style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div
              key={step.id}
              className={`relative flex items-start gap-6 cursor-pointer transition-all duration-300 ${
                isActive ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => onStepClick(index)}
            >
              {/* Step icon */}
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 relative z-10 ${
                isActive 
                  ? 'bg-stellar-primary/50 ring-2 ring-stellar-accent shadow-lg shadow-stellar-accent/30' 
                  : isCompleted
                  ? 'bg-stellar-accent/30'
                  : 'bg-glass-secondary'
              }`}>
                <IconComponent className={`w-8 h-8 ${
                  isActive ? step.color + ' animate-bounce-gentle' : 
                  isCompleted ? 'text-stellar-accent' : 'text-text-secondary'
                }`} />
              </div>
              
              {/* Step content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`text-xl font-bold ${
                    isActive ? 'text-stellar-accent' : 
                    isCompleted ? 'text-stellar-primary' : 'text-text-secondary'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Duration indicator */}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive ? 'bg-stellar-accent/20 text-stellar-accent' : 
                    'bg-glass-secondary text-text-secondary'
                  }`}>
                    {step.duration / 1000}s
                  </span>
                </div>
                
                <p className={`text-base leading-relaxed ${
                  isActive ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step.description}
                </p>
                
                {/* Step status */}
                <div className="mt-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-stellar-accent animate-pulse' :
                    isCompleted ? 'bg-stellar-accent' : 'bg-glass-border'
                  }`} />
                  <span className="text-sm text-text-secondary">
                    {isActive ? 'Выполняется...' : isCompleted ? 'Завершено' : 'Ожидание'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;