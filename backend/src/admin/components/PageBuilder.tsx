/**
 * 页面构建器组件
 * 提供拖拽式页面编辑功能
 */

import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Card, CardBody, CardContent, CardHeader } from '@strapi/design-system/Card';
import { IconButton } from '@strapi/design-system/IconButton';
import { Flex } from '@strapi/design-system/Flex';
import { Plus, Trash, Edit, Eye, Drag } from '@strapi/icons';

interface PageComponent {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  children?: PageComponent[];
}

interface PageBuilderProps {
  initialComponents?: PageComponent[];
  onChange?: (components: PageComponent[]) => void;
  onSave?: (components: PageComponent[]) => void;
}

// 预定义的组件类型
const COMPONENT_TYPES = {
  hero: {
    name: '主视觉区',
    icon: '🎯',
    defaultProps: {
      title: '标题文本',
      subtitle: '副标题文本',
      backgroundImage: '',
      buttonText: '了解更多',
      buttonLink: '#',
    },
  },
  textBlock: {
    name: '文本块',
    icon: '📝',
    defaultProps: {
      title: '标题',
      content: '内容文本',
      alignment: 'left',
    },
  },
  imageGallery: {
    name: '图片画廊',
    icon: '🖼️',
    defaultProps: {
      images: [],
      columns: 3,
      showCaptions: true,
    },
  },
  productGrid: {
    name: '产品网格',
    icon: '📦',
    defaultProps: {
      category: '',
      limit: 6,
      showFilters: true,
    },
  },
  contactForm: {
    name: '联系表单',
    icon: '📧',
    defaultProps: {
      title: '联系我们',
      fields: ['name', 'email', 'message'],
    },
  },
  testimonials: {
    name: '客户评价',
    icon: '💬',
    defaultProps: {
      testimonials: [],
      layout: 'carousel',
    },
  },
  stats: {
    name: '数据统计',
    icon: '📊',
    defaultProps: {
      stats: [
        { label: '项目数量', value: '500+' },
        { label: '客户满意度', value: '99%' },
      ],
    },
  },
  cta: {
    name: '行动号召',
    icon: '🎯',
    defaultProps: {
      title: '准备开始您的项目？',
      description: '联系我们获取专业建议',
      buttonText: '立即咨询',
      buttonLink: '/contact',
    },
  },
};

