export interface PageComponent {
  type: 'hero' | 'textBlock' | 'imageGallery' | 'productGrid' | 'testimonials' | 'stats' | 'cta';
  data: any;
}

export interface PageBuilderData {
  id: number;
  title: string;
  slug: string;
  description?: string;
  components: PageComponent[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  publishedAt: string;
  updatedAt: string;
}

export interface HeroComponentData {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundType?: 'image' | 'gradient' | 'solid';
  backgroundColor?: string;
}

export interface TextBlockComponentData {
  title?: string;
  content: string;
  alignment?: 'left' | 'center' | 'right';
  fontSize?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
}

export interface ImageGalleryComponentData {
  title?: string;
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: number;
}

export interface ProductGridComponentData {
  title?: string;
  products: Array<{
    id: number;
    name: string;
    image: string;
    price?: string;
    description?: string;
    url: string;
  }>;
  columns?: number;
  showPrice?: boolean;
}

export interface TestimonialsComponentData {
  title?: string;
  testimonials: Array<{
    name: string;
    company?: string;
    content: string;
    avatar?: string;
    rating?: number;
  }>;
  layout?: 'carousel' | 'grid';
}

export interface StatsComponentData {
  title?: string;
  stats: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
  layout?: 'horizontal' | 'grid';
}

export interface CtaComponentData {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor?: string;
  textColor?: string;
}