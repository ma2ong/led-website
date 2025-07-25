// 简单的测试页面，用于验证部署
export default function TestPage() {
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#0070f3' }}>🎉 部署测试页面</h1>
      <p>如果您能看到这个页面，说明Vercel部署基本成功！</p>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>环境变量检查：</h2>
        <ul>
          <li>STRAPI_API_URL: {process.env.NEXT_PUBLIC_STRAPI_API_URL || '未设置'}</li>
          <li>SITE_URL: {process.env.NEXT_PUBLIC_SITE_URL || '未设置'}</li>
          <li>CLOUDINARY: {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '未设置'}</li>
          <li>NODE_ENV: {process.env.NODE_ENV || '未设置'}</li>
        </ul>
      </div>

      <div style={{ 
        background: '#e6f7ff', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>路由测试：</h2>
        <p>当前页面路径: /[locale]/test</p>
        <p>这证明动态路由正常工作</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a 
          href="/zh-Hans" 
          style={{ 
            color: '#0070f3', 
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            border: '1px solid #0070f3',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          返回首页
        </a>
      </div>
    </div>
  );
}