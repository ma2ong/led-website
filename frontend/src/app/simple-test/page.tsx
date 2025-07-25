// 最简单的测试页面，不依赖任何复杂组件
export default function SimpleTestPage() {
  return (
    <html>
      <head>
        <title>简单测试页面</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
        <h1 style={{ color: 'green' }}>✅ Vercel部署成功！</h1>
        <p>如果您能看到这个页面，说明基本部署是成功的。</p>
        <p>时间戳: {new Date().toISOString()}</p>
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0' }}>
          <h2>诊断信息：</h2>
          <ul>
            <li>Node.js 环境: {typeof process !== 'undefined' ? 'Server' : 'Client'}</li>
            <li>当前路径: /simple-test</li>
            <li>这是一个独立的页面，不依赖任何外部组件</li>
          </ul>
        </div>
      </body>
    </html>
  );
}