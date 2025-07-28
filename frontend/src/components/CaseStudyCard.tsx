'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { type CaseStudy, caseStudyUtils } from '@/hooks/useCaseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
  variant?: 'default' | 'featured';
}

export default function CaseStudyCard({ caseStudy, className = '', variant = 'default' }: CaseStudyCardProps) {
  const { language } = useLanguage();
  
  const title = caseStudyUtils.getLocalizedTitle(caseStudy, language);
  const description = caseStudyUtils.getLocalizedDescription(caseStudy, language);
  const challenge = caseStudyUtils.getLocalizedChallenge(caseStudy, language);
  const solution = caseStudyUtils.getLocalizedSolution(caseStudy, language);
  const results = caseStudyUtils.getLocalizedResults(caseStudy, language);
  const mainImage = caseStudyUtils.getMainImage(caseStudy);
  const tags = caseStudyUtils.generateTags(caseStudy);

  if (variant === 'featured') {
    return (
      <article className={`led-card overflow-hidden group ${className}`}>
        {mainImage && (
          <div className="h-72 relative overflow-hidden">
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
              <p className="text-gray-200 text-sm line-clamp-2">{description}</p>
            </div>
            {caseStudy.attributes.featured && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                精选案例
              </div>
            )}
          </div>
        )}
        <div className="p-6">
          {/* 项目信息 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {caseStudy.attributes.industry && (
              <div>
                <div className="text-gray-400 text-sm mb-1">行业</div>
                <div className="text-white font-medium">{caseStudy.attributes.industry}</div>
              </div>
            )}
            {caseStudy.attributes.location && (
              <div>
                <div className="text-gray-400 text-sm mb-1">地点</div>
                <div className="text-white font-medium">{caseStudy.attributes.location}</div>
              </div>
            )}
          </div>

          {/* 项目详情 */}
          {(challenge || solution || results) && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">项目详情</h4>
              <div className="space-y-3 text-sm">
                {challenge && (
                  <div>
                    <span className="text-orange-400 font-medium">挑战：</span>
                    <span className="text-gray-300 ml-2">{challenge}</span>
                  </div>
                )}
                {solution && (
                  <div>
                    <span className="text-orange-400 font-medium">解决方案：</span>
                    <span className="text-gray-300 ml-2">{solution}</span>
                  </div>
                )}
                {results && (
                  <div>
                    <span className="text-orange-400 font-medium">成果：</span>
                    <span className="text-gray-300 ml-2">{results}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Link
            href={`/cases/${caseStudy.id}`}
            className="btn-led-primary w-full text-center"
          >
            查看详情
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className={`led-card overflow-hidden animate-fade-in-up group ${className}`}>
      {mainImage && (
        <div className="h-56 relative overflow-hidden">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {caseStudy.attributes.featured && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              精选
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{title}</h3>
        
        {description && (
          <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">{description}</p>
        )}

        {/* 标签 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}>
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* 项目基本信息 */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          {caseStudy.attributes.industry && (
            <div>
              <span className="text-gray-400">行业：</span>
              <span className="text-white">{caseStudy.attributes.industry}</span>
            </div>
          )}
          {caseStudy.attributes.location && (
            <div>
              <span className="text-gray-400">地点：</span>
              <span className="text-white">{caseStudy.attributes.location}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/cases/${caseStudy.id}`}
            className="btn-led-primary flex-1 text-center text-sm"
          >
            查看详情
          </Link>
          <Link
            href={`/contact?case=${caseStudy.id}`}
            className="btn-led-secondary text-sm px-4"
          >
            咨询
          </Link>
        </div>
      </div>
    </article>
  );
}

// 案例研究卡片骨架屏
export function CaseStudyCardSkeleton({ className = '', variant = 'default' }: { className?: string; variant?: 'default' | 'featured' }) {
  return (
    <div className={`led-card animate-pulse ${className}`}>
      <div className={`${variant === 'featured' ? 'h-72' : 'h-56'} bg-gray-700`}></div>
      <div className="p-6">
        <div className="h-6 bg-gray-700 rounded mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-700 rounded-full w-16"></div>
          <div className="h-6 bg-gray-700 rounded-full w-20"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-700 rounded flex-1"></div>
          <div className="h-10 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}