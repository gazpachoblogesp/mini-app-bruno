import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { PathSection as PathSectionType, PathLesson } from '../data/pathData';
import PathLessonItem from './PathLessonItem';

interface PathSectionProps {
  section: PathSectionType;
  onLessonClick: (lessonId: string) => void;
}

const PathSection: React.FC<PathSectionProps> = ({ section, onLessonClick }) => {
  // Dynamic icon
  const IconComponent = (LucideIcons as any)[section.icon] || LucideIcons.BookOpen;

  // Calculate progress
  const progress = useMemo(() => {
    const completed = section.lessons.filter((l: PathLesson) => l.status === 'completed').length;
    const total = section.lessons.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  }, [section.lessons]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Section Header Card */}
      <div
        className={`bg-gradient-to-br ${section.gradient} rounded-3xl p-5 mb-4 shadow-lg text-white`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="text-sm text-white/90 mt-0.5">{section.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              {progress.completed} из {progress.total}
            </span>
            <span className="font-semibold">{progress.percentage}%</span>
          </div>
          <div className="h-2 bg-white/25 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3 relative">
        {/* Vertical Progress Line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200" />

        {section.lessons.map((lesson: PathLesson, idx: number) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <PathLessonItem lesson={lesson} onClick={() => onLessonClick(lesson.id)} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PathSection;
