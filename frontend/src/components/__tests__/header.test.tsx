/**
 * Header组件测试
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../layout/header';

// 模拟字典hook
jest.mock('../../hooks/use-dictionary', () => ({
  useDictionary: () => ({
    navigation: {
      home: '首页',
      products: '产品',
      solutions: '解决方案',
      caseStudies: '案例研究',
      news: '新闻',
      about: '关于我们',
      contact: '联系我们',
    },
    common: {
      menu: '菜单',
      close: '关闭',
    },
  }),
}));

describe('Header Component', () => {
  const mockProps = {
    locale: 'zh' as const,
  };

  beforeEach(() => {
    render(<Header {...mockProps} />);
  });

  it('renders the header with logo', () => {
    const logo = screen.getByAltText('LED显示解决方案');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('产品')).toBeInTheDocument();
    expect(screen.getByText('解决方案')).toBeInTheDocument();
    expect(screen.getByText('案例研究')).toBeInTheDocument();
    expect(screen.getByText('新闻')).toBeInTheDocument();
    expect(screen.getByText('关于我们')).toBeInTheDocument();
    expect(screen.getByText('联系我们')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    const languageSwitcher = screen.getByRole('button', { name: /language/i });
    expect(languageSwitcher).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    const menuButton = screen.getByRole('button', { name: /菜单/i });
    
    // 初始状态下移动菜单应该是隐藏的
    const mobileMenu = screen.getByRole('navigation');
    expect(mobileMenu).toHaveClass('hidden');
    
    // 点击菜单按钮
    fireEvent.click(menuButton);
    
    // 移动菜单应该显示
    expect(mobileMenu).not.toHaveClass('hidden');
    
    // 再次点击应该隐藏
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass('hidden');
  });

  it('has correct navigation links with proper hrefs', () => {
    const homeLink = screen.getByRole('link', { name: '首页' });
    expect(homeLink).toHaveAttribute('href', '/zh');
    
    const productsLink = screen.getByRole('link', { name: '产品' });
    expect(productsLink).toHaveAttribute('href', '/zh/products');
    
    const contactLink = screen.getByRole('link', { name: '联系我们' });
    expect(contactLink).toHaveAttribute('href', '/zh/contact');
  });

  it('applies sticky positioning on scroll', () => {
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0');
  });

  it('has proper accessibility attributes', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    const menuButton = screen.getByRole('button', { name: /菜单/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Header Component - English Locale', () => {
  const mockProps = {
    locale: 'en' as const,
  };

  beforeEach(() => {
    // 模拟英文字典
    jest.mocked(require('../../hooks/use-dictionary').useDictionary).mockReturnValue({
      navigation: {
        home: 'Home',
        products: 'Products',
        solutions: 'Solutions',
        caseStudies: 'Case Studies',
        news: 'News',
        about: 'About',
        contact: 'Contact',
      },
      common: {
        menu: 'Menu',
        close: 'Close',
      },
    });

    render(<Header {...mockProps} />);
  });

  it('renders English navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('has correct English navigation links with proper hrefs', () => {
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/en');
    
    const productsLink = screen.getByRole('link', { name: 'Products' });
    expect(productsLink).toHaveAttribute('href', '/en/products');
    
    const contactLink = screen.getByRole('link', { name: 'Contact' });
    expect(contactLink).toHaveAttribute('href', '/en/contact');
  });
});