import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Lock } from 'lucide-react';

const Card = ({ project, index, progress, total }) => {
  // Define progress segmentation mapped to the number of projects.
  // The first project is always visible initially.
  const slideInStart = (index - 1) / total;
  const slideInEnd = index / total;

  // The exit transition begins as the NEXT project starts sliding in over this one.
  const startExit = index / total;
  const endExit = (index + 1) / total;

  // When to start dimming this specific card
  const opacity = useTransform(
    progress,
    [startExit, endExit],
    [1, 0.15]
  );

  // When to start scaling it back (creating the 3D stacking depth)
  const scale = useTransform(
    progress,
    [startExit, endExit],
    [1, 0.85]
  );
  
  // Calculate depth translation (pushing it slightly up as it scales down to maintain visual anchor)
  const depthY = useTransform(
    progress,
    [startExit, endExit],
    ["0%", "-5%"]
  );

  // Slide-in translation for the card entering from the bottom
  const slideY = useTransform(
    progress,
    [slideInStart, slideInEnd],
    ["150%", "0%"]
  );

  // Combined Y transform: If coming in, it slides. If going back, it uses depthY.
  // We simulate this logic safely by assigning standard slideY and then allowing CSS translate wrappers.
  // We'll just pass slideY to 'y' and we'll apply depthY manually or via another motion div.
  // Actually, we can combine them safely in Framer Motion by applying them to separate wrappers or passing an array of interpolations.
  
  // The easiest way is mapping the exact multi-stage timeline for Y!
  const combinedY = useTransform(
    progress,
    [slideInStart, slideInEnd, endExit],
    ["150%", "0%", "-8%"]
  );

  return (
    <motion.div
      style={{
        y: index === 0 ? depthY : combinedY,
        scale,
        opacity,
        zIndex: index,
        top: `calc(5vh + ${index * 15}px)` 
      }}
      className="absolute pl-0 pr-0 left-0 w-full origin-top"
    >
      <div className="group flex flex-col lg:flex-row gap-8 lg:gap-16 bg-slate-50 dark:bg-[#060913] p-10 lg:p-14 rounded-[2rem] border border-slate-200 dark:border-white/[0.08] shadow-[0_-20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Animated top border glow */}
        <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-blue-500/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out origin-left"></div>
        
        <div className="lg:w-1/3 shrink-0 relative z-10 flex flex-col">
          <div className="text-blue-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-blue-500/50 inline-block group-hover:w-16 transition-all duration-700"></span> 
              {project.date}
          </div>
          <h3 className="text-3xl lg:text-4xl font-light text-slate-800 dark:text-slate-100 leading-tight mb-8 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-500 tracking-tight">{project.title}</h3>
          
          <div className="mt-auto inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-[0.15em] w-fit backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-blue-500" /> {project.org}
          </div>
        </div>
        
        <div className="lg:w-2/3 relative z-10 flex items-center bg-slate-100/50 dark:bg-white/[0.02] p-8 rounded-3xl group-hover:bg-slate-100 dark:group-hover:bg-white/[0.04] transition-colors duration-500 w-full border border-transparent dark:group-hover:border-white/[0.02]">
          <ul className="space-y-6">
            {project.points.map((point, pIdx) => (
              <li key={pIdx} className="flex gap-5 text-slate-600 dark:text-slate-300 text-[16px] lg:text-[17px] font-light leading-relaxed group/item">
                <ChevronRight className="w-5 h-5 shrink-0 mt-0.5 text-blue-500/40 group-hover/item:text-blue-500 group-hover/item:translate-x-1 transition-all duration-300" />
                <span className="opacity-90 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function AppleScrollProjects({ projects }) {
  const containerRef = useRef(null);
  
  // Tracks overall scroll within the extremely tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: `${projects.length * 90}vh` }} // Dynamic height mapped to project count
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        {/* We use pointer-events none on the viewport and auto on the cards to not block clicks outside the cards layout */}
        <div className="relative w-full max-w-6xl mx-auto px-6 h-[80vh] flex justify-center pointer-events-auto">
          {projects.map((proj, idx) => (
            <Card 
              key={idx} 
              project={proj} 
              index={idx} 
              progress={scrollYProgress} 
              total={projects.length} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
