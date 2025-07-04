import { Calendar, Clock, Users, BookOpen } from "lucide-react";
import { Teacher, Subject, ScheduleStep, TimeSlot } from "./types";

export const teachers: Teacher[] = [
  { id: "1", name: "Иванов И.И.", subjects: ["Математика", "Физика"], workingHours: ["09:00-15:00"] },
  { id: "2", name: "Петрова А.С.", subjects: ["Химия", "Биология"], workingHours: ["08:00-14:00"] },
  { id: "3", name: "Сидоров В.П.", subjects: ["История", "Обществознание"], workingHours: ["10:00-16:00"] },
  { id: "4", name: "Козлова М.Н.", subjects: ["География", "Экология"], workingHours: ["09:00-15:00"] },
  { id: "5", name: "Федоров Д.А.", subjects: ["Литература", "Русский язык"], workingHours: ["08:00-14:00"] },
  { id: "6", name: "Морозова Е.В.", subjects: ["Английский язык"], workingHours: ["09:00-15:00"] }
];

export const subjects: Subject[] = [
  { id: "1", name: "Математика", color: "text-blue-400", duration: 45 },
  { id: "2", name: "Физика", color: "text-purple-400", duration: 45 },
  { id: "3", name: "Химия", color: "text-green-400", duration: 45 },
  { id: "4", name: "История", color: "text-orange-400", duration: 45 },
  { id: "5", name: "География", color: "text-teal-400", duration: 45 },
  { id: "6", name: "Литература", color: "text-pink-400", duration: 45 },
  { id: "7", name: "Биология", color: "text-emerald-400", duration: 45 },
  { id: "8", name: "Английский язык", color: "text-cyan-400", duration: 45 }
];

export const timeSlots: TimeSlot[] = [
  { id: "1", time: "08:00", day: "Понедельник" },
  { id: "2", time: "09:00", day: "Понедельник" },
  { id: "3", time: "10:00", day: "Понедельник" }
];

export const scheduleSteps: ScheduleStep[] = [
  {
    id: 0,
    title: "Анализ ограничений",
    description: "ИИ анализирует расписание учителей, кабинеты и предметы, выявляя все возможные ограничения и требования",
    icon: Users,
    color: "text-stellar-primary",
    duration: 3000
  },
  {
    id: 1,
    title: "Оптимизация времени",
    description: "Алгоритм находит оптимальное распределение уроков, учитывая загруженность учителей и эффективность обучения",
    icon: Clock,
    color: "text-stellar-accent",
    duration: 3500
  },
  {
    id: 2,
    title: "Проверка конфликтов",
    description: "Система автоматически обнаруживает и устраняет временные пересечения и конфликты ресурсов",
    icon: BookOpen,
    color: "text-stellar-glow",
    duration: 9000
  },
  {
    id: 3,
    title: "Готовое расписание",
    description: "Идеальное расписание создано с учетом всех ограничений и оптимизировано для максимальной эффективности",
    icon: Calendar,
    color: "text-stellar-primary-light",
    duration: 8000
  }
];

export const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
export const timeSlotLabels = ["08:00", "09:00", "10:00"];