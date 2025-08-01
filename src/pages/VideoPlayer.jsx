import { useEffect, useRef, useState, useCallback } from "react";

const VideoPlayer = ({ videoSrc, audioSrc, subtitle, onEnd }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const subtitleTimerRef = useRef(null);

  // Process subtitle text into chunks for timed display
  const processSubtitles = useCallback((text) => {
    if (!text) return [];

    const words = text.split(" ");
    const chunks = [];

    for (let i = 0; i < words.length; i += 5) {
      chunks.push(words.slice(i, i + 5).join(" "));
    }

    return chunks;
  }, []);

  // Initialize subtitles when subtitle text changes
  useEffect(() => {
    if (subtitle) {
      const processedSubtitles = processSubtitles(subtitle);
      setSubtitles(processedSubtitles);
      setCurrentSubtitleIndex(0);

      // Set initial subtitle
      if (processedSubtitles.length > 0) {
        setCurrentSubtitle(processedSubtitles[0]);
      }
    } else {
      setSubtitles([]);
      setCurrentSubtitle("");
    }
  }, [subtitle, processSubtitles]);

  // Initialize the player with sources
  useEffect(() => {
    // Reset playback state when sources change
    setIsPlaying(false);

    if (videoSrc && videoRef.current) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      setIsPlaying(true);
    }

    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
    }

    return () => {
      // Clean up on unmount or when sources change
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [videoSrc, audioSrc]);

  // Handle subtitle timing and display
  useEffect(() => {
    if (!isPlaying || subtitles.length === 0) {
      return;
    }

    // Clear any existing subtitle timer
    if (subtitleTimerRef.current) {
      clearTimeout(subtitleTimerRef.current);
    }

    // Display current subtitle
    setCurrentSubtitle(subtitles[currentSubtitleIndex]);

    // Schedule next subtitle if available
    if (currentSubtitleIndex < subtitles.length - 1) {
      subtitleTimerRef.current = setTimeout(() => {
        setCurrentSubtitleIndex((prevIndex) => prevIndex + 1);
      }, 2000); // Show each subtitle for 2 seconds
    }

    return () => {
      if (subtitleTimerRef.current) {
        clearTimeout(subtitleTimerRef.current);
      }
    };
  }, [isPlaying, subtitles, currentSubtitleIndex]);

  // Synchronize video and audio playback
  useEffect(() => {
    if (isPlaying) {
      // Attempt to play both video and audio
      const playMedia = async () => {
        try {
          // Play video if available
          if (videoRef.current) {
            await videoRef.current.play();
          }

          // Play audio if available
          if (audioRef.current) {
            await audioRef.current.play();
          }
        } catch (error) {
          console.error("Media playback error:", error);
          // Handle autoplay restrictions
          setIsPlaying(false);

          // Show user prompt to interact for playback
          alert("Please interact with the page to allow media playback");
        }
      };

      playMedia();
    } else {
      // Pause both video and audio when not playing
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleMediaEnd = () => {
    setIsPlaying(false);
    setCurrentSubtitle("");

    // Clear subtitle timer
    if (subtitleTimerRef.current) {
      clearTimeout(subtitleTimerRef.current);
    }

    if (onEnd) onEnd();
  };

  const handleInterrupt = () => {
    setIsPlaying(false);

    // Clear subtitle timer
    if (subtitleTimerRef.current) {
      clearTimeout(subtitleTimerRef.current);
    }

    if (onEnd) onEnd();
  };

  // Manual play button for mobile devices that require user interaction
  const handleManualPlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        onEnded={handleMediaEnd}
      />

      {/* Audio Element (hidden) */}
      <audio ref={audioRef} className="hidden" onEnded={handleMediaEnd} />

      {/* Subtitle Overlay */}
      {currentSubtitle && isPlaying && (
        <div className="absolute bottom-24 left-0 right-0 text-center text-xl bg-black/50 text-white p-3 mx-auto max-w-lg">
          {currentSubtitle}
        </div>
      )}

      {/* Play button (shown when paused due to autoplay restrictions) */}
      {!isPlaying && videoSrc && (
        <button
          onClick={handleManualPlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      )}

      {/* Interrupt Button */}
      {isPlaying && (
        <button
          onClick={handleInterrupt}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
