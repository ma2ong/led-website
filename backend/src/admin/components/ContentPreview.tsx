import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Typography,
  Box,
  Flex,
  Select,
  Option,
  Loader,
  Alert,
} from '@strapi/design-system';
import { Eye, ExternalLink, Smartphone, Tablet, Monitor, X } from '@strapi/icons';

interface ContentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: string;
  contentId: number;
  locale?: string;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
  isOpen,
  onClose,
  contentType,
  contentId,
  locale = 'zh'
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // 设备尺寸配置
  const deviceSizes = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '100%' },
  };

  // 生成预览URL
  useEffect(() => {
    if (isOpen && contentType && contentId) {
      generatePreviewUrl();
    }
  }, [isOpen, contentType, contentId, locale]);

  const generatePreviewUrl = async () => {
    setIsLoading(true);
    setError('');

    try {
      // 根据内容类型生成预览URL
      const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
      let path = '';

      switch (contentType) {
        case 'api::product.product':
          path = `/products/${contentId}`;
          break;
        case 'api::case-study.case-study':
          path = `/cases/${contentId}`;
          break;
        case 'api::news.news':
          path = `/news/${contentId}`;
          break;
        default:
          path = `/preview/${contentType}/${contentId}`;
      }

      // 添加预览参数和语言
      const url = `${baseUrl}/${locale}${path}?preview=true&timestamp=${Date.now()}`;
      setPreviewUrl(url);
    } catch (err) {
      setError('生成预览URL失败');
      console.error('Preview URL generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('预览加载失败，请检查内容是否已发布');
  };

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone />;
      case 'tablet':
        return <Tablet />;
      case 'desktop':
        return <Monitor />;
      default:
        return <Monitor />;
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <ModalLayout 
        onClose={onClose} 
        labelledBy=\"preview-title\"
        style={{ width: '95vw', height: '90vh' }}
      >
        <ModalHeader>
          <Flex justifyContent=\"space-between\" alignItems=\"center\" width=\"100%\">
            <Typography fontWeight=\"bold\" textColor=\"neutral800\" as=\"h2\" id=\"preview-title\">
              内容预览
            </Typography>
            <Flex gap={2} alignItems=\"center\">
              {/* 设备切换 */}
              <Flex gap={1}>
                {(['mobile', 'tablet', 'desktop'] as const).map((deviceType) => (
                  <Button
                    key={deviceType}
                    variant={device === deviceType ? 'default' : 'tertiary'}
                    startIcon={getDeviceIcon(deviceType)}
                    onClick={() => setDevice(deviceType)}
                    size=\"S\"
                  >
                    {deviceType === 'mobile' ? '手机' : 
                     deviceType === 'tablet' ? '平板' : '桌面'}
                  </Button>
                ))}
              </Flex>
              
              {/* 在新标签页打开 */}
              <Button
                variant=\"secondary\"
                startIcon={<ExternalLink />}
                onClick={openInNewTab}
                disabled={!previewUrl || isLoading}
                size=\"S\"
              >
                新标签页打开
              </Button>
            </Flex>
          </Flex>
        </ModalHeader>

        <ModalBody style={{ padding: 0, height: 'calc(90vh - 120px)' }}>
          {error && (
            <Box padding={4}>
              <Alert 
                closeLabel=\"关闭\"
                title=\"预览错误\"
                variant=\"danger\"
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            </Box>
          )}

          {isLoading && (
            <Flex 
              justifyContent=\"center\" 
              alignItems=\"center\" 
              height=\"100%\"
              direction=\"column\"
              gap={3}
            >
              <Loader />
              <Typography>正在加载预览...</Typography>
            </Flex>
          )}

          {!error && previewUrl && (
            <Box 
              style={{ 
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: device === 'desktop' ? 'stretch' : 'center',
                padding: device === 'desktop' ? 0 : '20px',
                backgroundColor: device === 'desktop' ? 'transparent' : '#f6f6f9',
              }}
            >
              <Box
                style={{
                  width: deviceSizes[device].width,
                  height: device === 'desktop' ? '100%' : deviceSizes[device].height,
                  maxWidth: '100%',
                  maxHeight: '100%',
                  border: device === 'desktop' ? 'none' : '1px solid #ddd',
                  borderRadius: device === 'desktop' ? 0 : '12px',
                  overflow: 'hidden',
                  boxShadow: device === 'desktop' ? 'none' : '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                <iframe
                  src={previewUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: isLoading ? 'none' : 'block',
                  }}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title=\"内容预览\"
                />
              </Box>
            </Box>
          )}
        </ModalBody>

        <ModalFooter
          startActions={
            <Typography variant=\"pi\" textColor=\"neutral600\">
              {previewUrl && `预览地址: ${previewUrl}`}
            </Typography>
          }
          endActions={
            <Button onClick={onClose} variant=\"tertiary\">
              关闭预览
            </Button>
          }
        />
      </ModalLayout>
    </Modal>
  );
};

// 预览按钮组件
interface PreviewButtonProps {
  contentType: string;
  contentId: number;
  locale?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'S' | 'M' | 'L';
}

export const PreviewButton: React.FC<PreviewButtonProps> = ({
  contentType,
  contentId,
  locale = 'zh',
  variant = 'secondary',
  size = 'S'
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        startIcon={<Eye />}
        onClick={() => setIsPreviewOpen(true)}
      >
        预览
      </Button>
      
      <ContentPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        contentType={contentType}
        contentId={contentId}
        locale={locale}
      />
    </>
  );
};

export default ContentPreview;