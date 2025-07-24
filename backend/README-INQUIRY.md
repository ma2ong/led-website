# 询盘管理系统

联锦光电询盘管理系统是一个完整的客户询盘处理和跟进解决方案，集成在Strapi CMS中。

## 功能特性

### 📋 询盘管理
- **询盘接收**: 自动接收来自网站表单的询盘
- **数据验证**: 自动验证询盘数据的完整性和有效性
- **垃圾检测**: 智能检测和过滤垃圾询盘
- **状态跟踪**: 完整的询盘状态生命周期管理
- **优先级管理**: 根据询盘重要性设置优先级
- **自动分配**: 智能分配询盘给相应的销售人员

### 📊 统计分析
- **实时统计**: 询盘数量、状态、优先级等实时统计
- **趋势分析**: 询盘趋势和转化率分析
- **产品兴趣**: 客户产品兴趣分布统计
- **来源分析**: 询盘来源渠道分析
- **响应时间**: 平均响应时间统计

### 🔔 通知系统
- **即时通知**: 新询盘即时邮件通知
- **状态更新**: 询盘状态变更通知
- **客户通知**: 自动向客户发送状态更新
- **跟进提醒**: 定时跟进提醒通知
- **多渠道通知**: 支持邮件、钉钉、微信等通知方式

### 📈 报告系统
- **日报**: 每日询盘统计报告
- **周报**: 每周询盘分析报告
- **月报**: 月度询盘总结报告
- **自定义报告**: 按时间范围生成自定义报告

### 📤 数据导出
- **Excel导出**: 支持Excel格式数据导出
- **CSV导出**: 支持CSV格式数据导出
- **筛选导出**: 支持按条件筛选导出
- **批量操作**: 支持批量更新询盘状态

### 🔄 自动化任务
- **定时检查**: 自动检查需要跟进的询盘
- **自动报告**: 定时发送统计报告
- **数据清理**: 自动清理过期的垃圾询盘
- **数据备份**: 定时备份询盘数据

## 系统架构

### 后端服务
```
backend/src/api/inquiry/
├── controllers/
│   └── inquiry.ts              # 询盘控制器
├── services/
│   ├── inquiry.ts              # 询盘核心服务
│   ├── inquiry-export.ts       # 数据导出服务
│   ├── inquiry-notification.ts # 通知服务
│   └── inquiry-scheduler.ts    # 调度服务
├── routes/
│   └── custom-inquiry.ts       # 自定义路由
├── content-types/
│   └── inquiry/
│       └── schema.json         # 询盘数据模型
└── bootstrap.ts                # 初始化脚本
```

### 管理界面
```
backend/src/admin/components/
├── InquiryManager.tsx          # 询盘管理界面
├── InquiryDashboard.tsx        # 询盘统计仪表板
└── CustomHomePage.tsx          # 自定义首页
```

## API 端点

### 基础询盘操作
- `POST /api/inquiries` - 创建新询盘
- `GET /api/inquiries` - 获取询盘列表
- `GET /api/inquiries/:id` - 获取单个询盘详情
- `PUT /api/inquiries/:id` - 更新询盘信息
- `DELETE /api/inquiries/:id` - 删除询盘

### 高级功能
- `GET /api/inquiries/stats` - 获取询盘统计
- `GET /api/inquiries/status/:status` - 按状态获取询盘
- `GET /api/inquiries/priority/:priority` - 按优先级获取询盘
- `GET /api/inquiries/follow-ups` - 获取需要跟进的询盘
- `PUT /api/inquiries/:id/status` - 更新询盘状态
- `GET /api/inquiries/export` - 导出询盘数据
- `GET /api/inquiries/report` - 生成询盘报告
- `PUT /api/inquiries/bulk-update` - 批量更新询盘
- `POST /api/inquiries/:id/reply` - 添加询盘回复
- `PUT /api/inquiries/:id/reminder` - 设置跟进提醒

## 配置说明

### 环境变量配置

```bash
# 询盘通知设置
INQUIRY_EMAIL_RECIPIENTS=info@lianjin-led.com,sales@lianjin-led.com
AUTO_ASSIGN_INQUIRIES=true
INQUIRY_NOTIFICATIONS_ENABLED=true
STATUS_UPDATE_NOTIFICATIONS=true
CUSTOMER_NOTIFICATIONS=true
FOLLOW_UP_REMINDERS=true

# 报告设置
DAILY_REPORTS_ENABLED=true
SPAM_DETECTION_ENABLED=true

# 外部集成
DINGTALK_WEBHOOK=https://oapi.dingtalk.com/robot/send?access_token=your-token
WECHAT_WEBHOOK=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=your-key

# 邮件配置
EMAIL_FROM=noreply@lianjin-led.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=your-email@example.com
SMTP_PASSWORD=your-password
```

