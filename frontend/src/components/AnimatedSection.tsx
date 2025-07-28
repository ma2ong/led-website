'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  animation = 'animate-fade-in-up',
  delay = 0,
  threshold = 0.1,
  className = '',
  once = true,
}: AnimatedSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 检查用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // 设置延迟
    if (delay > 0) {
      element.style.animationDelay = `${delay}ms`;
    }

    // 观察元素
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animation, delay, threshold, once]);

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
      style={{ animationDelay: delay > 0 ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}

// 预设的动画组件
export function FadeInUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <AnimatedSection animation="animate-fade-in-up" delay={delay} className={className}>
      {children}
    </AnimatedSection>
  );
}

export function FadeInLeft({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <AnimatedSection animation="animate-fade-in-left" delay={delay} className={className}>
      {children}
    </AnimatedSection>
  );
}

export function FadeInRight({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <AnimatedSection animation="animate-fade-in-right" delay={delay} className={className}>
      {children}
    </AnimatedSection>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <AnimatedSection animation="animate-scale-in" delay={delay} className={className}>
      {children}
    </AnimatedSection>
  );
}

export function SlideInUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <AnimatedSection animation="animate-slide-in-up" delay={delay} className={className}>
      {children}
    </AnimatedSection>
  );
}

// 交错动画容器
interface StaggeredAnimationProps {
  children: React.ReactNode[];
  animation?: string;
  staggerDelay?: number;
  className?: string;
}

export function StaggeredAnimation({
  children,
  animation = 'animate-fade-in-up',
  staggerDelay = 100,
  className = '',
}: StaggeredAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedSection
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
}