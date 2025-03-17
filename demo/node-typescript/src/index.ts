import { strapi } from '@strapi/client';
import * as dotenv from 'dotenv';
dotenv.config();

const api_token = process.env.FULL_ACCESS_TOKEN; // READ_ONLY_TOKEN is also available

console.log('Running with api token ' + api_token);

// Create the Strapi client instance
const client = strapi({ baseURL: 'http://localhost:1337/api', auth: api_token });

async function runDemo() {
  console.log('=== Collection Type Demo ===');

  // Create a collection type query manager for the categories
  const categories = client.collection('categories');

  // Fetch the list of all categories
  const docs = await categories.find();

  console.dir(docs, { depth: null });

  // Running the files demo if the --files flag is provided
  // This way we can run either just the basic demo or include the files demo
  console.log('\n\n=== Files Demo ===');

  // Find all files
  console.log('\n1. Finding all files:');
  try {
    const allFiles = await client.files.find();
    console.log(`Found ${allFiles.length} files`);
    console.log('Files:');
    allFiles.forEach((file) => {
      console.log(`- ${file.name} (${file.mime}, ${formatFileSize(file.size)})`);
    });
  } catch (error) {
    console.error('Error finding files:', error);
  }

  // Find files with filtering
  console.log('\n2. Finding image files:');
  try {
    const imageFiles = await client.files.find({
      filters: {
        mime: { $contains: 'image' }, // Only get image files
      },
      sort: ['name:asc'], // Sort by name in ascending order
    });
    console.log(`Found ${imageFiles.length} image files`);
    console.log('Image files:');
    imageFiles.forEach((file) => {
      console.log(`- ${file.name} (${file.mime}, ${formatFileSize(file.size)})`);
    });
  } catch (error) {
    console.error('Error finding image files:', error);
  }

  // Find a specific file (if files exist)
  console.log('\n3. Finding a specific file by ID:');
  try {
    const allFiles = await client.files.find();
    if (allFiles.length > 0) {
      const fileId = allFiles[0].id;
      console.log(`Getting file with ID ${fileId}`);

      const file = await client.files.findOne(fileId);
      console.log('File details:');
      console.log(`- Name: ${file.name}`);
      console.log(`- MIME: ${file.mime}`);
      console.log(`- Size: ${formatFileSize(file.size)}`);
      console.log(`- URL: ${file.url}`);

      if (file.formats) {
        console.log('- Formats:');
        Object.entries(file.formats).forEach(([key, format]) => {
          // @ts-ignore - format has dynamic structure
          console.log(`  * ${key}: ${format.url} (${format.width}x${format.height})`);
        });
      }
    } else {
      console.log('No files available to retrieve by ID');
    }
  } catch (error) {
    console.error('Error finding specific file:', error);
  }

  // Test error handling for invalid fileId
  console.log('\n4. Testing invalid file ID error handling:');
  try {
    console.log('Attempting to get file with invalid ID (0):');
    await client.files.findOne(0);
  } catch (error: any) {
    console.error('Error as expected:', error.message);
  }

  try {
    console.log('Attempting to get file with non-existent ID (999999):');
    await client.files.findOne(999999);
  } catch (error: any) {
    console.error('Error as expected:', error.message);
  }

  // Test error handling for invalid query parameters
  console.log('\n5. Testing invalid query parameters error handling:');
  try {
    console.log('Attempting to find files with invalid filters:');
    // @ts-ignore - deliberately passing invalid type for testing
    await client.files.find({ filters: 'invalid' });
  } catch (error: any) {
    console.error('Error as expected:', error.message);
  }

  try {
    console.log('Attempting to find files with invalid sort:');
    // @ts-ignore - deliberately passing invalid type for testing
    await client.files.find({ sort: 123 });
  } catch (error: any) {
    console.error('Error as expected:', error.message);
  }
}

// Helper function to format file sizes
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

// Run the demo
runDemo()
  .then(() => {
    console.log('\nDemo completed successfully!');
  })
  .catch((error) => {
    console.error('Error running demo:', error);
  });
