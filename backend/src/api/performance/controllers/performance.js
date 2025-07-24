/**
 * 性能监控控制器
 */

'use strict';

const performanceMonitor = require('../../../services/performance-monitor');
const cacheService = require('../../../services/cache');

module.exports = {
  /**
   * 获取性能统计
   */
  async getStats(ctx) {
    try {
      const { type } = ctx.query;
      
      let stats = {};
      
      switch (type) {
        case 'requests':
          stats = performanceMonitor.getRequestStats();
          break;
        case 'database':
          stats = performanceMonitor.getDatabaseStats();
          break;
        case 'cache':
          stats = performanceMonitor.getCacheStats();
          break;
        case 'system':
          stats = performanceMonitor.getSystemStats();
          break;
        default:
          stats = {
            requests: performanceMonitor.getRequestStats().slice(0, 10), // 前10个
            database: performanceMonitor.getDatabaseStats().slice(0, 10),
            cache: performanceMonitor.getCacheStats(),
            system: performanceMonitor.getSystemStats(),
          };
      }
      
      ctx.body = {
        success: true,
        data: stats,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting performance stats:', error);
      ctx.throw(500, 'Failed to get performance stats');
    }
  },

  /**
   * 获取完整性能报告
   */
  async getReport(ctx) {
    try {
      const report = performanceMonitor.getPerformanceReport();
      
      // 添加缓存统计
      const cacheStats = await cacheService.getStats();
      if (cacheStats) {
        report.cacheService = cacheStats;
      }
      
      ctx.body = {
        success: true,
        data: report,
      };
    } catch (error) {
      console.error('Error getting performance report:', error);
      ctx.throw(500, 'Failed to get performance report');
    }
  },

  /**
   * 清理性能统计
   */
  async clearStats(ctx) {
    try {
      performanceMonitor.cleanup(0); // 清理所有数据
      
      ctx.body = {
        success: true,
        message: 'Performance stats cleared successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error clearing performance stats:', error);
      ctx.throw(500, 'Failed to clear performance stats');
    }
  },

  /**
   * 健康检查
   */
  async healthCheck(ctx) {
    try {
      const systemStats = performanceMonitor.getSystemStats();
      const cacheStats = await cacheService.getStats();
      
      // 检查系统健康状态
      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        checks: {
          memory: {
            status: systemStats.memory.heapUsed < 500 ? 'healthy' : 'warning', // 500MB阈值
            heapUsed: systemStats.memory.heapUsed,
            heapTotal: systemStats.memory.heapTotal,
          },
          cpu: {
            status: systemStats.system.loadAverage[0] < systemStats.system.cpus ? 'healthy' : 'warning',
            loadAverage: systemStats.system.loadAverage,
            cpus: systemStats.system.cpus,
          },
          cache: {
            status: cacheStats ? 'healthy' : 'warning',
            type: cacheStats?.type || 'unavailable',
            connected: cacheStats?.connected || false,
          },
          uptime: {
            status: 'healthy',
            process: systemStats.process.uptime,
            system: systemStats.system.uptime,
          },
        },
      };
      
      // 确定整体状态
      const hasWarnings = Object.values(health.checks).some(check => check.status === 'warning');
      if (hasWarnings) {
        health.status = 'warning';
      }
      
      ctx.body = health;
      
      // 如果有警告，返回206状态码
      if (health.status === 'warning') {
        ctx.status = 206;
      }
    } catch (error) {
      console.error('Error in health check:', error);
      
      ctx.status = 503;
      ctx.body = {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  },
};