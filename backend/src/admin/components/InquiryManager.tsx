import React, { useState, useEffect } from 'react';
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  Button,
  Badge,
  Flex,
  Select,
  Option,
  TextInput,
  Modal,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Grid,
  GridItem,
  Card,
  CardBody,
} from '@strapi/design-system';
import { 
  Search,
  Eye,
  Download,
  Mail,
  Phone,
  User,
  Building,
  Edit,
} from '@strapi/icons';
import { request } from '@strapi/helper-plugin';

interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'processing' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  productInterest?: string;
  projectBudget?: string;
  projectTimeline?: string;
}

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // 获取询盘数据
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setIsLoading(true);
        const response = await request('/inquiries', {
          method: 'GET',
        });
        setInquiries(response.data || []);
        setFilteredInquiries(response.data || []);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        // 使用模拟数据作为后备
        const mockInquiries: Inquiry[] = [
          {
            id: 1,
            name: '张先生',
            company: '深圳科技有限公司',
            email: 'zhang@example.com',
            phone: '13800138000',
            subject: 'P10户外显示屏询价',
            message: '我们需要一块10平方米的户外LED显示屏，请提供详细报价。',
            status: 'new',
            priority: 'high',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
            productInterest: '户外显示屏',
            projectBudget: '10-20万',
            projectTimeline: '1个月内',
          },
          {
            id: 2,
            name: '李女士',
            company: '北京广告传媒',
            email: 'li@example.com',
            phone: '13900139000',
            subject: '室内小间距显示屏咨询',
            message: '需要了解P2.5室内显示屏的技术参数和价格。',
            status: 'processing',
            priority: 'medium',
            assignedTo: '销售部-王经理',
            createdAt: '2024-01-14T14:20:00Z',
            updatedAt: '2024-01-15T09:15:00Z',
            productInterest: '小间距显示屏',
            projectBudget: '5-10万',
            projectTimeline: '2个月内',
          },
        ];
        setInquiries(mockInquiries);
        setFilteredInquiries(mockInquiries);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // 过滤和搜索逻辑
  useEffect(() => {
    let filtered = inquiries;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(inquiry =>
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 状态过滤
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.status === statusFilter);
    }

    // 优先级过滤
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(inquiry => inquiry.priority === priorityFilter);
    }

    setFilteredInquiries(filtered);
  }, [inquiries, searchTerm, statusFilter, priorityFilter]);

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

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (inquiryId: number, newStatus: string) => {
    try {
      await request(`/inquiries/${inquiryId}/status`, {
        method: 'PUT',
        body: { status: newStatus },
      });

      setInquiries(prev =>
        prev.map(inquiry =>
          inquiry.id === inquiryId
            ? { ...inquiry, status: newStatus as any, updatedAt: new Date().toISOString() }
            : inquiry
        )
      );
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await request('/inquiries/export?format=excel', {
        method: 'GET',
        responseType: 'blob',
      });

      // 创建下载链接
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inquiries_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting inquiries:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  if (isLoading) {
    return (
      <Layout>
        <Main>
          <HeaderLayout title="询盘管理" subtitle="管理和跟进客户询盘" />
          <ContentLayout>
            <Box padding={8}>
              <Typography>加载中...</Typography>
            </Box>
          </ContentLayout>
        </Main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Main>
        <HeaderLayout
          title="询盘管理"
          subtitle="管理和跟进客户询盘"
          primaryAction={
            <Button startIcon={<Download />} variant="secondary" onClick={handleExport}>
              导出数据
            </Button>
          }
        />
        
        <ContentLayout>
          {/* 过滤和搜索栏 */}
          <Box paddingBottom={4}>
            <Grid gap={4}>
              <GridItem col={6}>
                <TextInput
                  placeholder="搜索询盘..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startAction={<Search />}
                />
              </GridItem>
              <GridItem col={3}>
                <Select
                  placeholder="状态筛选"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <Option value="all">全部状态</Option>
                  <Option value="new">新询盘</Option>
                  <Option value="processing">处理中</Option>
                  <Option value="replied">已回复</Option>
                  <Option value="closed">已关闭</Option>
                </Select>
              </GridItem>
              <GridItem col={3}>
                <Select
                  placeholder="优先级筛选"
                  value={priorityFilter}
                  onChange={setPriorityFilter}
                >
                  <Option value="all">全部优先级</Option>
                  <Option value="urgent">紧急</Option>
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
              </GridItem>
            </Grid>
          </Box>

          {/* 询盘列表 */}
          <Card>
            <Table colCount={8} rowCount={filteredInquiries.length + 1}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">客户信息</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">主题</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">状态</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">优先级</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">负责人</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">创建时间</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">更新时间</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">操作</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredInquiries.map((inquiry) => (
                  <Tr key={inquiry.id}>
                    <Td>
                      <Box>
                        <Typography fontWeight="semiBold">{inquiry.name}</Typography>
                        <Typography variant="pi" textColor="neutral600">
                          {inquiry.company}
                        </Typography>
                      </Box>
                    </Td>
                    <Td>
                      <Typography>{inquiry.subject}</Typography>
                    </Td>
                    <Td>
                      <Select
                        value={inquiry.status}
                        onChange={(value) => handleStatusChange(inquiry.id, value)}
                        size="S"
                      >
                        <Option value="new">新询盘</Option>
                        <Option value="processing">处理中</Option>
                        <Option value="replied">已回复</Option>
                        <Option value="closed">已关闭</Option>
                      </Select>
                    </Td>
                    <Td>
                      {getPriorityBadge(inquiry.priority)}
                    </Td>
                    <Td>
                      <Typography variant="omega">
                        {inquiry.assignedTo || '未分配'}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography variant="omega">
                        {formatDate(inquiry.createdAt)}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography variant="omega">
                        {formatDate(inquiry.updatedAt)}
                      </Typography>
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <Button
                          variant="tertiary"
                          startIcon={<Eye />}
                          onClick={() => handleViewInquiry(inquiry)}
                          size="S"
                        >
                          查看
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
        </ContentLayout>

        {/* 询盘详情模态框 */}
        {isModalOpen && selectedInquiry && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <ModalLayout onClose={() => setIsModalOpen(false)} labelledBy="title">
              <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                  询盘详情 - {selectedInquiry.subject}
                </Typography>
              </ModalHeader>
              <ModalBody>
                <Grid gap={4}>
                  <GridItem col={6}>
                    <Card>
                      <CardBody>
                        <Typography variant="delta" fontWeight="bold" paddingBottom={3}>
                          客户信息
                        </Typography>
                        <Flex direction="column" gap={2}>
                          <Flex alignItems="center" gap={2}>
                            <User />
                            <Typography>{selectedInquiry.name}</Typography>
                          </Flex>
                          <Flex alignItems="center" gap={2}>
                            <Building />
                            <Typography>{selectedInquiry.company}</Typography>
                          </Flex>
                          <Flex alignItems="center" gap={2}>
                            <Mail />
                            <Typography>{selectedInquiry.email}</Typography>
                          </Flex>
                          <Flex alignItems="center" gap={2}>
                            <Phone />
                            <Typography>{selectedInquiry.phone}</Typography>
                          </Flex>
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                  
                  <GridItem col={6}>
                    <Card>
                      <CardBody>
                        <Typography variant="delta" fontWeight="bold" paddingBottom={3}>
                          询盘状态
                        </Typography>
                        <Flex direction="column" gap={2}>
                          <Flex justifyContent="space-between">
                            <Typography>状态:</Typography>
                            {getStatusBadge(selectedInquiry.status)}
                          </Flex>
                          <Flex justifyContent="space-between">
                            <Typography>优先级:</Typography>
                            {getPriorityBadge(selectedInquiry.priority)}
                          </Flex>
                          <Flex justifyContent="space-between">
                            <Typography>负责人:</Typography>
                            <Typography>{selectedInquiry.assignedTo || '未分配'}</Typography>
                          </Flex>
                          <Flex justifyContent="space-between">
                            <Typography>创建时间:</Typography>
                            <Typography>{formatDate(selectedInquiry.createdAt)}</Typography>
                          </Flex>
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                  
                  <GridItem col={12}>
                    <Card>
                      <CardBody>
                        <Typography variant="delta" fontWeight="bold" paddingBottom={3}>
                          项目信息
                        </Typography>
                        <Grid gap={3}>
                          <GridItem col={4}>
                            <Typography variant="omega" fontWeight="semiBold">感兴趣的产品:</Typography>
                            <Typography>{selectedInquiry.productInterest || '未指定'}</Typography>
                          </GridItem>
                          <GridItem col={4}>
                            <Typography variant="omega" fontWeight="semiBold">项目预算:</Typography>
                            <Typography>{selectedInquiry.projectBudget || '未指定'}</Typography>
                          </GridItem>
                          <GridItem col={4}>
                            <Typography variant="omega" fontWeight="semiBold">项目时间:</Typography>
                            <Typography>{selectedInquiry.projectTimeline || '未指定'}</Typography>
                          </GridItem>
                        </Grid>
                      </CardBody>
                    </Card>
                  </GridItem>
                  
                  <GridItem col={12}>
                    <Card>
                      <CardBody>
                        <Typography variant="delta" fontWeight="bold" paddingBottom={3}>
                          询盘内容
                        </Typography>
                        <Box
                          padding={3}
                          background="neutral100"
                          borderRadius="4px"
                        >
                          <Typography>{selectedInquiry.message}</Typography>
                        </Box>
                      </CardBody>
                    </Card>
                  </GridItem>
                </Grid>
              </ModalBody>
              <ModalFooter
                startActions={
                  <Button onClick={() => setIsModalOpen(false)} variant="tertiary">
                    关闭
                  </Button>
                }
                endActions={
                  <Flex gap={2}>
                    <Button startIcon={<Mail />} variant="secondary">
                      发送邮件
                    </Button>
                    <Button startIcon={<Edit />} variant="default">
                      编辑询盘
                    </Button>
                  </Flex>
                }
              />
            </ModalLayout>
          </Modal>
        )}
      </Main>
    </Layout>
  );
};

export default InquiryManager;