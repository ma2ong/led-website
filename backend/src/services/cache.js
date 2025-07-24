/**
 * 缓存服务
 * 提供Redis和内存缓存功能
 */

'use strict';

const Redis = require('ioredis');

class CacheService {
  constructor() {
    this.redis = null;
    this.memoryCache = new Map();
    this.memoryTTL = new Map();
    this.isRedisAvailable = false;
    
    this.initializeRedis();
    this.startMemoryCleanup();
  }

  /**
   * 初始化Redis连接
   */
  async initializeRedis() {
    try {
      if (process.env.REDIS_HOST) {
        this.redis = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: process.env.REDIS_PORT || 6379,
          password: process.env.REDIS_PASSWORD || undefined,
          retryDelayOnFailover: 100,
          maxRetriesPerRequest: 3,
          lazyConnect: true,
        });

        await this.redis.connect();
        this.isRedisAvailable = true;
        console.log('✅ Redis cache connected');

        this.redis.on('error', (error) => {
          console.error('Redis error:', error);
          this.isRedisAvailable = false;
        });

        this.redis.on('connect', () => {
          this.isRedisAvailable = true;
          console.log('Redis reconnected');
        });
      }
    } catch (error) {
      console.warn('Redis not available, using memory cache:', error.message);
      this.isRedisAvailable = false;
    }
  }

  /**
   * 设置缓存
   */
  async set(key, value, ttl = 3600) {
    try {
      const serializedValue = JSON.stringify(value);
      
      if (this.isRedisAvailable && this.redis) {
        await this.redis.setex(key, ttl, serializedValue);
      } else {
        // 使用内存缓存
        this.memoryCache.set(key, serializedValue);
        this.memoryTTL.set(key, Date.now() + (ttl * 1000));
      }
      
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  /**
   * 获取缓存
   */
  async get(key) {
    try {
      let value = null;
      
      if (this.isRedisAvailable && this.redis) {
        value = await this.redis.get(key);
      } else {
        // 检查内存缓存
        const ttl = this.memoryTTL.get(key);
        if (ttl && Date.now() < ttl) {
          value = this.memoryCache.get(key);
        } else {
          // 过期，删除
          this.memoryCache.delete(key);
          this.memoryTTL.delete(key);
        }
      }
      
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * 删除缓存
   */
  async del(key) {
    try {
      if (this.isRedisAvailable && this.redis) {
        await this.redis.del(key);
      } else {
        this.memoryCache.delete(key);
        this.memoryTTL.delete(key);
      }
      
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  /**
   * 清空所有缓存
   */
  async flush() {
    try {
      if (this.isRedisAvailable && this.redis) {
        await this.redis.flushall();
      } else {
        this.memoryCache.clear();
        this.memoryTTL.clear();
      }
      
      return true;
    } catch (error) {
      console.error('Cache flush error:', error);
      return false;
    }
  }

  /**
   * 检查缓存是否存在
   */
  async exists(key) {
    try {
      if (this.isRedisAvailable && this.redis) {
        return await this.redis.exists(key) === 1;
      } else {
        const ttl = this.memoryTTL.get(key);
        return ttl && Date.now() < ttl;
      }
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * 设置缓存过期时间
   */
  async expire(key, ttl) {
    try {
      if (this.isRedisAvailable && this.redis) {
        await this.redis.expire(key, ttl);
      } else {
        if (this.memoryCache.has(key)) {
          this.memoryTTL.set(key, Date.now() + (ttl * 1000));
        }
      }
      
      return true;
    } catch (error) {
      console.error('Cache expire error:', error);
      return false;
    }
  }

  /**
   * 获取缓存统计信息
   */
  async getStats() {
    try {
      if (this.isRedisAvailable && this.redis) {
        const info = await this.redis.info('memory');
        const keyspace = await this.redis.info('keyspace');
        
        return {
          type: 'redis',
          connected: this.isRedisAvailable,
          memory: info,
          keyspace: keyspace,
        };
      } else {
        return {
          type: 'memory',
          connected: true,
          keys: this.memoryCache.size,
          memoryUsage: process.memoryUsage(),
        };
      }
    } catch (error) {
      console.error('Cache stats error:', error);
      return null;
    }
  }

  /**
   * 内存缓存清理
   */
  startMemoryCleanup() {
    setInterval(() => {
      if (!this.isRedisAvailable) {
        const now = Date.now();
        for (const [key, ttl] of this.memoryTTL.entries()) {
          if (now >= ttl) {
            this.memoryCache.delete(key);
            this.memoryTTL.delete(key);
          }
        }
      }
    }, 60000); // 每分钟清理一次
  }

  /**
   * 缓存装饰器
   */
  cached(ttl = 3600) {
    return (target, propertyName, descriptor) => {
      const method = descriptor.value;
      
      descriptor.value = async function (...args) {
        const cacheKey = `${target.constructor.name}:${propertyName}:${JSON.stringify(args)}`;
        
        // 尝试从缓存获取
        const cached = await this.cache.get(cacheKey);
        if (cached !== null) {
          return cached;
        }
        
        // 执行原方法
        const result = await method.apply(this, args);
        
        // 存储到缓存
        await this.cache.set(cacheKey, result, ttl);
        
        return result;
      };
      
      return descriptor;
    };
  }
}

// 创建单例实例
const cacheService = new CacheService();

module.exports = cacheService;