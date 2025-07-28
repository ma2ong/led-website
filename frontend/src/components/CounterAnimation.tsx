'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterAnimationProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
  separator?: string;
  onComplete?: () => void;
}

export default function CounterAnimation({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
  separator = ',',
  onComplete,
}: CounterAnimationProps) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  // 格式化数字
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    if (separator && num >= 1000) {
      return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return fixed;
  };

  // 缓动函数
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // 动画函数
  const animate = (startTime: number) => {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentCount = start + (end - start) * easedProgress;

    setCount(currentCount);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(() => animate(startTime));
    } else {
      onComplete?.();
    }
  };

  // 开始动画
  const startAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(() => animate(performance.now()));
  };

  // 交叉观察器
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            startAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// 预设的计数器组件
export function StatCounter({ 
  value, 
  label, 
  suffix = '', 
  icon,
  className = '' 
}: {
  value: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      {icon && (
        <div className="text-4xl mb-4 animate-float">
          {icon}
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
        <CounterAnimation 
          end={value} 
          suffix={suffix}
          duration={2500}
        />
      </div>
      <div className="text-white font-semibold text-lg">
        {label}
      </div>
    </div>
  );
}

// 进度条动画组件
interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: string;
  height?: string;
  duration?: number;
  className?: string;
}

export function AnimatedProgressBar({
  percentage,
  label,
  color = 'bg-orange-500',
  height = 'h-2',
  duration = 1500,
  className = '',
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // 动画到目标百分比
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
              setProgress(percentage * eased);
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [percentage, duration, isVisible]);

  return (
    <div ref={elementRef} className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <span className="text-sm font-medium text-orange-400">
            <CounterAnimation end={percentage} suffix="%" decimals={0} />
          </span>
        </div>
      )}
      <div className={`w-full ${height} bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// 技能条组件
export function SkillBar({ 
  skill, 
  percentage, 
  className = '' 
}: {
  skill: string;
  percentage: number;
  className?: string;
}) {
  return (
    <div className={`mb-6 ${className}`}>
      <AnimatedProgressBar
        percentage={percentage}
        label={skill}
        color="bg-gradient-to-r from-orange-400 to-orange-600"
        height="h-3"
        duration={2000}
      />
    </div>
  );
}