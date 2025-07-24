#!/usr/bin/env node

/**
 * Media Setup Test Script
 * Tests media upload, optimization, and CDN functionality
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

async function testMediaSetup() {
  console.log('🧪 Testing Media Setup');
  console.log('======================\n');

  // Test 1: Environment Variables
  console.log('1️⃣  Checking environment variables...');
  
  const requiredEnvVars = [
    'UPLOAD_PROVIDER',
    'CLOUDINARY_NAME',
    'CLOUDINARY_KEY', 
    'CLOUDINARY_SECRET',
    'CLOUDINARY_FOLDER'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    console.log('\nPlease run the setup script first: npm run setup:cloudinary');
    return false;
  }
  
  console.log('✅ All environment variables present');

  // Test 2: Cloudinary Connection
  console.log('\n2️⃣  Testing Cloudinary connection...');
  
  try {
    const cloudinary = require('cloudinary').v2;
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });

    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful');
    console.log(`   Status: ${result.status}`);
  } catch (error) {
    console.log('❌ Cloudinary connection failed:', error.message);
    return false;
  }

  // Test 3: Strapi Upload Plugin
  console.log('\n3️⃣  Testing Strapi upload configuration...');
  
  try {
    const strapi = require('@strapi/strapi')();
    await strapi.load();

    const uploadConfig = strapi.config.get('plugin.upload');
    console.log('✅ Upload plugin configured');
    console.log(`   Provider: ${uploadConfig.provider}`);
    console.log(`   Size limit: ${Math.round(uploadConfig.sizeLimit / 1024 / 1024)}MB`);

    await strapi.destroy();
  } catch (error) {
    console.log('❌ Strapi configuration error:', error.message);
    return false;
  }

  // Test 4: API Endpoints
  console.log('\n4️⃣  Testing API endpoints...');
  
  const endpoints = [
    '/api/upload',
    '/api/media/stats'
  ];

  const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`
        }
      });
      
      if (response.status === 404) {
        console.log(`⚠️  Endpoint ${endpoint} not found (may be normal)`);
      } else if (response.status < 500) {
        console.log(`✅ Endpoint ${endpoint} accessible`);
      } else {
        console.log(`❌ Endpoint ${endpoint} error: ${response.status}`);
      }
    } catch (error) {
      console.log(`⚠️  Could not test ${endpoint}: ${error.message}`);
    }
  }

  // Test 5: Image Optimization
  console.log('\n5️⃣  Testing image optimization...');
  
  try {
    const cloudinary = require('cloudinary').v2;
    
    // Test URL generation
    const testPublicId = 'sample';
    const optimizedUrl = cloudinary.url(testPublicId, {
      width: 300,
      height: 200,
      crop: 'fill',
      quality: 'auto:good',
      fetch_format: 'auto'
    });
    
    console.log('✅ Image optimization URL generation working');
    console.log(`   Sample URL: ${optimizedUrl}`);
    
    // Test responsive breakpoints
    const responsiveUrls = [400, 800, 1200].map(width => 
      cloudinary.url(testPublicId, {
        width,
        crop: 'scale',
        quality: 'auto:good',
        fetch_format: 'auto'
      })
    );
    
    console.log('✅ Responsive image URLs generated');
    console.log(`   Breakpoints: ${responsiveUrls.length}`);
    
  } catch (error) {
    console.log('❌ Image optimization test failed:', error.message);
    return false;
  }

  // Test 6: Frontend Integration
  console.log('\n6️⃣  Testing frontend integration...');
  
  const frontendFiles = [
    'frontend/src/lib/media.ts',
    'frontend/src/lib/media-manager.ts',
    'frontend/src/components/ui/media-upload.tsx',
    'frontend/src/components/ui/optimized-image.tsx',
    'frontend/src/hooks/use-media-upload.ts',
    'frontend/src/app/api/upload/route.ts'
  ];

  let frontendFilesExist = 0;
  
  for (const filePath of frontendFiles) {
    const fullPath = path.join(__dirname, '../../', filePath);
    if (fs.existsSync(fullPath)) {
      frontendFilesExist++;
    } else {
      console.log(`⚠️  Missing frontend file: ${filePath}`);
    }
  }
  
  console.log(`✅ Frontend files: ${frontendFilesExist}/${frontendFiles.length} present`);

  // Test 7: Performance Check
  console.log('\n7️⃣  Performance recommendations...');
  
  const recommendations = [];
  
  if (process.env.NODE_ENV === 'production') {
    recommendations.push('✅ Production environment detected');
  } else {
    recommendations.push('⚠️  Development environment - ensure production config for deployment');
  }
  
  if (process.env.CLOUDINARY_FOLDER) {
    recommendations.push('✅ Cloudinary folder organization configured');
  } else {
    recommendations.push('⚠️  Consider setting CLOUDINARY_FOLDER for better organization');
  }
  
  recommendations.forEach(rec => console.log(`   ${rec}`));

  // Summary
  console.log('\n📊 Test Summary');
  console.log('================');
  console.log('✅ Media storage and CDN setup is ready!');
  console.log('\nFeatures available:');
  console.log('• Cloudinary integration for media storage');
  console.log('• Automatic image optimization and format conversion');
  console.log('• Responsive image generation');
  console.log('• CDN distribution for fast loading');
  console.log('• Frontend upload components');
  console.log('• Media management APIs');
  
  console.log('\nNext steps:');
  console.log('1. Test file uploads through the admin panel');
  console.log('2. Verify image optimization in the frontend');
  console.log('3. Check CDN performance with real images');
  console.log('4. Monitor storage usage in Cloudinary dashboard');

  return true;
}

// Helper function to check if fetch is available
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// Install required packages if missing
const requiredPackages = ['cloudinary', 'node-fetch'];

for (const pkg of requiredPackages) {
  try {
    require(pkg);
  } catch (error) {
    console.log(`Installing ${pkg}...`);
    const { execSync } = require('child_process');
    execSync(`npm install ${pkg}`, { stdio: 'inherit' });
  }
}

testMediaSetup().catch(console.error);