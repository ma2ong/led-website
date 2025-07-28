'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-gradient-to-r from-orange-500 to-blue-500 animate-pulse"></div>
      </div>
    </div>
  );
}

// 页面过渡动画组件
interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {children}
    </div>
  );
}

// 路由保护组件
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = false, 
  fallback = <div>Loading...</div> 
}: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState(!requireAuth);

  useEffect(() => {
    if (requireAuth) {
      // 这里可以添加认证逻辑
      // 例如检查用户登录状态
      const checkAuth = async () => {
        // 模拟认证检查
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsAuthorized(true);
      };
      
      checkAuth();
    }
  }, [requireAuth]);

  if (!isAuthorized) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// 面包屑导航增强
interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface EnhancedBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function EnhancedBreadcrumb({ items, className = '' }: EnhancedBreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <a href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          
          {item.href && !item.isActive ? (
            <a 
              href={item.href} 
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className={item.isActive ? 'text-orange-400 font-medium' : 'text-gray-300'}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// 404错误页面组件
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl mb-8 animate-bounce">🔍</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">页面未找到</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移动。请检查URL是否正确，或返回首页。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            返回首页
          </a>
          <button 
            onClick={() => window.history.back()}
            className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            返回上页
          </button>
        </div>
        
        {/* 推荐链接 */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">您可能感兴趣的页面：</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/products" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-white font-medium">产品中心</div>
            </a>
            <a href="/cases" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-white font-medium">成功案例</div>
            </a>
            <a href="/about" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-white font-medium">关于我们</div>
            </a>
            <a href="/contact" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">📞</div>
              <div className="text-white font-medium">联系我们</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// 加载状态组件
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'text-orange-500',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${color} ${className}`} />
  );
}

// 页面加载骨架屏
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 animate-pulse">
      {/* 导航栏骨架 */}
      <div className="h-20 bg-gray-800"></div>
      
      {/* 内容骨架 */}
      <div className="container mx-auto px-6 py-8">
        <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-800 rounded w-4/6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SEO友好的链接组件
interface SEOLinkProps {
  href: string;
  children: React.ReactNode;
  title?: string;
  className?: string;
  prefetch?: boolean;
}

export function SEOLink({ 
  href, 
  children, 
  title, 
  className = '',
  prefetch = true 
}: SEOLinkProps) {
  return (
    <a
      href={href}
      title={title}
      className={className}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      target={href.startsWith('http') ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}