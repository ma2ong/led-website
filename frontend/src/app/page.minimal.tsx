// 最简化的根页面 - 用于测试Vercel部署
export default function HomePage() {
  return (
    <html lang="zh">
      <head>
        <title>LED网站 - 部署测试</title>
        <meta name="description" content="LED网站Vercel部署测试页面" />
      </head>
      <body style={{ 
        fontFamily: 'Arial, sans-serif', 
        margin: 0, 
        padding: '2rem',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            color: '#0070f3', 
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            🎉 LED网站部署成功！
          </h1>
          
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#333' }}>
            欢迎访问深圳联锦光电有限公司官网
          </p>
          
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '1rem', 
            borderRadius: '4px',
            margin: '2rem 0'
          }}>
            <h2 style={{ color: '#0070f3', marginTop: 0 }}>部署信息</h2>
            <ul style={{ margin: 0 }}>
              <li>部署平台: Vercel</li>
              <li>框架: Next.js 14</li>
              <li>部署时间: {new Date().toLocaleString('zh-CN')}</li>
              <li>状态: ✅ 运行正常</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: '#f0fff0', 
            padding: '1rem', 
            borderRadius: '4px',
            margin: '2rem 0'
          }}>
            <h2 style={{ color: '#008000', marginTop: 0 }}>公司简介</h2>
            <p>深圳联锦光电有限公司是一家专业从事LED显示屏研发、生产和销售的高新技术企业。</p>
            <p>我们致力于为全球客户提供高品质的LED显示解决方案。</p>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a 
              href="/simple-test" 
              style={{ 
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0070f3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                margin: '0.5rem'
              }}
            >
              访问测试页面
            </a>
          </div>
          
          <footer style={{ 
            textAlign: 'center', 
            marginTop: '3rem', 
            paddingTop: '2rem',
            borderTop: '1px solid #eee',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <p>© 2024 深圳联锦光电有限公司 版权所有</p>
            <p>Powered by Next.js & Vercel</p>
          </footer>
        </div>
      </body>
    </html>
  );
}