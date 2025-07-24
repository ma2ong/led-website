import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  GridItem,
  Card,
  CardBody,
  Flex,
  Badge,
  Button,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from '@strapi/design-system';
import {
  ChartPie,
  Refresh,
  Download,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
} from '@strapi/icons';

interface InquiryStats {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byProductInterest: Record<string, number>;
  bySource: Record<string, number>;
  thisMonth: number;
  thisWeek: number;
  conversionRate: number;
}

interface RecentInquiry {
  id: number;
  name: string;
  company: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
}

const InquiryDashboard = () => {
  const [stats, setStats] = useState<InquiryStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // 获取统计数据
  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // 这里应该调用实际的API
      // const response = await request('/inquiries/stats', { method: 'GET' });
      
      // 模拟数据
      const mockStats: InquiryStats = {
        total: 156,
        byStatus: {
          new: 23,
          processing: 45,
          replied: 67,
          closed: 21
        },
        byPriority: {
          urgent: 8,
          high: 34,
          medium: 89,
          low: 25
        },
        byProductInterest: {
          '户外显示屏': 45,
          '室内显示屏': 38,
          '租赁屏': 28,
          '小间距': 25,
          '透明屏': 12,
          '创意屏': 8
        },
        bySource: {
          website: 98,
          exhibition: 32,
          referral: 18,
          email: 8
        },
        thisMonth: 45,
        thisWeek: 12,
        conversionRate: 18
      };

      const mockRecentInquiries: RecentInquiry[] = [
        {
          id: 1,
          name: '张先生',
          company: '深圳科技有限公司',
          subject: 'P10户外显示屏询价',
          status: 'new',
          priority: 'high',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          name: '李女士',
          company: '北京广告传媒',
          subject: '室内小间距显示屏咨询',
          status: 'processing',
          priority: 'medium',
          createdAt: '2024-01-14T14:20:00Z'
        },
        {
          id: 3,
          name: '陈总',
          company: '上海展览公司',
          subject: '租赁屏长期合作',
          status: 'replied',
          priority: 'high',
          createdAt: '2024-01-13T16:45:00Z'
        },
        {
          id: 4,
          name: 'John Smith',
          company: 'ABC Corp',
          subject: 'LED Display for Stadium',
          status: 'processing',
          priority: 'urgent',
          createdAt: '2024-01-12T09:15:00Z'
        },
        {
          id: 5,
          name: '王经理',
          company: '广州会展中心',
          subject: '会展中心LED屏幕方案',
          status: 'new',
          priority: 'medium',
          createdAt: '2024-01-11T11:30:00Z'
        }
      ];

      setStats(mockStats);
      setRecentInquiries(mockRecentInquiries);
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Error fetching inquiry stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { variant: 'danger' as const, label: '新询盘' },
      processing: { variant: 'warning' as const, label: '处理中' },
      replied: { variant: 'success' as const, label: '已回复' },
      closed: { variant: 'secondary' as const, label: '已关闭' },
    };
    
    const config = statusConfig[status] || statusConfig.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { variant: 'secondary' as const, label: '低' },
      medium: { variant: 'warning' as const, label: '中' },
      high: { variant: 'danger' as const, label: '高' },
      urgent: { variant: 'danger' as const, label: '紧急' },
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  if (isLoading) {
    return (
      <Box padding={8}>
        <Typography>加载中...</Typography>
      </Box>
    );
  }

  return (
    <Box padding={6}>
      {/* 页面标题和操作 */}
      <Flex justifyContent=\"space-between\" alignItems=\"center\" paddingBottom={6}>
        <Box>
          <Typography variant=\"alpha\" fontWeight=\"bold\">
            询盘统计仪表板
          </Typography>
          <Typography variant=\"omega\" textColor=\"neutral600\">
            最后更新: {lastUpdated.toLocaleString('zh-CN')}
          </Typography>
        </Box>
        <Flex gap={2}>
          <Button
            variant=\"tertiary\"
            startIcon={<Refresh />}
            onClick={fetchStats}
          >
            刷新数据
          </Button>
          <Button
            variant=\"secondary\"
            startIcon={<Download />}
          >
            导出报告
          </Button>
        </Flex>
      </Flex>

      {/* 关键指标卡片 */}
      <Grid gap={4} paddingBottom={6}>
        <GridItem col={3}>
          <Card>
            <CardBody>
              <Flex alignItems=\"center\" gap={3}>
                <Box
                  background=\"primary100\"
                  borderRadius=\"50%\"
                  width=\"48px\"
                  height=\"48px\"
                  display=\"flex\"
                  alignItems=\"center\"
                  justifyContent=\"center\"
                >
                  <MessageSquare color=\"primary600\" />
                </Box>
                <Box>
                  <Typography variant=\"omega\" textColor=\"neutral600\">
                    总询盘数
                  </Typography>
                  <Typography variant=\"alpha\" fontWeight=\"bold\">
                    {stats?.total || 0}
                  </Typography>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem col={3}>
          <Card>
            <CardBody>
              <Flex alignItems=\"center\" gap={3}>
                <Box
                  background=\"success100\"
                  borderRadius=\"50%\"
                  width=\"48px\"
                  height=\"48px\"
                  display=\"flex\"
                  alignItems=\"center\"
                  justifyContent=\"center\"
                >
                  <TrendingUp color=\"success600\" />
                </Box>
                <Box>
                  <Typography variant=\"omega\" textColor=\"neutral600\">
                    本月新增
                  </Typography>
                  <Typography variant=\"alpha\" fontWeight=\"bold\">
                    {stats?.thisMonth || 0}
                  </Typography>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem col={3}>
          <Card>
            <CardBody>
              <Flex alignItems=\"center\" gap={3}>
                <Box
                  background=\"warning100\"
                  borderRadius=\"50%\"
                  width=\"48px\"
                  height=\"48px\"
                  display=\"flex\"
                  alignItems=\"center\"
                  justifyContent=\"center\"
                >
                  <Clock color=\"warning600\" />
                </Box>
                <Box>
                  <Typography variant=\"omega\" textColor=\"neutral600\">
                    本周新增
                  </Typography>
                  <Typography variant=\"alpha\" fontWeight=\"bold\">
                    {stats?.thisWeek || 0}
                  </Typography>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem col={3}>
          <Card>
            <CardBody>
              <Flex alignItems=\"center\" gap={3}>
                <Box
                  background=\"alternative100\"
                  borderRadius=\"50%\"
                  width=\"48px\"
                  height=\"48px\"
                  display=\"flex\"
                  alignItems=\"center\"
                  justifyContent=\"center\"
                >
                  <CheckCircle color=\"alternative600\" />
                </Box>
                <Box>
                  <Typography variant=\"omega\" textColor=\"neutral600\">
                    转化率
                  </Typography>
                  <Typography variant=\"alpha\" fontWeight=\"bold\">
                    {stats?.conversionRate || 0}%
                  </Typography>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Grid gap={4}>
        {/* 状态分布 */}
        <GridItem col={6}>
          <Card>
            <CardBody>
              <Typography variant=\"delta\" fontWeight=\"bold\" paddingBottom={3}>
                询盘状态分布
              </Typography>
              <Box>
                {stats?.byStatus && Object.entries(stats.byStatus).map(([status, count]) => {
                  const percentage = Math.round((count / stats.total) * 100);
                  const statusLabels = {
                    new: '新询盘',
                    processing: '处理中',
                    replied: '已回复',
                    closed: '已关闭'
                  };
                  
                  return (
                    <Box key={status} paddingBottom={2}>
                      <Flex justifyContent=\"space-between\" paddingBottom={1}>
                        <Typography variant=\"omega\">
                          {statusLabels[status] || status}
                        </Typography>
                        <Typography variant=\"omega\" fontWeight=\"bold\">
                          {count} ({percentage}%)
                        </Typography>
                      </Flex>
                      <Box
                        background=\"neutral150\"
                        height=\"8px\"
                        borderRadius=\"4px\"
                      >
                        <Box
                          background=\"primary600\"
                          height=\"100%\"
                          width={`${percentage}%`}
                          borderRadius=\"4px\"
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardBody>
          </Card>
        </GridItem>

        {/* 优先级分布 */}
        <GridItem col={6}>
          <Card>
            <CardBody>
              <Typography variant=\"delta\" fontWeight=\"bold\" paddingBottom={3}>
                优先级分布
              </Typography>
              <Box>
                {stats?.byPriority && Object.entries(stats.byPriority).map(([priority, count]) => {
                  const percentage = Math.round((count / stats.total) * 100);
                  const priorityLabels = {
                    urgent: '紧急',
                    high: '高',
                    medium: '中',
                    low: '低'
                  };
                  const priorityColors = {
                    urgent: 'danger600',
                    high: 'warning600',
                    medium: 'primary600',
                    low: 'neutral400'
                  };
                  
                  return (
                    <Box key={priority} paddingBottom={2}>
                      <Flex justifyContent=\"space-between\" paddingBottom={1}>
                        <Typography variant=\"omega\">
                          {priorityLabels[priority] || priority}
                        </Typography>
                        <Typography variant=\"omega\" fontWeight=\"bold\">
                          {count} ({percentage}%)
                        </Typography>
                      </Flex>
                      <Box
                        background=\"neutral150\"
                        height=\"8px\"
                        borderRadius=\"4px\"
                      >
                        <Box
                          background={priorityColors[priority] || 'primary600'}
                          height=\"100%\"
                          width={`${percentage}%`}
                          borderRadius=\"4px\"
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardBody>
          </Card>
        </GridItem>

        {/* 产品兴趣分布 */}
        <GridItem col={6}>
          <Card>
            <CardBody>
              <Typography variant=\"delta\" fontWeight=\"bold\" paddingBottom={3}>
                产品兴趣分布
              </Typography>
              <Box>
                {stats?.byProductInterest && Object.entries(stats.byProductInterest)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([product, count]) => {
                    const percentage = Math.round((count / stats.total) * 100);
                    
                    return (
                      <Box key={product} paddingBottom={2}>
                        <Flex justifyContent=\"space-between\" paddingBottom={1}>
                          <Typography variant=\"omega\">
                            {product}
                          </Typography>
                          <Typography variant=\"omega\" fontWeight=\"bold\">
                            {count} ({percentage}%)
                          </Typography>
                        </Flex>
                        <Box
                          background=\"neutral150\"
                          height=\"8px\"
                          borderRadius=\"4px\"
                        >
                          <Box
                            background=\"success600\"
                            height=\"100%\"
                            width={`${percentage}%`}
                            borderRadius=\"4px\"
                          />
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </CardBody>
          </Card>
        </GridItem>

        {/* 来源分布 */}
        <GridItem col={6}>
          <Card>
            <CardBody>
              <Typography variant=\"delta\" fontWeight=\"bold\" paddingBottom={3}>
                询盘来源分布
              </Typography>
              <Box>
                {stats?.bySource && Object.entries(stats.bySource).map(([source, count]) => {
                  const percentage = Math.round((count / stats.total) * 100);
                  const sourceLabels = {
                    website: '官网',
                    exhibition: '展会',
                    referral: '推荐',
                    email: '邮件'
                  };
                  
                  return (
                    <Box key={source} paddingBottom={2}>
                      <Flex justifyContent=\"space-between\" paddingBottom={1}>
                        <Typography variant=\"omega\">
                          {sourceLabels[source] || source}
                        </Typography>
                        <Typography variant=\"omega\" fontWeight=\"bold\">
                          {count} ({percentage}%)
                        </Typography>
                      </Flex>
                      <Box
                        background=\"neutral150\"
                        height=\"8px\"
                        borderRadius=\"4px\"
                      >
                        <Box
                          background=\"alternative600\"
                          height=\"100%\"
                          width={`${percentage}%`}
                          borderRadius=\"4px\"
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* 最近询盘 */}
      <Box paddingTop={6}>
        <Card>
          <CardBody>
            <Typography variant=\"delta\" fontWeight=\"bold\" paddingBottom={4}>
              最近询盘
            </Typography>
            <Table colCount={6} rowCount={recentInquiries.length + 1}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant=\"sigma\">客户</Typography>
                  </Th>
                  <Th>
                    <Typography variant=\"sigma\">主题</Typography>
                  </Th>
                  <Th>
                    <Typography variant=\"sigma\">状态</Typography>
                  </Th>
                  <Th>
                    <Typography variant=\"sigma\">优先级</Typography>
                  </Th>
                  <Th>
                    <Typography variant=\"sigma\">时间</Typography>
                  </Th>
                  <Th>
                    <Typography variant=\"sigma\">操作</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentInquiries.map((inquiry) => (
                  <Tr key={inquiry.id}>
                    <Td>
                      <Box>
                        <Typography fontWeight=\"semiBold\">{inquiry.name}</Typography>
                        <Typography variant=\"pi\" textColor=\"neutral600\">
                          {inquiry.company}
                        </Typography>
                      </Box>
                    </Td>
                    <Td>
                      <Typography>{inquiry.subject}</Typography>
                    </Td>
                    <Td>
                      {getStatusBadge(inquiry.status)}
                    </Td>
                    <Td>
                      {getPriorityBadge(inquiry.priority)}
                    </Td>
                    <Td>
                      <Typography variant=\"omega\">
                        {formatDate(inquiry.createdAt)}
                      </Typography>
                    </Td>
                    <Td>
                      <Button variant=\"tertiary\" size=\"S\">
                        查看
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};

export default InquiryDashboard;