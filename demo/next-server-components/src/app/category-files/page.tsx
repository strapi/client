import { strapi } from '@strapi/client';
import Image from 'next/image';
import Link from 'next/link';

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
  image: CategoryImage | null;
  createdAt: string;
  updatedAt: string;
}

interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface CategoryResponse {
  data: Category[];
  meta: {
    pagination: PaginationMeta;
  };
}

function CategoryCard({ category }: { category: Category }) {
  const hasImage = category.image;

  return (
    <div key={category.id} className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-4 bg-gray-100">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <p className="text-gray-600">Slug: {category.slug}</p>
      </div>

      {hasImage ? (
        <div className="relative h-48 w-full">
          <Image
            src={`http://localhost:1337${category.image!.url}`}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
            <p>Image: {category.image!.name}</p>
            <p>Size: {formatFileSize(category.image!.size)}</p>
          </div>
        </div>
      ) : (
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>
      )}
    </div>
  );
}

// Helper function to format file sizes in a human-readable format
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

// Mock data for build/fallback
const fallbackCategories: Category[] = [
  {
    id: 1,
    name: 'News',
    slug: 'news',
    image: null,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Tech',
    slug: 'tech',
    image: null,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'Food',
    slug: 'food',
    image: null,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
];

export const revalidate = 60; // Revalidate once per minute

// This page demonstrates interaction with files associated with categories
// It shows how to fetch and display category images
export default async function CategoryFiles() {
  let categories = fallbackCategories;
  let isError = false;
  let errorMessage = '';

  try {
    // Create the Strapi client instance and get the read-only API token from environment variables
    const api_token = process.env.READ_ONLY_TOKEN;

    // Only attempt to fetch data if we have a token and we're not in build time
    if (api_token) {
      const client = strapi({ baseURL: 'http://localhost:1337/api', auth: api_token });

      // Create a collection type query manager for the categories
      const categoriesApi = client.collection('categories');

      // Fetch all categories with their related images
      const result = (await categoriesApi.find({
        populate: ['image'],
      })) as unknown as CategoryResponse;

      if (result && result.data) {
        categories = result.data;
      }
    } else {
      // No token available, likely in build environment
      console.warn('API token not available. Using fallback data.');
      isError = true;
      errorMessage = 'API token not available. This is likely happening during build time.';
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    isError = true;
    errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories with Files</h1>
      <p className="mb-6">
        This example shows how to work with files associated with categories in Strapi.
        <br />
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </p>

      {isError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Note:</p>
          <p>
            {errorMessage}
            <br />
            Showing fallback data instead. When running the application with a proper Strapi server,
            you&apos;ll see real data with images.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">About File Handling</h2>
        <p className="mb-4">This example demonstrates:</p>
        <ul className="list-disc pl-5 mb-6">
          <li>Retrieving categories with their related images</li>
          <li>Displaying image metadata (name, size, etc.)</li>
          <li>Rendering images using Next.js Image component</li>
        </ul>
      </div>
    </div>
  );
}
