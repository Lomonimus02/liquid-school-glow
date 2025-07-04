import { useState, useEffect } from "react";
import { teachers, subjects } from "./data";

const Stage0UnorganizedData = () => {
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    // Generate random positions for chaotic effect
    const newPositions: { [key: string]: { x: number; y: number } } = {};
    
    [...teachers, ...subjects.map(s => ({ ...s, id: `subject-${s.id}` }))].forEach((item, index) => {
      newPositions[item.id] = {
        x: Math.random() * 80 + 10, // 10-90% of container width
        y: Math.random() * 70 + 15  // 15-85% of container height
      };
    });
    
    setPositions(newPositions);
  }, []);

  return (
    <div className="relative h-full">
      <h3 className="text-lg font-semibold text-stellar-accent mb-4 text-center">
        Неорганизованные данные
      </h3>
      
      <div className="relative h-96 overflow-hidden">
        {/* Teacher cards */}
        {teachers.map((teacher, index) => (
          <div
            key={teacher.id}
            className="absolute p-3 bg-glass-secondary border border-glass-border rounded-xl text-sm animate-shake hover:animate-pulse transition-all cursor-pointer"
            style={{
              left: `${positions[teacher.id]?.x || 0}%`,
              top: `${positions[teacher.id]?.y || 0}%`,
              animationDelay: `${index * 0.2}s`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="font-medium text-text-primary">{teacher.name}</div>
            <div className="text-xs text-text-secondary mt-1">
              {teacher.subjects.join(", ")}
            </div>
          </div>
        ))}
        
        {/* Subject cards */}
        {subjects.map((subject, index) => (
          <div
            key={`subject-${subject.id}`}
            className="absolute p-3 bg-glass-accent border border-stellar-accent/30 rounded-xl text-sm animate-shake hover:animate-pulse transition-all cursor-pointer"
            style={{
              left: `${positions[`subject-${subject.id}`]?.x || 0}%`,
              top: `${positions[`subject-${subject.id}`]?.y || 0}%`,
              animationDelay: `${(index + teachers.length) * 0.2}s`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`font-medium ${subject.color}`}>{subject.name}</div>
            <div className="text-xs text-text-secondary mt-1">
              {subject.duration} мин
            </div>
          </div>
        ))}
        
        {/* Chaos indicators */}
        <div className="absolute top-4 right-4 glass-card p-2">
          <div className="text-xs text-destructive font-medium animate-pulse">
            ⚠️ Требует организации
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage0UnorganizedData;