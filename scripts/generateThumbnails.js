import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory paths - generate thumbnails in public/media directory
const mediaDir = path.join(__dirname, '..', 'public', 'media');
const thumbnailPrefix = 'thumbnail-';

// Get all video files in the media directory
const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
const videoFiles = fs.readdirSync(mediaDir).filter(file => 
  videoExtensions.includes(path.extname(file).toLowerCase())
);

console.log(`Found ${videoFiles.length} video files to process`);

// Function to get video duration
const getVideoDuration = (videoPath) => {
  return new Promise((resolve, reject) => {
    const command = `ffmpeg -i "${videoPath}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ,`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      
      const duration = stdout.trim();
      if (!duration) {
        reject(new Error('Could not determine video duration'));
        return;
      }
      
      resolve(duration);
    });
  });
};

// Function to convert time format to seconds
const timeToSeconds = (time) => {
  const parts = time.split(':');
  if (parts.length !== 3) return 0;
  
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseFloat(parts[2]);
  
  return hours * 3600 + minutes * 60 + seconds;
};

// Function to convert seconds to time format
const secondsToTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
};

// Function to generate thumbnail for a video file
const generateThumbnail = async (videoFile) => {
  return new Promise(async (resolve, reject) => {
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
    
    try {
      // Get video duration
      const durationStr = await getVideoDuration(videoPath);
      console.log(`Duration of ${videoFile}: ${durationStr}`);
      
      // Convert to seconds and get halfway point
      const durationSeconds = timeToSeconds(durationStr);
      const halfwayPoint = durationSeconds / 2;
      const halfwayTime = secondsToTime(halfwayPoint);
      
      // Generate thumbnail at halfway point with quality settings
      const command = `ffmpeg -ss ${halfwayTime} -i "${videoPath}" -vframes 1 -q:v 2 "${thumbnailPath}"`;
      
      console.log(`Generating thumbnail for ${videoFile} at ${halfwayTime}...`);
      
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
    } catch (error) {
      console.error(`Error getting duration for ${videoFile}:`, error.message);
      reject(error);
    }
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