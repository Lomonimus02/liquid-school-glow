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
              {/* Stage 0: Unorganized list */}
              {activeStep === 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-stellar-accent mb-4 text-center">
                    Неорганизованные данные
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-text-secondary">Учителя:</h4>
                      {["Иванов И.И.", "Петрова А.С.", "Сидоров В.П.", "Козлова М.Н.", "Федоров Д.А."].map((teacher, i) => (
                        <div key={i} className="p-2 bg-glass-secondary border border-glass-border rounded-xl text-xs animate-fade-in" 
                             style={{ animationDelay: `${i * 0.1}s` }}>
                          {teacher}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-text-secondary">Предметы:</h4>
                      {subjects.map((subject, i) => (
                        <div key={i} className="p-2 bg-glass-secondary border border-glass-border rounded-xl text-xs animate-fade-in"
                             style={{ animationDelay: `${(i + 5) * 0.1}s` }}>
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Stage 1: Analysis */}
              {activeStep === 1 && (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-stellar-accent/30 border-t-stellar-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-8 h-8 text-stellar-accent animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-stellar-accent mb-2">Анализ данных</h3>
                    <p className="text-sm text-text-secondary">ИИ анализирует ограничения и оптимизирует распределение</p>
                  </div>
                  {/* Flowing data particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-stellar-accent rounded-full opacity-60 animate-schedule-flow"
                        style={{
                          top: `${Math.random() * 80 + 10}%`,
                          left: `${Math.random() * 80 + 10}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `2s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Stage 2: Conflict Resolution */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-stellar-accent mb-4 text-center">
                    Проверка конфликтов
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { time: "09:00", subject: "Математика", teacher: "Иванов И.И.", conflict: false },
                      { time: "09:00", subject: "Физика", teacher: "Иванов И.И.", conflict: true },
                      { time: "10:00", subject: "Химия", teacher: "Петрова А.С.", conflict: false },
                      { time: "10:00", subject: "История", teacher: "Сидоров В.П.", conflict: false },
                      { time: "11:00", subject: "География", teacher: "Козлова М.Н.", conflict: false },
                      { time: "11:00", subject: "Литература", teacher: "Федоров Д.А.", conflict: false }
                    ].map((item, i) => (
                      <div key={i} className={`p-3 rounded-xl text-xs transition-all duration-500 ${
                        item.conflict 
                          ? 'bg-destructive/20 border border-destructive/50 text-destructive animate-pulse' 
                          : 'bg-stellar-primary/20 border border-stellar-accent/50 text-stellar-accent'
                      }`}>
                        <div className="font-medium">{item.time}</div>
                        <div className="text-[10px] opacity-80">{item.subject}</div>
                        <div className="text-[10px] opacity-60">{item.teacher}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stage 3: Final Schedule */}
              {activeStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-stellar-accent mb-4 text-center">
                    Готовое расписание
                  </h3>
                  <div className="grid grid-cols-6 gap-2">
                    {timeSlots.map((time, timeIndex) => (
                      <div key={timeIndex} className="space-y-2">
                        <div className="text-xs text-stellar-accent font-medium text-center p-2 glass-card glow-effect">
                          {time}
                        </div>
                        {subjects.slice(0, 3).map((subject, subjectIndex) => (
                          <div
                            key={`${timeIndex}-${subjectIndex}`}
                            className="p-2 rounded-xl text-xs text-center bg-stellar-primary/30 border border-stellar-accent text-stellar-accent transform animate-scale-in glow-effect"
                            style={{ 
                              animationDelay: `${(timeIndex + subjectIndex) * 0.1}s`
                            }}
                          >
                            <div className="font-medium">{subject}</div>
                            <div className="text-[10px] opacity-80">
                              {["Иванов И.И.", "Петрова А.С.", "Сидоров В.П."][subjectIndex]}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress indicator */}
              <div className="absolute bottom-4 left-4 right-4">
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

          {/* Process steps - Show only active step */}
          <div className="space-y-8">
            <div className="min-h-[500px] flex items-center justify-center relative">
              <div className="relative w-full max-w-lg">
                {scheduleSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = index === activeStep;

                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 glass-card p-8 transition-all duration-700 ease-in-out overflow-visible ${
                        isActive 
                          ? 'opacity-100 scale-100 ring-2 ring-stellar-accent/50 glow-effect translate-y-0' 
                          : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                      }`}
                      style={{
                        transitionDelay: isActive ? '0ms' : '100ms'
                      }}
                    >
                      {/* Shimmer effect for active step */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-accent/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                      )}
                      
                      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-stellar-primary/30 animate-pulse-glow">
                          <IconComponent className={`w-8 h-8 ${step.color} animate-bounce-gentle`} />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-stellar-accent">
                            {step.title}
                          </h3>
                          <p className="text-text-secondary text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Step indicator */}
                        <div className="flex space-x-2">
                          {scheduleSteps.map((_, stepIndex) => (
                            <div
                              key={stepIndex}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                stepIndex === activeStep
                                  ? 'bg-stellar-accent scale-125'
                                  : stepIndex < activeStep
                                  ? 'bg-stellar-accent/60'
                                  : 'bg-glass-border'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

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