import * as dotenv from 'dotenv';
import { strapi } from '@strapi/client';
import Link from 'next/link';

dotenv.config();

export const revalidate = 60; // Revalidate this page once per minute

// Define article interface for type safety
interface Article {
  id: number;
  title: string;
  description?: string;
  slug: string;
  createdAt: string;
}

// Sample fallback data for when the API is unavailable (e.g., during build)
const fallbackData: Article[] = [
  {
    id: 1,
    title: "What's inside a Black Hole",
    description: 'Maybe the answer is in this article, or not...',
    slug: 'what-s-inside-a-black-hole',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: "The internet's Own boy",
    description: 'Follow the story of Aaron Swartz, the boy who could change the world',
    slug: 'the-internet-s-own-boy',
    createdAt: '2023-01-02T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'A bug is becoming a meme on the internet',
    description: 'How a bug on MySQL is becoming a meme on the internet',
    slug: 'a-bug-is-becoming-a-meme-on-the-internet',
    createdAt: '2023-01-03T00:00:00.000Z',
  },
];

export default async function Home() {
  let articles = fallbackData;
  let isError = false;
  let errorMessage = '';

  try {
    const api_token = process.env.FULL_ACCESS_TOKEN; // READ_ONLY_TOKEN is also available

    // Only attempt to fetch if we have a token
    if (api_token) {
      console.log('Running with api token ' + api_token);

      // Create the Strapi client instance
      const client = strapi({
        baseURL: 'http://localhost:1337/api',
        auth: api_token,
      });

      // Create a collection type query manager for the articles
      const articlesApi = client.collection('articles');

      // Fetch the list of all articles
      const result = await articlesApi.find({ status: 'draft' });

      if (result && result.data) {
        articles = result.data as unknown as Article[];
      }
    } else {
      console.warn('API token not available. Using fallback data.');
      isError = true;
      errorMessage = 'API token not available. This is likely happening during build time.';
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl">
        {isError && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p className="font-bold">Note:</p>
            <p>
              {errorMessage}
              <br />
              Showing fallback data. When running with a proper Strapi server, you&apos;ll see real
              data.
            </p>
          </div>
        )}

        {articles.map((article) => (
          <div
            key={article.id}
            className="border-b border-gray-200 py-4 px-6 hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-bold text-gray-800 capitalize">{article.title}</h2>
            {article.description && <p className="text-gray-600">{article.description}</p>}
            <p className="text-gray-500 text-sm">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        <ul className="mt-4">
          <li className="mb-2">
            <Link href="/category-files" className="text-blue-500 hover:underline">
              View categories with their images
            </Link>
          </li>
        </ul>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-center p-4">
        <p className="text-red-600 font-bold text-2xl">
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        {error instanceof Error && 'cause' in error ? (
          <p className="text-red-500 mt-2 text-lg">Cause: {error.cause?.toString()}</p>
        ) : null}
      </div>
    );
  }
}
