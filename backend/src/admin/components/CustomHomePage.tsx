import React from 'react';
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Box,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardContent,
  Typography,
  Button,
  Icon,
  Flex,
} from '@strapi/design-system';
import { 
  Plus,
  Eye,
  Pencil,
  Trash,
  Upload,
  Download,
  BarChart,
  Users,
  ShoppingCart,
  FileText,
  MessageCircle,
  Settings,
} from '@strapi/icons';

const CustomHomePage = () => {
  // 模拟数据 - 实际应用中应该从API获取
  const stats = {
    products: { count: 45, trend: '+5' },
    cases: { count: 28, trend: '+3' },
    news: { count: 156, trend: '+12' },
    inquiries: { count: 89, trend: '+8' },
  };

  const recentActivities = [
    { type: 'product', action: '创建', title: 'P10户外全彩显示屏', time: '2小时前' },
    { type: 'inquiry', action: '收到', title: '来自深圳客户的询盘', time: '3小时前' },
    { type: 'news', action: '发布', title: '公司参展InfoComm展会', time: '1天前' },
    { type: 'case', action: '更新', title: '北京地铁项目案例', time: '2天前' },
  ];

  const quickActions = [
    { title: '创建产品', icon: Plus, color: 'primary', path: '/content-manager/collectionType/api::product.product/create' },
    { title: '添加案例', icon: FileText, color: 'secondary', path: '/content-manager/collectionType/api::case-study.case-study/create' },
    { title: '发布新闻', icon: Pencil, color: 'success', path: '/content-manager/collectionType/api::news.news/create' },
    { title: '媒体库', icon: Upload, color: 'warning', path: '/upload' },
    { title: '查看询盘', icon: MessageCircle, color: 'danger', path: '/content-manager/collectionType/api::inquiry.inquiry' },
    { title: '系统设置', icon: Settings, color: 'neutral', path: '/settings' },
  ];

  return (
    <Layout>
      <Main>
        <HeaderLayout
          title=\"欢迎使用联锦光电内容管理系统\"
          subtitle=\"管理您的网站内容，产品信息和客户询盘\"
          as=\"h1\"
        />
        
        <ContentLayout>
          {/* 统计卡片 */}
          <Box paddingBottom={6}>
            <Grid gap={4}>
              <GridItem col={3}>
                <Card>
                  <CardBody>
                    <Flex direction=\"column\" alignItems=\"flex-start\" gap={2}>
                      <Flex justifyContent=\"space-between\" width=\"100%\">
                        <Typography variant=\"sigma\" textColor=\"neutral600\">
                          产品总数
                        </Typography>
                        <Icon as={ShoppingCart} color=\"primary600\" />
                      </Flex>
                      <Typography variant=\"alpha\" fontWeight=\"bold\">
                        {stats.products.count}
                      </Typography>
                      <Typography variant=\"pi\" textColor=\"success600\">
                        {stats.products.trend} 本月新增
                      </Typography>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
              
              <GridItem col={3}>
                <Card>
                  <CardBody>
                    <Flex direction=\"column\" alignItems=\"flex-start\" gap={2}>
                      <Flex justifyContent=\"space-between\" width=\"100%\">
                        <Typography variant=\"sigma\" textColor=\"neutral600\">
                          案例研究
                        </Typography>
                        <Icon as={FileText} color=\"secondary600\" />
                      </Flex>
                      <Typography variant=\"alpha\" fontWeight=\"bold\">
                        {stats.cases.count}
                      </Typography>
                      <Typography variant=\"pi\" textColor=\"success600\">
                        {stats.cases.trend} 本月新增
                      </Typography>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
              
              <GridItem col={3}>
                <Card>
                  <CardBody>
                    <Flex direction=\"column\" alignItems=\"flex-start\" gap={2}>
                      <Flex justifyContent=\"space-between\" width=\"100%\">
                        <Typography variant=\"sigma\" textColor=\"neutral600\">
                          新闻资讯
                        </Typography>
                        <Icon as={FileText} color=\"success600\" />
                      </Flex>
                      <Typography variant=\"alpha\" fontWeight=\"bold\">
                        {stats.news.count}
                      </Typography>
                      <Typography variant=\"pi\" textColor=\"success600\">
                        {stats.news.trend} 本月新增
                      </Typography>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
              
              <GridItem col={3}>
                <Card>
                  <CardBody>
                    <Flex direction=\"column\" alignItems=\"flex-start\" gap={2}>
                      <Flex justifyContent=\"space-between\" width=\"100%\">
                        <Typography variant=\"sigma\" textColor=\"neutral600\">
                          客户询盘
                        </Typography>
                        <Icon as={MessageCircle} color=\"danger600\" />
                      </Flex>
                      <Typography variant=\"alpha\" fontWeight=\"bold\">
                        {stats.inquiries.count}
                      </Typography>
                      <Typography variant=\"pi\" textColor=\"success600\">
                        {stats.inquiries.trend} 本月新增
                      </Typography>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </Box>

          <Grid gap={6}>
            {/* 快捷操作 */}
            <GridItem col={8}>
              <Card>
                <CardHeader>
                  <Typography variant=\"beta\" fontWeight=\"bold\">
                    快捷操作
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Grid gap={4}>
                    {quickActions.map((action, index) => (
                      <GridItem key={index} col={4}>
                        <Card 
                          style={{ 
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <CardBody>
                            <Flex direction=\"column\" alignItems=\"center\" gap={3}>
                              <Icon 
                                as={action.icon} 
                                color={`${action.color}600`}
                                width=\"24px\"
                                height=\"24px\"
                              />
                              <Typography variant=\"delta\" fontWeight=\"semiBold\">
                                {action.title}
                              </Typography>
                            </Flex>
                          </CardBody>
                        </Card>
                      </GridItem>
                    ))}
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>

            {/* 最近活动 */}
            <GridItem col={4}>
              <Card>
                <CardHeader>
                  <Typography variant=\"beta\" fontWeight=\"bold\">
                    最近活动
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Flex direction=\"column\" gap={3}>
                    {recentActivities.map((activity, index) => (
                      <Box 
                        key={index}
                        padding={3}
                        background=\"neutral100\"
                        borderRadius=\"4px\"
                      >
                        <Flex justifyContent=\"space-between\" alignItems=\"flex-start\">
                          <Box>
                            <Typography variant=\"omega\" fontWeight=\"semiBold\">
                              {activity.action} {activity.title}
                            </Typography>
                            <Typography variant=\"pi\" textColor=\"neutral600\">
                              {activity.time}
                            </Typography>
                          </Box>
                          <Box
                            padding={1}
                            background={
                              activity.type === 'product' ? 'primary100' :
                              activity.type === 'inquiry' ? 'danger100' :
                              activity.type === 'news' ? 'success100' :
                              'secondary100'
                            }
                            borderRadius=\"50%\"
                          >
                            <Icon
                              as={
                                activity.type === 'product' ? ShoppingCart :
                                activity.type === 'inquiry' ? MessageCircle :
                                activity.type === 'news' ? FileText :
                                Eye
                              }
                              color={
                                activity.type === 'product' ? 'primary600' :
                                activity.type === 'inquiry' ? 'danger600' :
                                activity.type === 'news' ? 'success600' :
                                'secondary600'
                              }
                              width=\"12px\"
                              height=\"12px\"
                            />
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </ContentLayout>
      </Main>
    </Layout>
  );
};

export default CustomHomePage;