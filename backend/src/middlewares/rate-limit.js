/**
 * 速率限制中间件
 * 防止垃圾邮件和恶意请求
 */

// 内存存储
const memoryStore = new Map();

const rateLimitMiddleware = (options = {}) => {
  const {
    interval = 60000, // 1分钟
    max = 100, // 最大请求数
    prefixKey = 'rateLimit',
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    enableHeaders = true,
  } = options;

  return async (ctx, next) => {
    // 获取客户端IP
    const clientIP = ctx.request.ip || 
                    ctx.request.headers['x-forwarded-for'] || 
                    ctx.request.headers['x-real-ip'] || 
                    ctx.socket.remoteAddress;

    const key = `${prefixKey}:${clientIP}`;
    const now = Date.now();
    const windowStart = now - interval;

    try {
      let requestCount = 0;
      let resetTime = now + interval;

      if (redisClient && redisClient.status === 'ready') {
        // 使用Redis存储
        const pipeline = redisClient.pipeline();
        
        // 清理过期的请求记录
        pipeline.zremrangebyscore(key, 0, windowStart);
        
        // 添加当前请求
        pipeline.zadd(key, now, `${now}-${Math.random()}`);
        
        // 获取当前窗口内的请求数量
        pipeline.zcard(key);
        
        // 设置过期时间
        pipeline.expire(key, Math.ceil(interval / 1000));
        
        const results = await pipeline.exec();
        requestCount = results[2][1]; // zcard的结果
      } else {
        // 使用内存存储
        if (!memoryStore.has(key)) {
          memoryStore.set(key, []);
        }
        
        const requests = memoryStore.get(key);
        
        // 清理过期的请求
        const validRequests = requests.filter(timestamp => timestamp > windowStart);
        
        // 添加当前请求
        validRequests.push(now);
        
        memoryStore.set(key, validRequests);
        requestCount = validRequests.length;
        
        // 清理过期的键（简单的内存管理）
        if (Math.random() < 0.01) { // 1%的概率清理
          for (const [storeKey, timestamps] of memoryStore.entries()) {
            const validTimestamps = timestamps.filter(timestamp => timestamp > windowStart);
            if (validTimestamps.length === 0) {
              memoryStore.delete(storeKey);
            } else {
              memoryStore.set(storeKey, validTimestamps);
            }
          }
        }
      }

      // 设置响应头
      if (enableHeaders) {
        ctx.set('X-RateLimit-Limit', max);
        ctx.set('X-RateLimit-Remaining', Math.max(0, max - requestCount));
        ctx.set('X-RateLimit-Reset', new Date(resetTime).toISOString());
      }

      // 检查是否超过限制
      if (requestCount > max) {
        ctx.status = 429;
        ctx.body = {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil(interval / 1000),
        };
        
        if (enableHeaders) {
          ctx.set('Retry-After', Math.ceil(interval / 1000));
        }
        
        return;
      }

      await next();

      // 如果需要，跳过成功的请求计数
      if (skipSuccessfulRequests && ctx.status < 400) {
        // 这里可以实现移除成功请求的逻辑
        // 但为了简单起见，我们保持当前实现
      }

    } catch (error) {
      console.error('Rate limit middleware error:', error);
      // 如果速率限制出错，继续处理请求
      await next();
    }
  };
};

// 特定路由的速率限制配置
const routeSpecificLimits = {
  // 表单提交更严格的限制
  '/api/inquiries': {
    interval: 60000, // 1分钟
    max: 5, // 最多5次提交
  },
  '/api/contact': {
    interval: 60000,
    max: 3, // 最多3次联系表单提交
  },
  // API调用的一般限制
  '/api': {
    interval: 60000,
    max: 100,
  },
};

// 导出中间件工厂函数
module.exports = (config = {}) => {
  return rateLimitMiddleware(config);
};

// 导出路由特定的限制配置
module.exports.routeSpecificLimits = routeSpecificLimits;
module.exports.rateLimitMiddleware = rateLimitMiddleware;