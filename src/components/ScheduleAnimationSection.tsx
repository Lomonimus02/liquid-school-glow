import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, Users, BookOpen, Zap, Sparkles } from "lucide-react";

const ScheduleAnimationSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  const scheduleSteps = [
    {
      title: "Анализ ограничений",
      description: "ИИ анализирует расписание учителей, кабинеты и предметы",
      icon: Users,
      color: "text-stellar-primary"
    },
    {
      title: "Оптимизация времени",
      description: "Алгоритм находит оптимальное распределение уроков",
      icon: Clock,
      color: "text-stellar-accent"
    },
    {
      title: "Проверка конфликтов",
      description: "Система автоматически устраняет пересечения",
      icon: BookOpen,
      color: "text-stellar-glow"
    },
    {
      title: "Готовое расписание",
      description: "Идеальное расписание создано за секунды",
      icon: Calendar,
      color: "text-stellar-primary-light"
    }
  ];

  const subjects = ["Математика", "Физика", "Химия", "История", "География", "Литература"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % scheduleSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-stellar-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-stellar-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-stellar-accent animate-pulse" />
            <span className="text-sm font-medium text-text-secondary">Инновационная технология</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Автоматическое</span>
            <br />
            <span className="text-text-primary">составление расписания</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Революционная функция, которая экономит часы ручной работы. 
            Наш ИИ создает идеальное расписание за секунды, учитывая все ограничения и пожелания
          </p>

          <div className="glass-card p-4 inline-block">
            <div className="flex items-center gap-2 text-stellar-accent">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">Экономия времени: до 20 часов в неделю</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Animation visualization */}
          <div className="relative">
            <div ref={animationRef} className="glass-card p-8 min-h-[500px] relative overflow-hidden">
              {/* Schedule grid animation */}
              <div className="grid grid-cols-6 gap-2 mb-6">
                {timeSlots.map((time, timeIndex) => (
                  <div key={timeIndex} className="space-y-2">
                    <div className="text-xs text-stellar-accent font-medium text-center p-2 glass-card">
                      {time}
                    </div>
                    {subjects.map((subject, subjectIndex) => {
                      const isActive = (timeIndex + subjectIndex + activeStep) % 4 === 0;
                      return (
                        <div
                          key={`${timeIndex}-${subjectIndex}`}
                          className={`p-2 rounded-xl text-xs text-center transition-all duration-500 ${
                            isActive 
                              ? 'bg-stellar-primary/30 border border-stellar-accent text-stellar-accent transform scale-105 glow-effect' 
                              : 'bg-glass-secondary border border-glass-border text-text-muted'
                          }`}
                          style={{ 
                            animationDelay: `${(timeIndex + subjectIndex) * 0.1}s`,
                            transform: isActive ? 'scale(1.05) translateY(-2px)' : 'scale(1)'
                          }}
                        >
                          {subject}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Flowing animation elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-stellar-accent rounded-full animate-schedule-flow opacity-60"
                    style={{
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* Progress indicator */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">Прогресс создания</span>
                  <span className="text-sm font-semibold text-stellar-accent">
                    {Math.round(((activeStep + 1) / scheduleSteps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-glass-secondary rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full liquid-gradient transition-all duration-1000 ease-out"
                    style={{ width: `${((activeStep + 1) / scheduleSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Process steps */}
          <div className="space-y-6">
            {scheduleSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <div
                  key={index}
                  className={`glass-card p-6 transition-all duration-500 relative overflow-hidden ${
                    isActive ? 'ring-2 ring-stellar-accent/50 glow-effect scale-105' : 
                    isCompleted ? 'bg-glass-accent/50' : ''
                  }`}
                >
                  {/* Shimmer effect for active step */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-accent/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                  )}
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-stellar-primary/30 animate-pulse-glow' : 'bg-glass-secondary'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${step.color} ${isActive ? 'animate-bounce-gentle' : ''}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                        isActive ? 'text-stellar-accent' : 'text-text-primary'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-text-secondary">
                        {step.description}
                      </p>
                    </div>

                    {/* Status indicator */}
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-stellar-accent' :
                      isActive ? 'bg-stellar-glow animate-pulse' :
                      'bg-glass-border'
                    }`} />
                  </div>
                </div>
              );
            })}

            {/* Benefits highlight */}
            <div className="glass-card p-6 bg-stellar-primary/5 border-stellar-accent/30">
              <h4 className="text-lg font-semibold text-stellar-accent mb-3">Ключевые преимущества:</h4>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  Учет всех ограничений и пожеланий
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  Автоматическое разрешение конфликтов
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  Мгновенные изменения и корректировки
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  Интеграция с календарными системами
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleAnimationSection;