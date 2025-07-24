'use client';

import { useState, useEffect, useRef } from 'react';
import { Locale } from '@/lib/i18n-config';
import { cn } from '@/lib/utils';

export interface Location {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isHeadquarters?: boolean;
}

export interface ContactMapProps {
  locations: Location[];
  locale: Locale;
  className?: string;
  height?: string;
  zoom?: number;
  showInfo?: boolean;
  selectedLocationId?: string;
  onLocationSelect?: (locationId: string) => void;
}

export function ContactMap({
  locations,
  locale,
  className,
  height = '400px',
  zoom = 14,
  showInfo = true,
  selectedLocationId,
  onLocationSelect,
}: ContactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [activeLocationId, setActiveLocationId] = useState<string | undefined>(selectedLocationId);
  
  // 翻译函数
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'zh-Hans': {
        'headquarters': '总部',
        'branch': '分支机构',
        'address': '地址',
        'phone': '电话',
        'email': '邮箱',
        'viewOnGoogleMaps': '在谷歌地图中查看',
        'getDirections': '获取路线',
      },
      'en': {
        'headquarters': 'Headquarters',
        'branch': 'Branch Office',
        'address': 'Address',
        'phone': 'Phone',
        'email': 'Email',
        'viewOnGoogleMaps': 'View on Google Maps',
        'getDirections': 'Get Directions',
      },
    };
    
    return translations[locale]?.[key] || key;
  };
  
  // 加载Google Maps API
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapLoaded) return;
    
    const loadGoogleMapsApi = () => {
      const googleMapsApiScript = document.createElement('script');
      googleMapsApiScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      googleMapsApiScript.async = true;
      googleMapsApiScript.defer = true;
      googleMapsApiScript.onload = () => setMapLoaded(true);
      document.head.appendChild(googleMapsApiScript);
    };
    
    // 检查Google Maps API是否已加载
    if (!window.google?.maps) {
      loadGoogleMapsApi();
    } else {
      setMapLoaded(true);
    }
  }, [mapLoaded]);
  
  // 初始化地图
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || map) return;
    
    // 如果没有位置数据，则使用默认位置（北京）
    const defaultCenter = { lat: 39.9042, lng: 116.4074 };
    const center = locations.length > 0 
      ? locations[0].coordinates 
      : defaultCenter;
    
    // 创建地图
    const googleMap = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
      },
    });
    
    // 创建信息窗口
    const googleInfoWindow = new google.maps.InfoWindow();
    
    setMap(googleMap);
    setInfoWindow(googleInfoWindow);
  }, [mapLoaded, map, locations, zoom]);
  
  // 添加标记
  useEffect(() => {
    if (!map || !infoWindow) return;
    
    // 清除现有标记
    markers.forEach(marker => marker.setMap(null));
    
    // 创建新标记
    const newMarkers = locations.map((location) => {
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map,
        title: location.name,
        icon: location.isHeadquarters 
          ? {
              url: '/images/map-marker-hq.svg',
              scaledSize: new google.maps.Size(40, 40),
            }
          : {
              url: '/images/map-marker.svg',
              scaledSize: new google.maps.Size(32, 32),
            },
      });
      
      // 点击标记时显示信息窗口
      marker.addListener('click', () => {
        const content = `
          <div class="p-3 max-w-xs">
            <h3 class="font-semibold text-gray-900 mb-1">${location.name}</h3>
            <p class="text-xs text-primary-600 mb-2">
              ${location.isHeadquarters ? t('headquarters') : t('branch')}
            </p>
            <p class="text-sm text-gray-600 mb-2">${location.address}</p>
            ${location.phone ? `<p class="text-sm text-gray-600 mb-1"><strong>${t('phone')}:</strong> ${location.phone}</p>` : ''}
            ${location.email ? `<p class="text-sm text-gray-600 mb-2"><strong>${t('email')}:</strong> ${location.email}</p>` : ''}
            <div class="mt-3">
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="text-xs text-primary-600 hover:text-primary-700">
                ${t('viewOnGoogleMaps')}
              </a>
            </div>
          </div>
        `;
        
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        
        // 更新选中的位置
        setActiveLocationId(location.id);
        if (onLocationSelect) {
          onLocationSelect(location.id);
        }
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // 如果有选中的位置，则显示其信息窗口
    if (activeLocationId) {
      const selectedLocation = locations.find(loc => loc.id === activeLocationId);
      const selectedMarker = newMarkers.find((_, index) => 
        locations[index].id === activeLocationId
      );
      
      if (selectedLocation && selectedMarker) {
        // 居中显示选中的位置
        map.setCenter(selectedLocation.coordinates);
        
        // 显示信息窗口
        const content = `
          <div class="p-3 max-w-xs">
            <h3 class="font-semibold text-gray-900 mb-1">${selectedLocation.name}</h3>
            <p class="text-xs text-primary-600 mb-2">
              ${selectedLocation.isHeadquarters ? t('headquarters') : t('branch')}
            </p>
            <p class="text-sm text-gray-600 mb-2">${selectedLocation.address}</p>
            ${selectedLocation.phone ? `<p class="text-sm text-gray-600 mb-1"><strong>${t('phone')}:</strong> ${selectedLocation.phone}</p>` : ''}
            ${selectedLocation.email ? `<p class="text-sm text-gray-600 mb-2"><strong>${t('email')}:</strong> ${selectedLocation.email}</p>` : ''}
            <div class="mt-3">
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.address)}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="text-xs text-primary-600 hover:text-primary-700">
                ${t('viewOnGoogleMaps')}
              </a>
            </div>
          </div>
        `;
        
        infoWindow.setContent(content);
        infoWindow.open(map, selectedMarker);
      }
    }
    
    // 调整地图视野以显示所有标记
    if (locations.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend(location.coordinates);
      });
      map.fitBounds(bounds);
    }
    
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, infoWindow, locations, activeLocationId, onLocationSelect, t]);
  
  // 当selectedLocationId变化时更新activeLocationId
  useEffect(() => {
    if (selectedLocationId !== undefined) {
      setActiveLocationId(selectedLocationId);
    }
  }, [selectedLocationId]);
  
  // 选择位置
  const handleLocationSelect = (locationId: string) => {
    setActiveLocationId(locationId);
    
    if (onLocationSelect) {
      onLocationSelect(locationId);
    }
    
    // 找到对应的标记并触发点击事件
    const locationIndex = locations.findIndex(loc => loc.id === locationId);
    if (locationIndex !== -1 && markers[locationIndex]) {
      google.maps.event.trigger(markers[locationIndex], 'click');
    }
  };
  
  return (
    <div className={cn("relative", className)}>
      {/* 地图容器 */}
      <div 
        ref={mapRef} 
        className="w-full rounded-lg overflow-hidden"
        style={{ height }}
      />
      
      {/* 位置列表 */}
      {showInfo && locations.length > 0 && (
        <div className="mt-4 space-y-4">
          {locations.map((location) => (
            <div 
              key={location.id}
              className={cn(
                "p-4 rounded-lg border cursor-pointer transition-colors",
                activeLocationId === location.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
              onClick={() => handleLocationSelect(location.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{location.name}</h3>
                  <p className="text-xs text-primary-600 mt-1">
                    {location.isHeadquarters ? t('headquarters') : t('branch')}
                  </p>
                </div>
                {location.isHeadquarters && (
                  <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                    HQ
                  </span>
                )}
              </div>
              
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>{location.address}</p>
                {location.phone && <p><strong>{t('phone')}:</strong> {location.phone}</p>}
                {location.email && <p><strong>{t('email')}:</strong> {location.email}</p>}
              </div>
              
              <div className="mt-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-600 hover:text-primary-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t('getDirections')} →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}