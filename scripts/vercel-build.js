#!/usr/bin/env node

// This script is designed to run during Vercel build process
// However, Vercel's build environment may not have ffmpeg installed
// In such cases, we'll provide instructions for manual thumbnail generation

console.log('=== Thumbnail Generation for Vercel Deployment ===');
console.log('');
console.log('Checking for ffmpeg...');

const { execSync } = require('child_process');

try {
  // Check if ffmpeg is available
  execSync('ffmpeg -version', { stdio: 'ignore' });
  console.log('✓ ffmpeg found');
  console.log('');
  console.log('Generating thumbnails...');
  
  // Run the thumbnail generation script
  const { exec } = require('child_process');
  exec('node scripts/generateThumbnails.js', (error, stdout, stderr) => {
    if (error) {
      console.error('Error generating thumbnails:', error);
      process.exit(1);
    }
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
    console.log('✓ Thumbnail generation completed');
  });
} catch (error) {
  console.log('✗ ffmpeg not found in build environment');
  console.log('');
  console.log('For Vercel deployments, please follow these steps:');
  console.log('');
  console.log('1. Generate thumbnails locally:');
  console.log('   npm run generate-thumbnails');
  console.log('');
  console.log('2. Commit the generated thumbnails to your repository:');
  console.log('   git add public/media/thumbnail-*');
  console.log('   git commit -m "Add generated thumbnails for Vercel deployment"');
  console.log('');
  console.log('3. Deploy to Vercel with the thumbnails included');
  console.log('');
  console.log('Alternative approaches:');
  console.log('- Use a third-party service like Cloudinary or Mux for video processing');
  console.log('- Set up a separate server with ffmpeg for thumbnail generation');
  process.exit(0);
}