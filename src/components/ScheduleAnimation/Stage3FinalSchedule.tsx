import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { daysOfWeek, timeSlotLabels, subjects } from "./data";

interface ScheduleCell {
  subject: string;
  teacher: string;
  classroom: string;
  color: string;
  built: boolean;
}

const Stage3FinalSchedule = () => {
  const [schedule, setSchedule] = useState<{ [key: string]: ScheduleCell }>({});
  const [buildingStep, setBuildingStep] = useState(0);
  const [stats, setStats] = useState({
    totalLessons: 0,
    teachersScheduled: 0,
    efficiency: 0
  });

  const scheduleData = [
    // Monday
    { day: 0, time: 0, subject: "Математика", teacher: "Иванов И.И.", classroom: "205", color: "text-blue-400" },
    { day: 0, time: 1, subject: "Физика", teacher: "Петрова А.С.", classroom: "301", color: "text-purple-400" },
    { day: 0, time: 2, subject: "Химия", teacher: "Сидоров В.П.", classroom: "102", color: "text-green-400" },
    { day: 0, time: 3, subject: "История", teacher: "Козлова М.Н.", classroom: "203", color: "text-orange-400" },
    { day: 0, time: 4, subject: "География", teacher: "Федоров Д.А.", classroom: "204", color: "text-teal-400" },
    { day: 0, time: 5, subject: "Литература", teacher: "Морозова Е.В.", classroom: "201", color: "text-pink-400" },
    
    // Tuesday
    { day: 1, time: 0, subject: "Биология", teacher: "Петрова А.С.", classroom: "103", color: "text-emerald-400" },
    { day: 1, time: 1, subject: "Английский", teacher: "Морозова Е.В.", classroom: "206", color: "text-cyan-400" },
    { day: 1, time: 2, subject: "Математика", teacher: "Иванов И.И.", classroom: "205", color: "text-blue-400" },
    { day: 1, time: 3, subject: "Физика", teacher: "Петрова А.С.", classroom: "301", color: "text-purple-400" },
    { day: 1, time: 4, subject: "Химия", teacher: "Сидоров В.П.", classroom: "102", color: "text-green-400" },
    { day: 1, time: 5, subject: "История", teacher: "Козлова М.Н.", classroom: "203", color: "text-orange-400" },
    
    // Wednesday
    { day: 2, time: 0, subject: "География", teacher: "Федоров Д.А.", classroom: "204", color: "text-teal-400" },
    { day: 2, time: 1, subject: "Литература", teacher: "Морозова Е.В.", classroom: "201", color: "text-pink-400" },
    { day: 2, time: 2, subject: "Биология", teacher: "Петрова А.С.", classroom: "103", color: "text-emerald-400" },
    { day: 2, time: 3, subject: "Английский", teacher: "Морозова Е.В.", classroom: "206", color: "text-cyan-400" },
    { day: 2, time: 4, subject: "Математика", teacher: "Иванов И.И.", classroom: "205", color: "text-blue-400" },
    { day: 2, time: 5, subject: "Физика", teacher: "Петрова А.С.", classroom: "301", color: "text-purple-400" },
    
    // Thursday
    { day: 3, time: 0, subject: "Химия", teacher: "Сидоров В.П.", classroom: "102", color: "text-green-400" },
    { day: 3, time: 1, subject: "История", teacher: "Козлова М.Н.", classroom: "203", color: "text-orange-400" },
    { day: 3, time: 2, subject: "География", teacher: "Федоров Д.А.", classroom: "204", color: "text-teal-400" },
    { day: 3, time: 3, subject: "Литература", teacher: "Морозова Е.В.", classroom: "201", color: "text-pink-400" },
    { day: 3, time: 4, subject: "Биология", teacher: "Петрова А.С.", classroom: "103", color: "text-emerald-400" },
    { day: 3, time: 5, subject: "Английский", teacher: "Морозова Е.В.", classroom: "206", color: "text-cyan-400" },
    
    // Friday
    { day: 4, time: 0, subject: "Математика", teacher: "Иванов И.И.", classroom: "205", color: "text-blue-400" },
    { day: 4, time: 1, subject: "Физика", teacher: "Петрова А.С.", classroom: "301", color: "text-purple-400" },
    { day: 4, time: 2, subject: "Химия", teacher: "Сидоров В.П.", classroom: "102", color: "text-green-400" },
    { day: 4, time: 3, subject: "История", teacher: "Козлова М.Н.", classroom: "203", color: "text-orange-400" },
    { day: 4, time: 4, subject: "География", teacher: "Федоров Д.А.", classroom: "204", color: "text-teal-400" },
    { day: 4, time: 5, subject: "Литература", teacher: "Морозова Е.В.", classroom: "201", color: "text-pink-400" },
    
    // Saturday
    { day: 5, time: 0, subject: "Биология", teacher: "Петрова А.С.", classroom: "103", color: "text-emerald-400" },
    { day: 5, time: 1, subject: "Английский", teacher: "Морозова Е.В.", classroom: "206", color: "text-cyan-400" },
    { day: 5, time: 2, subject: "Математика", teacher: "Иванов И.И.", classroom: "205", color: "text-blue-400" },
    { day: 5, time: 3, subject: "Физика", teacher: "Петрова А.С.", classroom: "301", color: "text-purple-400" },
    { day: 5, time: 4, subject: "Химия", teacher: "Сидоров В.П.", classroom: "102", color: "text-green-400" },
    { day: 5, time: 5, subject: "История", teacher: "Козлова М.Н.", classroom: "203", color: "text-orange-400" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (buildingStep < scheduleData.length) {
        const item = scheduleData[buildingStep];
        const key = `${item.day}-${item.time}`;
        
        setSchedule(prev => ({
          ...prev,
          [key]: {
            subject: item.subject,
            teacher: item.teacher,
            classroom: item.classroom,
            color: item.color,
            built: true
          }
        }));
        
        setBuildingStep(prev => prev + 1);
        
        // Update stats
        setStats(prev => ({
          totalLessons: buildingStep + 1,
          teachersScheduled: new Set(scheduleData.slice(0, buildingStep + 1).map(s => s.teacher)).size,
          efficiency: Math.min(100, ((buildingStep + 1) / scheduleData.length) * 100)
        }));
      }
    }, 600);

    return () => clearInterval(interval);
  }, [buildingStep]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-stellar-accent mb-2 flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5 animate-pulse" />
          Готовое расписание
        </h3>
        
        {/* Stats */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="glass-card p-2 text-xs">
            <div className="text-stellar-accent font-medium">{stats.totalLessons}</div>
            <div className="text-text-secondary">Уроков</div>
          </div>
          <div className="glass-card p-2 text-xs">
            <div className="text-stellar-accent font-medium">{stats.teachersScheduled}</div>
            <div className="text-text-secondary">Учителей</div>
          </div>
          <div className="glass-card p-2 text-xs">
            <div className="text-stellar-accent font-medium">{Math.round(stats.efficiency)}%</div>
            <div className="text-text-secondary">Эффективность</div>
          </div>
        </div>
      </div>

      {/* Weekly schedule grid */}
      <div className="grid grid-cols-7 gap-2 text-xs">
        {/* Header row */}
        <div className="text-center font-medium text-stellar-accent p-2">
          Время
        </div>
        {daysOfWeek.map((day, dayIndex) => (
          <div key={dayIndex} className="text-center font-medium text-stellar-accent p-2 glass-card">
            {day.slice(0, 3)}
          </div>
        ))}

        {/* Time slots and schedule */}
        {timeSlotLabels.map((time, timeIndex) => (
          <div key={timeIndex} className="contents">
            {/* Time label */}
            <div className="text-center p-2 glass-card text-stellar-accent font-medium flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </div>
            
            {/* Schedule cells for each day */}
            {daysOfWeek.map((_, dayIndex) => {
              const key = `${dayIndex}-${timeIndex}`;
              const cell = schedule[key];
              
              return (
                <div
                  key={key}
                  className={`p-2 rounded-xl text-center transition-all duration-700 min-h-[80px] flex flex-col justify-center ${
                    cell && cell.built
                      ? 'bg-stellar-primary/30 border border-stellar-accent text-stellar-accent animate-build-in shadow-lg shadow-stellar-accent/20'
                      : 'bg-glass-secondary border border-glass-border opacity-50'
                  }`}
                  style={{
                    animationDelay: `${(dayIndex + timeIndex) * 0.2}s`
                  }}
                >
                  {cell && cell.built && (
                    <>
                      <div className={`font-medium ${cell.color} flex items-center justify-center gap-1`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {cell.subject}
                      </div>
                      <div className="text-[10px] text-text-secondary mt-1">
                        {cell.teacher.split(' ')[0]}
                      </div>
                      <div className="text-[10px] text-stellar-accent/70 flex items-center justify-center gap-1">
                        <MapPin className="w-2 h-2" />
                        {cell.classroom}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Stage3FinalSchedule;