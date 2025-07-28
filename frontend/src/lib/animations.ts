// 动画工具库

// 动画持续时间常量
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// 缓动函数
export const EASING = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  SHARP: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

// 动画延迟
export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 100,
  MEDIUM: 200,
  LONG: 300,
  EXTRA_LONG: 500,
} as const;

// 淡入动画
export const fadeIn = (duration = ANIMATION_DURATION.NORMAL, delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 淡入向上动画
export const fadeInUp = (duration = ANIMATION_DURATION.NORMAL, delay = 0, distance = 30) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 淡入向下动画
export const fadeInDown = (duration = ANIMATION_DURATION.NORMAL, delay = 0, distance = 30) => ({
  initial: { opacity: 0, y: -distance },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 淡入向左动画
export const fadeInLeft = (duration = ANIMATION_DURATION.NORMAL, delay = 0, distance = 30) => ({
  initial: { opacity: 0, x: -distance },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 淡入向右动画
export const fadeInRight = (duration = ANIMATION_DURATION.NORMAL, delay = 0, distance = 30) => ({
  initial: { opacity: 0, x: distance },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 缩放动画
export const scaleIn = (duration = ANIMATION_DURATION.NORMAL, delay = 0, scale = 0.8) => ({
  initial: { opacity: 0, scale },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.BOUNCE,
  },
});

// 滑入动画
export const slideIn = (
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  duration = ANIMATION_DURATION.NORMAL,
  delay = 0,
  distance = 100
) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -distance, y: 0 };
      case 'right': return { x: distance, y: 0 };
      case 'up': return { x: 0, y: distance };
      case 'down': return { x: 0, y: -distance };
      default: return { x: 0, y: distance };
    }
  };

  return {
    initial: { opacity: 0, ...getInitialPosition() },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: EASING.EASE_OUT,
    },
  };
};

// 旋转动画
export const rotateIn = (duration = ANIMATION_DURATION.NORMAL, delay = 0, rotation = 180) => ({
  initial: { opacity: 0, rotate: rotation },
  animate: { opacity: 1, rotate: 0 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 弹跳动画
export const bounceIn = (duration = ANIMATION_DURATION.SLOW, delay = 0) => ({
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASING.BOUNCE,
  },
});

// 悬停效果
export const hoverScale = (scale = 1.05, duration = ANIMATION_DURATION.FAST) => ({
  whileHover: { scale },
  transition: { duration: duration / 1000, ease: EASING.EASE_OUT },
});

export const hoverLift = (y = -5, duration = ANIMATION_DURATION.FAST) => ({
  whileHover: { y },
  transition: { duration: duration / 1000, ease: EASING.EASE_OUT },
});

export const hoverGlow = (boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)', duration = ANIMATION_DURATION.FAST) => ({
  whileHover: { boxShadow },
  transition: { duration: duration / 1000, ease: EASING.EASE_OUT },
});

// 点击效果
export const tapScale = (scale = 0.95, duration = ANIMATION_DURATION.FAST) => ({
  whileTap: { scale },
  transition: { duration: duration / 1000, ease: EASING.EASE_OUT },
});

// 加载动画
export const pulse = (duration = ANIMATION_DURATION.SLOW) => ({
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  },
  transition: {
    duration: duration / 1000,
    repeat: Infinity,
    ease: EASING.EASE_IN_OUT,
  },
});

export const spin = (duration = ANIMATION_DURATION.EXTRA_SLOW) => ({
  animate: { rotate: 360 },
  transition: {
    duration: duration / 1000,
    repeat: Infinity,
    ease: EASING.LINEAR,
  },
});

// 序列动画
export const staggerChildren = (staggerDelay = 0.1, delayChildren = 0) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// 页面过渡动画
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: ANIMATION_DURATION.NORMAL / 1000,
    ease: EASING.EASE_OUT,
  },
};

// 模态框动画
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: {
    duration: ANIMATION_DURATION.FAST / 1000,
    ease: EASING.EASE_OUT,
  },
};

// 背景动画
export const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: ANIMATION_DURATION.FAST / 1000,
  },
};

// 滚动触发动画
export const scrollAnimation = (threshold = 0.1) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: threshold },
  transition: {
    duration: ANIMATION_DURATION.NORMAL / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 数字计数动画
export const countUp = (from: number, to: number, duration = ANIMATION_DURATION.SLOW) => ({
  initial: { value: from },
  animate: { value: to },
  transition: {
    duration: duration / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 进度条动画
export const progressBar = (width: string, duration = ANIMATION_DURATION.SLOW) => ({
  initial: { width: '0%' },
  animate: { width },
  transition: {
    duration: duration / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 打字机效果
export const typewriter = (text: string, duration = ANIMATION_DURATION.NORMAL) => {
  const chars = text.split('');
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: duration / 1000,
      ease: EASING.LINEAR,
    },
  };
};

// 波纹效果
export const ripple = (duration = ANIMATION_DURATION.NORMAL) => ({
  initial: { scale: 0, opacity: 1 },
  animate: { scale: 4, opacity: 0 },
  transition: {
    duration: duration / 1000,
    ease: EASING.EASE_OUT,
  },
});

// 组合动画预设
export const ANIMATION_PRESETS = {
  // 卡片动画
  card: {
    ...fadeInUp(),
    ...hoverLift(),
    ...tapScale(),
  },
  
  // 按钮动画
  button: {
    ...hoverScale(1.02),
    ...tapScale(0.98),
  },
  
  // 图片动画
  image: {
    ...scaleIn(),
    ...hoverScale(1.05),
  },
  
  // 文本动画
  text: {
    ...fadeInUp(ANIMATION_DURATION.NORMAL, ANIMATION_DELAY.SHORT),
  },
  
  // 标题动画
  heading: {
    ...fadeInDown(ANIMATION_DURATION.NORMAL, ANIMATION_DELAY.NONE),
  },
  
  // 列表项动画
  listItem: {
    ...fadeInLeft(ANIMATION_DURATION.NORMAL, ANIMATION_DELAY.SHORT),
  },
};

// CSS动画类名生成器
export const generateAnimationClass = (
  type: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'slideIn' | 'scaleIn' | 'bounceIn',
  duration: keyof typeof ANIMATION_DURATION = 'NORMAL',
  delay: keyof typeof ANIMATION_DELAY = 'NONE'
) => {
  return `animate-${type.toLowerCase()} duration-${duration.toLowerCase()} delay-${delay.toLowerCase()}`;
};

// 动画工具函数
export const animationUtils = {
  // 创建延迟数组
  createStaggeredDelays: (count: number, baseDelay = 100) => {
    return Array.from({ length: count }, (_, i) => i * baseDelay);
  },
  
  // 随机延迟
  randomDelay: (min = 0, max = 500) => {
    return Math.random() * (max - min) + min;
  },
  
  // 缓动函数计算
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  // 动画状态管理
  createAnimationState: (initialState = false) => {
    let isAnimating = initialState;
    return {
      start: () => { isAnimating = true; },
      stop: () => { isAnimating = false; },
      isAnimating: () => isAnimating,
    };
  },
};