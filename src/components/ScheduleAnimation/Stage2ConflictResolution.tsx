import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

interface ConflictItem {
  id: string;
  time: string;
  subject: string;
  teacher: string;
  conflict: boolean;
  resolved?: boolean;
}

const Stage2ConflictResolution = () => {
  const [conflicts, setConflicts] = useState<ConflictItem[]>([
    { id: "1", time: "09:00", subject: "Математика", teacher: "Иванов И.И.", conflict: false },
    { id: "2", time: "09:00", subject: "Физика", teacher: "Иванов И.И.", conflict: true },
    { id: "3", time: "10:00", subject: "Химия", teacher: "Петрова А.С.", conflict: false },
    { id: "4", time: "10:00", subject: "История", teacher: "Сидоров В.П.", conflict: false },
    { id: "5", time: "11:00", subject: "География", teacher: "Козлова М.Н.", conflict: false },
    { id: "6", time: "11:00", subject: "Литература", teacher: "Федоров Д.А.", conflict: false },
    { id: "7", time: "12:00", subject: "Биология", teacher: "Петрова А.С.", conflict: true },
    { id: "8", time: "12:00", subject: "Английский", teacher: "Морозова Е.В.", conflict: false },
  ]);

  const [resolutionStep, setResolutionStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (resolutionStep === 0) {
        // Step 1: Highlight conflicts
        setResolutionStep(1);
      } else if (resolutionStep === 1) {
        // Step 2: Start resolving conflicts
        setResolutionStep(2);
        setConflicts(prev => prev.map(item => 
          item.id === "2" ? { ...item, time: "13:00", conflict: false, resolved: true } : item
        ));
      } else if (resolutionStep === 2) {
        // Step 3: Resolve remaining conflicts
        setResolutionStep(3);
        setConflicts(prev => prev.map(item => 
          item.id === "7" ? { ...item, time: "14:00", conflict: false, resolved: true } : item
        ));
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [resolutionStep]);

  const conflictCount = conflicts.filter(item => item.conflict).length;
  const resolvedCount = conflicts.filter(item => item.resolved).length;

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-stellar-accent mb-2">
          Проверка конфликтов
        </h3>
        
        {/* Status indicator */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="glass-card p-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Конфликтов: {conflictCount}</span>
          </div>
          
          <div className="glass-card p-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-stellar-accent" />
            <span className="text-sm">Решено: {resolvedCount}</span>
          </div>
          
          {resolutionStep > 0 && (
            <div className="glass-card p-2 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-stellar-primary animate-spin" />
              <span className="text-sm">Обработка...</span>
            </div>
          )}
        </div>
      </div>

      {/* Calendar grid with conflicts */}
      <div className="grid grid-cols-4 gap-3">
        {conflicts.map((item, index) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl text-xs transition-all duration-700 transform ${
              item.conflict && !item.resolved
                ? 'bg-destructive/20 border border-destructive/50 text-destructive animate-pulse scale-105 shadow-lg shadow-destructive/20'
                : item.resolved
                ? 'bg-stellar-accent/20 border border-stellar-accent/50 text-stellar-accent animate-bounce-gentle shadow-lg shadow-stellar-accent/20'
                : 'bg-stellar-primary/20 border border-stellar-accent/50 text-stellar-accent hover:scale-105'
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="font-medium flex items-center justify-between">
              {item.time}
              {item.conflict && !item.resolved && (
                <AlertTriangle className="w-3 h-3 text-destructive animate-pulse" />
              )}
              {item.resolved && (
                <CheckCircle className="w-3 h-3 text-stellar-accent animate-bounce" />
              )}
            </div>
            <div className="text-[10px] opacity-80 mt-1">{item.subject}</div>
            <div className="text-[10px] opacity-60">{item.teacher}</div>
          </div>
        ))}
      </div>

      {/* Resolution visualization */}
      {resolutionStep >= 2 && (
        <div className="mt-6 glass-card p-4 bg-stellar-primary/5">
          <h4 className="text-sm font-semibold text-stellar-accent mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Автоматическое разрешение конфликтов
          </h4>
          <div className="space-y-2 text-xs text-text-secondary">
            {resolvedCount > 0 && (
              <div className="flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-3 h-3 text-stellar-accent" />
                <span>Перенос "Физика" с 09:00 на 13:00 - конфликт решен</span>
              </div>
            )}
            {resolvedCount > 1 && (
              <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <CheckCircle className="w-3 h-3 text-stellar-accent" />
                <span>Перенос "Биология" с 12:00 на 14:00 - конфликт решен</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage2ConflictResolution;