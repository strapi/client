import { strapi } from '@strapi/client';
import * as dotenv from 'dotenv';
dotenv.config();

const api_token = process.env.FULL_ACCESS_TOKEN; // READ_ONLY_TOKEN is also available

console.log('Running with api token ' + api_token);

// Create the Strapi client instance
const client = strapi({ baseURL: 'http://localhost:1337/api', auth: api_token });

// Type definitions based on the actual response structure
interface CategoryImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: CategoryImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface CategoryResponse {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface FileAttributes {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

async function runDemo() {
  await demonstrateBasicCategoryFunctionality();
  await demonstrateCategoryImageInteractions();
  await demonstrateDirectFileOperations();
}

// Demonstrate basic category functionality
async function demonstrateBasicCategoryFunctionality() {
  console.log('\n=== Basic Category Data ===\n');

  // Create a collection type query manager for the categories
  const categories = client.collection('categories');

  // Fetch the list of all categories
  const categoryDocs = (await categories.find()) as unknown as CategoryResponse;

  console.log(`Found ${categoryDocs.data.length} categories:`);
  categoryDocs.data.forEach((category) => {
    console.log(`- ${category.name} (${category.slug})`);
  });
}

// Demonstrate category image interactions
async function demonstrateCategoryImageInteractions() {
  console.log('\n=== Categories with their images ===\n');

  const categories = client.collection('categories');

  // Fetch all categories with their related images
  const result = (await categories.find({
    populate: ['image'],
  })) as unknown as CategoryResponse;

  for (const category of result.data) {
    console.log(`Category: ${category.name}`);

    // Check if the category has an image
    if (category.image) {
      console.log(`  Image: ${category.image.name}`);
      console.log(`  Format: ${category.image.ext}`);
      console.log(`  Size: ${formatFileSize(category.image.size)}`);
      console.log(`  URL: ${category.image.url}`);
    } else {
      console.log('  No image associated with this category');
    }
  }
}

// Demonstrate direct file operations
async function demonstrateDirectFileOperations() {
  console.log('\n=== Direct file queries ===\n');

  const categories = client.collection('categories');

  // Get a specific category using find with a filter (matching the JS example)
  const techCategoryResult = (await categories.find({
    filters: {
      slug: {
        $eq: 'tech',
      },
    },
    populate: ['image'],
  })) as unknown as CategoryResponse;

  if (techCategoryResult.data && techCategoryResult.data.length > 0) {
    const categoryData = techCategoryResult.data[0];
    console.log(`Working with category: ${categoryData.name} (ID: ${categoryData.id})`);

    // Query files directly using the files API
    if (categoryData.image) {
      const imageId = categoryData.image.id;

      // Get the specific file by ID
      const fileInfo = (await client.files.findOne(imageId)) as unknown as FileAttributes;
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
