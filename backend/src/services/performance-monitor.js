/**
 * 性能监控服务
 * 监控API响应时间、数据库查询性能等
 */

'use strict';

const os = require('os');
const process = require('process');

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requests: new Map(),
      database: new Map(),
      cache: new Map(),
      system: new Map(),
    };
    
    this.startSystemMonitoring();
  }

  /**
   * 记录请求性能
   */
  recordRequest(method, path, duration, statusCode) {
    const key = `${method}:${path}`;
    
    if (!this.metrics.requests.has(key)) {
      this.metrics.requests.set(key, {
        count: 0,
        totalDuration: 0,
        avgDuration: 0,
        minDuration: Infinity,
        maxDuration: 0,
        statusCodes: new Map(),
        lastAccess: Date.now(),
      });
    }
    
    const metric = this.metrics.requests.get(key);
    metric.count++;
    metric.totalDuration += duration;
    metric.avgDuration = metric.totalDuration / metric.count;
    metric.minDuration = Math.min(metric.minDuration, duration);
    metric.maxDuration = Math.max(metric.maxDuration, duration);
    metric.lastAccess = Date.now();
    
    // 记录状态码
    const statusCount = metric.statusCodes.get(statusCode) || 0;
    metric.statusCodes.set(statusCode, statusCount + 1);
  }

  /**
   * 记录数据库查询性能
   */
  recordDatabaseQuery(query, duration, rowCount = 0) {
    const key = this.extractQueryType(query);
    
    if (!this.metrics.database.has(key)) {
      this.metrics.database.set(key, {
        count: 0,
        totalDuration: 0,
        avgDuration: 0,
        minDuration: Infinity,
        maxDuration: 0,
        totalRows: 0,
        avgRows: 0,
        lastAccess: Date.now(),
      });
    }
    
    const metric = this.metrics.database.get(key);
    metric.count++;
    metric.totalDuration += duration;
    metric.avgDuration = metric.totalDuration / metric.count;
    metric.minDuration = Math.min(metric.minDuration, duration);
    metric.maxDuration = Math.max(metric.maxDuration, duration);
    metric.totalRows += rowCount;
    metric.avgRows = metric.totalRows / metric.count;
    metric.lastAccess = Date.now();
  }

  /**
   * 记录缓存性能
   */
  recordCacheOperation(operation, key, hit = false, duration = 0) {
    const metricKey = `cache:${operation}`;
    
    if (!this.metrics.cache.has(metricKey)) {
      this.metrics.cache.set(metricKey, {
        count: 0,
        hits: 0,
        misses: 0,
        hitRate: 0,
        totalDuration: 0,
        avgDuration: 0,
        lastAccess: Date.now(),
      });
    }
    
    const metric = this.metrics.cache.get(metricKey);
    metric.count++;
    metric.totalDuration += duration;
    metric.avgDuration = metric.totalDuration / metric.count;
    metric.lastAccess = Date.now();
    
    if (operation === 'get') {
      if (hit) {
        metric.hits++;
      } else {
        metric.misses++;
      }
      metric.hitRate = metric.hits / (metric.hits + metric.misses);
    }
  }

  /**
   * 获取请求性能统计
   */
  getRequestStats() {
    const stats = [];
    
    for (const [endpoint, metric] of this.metrics.requests.entries()) {
      stats.push({
        endpoint,
        count: metric.count,
        avgDuration: Math.round(metric.avgDuration * 100) / 100,
        minDuration: metric.minDuration === Infinity ? 0 : metric.minDuration,
        maxDuration: metric.maxDuration,
        statusCodes: Object.fromEntries(metric.statusCodes),
        lastAccess: new Date(metric.lastAccess).toISOString(),
      });
    }
    
    return stats.sort((a, b) => b.count - a.count);
  }

  /**
   * 获取数据库性能统计
   */
  getDatabaseStats() {
    const stats = [];
    
    for (const [queryType, metric] of this.metrics.database.entries()) {
      stats.push({
        queryType,
        count: metric.count,
        avgDuration: Math.round(metric.avgDuration * 100) / 100,
        minDuration: metric.minDuration === Infinity ? 0 : metric.minDuration,
        maxDuration: metric.maxDuration,
        avgRows: Math.round(metric.avgRows * 100) / 100,
        lastAccess: new Date(metric.lastAccess).toISOString(),
      });
    }
    
    return stats.sort((a, b) => b.avgDuration - a.avgDuration);
  }

  /**
   * 获取缓存性能统计
   */
  getCacheStats() {
    const stats = [];
    
    for (const [operation, metric] of this.metrics.cache.entries()) {
      stats.push({
        operation,
        count: metric.count,
        hits: metric.hits,
        misses: metric.misses,
        hitRate: Math.round(metric.hitRate * 10000) / 100, // 百分比
        avgDuration: Math.round(metric.avgDuration * 100) / 100,
        lastAccess: new Date(metric.lastAccess).toISOString(),
      });
    }
    
    return stats;
  }

  /**
   * 获取系统性能统计
   */
  getSystemStats() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
      memory: {
        rss: Math.round(memUsage.rss / 1024 / 1024 * 100) / 100, // MB
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024 * 100) / 100,
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100,
        external: Math.round(memUsage.external / 1024 / 1024 * 100) / 100,
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system,
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024 * 100) / 100, // GB
        freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024 * 100) / 100,
        uptime: Math.round(os.uptime()),
        loadAverage: os.loadavg(),
      },
      process: {
        pid: process.pid,
        uptime: Math.round(process.uptime()),
        version: process.version,
        nodeVersion: process.versions.node,
      },
    };
  }

  /**
   * 获取完整的性能报告
   */
  getPerformanceReport() {
    return {
      timestamp: new Date().toISOString(),
      requests: this.getRequestStats(),
      database: this.getDatabaseStats(),
      cache: this.getCacheStats(),
      system: this.getSystemStats(),
    };
  }

  /**
   * 清理旧的性能数据
   */
  cleanup(maxAge = 24 * 60 * 60 * 1000) { // 24小时
    const cutoff = Date.now() - maxAge;
    
    // 清理请求数据
    for (const [key, metric] of this.metrics.requests.entries()) {
      if (metric.lastAccess < cutoff) {
        this.metrics.requests.delete(key);
      }
    }
    
    // 清理数据库数据
    for (const [key, metric] of this.metrics.database.entries()) {
      if (metric.lastAccess < cutoff) {
        this.metrics.database.delete(key);
      }
    }
    
    // 清理缓存数据
    for (const [key, metric] of this.metrics.cache.entries()) {
      if (metric.lastAccess < cutoff) {
        this.metrics.cache.delete(key);
      }
    }
  }

  /**
   * 提取查询类型
   */
  extractQueryType(query) {
    if (typeof query !== 'string') {
      return 'unknown';
    }
    
    const normalized = query.toLowerCase().trim();
    
    if (normalized.startsWith('select')) return 'SELECT';
    if (normalized.startsWith('insert')) return 'INSERT';
    if (normalized.startsWith('update')) return 'UPDATE';
    if (normalized.startsWith('delete')) return 'DELETE';
    if (normalized.startsWith('create')) return 'CREATE';
    if (normalized.startsWith('drop')) return 'DROP';
    if (normalized.startsWith('alter')) return 'ALTER';
    
    return 'OTHER';
  }

  /**
   * 开始系统监控
   */
  startSystemMonitoring() {
    // 每分钟记录一次系统状态
    setInterval(() => {
      const stats = this.getSystemStats();
      this.metrics.system.set(Date.now(), stats);
      
      // 只保留最近24小时的数据
      const cutoff = Date.now() - (24 * 60 * 60 * 1000);
      for (const [timestamp] of this.metrics.system.entries()) {
        if (timestamp < cutoff) {
          this.metrics.system.delete(timestamp);
        }
      }
    }, 60000);
    
    // 每小时清理一次旧数据
    setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000);
  }

  /**
   * 性能监控中间件
   */
  middleware() {
    return async (ctx, next) => {
      const start = Date.now();
      
      try {
        await next();
      } finally {
        const duration = Date.now() - start;
        this.recordRequest(
          ctx.method,
          ctx.path,
          duration,
          ctx.status
        );
      }
    };
  }
}

// 创建单例实例
const performanceMonitor = new PerformanceMonitor();

module.exports = performanceMonitor;