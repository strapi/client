const { strapi } = require('@strapi/client');
require('dotenv').config();

const api_token = process.env.FULL_ACCESS_TOKEN; // READ_ONLY_TOKEN is also available

console.log('Running with api token ' + api_token);

// Helper function to format file sizes
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

async function main() {
  // Create the Strapi client instance
  const client = strapi({ baseURL: 'http://localhost:1337/api', auth: api_token });

  // Create a collection type query manager for the categories
  const categories = client.collection('categories');

  console.log('\n=== Basic Category Data ===\n');

  // Fetch the list of all categories (basic demo)
  const basicCategoryData = await categories.find();
  console.log(`Found ${basicCategoryData.data.length} categories`);

  // Display basic category info
  basicCategoryData.data.forEach((category) => {
    console.log(category);
    console.log(`- ${category.name} (${category.slug})`);
  });

  // Example: Category with image files
  console.log('\n=== Categories with their images ===\n');

  // Fetch all categories with their related images
  const result = await categories.find({
    populate: ['image'],
  });

  for (const category of result.data) {
    console.log(`Category: ${category.name}`);

    console.log(category);
    // Check if the category has an image
    if (category.image) {
      console.log(`  Image: ${category.image.name}`);
      console.log(`  Format: ${category.image.ext}`);
      console.log(`  Size: ${formatFileSize(category.image.size)}`);
      console.log(`  URL: ${category.image.url}`);
    } else {
      console.log('  No image associated with this category');
    }
    console.log('---');
  }

  // Example: Direct file operations
  console.log('\n=== Direct file queries ===\n');

  const techCategoryResult = await categories.find({
    filters: {
      slug: {
        $eq: 'tech',
      },
    },
    populate: ['image'],
  });

  if (techCategoryResult.data) {
    const categoryData = techCategoryResult.data[0];
    console.log(`Working with category: ${categoryData.name} (ID: ${categoryData.id})`);

    // Query files directly using the files API
    if (categoryData.image) {
      const imageId = categoryData.image.id;

      // Get the specific file by ID
      const fileInfo = await client.files.findOne(imageId);
      console.log('\nFile details:');
      console.log(`  Name: ${fileInfo.name}`);
      console.log(`  Alternative Text: ${fileInfo.alternativeText || 'None'}`);
      console.log(`  Caption: ${fileInfo.caption || 'None'}`);
      console.log(`  Width: ${fileInfo.width}px`);
      console.log(`  Height: ${fileInfo.height}px`);
      console.log(`  Format: ${fileInfo.ext}`);
      console.log(`  Size: ${formatFileSize(fileInfo.size)}`);
      console.log(`  URL: ${fileInfo.url}`);
    }
  }
}

main().catch(console.error);
