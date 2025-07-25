// LED网站主页 - 使用专业样式系统
export default function HomePage() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* 头部区域 */}
      <header className="bg-primary text-light py-lg">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mb-0 text-light">联锦光电</h1>
              <span className="ml-md text-sm opacity-90">LIANJIN LED</span>
            </div>
            <div className="hidden md:flex items-center space-x-lg">
              <span className="text-sm">专业LED显示屏制造商</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main>
        {/* 英雄区域 */}
        <section className="py-3xl bg-primary text-light">
          <div className="container text-center">
            <div className="fade-in">
              <h2 className="text-5xl font-bold mb-lg text-light">
                🎉 网站部署成功！
              </h2>
              <p className="text-xl mb-xl opacity-90">
                欢迎访问深圳联锦光电有限公司官网
              </p>
              <div className="flex flex-col md:flex-row gap-md justify-center">
                <a href="#about" className="btn btn-secondary btn-lg">
                  了解更多
                </a>
                <a href="#contact" className="btn btn-primary btn-lg bg-accent border-accent">
                  联系我们
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 部署信息区域 */}
        <section className="py-2xl">
          <div className="container">
            <div className="card slide-up">
              <div className="card-header">
                <h3 className="text-primary mb-0">🚀 部署信息</h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-sm">Vercel</div>
                    <div className="text-muted">部署平台</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-sm">Next.js 14</div>
                    <div className="text-muted">技术框架</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-sm">✅</div>
                    <div className="text-muted">运行状态</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-sm">{new Date().toLocaleDateString('zh-CN')}</div>
                    <div className="text-muted">部署时间</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 公司介绍区域 */}
        <section id="about" className="py-2xl bg-secondary">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">关于联锦光电</h3>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                深圳联锦光电有限公司是一家专业从事LED显示屏研发、生产和销售的高新技术企业
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
              <div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-2xl font-bold mb-lg text-primary">我们的优势</h4>
                    <ul className="space-y-md">
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">✓</span>
                        <span>15年LED显示屏行业经验</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">✓</span>
                        <span>自主研发生产，品质可控</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">✓</span>
                        <span>全球服务网络，快速响应</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">✓</span>
                        <span>定制化解决方案</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-2xl font-bold mb-lg text-primary">产品系列</h4>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="text-center p-md bg-secondary rounded">
                        <div className="text-2xl mb-sm">🏢</div>
                        <div className="font-semibold">户外LED</div>
                      </div>
                      <div className="text-center p-md bg-secondary rounded">
                        <div className="text-2xl mb-sm">🏠</div>
                        <div className="font-semibold">室内LED</div>
                      </div>
                      <div className="text-center p-md bg-secondary rounded">
                        <div className="text-2xl mb-sm">🎭</div>
                        <div className="font-semibold">租赁屏</div>
                      </div>
                      <div className="text-center p-md bg-secondary rounded">
                        <div className="text-2xl mb-sm">✨</div>
                        <div className="font-semibold">创意屏</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 联系信息区域 */}
        <section id="contact" className="py-2xl">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">联系我们</h3>
              <p className="text-xl text-secondary">
                我们期待与您合作，为您提供最优质的LED显示解决方案
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-4xl mb-lg">📞</div>
                  <h4 className="font-bold mb-md">联系电话</h4>
                  <p className="text-primary font-semibold">+86 755-1234-5678</p>
                </div>
              </div>
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-4xl mb-lg">✉️</div>
                  <h4 className="font-bold mb-md">邮箱地址</h4>
                  <p className="text-primary font-semibold">info@lianjinled.com</p>
                </div>
              </div>
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-4xl mb-lg">📍</div>
                  <h4 className="font-bold mb-md">公司地址</h4>
                  <p className="text-secondary">深圳市宝安区<br />科技工业园</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 底部区域 */}
      <footer className="bg-dark text-light py-2xl">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
            <div>
              <h4 className="font-bold mb-lg text-light">深圳联锦光电有限公司</h4>
              <p className="text-sm opacity-80 mb-md">
                专业从事LED显示屏研发、生产和销售的高新技术企业，
                致力于为全球客户提供高品质的LED显示解决方案。
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">产品系列</h5>
              <ul className="text-sm space-y-sm opacity-80">
                <li>户外LED显示屏</li>
                <li>室内LED显示屏</li>
                <li>租赁LED显示屏</li>
                <li>创意LED显示屏</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">技术支持</h5>
              <ul className="text-sm space-y-sm opacity-80">
                <li>技术咨询</li>
                <li>安装指导</li>
                <li>售后服务</li>
                <li>维护保养</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-lg text-center">
            <p className="text-sm opacity-60">
              © 2024 深圳联锦光电有限公司 版权所有 | 
              <span className="ml-sm">Powered by Next.js & Vercel</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}