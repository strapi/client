const { strapi } = require('@strapi/client');
require('dotenv').config();
const os = require('os');

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

  console.log(os.EOL);
  console.log('=== Basic Category Data ===');
  console.log(os.EOL);

  // Fetch the list of all categories (basic demo)
  const basicCategoryData = await categories.find();
  console.log(`Found ${basicCategoryData.data.length} categories`);

  // Display basic category info
  basicCategoryData.data.forEach((category) => {
    console.log(category);
    console.log(`- ${category.name} (${category.slug})`);
  });

  // Example: Category with image files
  console.log(os.EOL);
  console.log('=== Categories with their images ===');
  console.log(os.EOL);

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
  console.log(os.EOL);
  console.log('=== Direct file queries ===');
  console.log(os.EOL);

  const techCategoryResult = await categories.find({
    filters: {
      slug: {
        $eq: 'tech',
      },
    },
    populate: ['image'],
  });

  if (techCategoryResult.data && techCategoryResult.data.length > 0) {
    const categoryData = techCategoryResult.data[0];
    console.log(`Working with category: ${categoryData.name} (ID: ${categoryData.id})`);

    // Query files directly using the files API
    if (categoryData.image) {
      const imageId = categoryData.image.id;

      // Get the specific file by ID
      const fileInfo = await client.files.findOne(imageId);
      console.log(os.EOL);
      console.log('File details:');
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

  // Example: Update file metadata
  console.log(os.EOL);
  console.log('=== File Update Operations ===');
  console.log(os.EOL);

  if (techCategoryResult.data && techCategoryResult.data.length > 0) {
    const categoryData = techCategoryResult.data[0];

    // Only proceed if the category has an image
    if (categoryData.image) {
      const imageId = categoryData.image.id;
      console.log(`Working with image: ${categoryData.image.name} (ID: ${imageId})`);

      // Update the file metadata
      // For demo purposes, we'll update the alternative text and caption
      const updatedAltText = `Updated alt text for ${categoryData.image.name} - ${new Date().toISOString()}`;
      const updatedCaption = `Updated caption - ${new Date().toISOString()}`;

      console.log(os.EOL);
      console.log('Updating file metadata...');
      console.log(`  New Alt Text: ${updatedAltText}`);
      console.log(`  New Caption: ${updatedCaption}`);

      try {
        const updatedFile = await client.files.update(imageId, {
          alternativeText: updatedAltText,
          caption: updatedCaption,
        });

        console.log(os.EOL);
        console.log('File metadata updated successfully!');
        console.log(`  Name: ${updatedFile.name}`);
        console.log(`  Alternative Text: ${updatedFile.alternativeText || 'None'}`);
        console.log(`  Caption: ${updatedFile.caption || 'None'}`);
        console.log(`  Updated At: ${new Date(updatedFile.updatedAt).toLocaleString()}`);
      } catch (error) {
        console.error('Error updating file:', error);
      }
    } else {
      console.log('No image associated with this category to update');
    }
  } else {
    console.log(
      'Tech category not found. Make sure you have a category with slug "tech" in your Strapi instance.'
    );
  }

  console.log(os.EOL);
  console.log('=== File Deletion Operations ===');
  console.log(os.EOL);

  const getFileThatCanBeDeleted = async () => {
    try {
      const files = await client.files.find();
      if (files && files.length > 0) {
        const fileToDelete = files[0];
        console.log(`Found file to delete: ${fileToDelete.name} (ID: ${fileToDelete.id})`);
        return fileToDelete.id;
      }
      return null;
    } catch (error) {
      console.error('Error finding files:', error);
      return null;
    }
  };

  const PERFORM_ACTUAL_DELETE = true;
  const fileIdToDelete = await getFileThatCanBeDeleted();

  if (fileIdToDelete && PERFORM_ACTUAL_DELETE) {
    console.log(os.EOL);
    console.log(`Attempting to delete file with ID: ${fileIdToDelete}`);

    try {
      const deletedFile = await client.files.delete(fileIdToDelete);
      console.log('Deleted file metadata:', deletedFile);

      console.log(os.EOL);
      console.log(`Attempting to find deleted file with ID: ${fileIdToDelete}`);
      try {
        const file = await client.files.findOne(fileIdToDelete);
        console.error('Unexpected result: File still exists:', file);
      } catch (error) {
        console.log('Expected error: File no longer exists');
        console.log(`Error message: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during file deletion demonstration:', error);
    }
  } else {
    console.log('No files available for deletion demonstration.');
  }
}

main().catch(console.error);
