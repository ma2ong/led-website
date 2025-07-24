import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证必填字段
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }
    
    // 发送数据到Strapi API
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    const strapiResponse = await fetch(`${strapiUrl}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          company: data.company || '',
          country: data.country || '',
          subject: data.subject || 'Website Inquiry',
          message: data.message,
          productId: data.productId || null,
          projectBudget: data.projectBudget || '',
          projectTimeline: data.projectTimeline || '',
          source: data.source || 'website',
          locale: data.locale || 'zh-Hans',
          status: 'new',
        }
      }),
    });
    
    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      console.error('Strapi API error:', errorData);
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to submit inquiry to CMS' 
        },
        { status: 500 }
      );
    }
    
    // 发送通知邮件
    if (process.env.SMTP_ENABLED === 'true') {
      try {
        await fetch(`${strapiUrl}/api/email/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            to: process.env.NOTIFICATION_EMAIL,
            subject: `新询盘: ${data.subject || 'Website Inquiry'}`,
            html: `
              <h2>新询盘通知</h2>
              <p><strong>姓名:</strong> ${data.name}</p>
              <p><strong>邮箱:</strong> ${data.email}</p>
              <p><strong>电话:</strong> ${data.phone || 'N/A'}</p>
              <p><strong>公司:</strong> ${data.company || 'N/A'}</p>
              <p><strong>国家/地区:</strong> ${data.country || 'N/A'}</p>
              <p><strong>主题:</strong> ${data.subject || 'Website Inquiry'}</p>
              <p><strong>留言内容:</strong></p>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
              ${data.productId ? `<p><strong>产品ID:</strong> ${data.productId}</p>` : ''}
              ${data.projectBudget ? `<p><strong>项目预算:</strong> ${data.projectBudget}</p>` : ''}
              ${data.projectTimeline ? `<p><strong>项目时间:</strong> ${data.projectTimeline}</p>` : ''}
              <p><strong>来源:</strong> ${data.source || 'website'}</p>
              <p><strong>语言:</strong> ${data.locale || 'zh-Hans'}</p>
              <hr>
              <p>请登录管理后台查看详情并处理。</p>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // 不影响主流程，继续返回成功
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}