export const PageBuilder: React.FC<PageBuilderProps> = ({
  initialComponents = [],
  onChange,
  onSave,
}) => {
  const [components, setComponents] = useState<PageComponent[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // 生成唯一ID
  const generateId = () => `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // 添加组件
  const addComponent = useCallback((type: string) => {
    const componentType = COMPONENT_TYPES[type as keyof typeof COMPONENT_TYPES];
    if (!componentType) return;

    const newComponent: PageComponent = {
      id: generateId(),
      type,
      name: componentType.name,
      props: { ...componentType.defaultProps },
    };

    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    onChange?.(updatedComponents);
  }, [components, onChange]);

  // 删除组件
  const removeComponent = useCallback((id: string) => {
    const updatedComponents = components.filter(comp => comp.id !== id);
    setComponents(updatedComponents);
    onChange?.(updatedComponents);
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  }, [components, onChange, selectedComponent]);

  // 更新组件属性
  const updateComponent = useCallback((id: string, props: Record<string, any>) => {
    const updatedComponents = components.map(comp =>
      comp.id === id ? { ...comp, props: { ...comp.props, ...props } } : comp
    );
    setComponents(updatedComponents);
    onChange?.(updatedComponents);
  }, [components, onChange]);

  // 拖拽结束处理
  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
    onChange?.(items);
  }, [components, onChange]);

  // 渲染组件预览
  const renderComponentPreview = (component: PageComponent) => {
    const componentType = COMPONENT_TYPES[component.type as keyof typeof COMPONENT_TYPES];
    
    return (
      <Box
        padding={4}
        background="neutral100"
        borderRadius="4px"
        minHeight="120px"
        style={{
          border: selectedComponent === component.id ? '2px solid #4945ff' : '1px solid #ddd',
        }}
      >
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="beta" textColor="neutral800">
              {componentType?.icon} {component.name}
            </Typography>
            <Typography variant="pi" textColor="neutral600">
              {component.type}
            </Typography>
          </Box>
          <Flex gap={1}>
            <IconButton
              onClick={() => setSelectedComponent(component.id)}
              label="编辑"
              variant="ghost"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => removeComponent(component.id)}
              label="删除"
              variant="ghost"
            >
              <Trash />
            </IconButton>
          </Flex>
        </Flex>
        
        {/* 组件属性预览 */}
        <Box marginTop={2}>
          {Object.entries(component.props).slice(0, 3).map(([key, value]) => (
            <Typography key={key} variant="pi" textColor="neutral600">
              {key}: {String(value).substring(0, 50)}
              {String(value).length > 50 ? '...' : ''}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  };

  // 渲染属性编辑器
  const renderPropertyEditor = () => {
    if (!selectedComponent) return null;

    const component = components.find(comp => comp.id === selectedComponent);
    if (!component) return null;

    return (
      <Card>
        <CardHeader>
          <Typography variant="beta">编辑组件属性</Typography>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            {Object.entries(component.props).map(([key, value]) => (
              <Box key={key}>
                <Typography variant="pi" fontWeight="bold" textColor="neutral800">
                  {key}
                </Typography>
                <Box marginTop={1}>
                  {typeof value === 'boolean' ? (
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateComponent(component.id, { [key]: e.target.checked })}
                    />
                  ) : typeof value === 'number' ? (
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => updateComponent(component.id, { [key]: parseInt(e.target.value) })}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  ) : (
                    <textarea
                      value={String(value)}
                      onChange={(e) => updateComponent(component.id, { [key]: e.target.value })}
                      rows={3}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    );
  };

  return (
    <Box>
      {/* 工具栏 */}
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Typography variant="alpha">页面构建器</Typography>
        <Flex gap={2}>
          <Button
            variant={isPreviewMode ? 'default' : 'secondary'}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            startIcon={<Eye />}
          >
            {isPreviewMode ? '编辑模式' : '预览模式'}
          </Button>
          <Button onClick={() => onSave?.(components)} variant="success">
            保存页面
          </Button>
        </Flex>
      </Flex>

      <Grid gap={4}>
        {/* 组件库 */}
        {!isPreviewMode && (
          <GridItem col={3}>
            <Card>
              <CardHeader>
                <Typography variant="beta">组件库</Typography>
              </CardHeader>
              <CardBody>
                <Stack spacing={2}>
                  {Object.entries(COMPONENT_TYPES).map(([type, config]) => (
                    <Button
                      key={type}
                      variant="tertiary"
                      onClick={() => addComponent(type)}
                      startIcon={<Plus />}
                      fullWidth
                    >
                      {config.icon} {config.name}
                    </Button>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        )}

        {/* 页面画布 */}
        <GridItem col={isPreviewMode ? 12 : 6}>
          <Card>
            <CardHeader>
              <Typography variant="beta">页面画布</Typography>
            </CardHeader>
            <CardBody>
              {components.length === 0 ? (
                <Box
                  padding={8}
                  background="neutral100"
                  borderRadius="4px"
                  textAlign="center"
                >
                  <Typography variant="beta" textColor="neutral600">
                    从左侧组件库拖拽组件到这里开始构建页面
                  </Typography>
                </Box>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="page-canvas">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Stack spacing={3}>
                          {components.map((component, index) => (
                            <Draggable
                              key={component.id}
                              draggableId={component.id}
                              index={index}
                              isDragDisabled={isPreviewMode}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    opacity: snapshot.isDragging ? 0.8 : 1,
                                  }}
                                >
                                  <Flex alignItems="flex-start" gap={2}>
                                    {!isPreviewMode && (
                                      <div {...provided.dragHandleProps}>
                                        <IconButton label="拖拽" variant="ghost">
                                          <Drag />
                                        </IconButton>
                                      </div>
                                    )}
                                    <Box flex="1">
                                      {renderComponentPreview(component)}
                                    </Box>
                                  </Flex>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Stack>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* 属性编辑器 */}
        {!isPreviewMode && (
          <GridItem col={3}>
            {selectedComponent ? (
              renderPropertyEditor()
            ) : (
              <Card>
                <CardHeader>
                  <Typography variant="beta">属性编辑器</Typography>
                </CardHeader>
                <CardBody>
                  <Typography variant="pi" textColor="neutral600">
                    选择一个组件来编辑其属性
                  </Typography>
                </CardBody>
              </Card>
            )}
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default PageBuilder;