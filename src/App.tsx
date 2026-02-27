/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Toggle dimensions and positions
  const thumbLeftCenter = 24;
  const thumbRightCenter = 104;
  const boundaryX = 150;

  const translateXLight = thumbLeftCenter - boundaryX; // -126
  const translateXDark = thumbRightCenter - boundaryX; // -46

  // Slower, smoother animation configs
  const springConfig = { type: "spring", stiffness: 100, damping: 20, mass: 1 };
  const iconTransition = { duration: 0.8, ease: [0.4, 0, 0.2, 1] };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out ${isDark ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-900'}`}>
      
      <div className="flex flex-col items-center gap-12">
        <div className="space-y-4 text-center">
          <p className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-1000 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Динамический переключатель
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {isDark ? 'Тёмная тема' : 'Светлая тема'}
          </h1>
        </div>
        
        <motion.button
          onClick={() => setIsDark(!isDark)}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          className={`group relative flex items-center w-32 h-12 rounded-full overflow-hidden ring-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 transition-colors duration-1000 ${
            isDark 
              ? 'ring-white/10 focus-visible:ring-zinc-500 focus-visible:ring-offset-zinc-950 bg-zinc-900' 
              : 'ring-black/5 focus-visible:ring-zinc-500 focus-visible:ring-offset-zinc-50 bg-zinc-200'
          }`}
          aria-label="Переключить тему"
        >
          {/* Glare / Shimmer Effect (Strict, no gradients) */}
          <motion.div
            variants={{
              rest: { 
                x: -100, 
                opacity: 0,
                transition: { duration: 0.5, ease: "easeOut" }
              },
              hover: { 
                x: 160, 
                opacity: 1,
                transition: { 
                  x: { duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                  opacity: { duration: 0.3 }
                } 
              }
            }}
            className="absolute top-0 left-0 bottom-0 w-12 z-30 pointer-events-none"
          >
            <div className={`w-full h-full -skew-x-12 transition-colors duration-1000 ${isDark ? 'bg-white/10' : 'bg-white/40'}`} />
          </motion.div>

          {/* Sliding Background SVG */}
          <motion.div 
            className="absolute top-0 left-0 h-full w-[300px] pointer-events-none"
            initial={false}
            animate={{ x: isDark ? translateXDark : translateXLight }}
            transition={springConfig}
          >
            <svg width="300" height="48" viewBox="0 0 300 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Light side */}
              <path d="M0 0H150C180 0 120 48 150 48H0V0Z" className="fill-zinc-200" />
              {/* Dark side */}
              <path d="M300 0H150C180 0 120 48 150 48H300V0Z" className="fill-zinc-900" />
            </svg>
          </motion.div>

          {/* Inner Shadow Overlay for 3D Track Effect */}
          <div className={`absolute inset-0 pointer-events-none rounded-full transition-shadow duration-500 z-10 ${
            isDark 
              ? 'shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),_inset_0_-2px_4px_rgba(255,255,255,0.05)] group-hover:shadow-[inset_0_6px_12px_rgba(0,0,0,0.8),_inset_0_-2px_4px_rgba(255,255,255,0.1)]' 
              : 'shadow-[inset_0_4px_8px_rgba(0,0,0,0.15),_inset_0_-2px_4px_rgba(255,255,255,0.8)] group-hover:shadow-[inset_0_6px_12px_rgba(0,0,0,0.25),_inset_0_-2px_4px_rgba(255,255,255,1)]'
          }`} />

          {/* Fixed Background Icons */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <Sun 
              size={18} 
              className={`absolute top-1/2 -translate-y-1/2 left-[15px] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDark ? 'opacity-40 text-zinc-400 scale-100' : 'opacity-0 scale-50'}`} 
            />
            <Moon 
              size={18} 
              className={`absolute top-1/2 -translate-y-1/2 right-[15px] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDark ? 'opacity-0 scale-50' : 'opacity-40 text-zinc-500 scale-100'}`} 
            />
          </div>

          {/* Sliding Thumb */}
          <motion.div
            layout
            className={`relative flex items-center justify-center w-10 h-10 rounded-full z-20 ml-1 border transition-all duration-500 ${
              isDark 
                ? 'bg-zinc-800 border-zinc-700 text-zinc-50 shadow-[0_4px_8px_rgba(0,0,0,0.5),_0_2px_4px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.15)] group-hover:shadow-[0_6px_12px_rgba(0,0,0,0.6),_0_4px_8px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.2)]' 
                : 'bg-white border-zinc-200 text-zinc-900 shadow-[0_4px_8px_rgba(0,0,0,0.15),_0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,1)] group-hover:shadow-[0_6px_12px_rgba(0,0,0,0.2),_0_4px_8px_rgba(0,0,0,0.15),_inset_0_1px_1px_rgba(255,255,255,1)]'
            }`}
            initial={false}
            animate={{
              x: isDark ? 80 : 0,
            }}
            transition={springConfig}
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isDark ? -180 : 0,
                opacity: isDark ? 0 : 1,
                scale: isDark ? 0.3 : 1
              }}
              transition={iconTransition}
              className="absolute"
            >
              <Sun size={20} strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={false}
              animate={{
                rotate: isDark ? 0 : 180,
                opacity: isDark ? 1 : 0,
                scale: isDark ? 1 : 0.3
              }}
              transition={iconTransition}
              className="absolute"
            >
              <Moon size={20} strokeWidth={2} />
            </motion.div>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
