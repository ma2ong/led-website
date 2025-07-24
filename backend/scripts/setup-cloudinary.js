#!/usr/bin/env node

/**
 * Cloudinary Setup Script
 * This script helps configure Cloudinary for the LED website project
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupCloudinary() {
  console.log('🚀 Cloudinary Setup for LED Website');
  console.log('=====================================\n');

  console.log('Please provide your Cloudinary credentials:');
  console.log('(You can find these in your Cloudinary Dashboard)\n');

  const cloudName = await question('Cloud Name: ');
  const apiKey = await question('API Key: ');
  const apiSecret = await question('API Secret: ');
  const folder = await question('Folder (default: lianjin-led): ') || 'lianjin-led';

  // Read existing .env file
  const envPath = path.join(__dirname, '..', '.env');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Update or add Cloudinary configuration
  const cloudinaryConfig = `
# Cloudinary Configuration
UPLOAD_PROVIDER=cloudinary
CLOUDINARY_NAME=${cloudName}
CLOUDINARY_KEY=${apiKey}
CLOUDINARY_SECRET=${apiSecret}
CLOUDINARY_FOLDER=${folder}
CLOUDINARY_BASE_URL=https://res.cloudinary.com
`;

  // Remove existing Cloudinary config if present
  envContent = envContent.replace(/# Cloudinary Configuration[\s\S]*?(?=\n#|\n$|$)/g, '');
  
  // Add new config
  envContent += cloudinaryConfig;

  // Write back to .env file
  fs.writeFileSync(envPath, envContent.trim() + '\n');

  console.log('\n✅ Cloudinary configuration saved to .env file');
  
  // Test connection
  console.log('\n🧪 Testing Cloudinary connection...');
  
  try {
    const cloudinary = require('cloudinary').v2;
    
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret
    });

    const result = await cloudinary.api.ping();
    console.log('✅ Connection successful!');
    console.log(`Status: ${result.status}`);
    
    // Create folder structure
    console.log('\n📁 Setting up folder structure...');
    
    const folders = [
      `${folder}/products`,
      `${folder}/case-studies`,
      `${folder}/news`,
      `${folder}/company`,
      `${folder}/documents`
    ];

    for (const folderPath of folders) {
      try {
        await cloudinary.api.create_folder(folderPath);
        console.log(`✅ Created folder: ${folderPath}`);
      } catch (error) {
        if (error.error && error.error.message.includes('already exists')) {
          console.log(`ℹ️  Folder already exists: ${folderPath}`);
        } else {
          console.log(`⚠️  Could not create folder ${folderPath}: ${error.message}`);
        }
      }
    }

    // Set up upload presets
    console.log('\n⚙️  Setting up upload presets...');
    
    const presets = [
      {
        name: `${folder}_products`,
        settings: {
          unsigned: false,
          folder: `${folder}/products`,
          transformation: [
            { quality: 'auto:best', fetch_format: 'auto' }
          ],
          eager: [
            { width: 400, height: 300, crop: 'fill', quality: 'auto:good' },
            { width: 800, height: 600, crop: 'fill', quality: 'auto:good' },
            { width: 1200, height: 900, crop: 'fill', quality: 'auto:good' }
          ],
          allowed_formats: ['jpg', 'png', 'webp', 'avif']
        }
      },
      {
        name: `${folder}_thumbnails`,
        settings: {
          unsigned: false,
          folder: `${folder}/thumbnails`,
          transformation: [
            { width: 300, height: 300, crop: 'fill', quality: 'auto:good', fetch_format: 'auto' }
          ],
          allowed_formats: ['jpg', 'png', 'webp']
        }
      }
    ];

    for (const preset of presets) {
      try {
        await cloudinary.api.create_upload_preset(preset.settings, { name: preset.name });
        console.log(`✅ Created upload preset: ${preset.name}`);
      } catch (error) {
        if (error.error && error.error.message.includes('already exists')) {
          console.log(`ℹ️  Upload preset already exists: ${preset.name}`);
        } else {
          console.log(`⚠️  Could not create preset ${preset.name}: ${error.message}`);
        }
      }
    }

    console.log('\n🎉 Cloudinary setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Restart your Strapi server');
    console.log('2. Test file uploads in the admin panel');
    console.log('3. Check the Media Library for uploaded files');
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.log('\nPlease check your credentials and try again.');
  }

  rl.close();
}

// Install cloudinary if not present
try {
  require('cloudinary');
} catch (error) {
  console.log('Installing cloudinary package...');
  const { execSync } = require('child_process');
  execSync('npm install cloudinary', { stdio: 'inherit' });
}

setupCloudinary().catch(console.error);