import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory paths
const mediaDir = path.join(__dirname, '..', 'media');
const thumbnailPrefix = 'thumbnail-';

// Get all video files in the media directory
const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
const videoFiles = fs.readdirSync(mediaDir).filter(file => 
  videoExtensions.includes(path.extname(file).toLowerCase())
);

console.log(`Found ${videoFiles.length} video files to process`);

// Function to generate thumbnail for a video file
const generateThumbnail = (videoFile) => {
  return new Promise((resolve, reject) => {
    const videoPath = path.join(mediaDir, videoFile);
    const fileNameWithoutExt = path.parse(videoFile).name;
    const thumbnailName = `${thumbnailPrefix}${fileNameWithoutExt}.jpg`;
    const thumbnailPath = path.join(mediaDir, thumbnailName);
    
    // Check if thumbnail already exists
    if (fs.existsSync(thumbnailPath)) {
      console.log(`Thumbnail already exists for ${videoFile}`);
      resolve(thumbnailName);
      return;
    }
    
    // Generate thumbnail at 1 second mark with quality settings
    const command = `ffmpeg -ss 00:00:01 -i "${videoPath}" -vframes 1 -q:v 2 "${thumbnailPath}"`;
    
    console.log(`Generating thumbnail for ${videoFile}...`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating thumbnail for ${videoFile}:`, error);
        reject(error);
        return;
      }
      
      if (stderr && !stderr.includes('speed') && !stderr.includes('time=')) {
        console.error(`FFmpeg stderr for ${videoFile}:`, stderr);
      }
      
      console.log(`Generated thumbnail: ${thumbnailName}`);
      resolve(thumbnailName);
    });
  });
};

// Process all video files
const processVideos = async () => {
  console.log('Starting thumbnail generation process...');
  
  try {
    for (const videoFile of videoFiles) {
      try {
        await generateThumbnail(videoFile);
      } catch (error) {
        console.error(`Failed to generate thumbnail for ${videoFile}:`, error.message);
      }
    }
    
    console.log('Thumbnail generation completed!');
  } catch (error) {
    console.error('Error during thumbnail generation:', error);
  }
};

// Run the process
processVideos();