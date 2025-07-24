#!/usr/bin/env node

/**
 * Media Optimization Script
 * Optimizes existing media files and generates responsive variants
 */

const fs = require('fs');
const path = require('path');

async function optimizeExistingMedia() {
  console.log('🖼️  Media Optimization Tool');
  console.log('============================\n');

  try {
    // Load Strapi
    const strapi = require('@strapi/strapi')();
    await strapi.load();

    console.log('📊 Analyzing existing media files...');

    // Get all media files
    const files = await strapi.plugins.upload.services.upload.findMany({});
    
    console.log(`Found ${files.length} media files`);

    if (files.length === 0) {
      console.log('No media files found to optimize.');
      return;
    }

    // Check if using Cloudinary
    const isCloudinary = process.env.UPLOAD_PROVIDER === 'cloudinary';
    
    if (!isCloudinary) {
      console.log('⚠️  Not using Cloudinary. Optimization features are limited.');
      return;
    }

    const cloudinary = require('cloudinary').v2;
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });

    console.log('🔄 Optimizing media files...\n');

    let optimized = 0;
    let errors = 0;

    for (const file of files) {
      try {
        console.log(`Processing: ${file.name}`);

        // Skip if not an image
        if (!file.mime.startsWith('image/')) {
          console.log(`  ⏭️  Skipping non-image file`);
          continue;
        }

        // Skip if already optimized (has formats)
        if (file.formats && Object.keys(file.formats).length > 0) {
          console.log(`  ✅ Already optimized`);
          continue;
        }

        // Get Cloudinary public ID
        const publicId = file.provider_metadata?.public_id;
        if (!publicId) {
          console.log(`  ⚠️  No Cloudinary public ID found`);
          continue;
        }

        // Generate responsive formats
        const formats = {};
        const breakpoints = [
          { name: 'thumbnail', width: 156, height: 156 },
          { name: 'small', width: 500, height: 500 },
          { name: 'medium', width: 750, height: 750 },
          { name: 'large', width: 1000, height: 1000 }
        ];

        for (const bp of breakpoints) {
          try {
            const transformedUrl = cloudinary.url(publicId, {
              width: bp.width,
              height: bp.height,
              crop: 'limit',
              quality: 'auto:good',
              fetch_format: 'auto'
            });

            formats[bp.name] = {
              url: transformedUrl,
              width: bp.width,
              height: bp.height,
              size: null // Cloudinary doesn't provide size in transformation
            };
          } catch (formatError) {
            console.log(`    ⚠️  Failed to generate ${bp.name} format: ${formatError.message}`);
          }
        }

        // Update file with formats
        if (Object.keys(formats).length > 0) {
          await strapi.plugins.upload.services.upload.update(file.id, {
            formats
          });

          console.log(`  ✅ Generated ${Object.keys(formats).length} responsive formats`);
          optimized++;
        }

      } catch (error) {
        console.log(`  ❌ Error processing ${file.name}: ${error.message}`);
        errors++;
      }
    }

    console.log(`\n📈 Optimization Summary:`);
    console.log(`  Files processed: ${files.length}`);
    console.log(`  Successfully optimized: ${optimized}`);
    console.log(`  Errors: ${errors}`);

    // Generate optimization report
    const report = {
      timestamp: new Date().toISOString(),
      totalFiles: files.length,
      optimized,
      errors,
      provider: process.env.UPLOAD_PROVIDER,
      files: files.map(f => ({
        id: f.id,
        name: f.name,
        size: f.size,
        mime: f.mime,
        hasFormats: !!(f.formats && Object.keys(f.formats).length > 0)
      }))
    };

    const reportPath = path.join(__dirname, '..', 'reports', 'media-optimization.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📄 Report saved to: ${reportPath}`);

  } catch (error) {
    console.error('❌ Optimization failed:', error);
  } finally {
    process.exit(0);
  }
}

// Cleanup function
async function cleanupUnusedMedia() {
  console.log('🧹 Cleaning up unused media files...');

  try {
    const strapi = require('@strapi/strapi')();
    await strapi.load();

    // Get all media files
    const allFiles = await strapi.plugins.upload.services.upload.findMany({});
    console.log(`Found ${allFiles.length} total media files`);

    // Get all content types that might reference media
    const contentTypes = ['product', 'case-study', 'news', 'global-setting'];
    const usedFileIds = new Set();

    for (const contentType of contentTypes) {
      try {
        const entries = await strapi.entityService.findMany(`api::${contentType}.${contentType}`, {
          populate: '*'
        });

        entries.forEach(entry => {
          // Check all fields for media references
          Object.values(entry).forEach(value => {
            if (value && typeof value === 'object') {
              if (value.id && value.url) {
                // Single media file
                usedFileIds.add(value.id);
              } else if (Array.isArray(value)) {
                // Array of media files
                value.forEach(item => {
                  if (item && item.id && item.url) {
                    usedFileIds.add(item.id);
                  }
                });
              }
            }
          });
        });
      } catch (error) {
        console.log(`⚠️  Could not check ${contentType}: ${error.message}`);
      }
    }

    console.log(`Found ${usedFileIds.size} files in use`);

    // Find unused files
    const unusedFiles = allFiles.filter(file => !usedFileIds.has(file.id));
    console.log(`Found ${unusedFiles.length} unused files`);

    if (unusedFiles.length === 0) {
      console.log('✅ No unused files found');
      return;
    }

    // List unused files
    console.log('\nUnused files:');
    unusedFiles.forEach(file => {
      console.log(`  - ${file.name} (${file.size} bytes, uploaded: ${file.createdAt})`);
    });

    // Note: Actual deletion should be done carefully and with user confirmation
    console.log('\n⚠️  To delete these files, run the cleanup with --delete flag');
    console.log('   (This feature should be implemented with proper safeguards)');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--cleanup')) {
    await cleanupUnusedMedia();
  } else {
    await optimizeExistingMedia();
  }
}

main().catch(console.error);