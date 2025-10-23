"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function VictoriaLogoAnimation() {
  const router = useRouter();
  const [logoComplete, setLogoComplete] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const letters = [
    { letter: "V", delay: 0 },
    { letter: "I", delay: 0.2 },
    { letter: "C", delay: 0.4 },
    { letter: "T", delay: 0.6 },
    { letter: "O", delay: 0.8 },
    { letter: "R", delay: 1.0 },
    { letter: "I", delay: 1.2 },
    { letter: "A", delay: 1.4 },
    { letter: " ", delay: 1.6 },
    { letter: "A", delay: 1.8 },
    { letter: "J", delay: 2.0 },
    { letter: "U", delay: 2.2 },
    { letter: "W", delay: 2.4 },
    { letter: "O", delay: 2.6 },
    { letter: "N", delay: 2.8 },
  ];

  // Logo animation completion handler
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoComplete(true);
    }, 3000); // Logo completes after 3 seconds

    return () => clearTimeout(logoTimer);
  }, []);

  // Letter animation sequence
  useEffect(() => {
    if (!logoComplete) return;

    const letterTimer = setInterval(() => {
      setCurrentLetterIndex((prev) => {
        if (prev < letters.length - 1) {
          return prev + 1;
        } else {
          clearInterval(letterTimer);
          // Show subtitle after all letters are displayed
          setTimeout(() => {
            setShowSubtitle(true);
            // Show redirect message after subtitle appears
            setTimeout(() => {
              setShowRedirect(true);
            }, 1500);
          }, 800);
          return prev;
        }
      });
    }, 150); // Faster letter animation

    return () => clearInterval(letterTimer);
  }, [logoComplete, letters.length]);

  useEffect(() => {
    if (showRedirect) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            router.push("/profile");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [showRedirect, router]);

  const handleSkip = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl px-4">
        {/* Logo and Name Container - Side by Side */}
        <div className="flex flex-row items-center justify-center md:justify-start gap-4 md:gap-8 mb-12">
          {/* Logo Container - Appears First */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="shrink-0 w-[120px] h-[120px] relative"
          >
            <Image
              src="https://res.cloudinary.com/dixwarqdb/image/upload/v1747635236/logo_i14b9d.svg"
              alt="Victoria Ajuwon Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Letter Animation - Starts after logo completes */}
          <AnimatePresence>
            {logoComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                  {letters.map((item, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, x: -30, scale: 0.5 }}
                      animate={
                        index <= currentLetterIndex
                          ? { opacity: 1, x: 0, scale: 1 }
                          : { opacity: 0, x: -30, scale: 0.5 }
                      }
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                      }}
                      className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                        item.letter === " " ? "w-2 md:w-4" : ""
                      } ${index <= currentLetterIndex ? "text-red-600 drop-shadow-lg" : "text-transparent"}`}
                      style={{
                        textShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
                      }}
                    >
                      {item.letter === " " ? "\u00A0" : item.letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtitle - Appears after letters complete */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-zinc-300 mb-2"
              >
                IT Professional
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-base text-zinc-500 mb-2"
              >
                With many hats, Crafting digital experiences with passion and
                precision
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm md:text-base text-zinc-500"
              >
                Click a profile based on what hat you would like to see me wear
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Redirect Message */}
      <AnimatePresence>
        {showRedirect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg p-6 text-center"
          >
            <p className="text-white mb-4">
              Redirecting to portfolio in {countdown}...
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkip}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
            >
              Skip Animation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button (Always Visible) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSkip}
        className="fixed top-8 right-8 bg-zinc-800/80 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors duration-200 backdrop-blur-sm border border-zinc-600"
      >
        Skip
      </motion.button>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: !showSubtitle ? 1 : 0,
        }}
        className="fixed bottom-8 left-8"
      >
        <div className="flex items-center space-x-2 text-zinc-400">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-sm">Loading...</span>
        </div>
      </motion.div>
    </div>
  );
}
