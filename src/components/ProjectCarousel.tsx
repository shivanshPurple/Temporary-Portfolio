import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from "react-icons/fi";

interface ProjectCarouselItem {
  id: number;
  content: React.ReactNode;
}

interface ProjectCarouselProps {
  items: ProjectCarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  pauseOnModal?: boolean;
  isModalOpen?: boolean;
  loop?: boolean;
  resetIndex?: boolean;
  onResetIndex?: () => void;
  isMobile?: boolean; // New prop to indicate mobile view
  onIndexChange?: (index: number) => void; // Callback for index changes
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  items,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  pauseOnModal = false,
  isModalOpen = false,
  loop = true,
  resetIndex = false,
  onResetIndex,
  isMobile = false, // Default to false
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isGoingPrev, setIsGoingPrev] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset index when resetIndex prop changes
  useEffect(() => {
    if (resetIndex) {
      setCurrentIndex(0);
      if (onResetIndex) {
        onResetIndex();
      }
    }
  }, [resetIndex, onResetIndex]);

  // Notify parent of index changes
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  // Handle modal pause
  useEffect(() => {
    if (pauseOnModal) {
      if (isModalOpen) {
        setIsPaused(true);
      } else if (!isHovering) {
        setIsPaused(false);
      }
    }
  }, [pauseOnModal, isModalOpen, isHovering]);

  // Autoplay functionality
  useEffect(() => {
    console.log(
      "Autoplay useEffect triggered, autoplay:",
      autoplay,
      "isPaused:",
      isPaused
    );
    if (!autoplay || isPaused) {
      console.log("Autoplay stopped or paused");
      return;
    }

    console.log("Starting autoplay interval with delay:", autoplayDelay);
    const interval = setInterval(() => {
      console.log("Autoplay interval triggered, current index:", currentIndex);
      setCurrentIndex((prev) => {
        if (loop) {
          const newIndex = (prev + 1) % items.length;
          console.log("Moving to next item, new index:", newIndex);
          return newIndex;
        } else {
          const newIndex = prev < items.length - 1 ? prev + 1 : prev;
          console.log("Moving to next item (no loop), new index:", newIndex);
          return newIndex;
        }
      });
    }, autoplayDelay);

    return () => {
      console.log("Clearing autoplay interval");
      clearInterval(interval);
    };
  }, [autoplay, autoplayDelay, isPaused, items.length, loop]);

  // Handle hover pause
  const handleMouseEnter = () => {
    console.log("Mouse entered carousel, pauseOnHover:", pauseOnHover);
    setIsHovering(true);
    if (pauseOnHover) {
      console.log("Pausing carousel");
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    console.log("Mouse left carousel, pauseOnHover:", pauseOnHover);
    setIsHovering(false);
    if (pauseOnHover && !(pauseOnModal && isModalOpen)) {
      console.log("Resuming carousel");
      setIsPaused(false);
    }
  };

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50; // Minimum swipe distance
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Navigation functions
  const goToNext = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
    }
  };

  const goToPrev = () => {
    console.log("Previous button clicked, setting isGoingPrev to true");
    setIsGoingPrev(true);
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-white py-8 bg-gray-800 rounded-lg h-full flex items-center justify-center">
        No items to display
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isMobile ? "" : "h-full"
      } overflow-hidden rounded-xl group`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel items */}
      <div className={`relative w-full ${isMobile ? "" : "h-full"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full ${isMobile ? "" : "h-full"}`}
          >
            {items[currentIndex].content}

            {/* Navigation arrows - only show on desktop */}
            {items.length > 1 && !isMobile && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-orange-500 hover:bg-opacity-90 transition-all z-10 cursor-target"
                  aria-label="Previous project"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-orange-500 hover:bg-opacity-90 transition-all z-10 cursor-target"
                  aria-label="Next project"
                >
                  <FiChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator - only show on desktop */}
      {items.length > 1 && !isMobile && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-target ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-gray-500 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Autoplay indicator - shows at all times with action-indicating icons */}
      {autoplay && !isMobile && (
        <div className="absolute top-4 right-4 flex items-center transition-opacity duration-300">
          <div className="bg-black bg-opacity-50 px-2 py-1 rounded-full flex items-center">
            {isPaused ? (
              <FiPause className="text-orange-500" size={16} />
            ) : (
              <FiPlay className="text-green-500" size={16} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