### 调度任务配置

系统自动运行以下定时任务：

- **每小时**: 检查需要跟进的询盘
- **每天上午9点**: 发送日报
- **每周一上午9点**: 发送周报
- **每月1号上午9点**: 发送月报
- **每天凌晨2点**: 清理垃圾询盘
- **每天凌晨3点**: 备份询盘数据

## 使用指南

### 1. 询盘接收
当客户通过网站提交询盘时，系统会：
1. 验证数据完整性
2. 检测垃圾询盘
3. 自动分配给销售人员
4. 发送通知邮件
5. 记录询盘信息

### 2. 询盘处理
销售人员可以：
1. 查看询盘详情
2. 更新询盘状态
3. 添加处理备注
4. 设置跟进提醒
5. 回复客户询盘

### 3. 数据分析
管理人员可以：
1. 查看实时统计
2. 分析询盘趋势
3. 监控转化率
4. 导出数据报告
5. 优化处理流程

### 4. 系统管理
系统管理员可以：
1. 配置通知设置
2. 管理用户权限
3. 设置自动化规则
4. 监控系统性能
5. 备份恢复数据

## 数据模型

### 询盘模型 (Inquiry)
```json
{
  "name": "客户姓名",
  "company": "公司名称",
  "email": "邮箱地址",
  "phone": "联系电话",
  "country": "国家地区",
  "subject": "询盘主题",
  "message": "询盘内容",
  "status": "询盘状态",
  "priority": "优先级",
  "assignedTo": "负责人",
  "productInterest": "感兴趣的产品",
  "projectBudget": "项目预算",
  "projectTimeline": "项目时间",
  "source": "询盘来源",
  "attachments": "附件",
  "notes": "处理备注",
  "replies": "回复记录",
  "followUpDate": "跟进日期",
  "ipAddress": "IP地址",
  "userAgent": "用户代理",
  "isSpam": "是否垃圾询盘",
  "spamScore": "垃圾评分"
}
```

### 状态枚举
- `new`: 新询盘
- `processing`: 处理中
- `replied`: 已回复
- `closed`: 已关闭
- `closed-won`: 成交
- `closed-lost`: 流失

### 优先级枚举
- `low`: 低
- `medium`: 中
- `high`: 高
- `urgent`: 紧急

### 来源枚举
- `website`: 官网
- `email`: 邮件
- `phone`: 电话
- `exhibition`: 展会
- `referral`: 推荐
- `other`: 其他

## 安全特性

### 数据验证
- 必填字段验证
- 邮箱格式验证
- 数据长度限制
- 特殊字符过滤

### 垃圾检测
- 关键词检测
- 模式匹配
- IP频率限制
- 评分机制

### 权限控制
- 基于角色的访问控制
- API权限验证
- 数据访问限制
- 操作日志记录

## 性能优化

### 数据库优化
- 索引优化
- 查询优化
- 分页处理
- 缓存机制

### 通知优化
- 异步处理
- 批量发送
- 失败重试
- 频率限制

### 导出优化
- 流式处理
- 分批导出
- 压缩传输
- 缓存结果

## 故障排除

### 常见问题

1. **询盘通知未收到**
   - 检查邮件配置
   - 验证收件人地址
   - 查看错误日志

2. **自动分配不工作**
   - 检查环境变量设置
   - 验证销售团队配置
   - 查看分配逻辑

3. **定时任务未执行**
   - 检查调度器初始化
   - 验证cron表达式
   - 查看系统日志

4. **数据导出失败**
   - 检查数据量大小
   - 验证文件权限
   - 查看内存使用

### 日志查看
```bash
# 查看询盘相关日志
tail -f logs/inquiry.log

# 查看通知日志
tail -f logs/notification.log

# 查看调度任务日志
tail -f logs/scheduler.log
```

## 更新日志

### v1.0.0 (2024-01-15)
- 初始版本发布
- 基础询盘管理功能
- 通知系统
- 统计分析
- 数据导出
- 自动化任务

## 技术支持

如有问题或建议，请联系：
- 邮箱: tech@lianjin-led.com
- 电话: +86-755-1234567
- 文档: https://docs.lianjin-led.com