# Thumbnail Generation for Vercel Deployment

## Overview

This portfolio uses ffmpeg to generate thumbnails from video files. However, Vercel's serverless environment has limitations that make it challenging to run ffmpeg directly during deployment.

## Recommended Approaches

### 1. Local Generation (Recommended)

Generate thumbnails locally and commit them to your repository:

```bash
# 1. Run the thumbnail generation script
npm run generate-thumbnails

# 2. Commit the generated thumbnails
git add public/media/thumbnail-*
git commit -m "Add generated thumbnails for Vercel deployment"

# 3. Deploy to Vercel
git push origin main
```

This approach ensures that thumbnails are available immediately when the site is deployed.

### 2. Build-time Generation

The project includes a prebuild script that attempts to generate thumbnails during the Vercel build process. However, this will only work if ffmpeg is available in the build environment.

If ffmpeg is not available, the build will still succeed but will display instructions for manual generation.

### 3. Third-party Services

For a more robust solution, consider using a third-party service for video processing:

- **Cloudinary**: Offers video processing and thumbnail generation
- **Mux**: Specialized in video infrastructure
- **AWS MediaConvert**: Amazon's video processing service

## Vercel Configuration

To ensure proper deployment, make sure your `vercel.json` file (if it exists) includes the media directory:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["public/**"]
      }
    }
  ]
}
```

## Troubleshooting

### ffmpeg not found during build

If you see "ffmpeg not found" during the Vercel build process:

1. Follow the manual generation steps above
2. Consider using a third-party service for video processing

### Thumbnails not displaying

If thumbnails are not displaying after deployment:

1. Verify that thumbnail files exist in `public/media/`
2. Check that the filenames match the references in `src/data.json`
3. Ensure the media directory is included in the deployment

## Best Practices

1. Always generate thumbnails locally before major updates
2. Keep thumbnail filenames consistent with video filenames
3. Regularly update thumbnails when video content changes
4. Consider implementing a CI/CD pipeline that automates thumbnail generation