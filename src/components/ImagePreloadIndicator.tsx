import { motion, AnimatePresence } from "framer-motion";

interface ImagePreloadIndicatorProps {
  isLoading: boolean;
  progress: number;
  totalImages: number;
  loadedImages: number;
}

export default function ImagePreloadIndicator({ 
  isLoading, 
  progress, 
  totalImages, 
  loadedImages 
}: ImagePreloadIndicatorProps) {
  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(progress / 100) * 62.83} 62.83`}
                strokeDashoffset="0"
                transform="rotate(-90 12 12)"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              Loading images...
            </span>
            <span className="text-xs text-gray-600">
              {loadedImages}/{totalImages} ({Math.round(progress)}%)
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 