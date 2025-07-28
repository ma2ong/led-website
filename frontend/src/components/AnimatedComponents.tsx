'use client';
import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, ReactNode, useState } from 'react';
import { 
  fadeIn, 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight,
  scaleIn,
  slideIn,
  bounceIn,
  hoverScale,
  hoverLift,
  tapScale,
  scrollAnimation,
  staggerChildren,
  ANIMATION_DURATION,
  ANIMATION_DELAY
} from '@/lib/animations';

// 基础动画容器
interface AnimatedContainerProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn' | 'bounceIn';
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function AnimatedContainer({ 
  children, 
  animation = 'fadeInUp',
  duration = ANIMATION_DURATION.NORMAL,
  delay = 0,
  className = '',
  once = true
}: AnimatedContainerProps) {
  const getAnimationProps = () => {
    switch (animation) {
      case 'fadeIn': return fadeIn(duration, delay);
      case 'fadeInUp': return fadeInUp(duration, delay);
      case 'fadeInDown': return fadeInDown(duration, delay);
      case 'fadeInLeft': return fadeInLeft(duration, delay);
      case 'fadeInRight': return fadeInRight(duration, delay);
      case 'scaleIn': return scaleIn(duration, delay);
      case 'slideIn': return slideIn('up', duration, delay);
      case 'bounceIn': return bounceIn(duration, delay);
      default: return fadeInUp(duration, delay);
    }
  };

  return (
    <motion.div
      className={className}
      {...getAnimationProps()}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}

// 滚动触发动画
interface ScrollAnimatedProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollAnimated({ children, className = '', threshold = 0.1, once = true }: ScrollAnimatedProps) {
  return (
    <motion.div
      className={className}
      {...scrollAnimation(threshold)}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}

// 序列动画容器
interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0
}: StaggeredContainerProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={staggerChildren(staggerDelay, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

// 悬停动画按钮
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  hoverEffect?: 'scale' | 'lift' | 'glow';
  disabled?: boolean;
}

export function AnimatedButton({ 
  children, 
  onClick, 
  className = '',
  hoverEffect = 'scale',
  disabled = false
}: AnimatedButtonProps) {
  const getHoverProps = () => {
    switch (hoverEffect) {
      case 'scale': return hoverScale(1.05);
      case 'lift': return hoverLift(-3);
      case 'glow': return { whileHover: { boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' } };
      default: return hoverScale(1.05);
    }
  };

  return (
    <motion.button
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={disabled ? undefined : onClick}
      {...getHoverProps()}
      {...tapScale(0.95)}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

// 动画卡片
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

export function AnimatedCard({ children, className = '', hoverEffect = true, delay = 0 }: AnimatedCardProps) {
  const hoverProps = hoverEffect ? {
    ...hoverLift(-5),
    ...hoverScale(1.02),
    whileHover: { 
      y: -5,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  } : {};

  return (
    <motion.div
      className={className}
      {...fadeInUp(ANIMATION_DURATION.NORMAL, delay)}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
}

// 数字计数动画
interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ from, to, duration = 2000, className = '', suffix = '', prefix = '' }: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        value: to,
        transition: { duration: duration / 1000, ease: 'easeOut' }
      });
    }
  }, [isInView, to, duration, controls]);

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ value: from }}
      animate={controls}
    >
      {({ value }: { value: number }) => `${prefix}${Math.round(value)}${suffix}`}
    </motion.span>
  );
}

// 进度条动画
interface AnimatedProgressProps {
  progress: number;
  className?: string;
  barClassName?: string;
  duration?: number;
  showPercentage?: boolean;
}

export function AnimatedProgress({ 
  progress, 
  className = '', 
  barClassName = '',
  duration = 1000,
  showPercentage = false
}: AnimatedProgressProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  return (
    <div ref={nodeRef} className={`relative ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <motion.div
          className={`h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full ${barClassName}`}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${progress}%` } : { width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'easeOut' }}
        />
      </div>
      {showPercentage && (
        <motion.span
          className="absolute right-0 top-3 text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {progress}%
        </motion.span>
      )}
    </div>
  );
}

// 打字机效果
interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
}

export function Typewriter({ text, speed = 50, className = '', cursor = true }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

// 波纹效果
interface RippleEffectProps {
  children: ReactNode;
  className?: string;
  rippleColor?: string;
}

export function RippleEffect({ children, className = '', rippleColor = 'rgba(255, 255, 255, 0.6)' }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseDown={addRipple}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// 浮动动画
interface FloatingProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
}

export function Floating({ children, className = '', intensity = 10, speed = 3 }: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity, intensity, -intensity],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// 视差滚动效果
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

// 所有组件已通过单独的export function声明导出