const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // Optimization configuration
  optimization: {
    // Enable tree shaking
    usedExports: true,
    sideEffects: false,
    
    // Split chunks for better caching
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        // Vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        // Common chunks
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
        // React and React DOM
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          priority: 20,
          reuseExistingChunk: true,
        },
        // UI libraries
        ui: {
          test: /[\\/]node_modules[\\/](@headlessui|@heroicons|@tailwindcss)[\\/]/,
          name: 'ui',
          priority: 15,
          reuseExistingChunk: true,
        },
        // Utilities
        utils: {
          test: /[\\/]node_modules[\\/](clsx|class-variance-authority|tailwind-merge)[\\/]/,
          name: 'utils',
          priority: 12,
          reuseExistingChunk: true,
        },
      },
    },
    
    // Minimize bundle size
    minimize: process.env.NODE_ENV === 'production',
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/dictionaries': path.resolve(__dirname, 'src/dictionaries'),
    },
    
    // Optimize module resolution
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    
    // Extensions to resolve
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  // Module configuration
  module: {
    rules: [
      // TypeScript/JavaScript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              // Remove unused imports
              'babel-plugin-transform-remove-unused-imports',
              // Optimize lodash imports
              ['babel-plugin-lodash', { id: ['lodash'] }],
            ],
          },
        },
      },
      
      // CSS optimization
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: process.env.NODE_ENV === 'production' 
                  ? '[hash:base64:5]' 
                  : '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      
      // Image optimization
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
      
      // Font optimization
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
    ],
  },

  // Plugins
  plugins: [
    // Bundle analyzer (only when ANALYZE=true)
    ...(process.env.ANALYZE === 'true' ? [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
        generateStatsFile: true,
        statsFilename: 'bundle-stats.json',
      })
    ] : []),
  ],

  // Performance hints
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxEntrypointSize: 300000, // 300kb
    maxAssetSize: 250000, // 250kb
  },

  // Stats configuration
  stats: {
    chunks: false,
    modules: false,
    assets: true,
    colors: true,
    timings: true,
    builtAt: true,
    version: false,
    hash: false,
  },

  // Cache configuration
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },

  // Externals (for server-side rendering)
  externals: process.env.NODE_ENV === 'production' ? {
    // Don't bundle these on the server
    'react': 'React',
    'react-dom': 'ReactDOM',
  } : {},
};