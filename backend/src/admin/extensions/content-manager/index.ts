export default {
  // 自定义内容管理器配置
  config: {
    // 自定义列表视图
    listView: {
      // 产品列表配置
      product: {
        layout: [
          { name: 'name', size: 6 },
          { name: 'category', size: 4 },
          { name: 'status', size: 2 },
          { name: 'createdAt', size: 4 },
          { name: 'updatedAt', size: 4 },
          { name: 'publishedAt', size: 4 },
        ],
        searchableFields: ['name', 'description', 'category'],
        bulkable: true,
        filterable: ['category', 'status', 'publishedAt'],
        pageSize: 20,
      },
      
      // 案例研究列表配置
      'case-study': {
        layout: [
          { name: 'title', size: 6 },
          { name: 'industry', size: 3 },
          { name: 'status', size: 3 },
          { name: 'publishedAt', size: 4 },
          { name: 'createdAt', size: 4 },
          { name: 'updatedAt', size: 4 },
        ],
        searchableFields: ['title', 'description', 'industry'],
        bulkable: true,
        filterable: ['industry', 'status', 'publishedAt'],
        pageSize: 15,
      },
      
      // 新闻列表配置
      news: {
        layout: [
          { name: 'title', size: 6 },
          { name: 'category', size: 3 },
          { name: 'status', size: 3 },
          { name: 'publishedAt', size: 4 },
          { name: 'createdAt', size: 4 },
          { name: 'updatedAt', size: 4 },
        ],
        searchableFields: ['title', 'content', 'category'],
        bulkable: true,
        filterable: ['category', 'status', 'publishedAt'],
        pageSize: 20,
      },
      
      // 询盘列表配置
      inquiry: {
        layout: [
          { name: 'name', size: 4 },
          { name: 'company', size: 4 },
          { name: 'status', size: 2 },
          { name: 'priority', size: 2 },
          { name: 'createdAt', size: 4 },
          { name: 'updatedAt', size: 4 },
          { name: 'assignedTo', size: 4 },
        ],
        searchableFields: ['name', 'company', 'email', 'message'],
        bulkable: true,
        filterable: ['status', 'priority', 'assignedTo', 'createdAt'],
        pageSize: 25,
      },
    },
    
    // 自定义编辑视图
    editView: {
      // 产品编辑配置
      product: {
        layout: [
          [
            { name: 'name', size: 6 },
            { name: 'category', size: 6 },
          ],
          [
            { name: 'description', size: 12 },
          ],
          [
            { name: 'specifications', size: 6 },
            { name: 'features', size: 6 },
          ],
          [
            { name: 'images', size: 6 },
            { name: 'documents', size: 6 },
          ],
          [
            { name: 'seo', size: 12 },
          ],
        ],
      },
      
      // 案例研究编辑配置
      'case-study': {
        layout: [
          [
            { name: 'title', size: 8 },
            { name: 'industry', size: 4 },
          ],
          [
            { name: 'description', size: 12 },
          ],
          [
            { name: 'challenge', size: 6 },
            { name: 'solution', size: 6 },
          ],
          [
            { name: 'results', size: 12 },
          ],
          [
            { name: 'images', size: 6 },
            { name: 'products', size: 6 },
          ],
          [
            { name: 'seo', size: 12 },
          ],
        ],
      },
      
      // 新闻编辑配置
      news: {
        layout: [
          [
            { name: 'title', size: 8 },
            { name: 'category', size: 4 },
          ],
          [
            { name: 'excerpt', size: 12 },
          ],
          [
            { name: 'content', size: 12 },
          ],
          [
            { name: 'featuredImage', size: 6 },
            { name: 'tags', size: 6 },
          ],
          [
            { name: 'seo', size: 12 },
          ],
        ],
      },
    },
  },
};