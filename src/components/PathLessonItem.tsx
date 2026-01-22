import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Lock,
  BookOpen,
  MessageCircle,
  Zap,
  RotateCcw,
  Trophy,
  Clock,
  Sparkles,
} from 'lucide-react';
import type { PathLesson } from '../data/pathData';

interface PathLessonItemProps {
  lesson: PathLesson;
  onClick: () => void;
}

const PathLessonItem: React.FC<PathLessonItemProps> = ({ lesson, onClick }) => {
  const getIcon = () => {
    switch (lesson.type) {
      case 'lesson':
        return <BookOpen className="w-5 h-5" />;
      case 'dialog':
        return <MessageCircle className="w-5 h-5" />;
      case 'drill':
        return <Zap className="w-5 h-5" />;
      case 'review':
        return <RotateCcw className="w-5 h-5" />;
      case 'checkpoint':
        return <Trophy className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getStatusIcon = () => {
    switch (lesson.status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const isAvailable = lesson.status === 'available';
  const isCompleted = lesson.status === 'completed';
  const isLocked = lesson.status === 'locked';

  return (
    <motion.div
      whileHover={isAvailable || isCompleted ? { scale: 1.02 } : {}}
      whileTap={isAvailable || isCompleted ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        relative bg-white rounded-2xl p-4 shadow-sm border-2 transition-all cursor-pointer
        ${isCompleted ? 'border-emerald-200 bg-emerald-50/30' : ''}
        ${isAvailable ? 'border-orange-300 shadow-md' : ''}
        ${isLocked ? 'border-gray-200 opacity-60 cursor-not-allowed' : ''}
      `}
    >
      {/* Status Icon */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
        {getStatusIcon()}
      </div>

      <div className="flex items-start gap-3 ml-3">
        {/* Type Icon */}
        <div
          className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${isCompleted ? 'bg-emerald-100 text-emerald-600' : ''}
          ${isAvailable ? 'bg-orange-100 text-orange-600' : ''}
          ${isLocked ? 'bg-gray-100 text-gray-400' : ''}
        `}
        >
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base leading-tight mb-1 ${
              isLocked ? 'text-gray-400' : 'text-gray-800'
            }`}
          >
            {lesson.title}
          </h3>
          <p className={`text-sm mb-2 ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
            {lesson.shortGoal}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {lesson.estimatedMinutes} мин
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              +{lesson.xpReward} XP
            </span>
          </div>
        </div>

        {/* Available CTA */}
        {isAvailable && (
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              Старт
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PathLessonItem;
