import * as dotenv from 'dotenv';
import * as os from 'os';
import createClient, { paths } from './strapi-client/index.js';
import { CLIENT, HTTPError } from '../../../dist/exports.js';
dotenv.config();

const api_token = process.env.FULL_ACCESS_TOKEN; // READ_ONLY_TOKEN is also available

console.log('Running with api token ' + api_token);

// Create the Strapi client instance
// const client = strapi({ baseURL: 'http://localhost:1337/api', auth: api_token });
const client = createClient({ baseURL: 'http://localhost:1337/api', auth: api_token });

async function runDemo() {
  await demonstrateCollection();
  await demonstrateFetch();
}

async function demonstrateCollection() {
  console.log(os.EOL);
  console.log('=== Basic Category Data ===');
  console.log(os.EOL);

  const categories = client.collection('tests');

  const testDocs = await categories.find();

  console.log(`Found ${testDocs.data.length} tests:`);
  testDocs.data.forEach((test) => {
    console.log(`- ${test.documentId} (${test.test})`);
  });
}

async function demonstrateFetch() {
  console.log(os.EOL);
  console.log('=== Basic Category Data ===');
  console.log(os.EOL);

  // fetch example
  const requestResult = await client.fetch('/tests/{id}', {
    method: 'get',
    parameters: {
      path: {
        id: 'k3a31s6hkab6h6xn464pk47q',
      },
      query: {
        fields: ['test'],
        populate: '*',
      },
    },
  });
  const requestResultData = await requestResult.json();
  console.log('Request result:', requestResultData);

  // fetch example
  const imageCreationResult = await client.fetch('/', {
    method: 'post',
    body: new FormData(),
  });
  const imageCreationResultData = await imageCreationResult.json();

  // login example
  let loginResult: Promise<Response> | null = null;
  try {
    loginResult = client.fetch('/auth/local', {
      method: 'post',
      body: {
        identifier: 'demo_user',
        password: 'demo_password',
      },
    });
    const loginResultData = await (await loginResult).json();

    console.log('Login result:', loginResultData);
  } catch (error) {
    const e = error as HTTPError;
    console.error('Login error:', e.message);
    if (e.response) {
      const errorData = await e.response.json();
      console.error('Login error response text:', errorData);
    }
  }
}

runDemo();
