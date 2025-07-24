'use client'

import { useState, useRef } from 'react'
import { OptimizedImage } from './optimized-image'
import { MediaFile } from '@/lib/media'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline'

interface MediaItem extends MediaFile {
  type: 'image' | 'video'
  thumbnail?: string
  duration?: string
}

interface MediaGalleryProps {
  items: MediaItem[]
  className?: string
  showThumbnails?: boolean
  autoPlay?: boolean
  loop?: boolean
  controls?: boolean
}

export function MediaGallery({
  items,
  className = '',
  showThumbnails = true,
  autoPlay = false,
  loop = false,
  controls = true
}: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  if (!items || items.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg h-64 ${className}`}>
        <span className="text-gray-400">暂无媒体内容</span>
      </div>
    )
  }

  const currentItem = items[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoPlay = () => setIsPlaying(true)
  const handleVideoPause = () => setIsPlaying(false)

  return (
    <>
      {/* Main Gallery */}
      <div className={`relative ${className}`}>
        {/* Main Display */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          {currentItem.type === 'image' ? (
            <OptimizedImage
              src={currentItem}
              alt={currentItem.alternativeText || `媒体 ${currentIndex + 1}`}
              fill
              className="object-contain cursor-pointer"
              onClick={toggleFullscreen}
            />
          ) : (
            <div className="relative h-full w-full">
              <video
                ref={videoRef}
                src={currentItem.url}
                className="h-full w-full object-contain"
                autoPlay={autoPlay}
                loop={loop}
                muted={isMuted}
                controls={controls}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                poster={currentItem.thumbnail}
              />
              
              {/* Custom Video Controls */}
              {!controls && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-5 w-5" />
                    ) : (
                      <PlayIcon className="h-5 w-5 ml-0.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className="h-5 w-5" />
                    ) : (
                      <SpeakerWaveIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous media"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next media"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            aria-label="Toggle fullscreen"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Media Counter */}
          {items.length > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
              {currentIndex + 1} / {items.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && items.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                  index === currentIndex
                    ? 'border-primary-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                {item.type === 'image' ? (
                  <OptimizedImage
                    src={item}
                    alt={`缩略图 ${index + 1}`}
                    width={80}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full bg-gray-200">
                    {item.thumbnail ? (
                      <OptimizedImage
                        src={item.thumbnail}
                        alt={`视频缩略图 ${index + 1}`}
                        width={80}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-300">
                        <PlayIcon className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                    
                    {/* Video Duration */}
                    {item.duration && (
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/70 text-white text-xs rounded">
                        {item.duration}
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close fullscreen"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Fullscreen Content */}
            <div className="relative max-w-full max-h-full">
              {currentItem.type === 'image' ? (
                <OptimizedImage
                  src={currentItem}
                  alt={currentItem.alternativeText || `媒体 ${currentIndex + 1}`}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video
                  src={currentItem.url}
                  className="max-w-full max-h-full object-contain"
                  autoPlay
                  controls
                  poster={currentItem.thumbnail}
                />
              )}
            </div>

            {/* Fullscreen Navigation */}
            {items.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous media"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next media"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}