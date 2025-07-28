import { useEffect, useRef, useState } from 'react';

// 滚动动画钩子
export function useScrollAnimation(threshold = 0.1, rootMargin = '0px') {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 一次性动画，观察后即停止
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

// 多元素序列动画钩子
export function useStaggeredAnimation(delay = 100) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLElement | null)[]>([]);

  const addRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * delay);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [delay]);

  const isVisible = (index: number) => visibleItems.has(index);

  return { addRef, isVisible };
}

// 滚动进度钩子
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}

// 视差滚动钩子
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

// 鼠标跟随动画钩子
export function useMouseFollow(sensitivity = 0.1) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * sensitivity;
        const deltaY = (e.clientY - centerY) * sensitivity;
        
        setPosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);

  return { ref, position };
}

// 滚动方向检测钩子
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
}

// 元素可见性钩子
export function useElementVisibility(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, hasBeenVisible]);

  return { ref, isVisible, hasBeenVisible };
}

// 动画状态管理钩子
export function useAnimationState(initialState = false) {
  const [isAnimating, setIsAnimating] = useState(initialState);
  const [animationCount, setAnimationCount] = useState(0);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationCount(prev => prev + 1);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  const toggleAnimation = () => {
    setIsAnimating(prev => !prev);
    if (!isAnimating) {
      setAnimationCount(prev => prev + 1);
    }
  };

  return {
    isAnimating,
    animationCount,
    startAnimation,
    stopAnimation,
    toggleAnimation,
  };
}

// 性能优化的滚动钩子
export function useThrottledScroll(delay = 16) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollY = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollY);
        ticking.current = true;
      }
    };

    const handleScroll = () => {
      setTimeout(requestTick, delay);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [delay]);

  return { scrollY, scrollDirection };
}