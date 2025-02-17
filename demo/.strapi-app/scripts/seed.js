'use strict';

const path = require('node:path');

const fse = require('fs-extra');
const mime = require('mime-types');

const { categories, authors, articles, global, about } = require('../data/data.json');

/**
 * Types Definition
 * @typedef {import('@strapi/strapi').Core.Strapi} Strapi
 * @typedef {{ filepath: string; mimetype: string; originalFileName: string; size: number }} FileMetadata
 */

// CONSTANTS
const DEMO_FOLDER_PATH = path.join(__dirname, '..', '..');
const UP_ROLE_UID = 'plugin::users-permissions.role';
const UP_PERMISSION_UID = 'plugin::users-permissions.permission';
const FILE_UID = 'plugin::upload.file';

// FILES MANIPULATION

/**
 * A utility class for handling file operations including path resolution,
 * file metadata extraction, size calculation, and file uploads.
 */
class FileHandler {
  static DEFAULT_UPLOAD_FOLDER_PATH = path.join(__dirname, '..', 'data', 'uploads');

  uploadsPath;

  constructor(uploadsPath = FileHandler.DEFAULT_UPLOAD_FOLDER_PATH) {
    this.uploadsPath = uploadsPath;
  }

  /**
   * Constructs the full path by combining the upload directory path with the given filename.
   *
   * @param {string} filename - The name of the file to append to the uploads path.
   * @return {string} The full path to the file.
   */
  filePath(filename) {
    return path.join(this.uploadsPath, filename);
  }

  /**
   * Retrieves the size of a specified file in bytes.
   *
   * @param {string} filename - The name of the file to determine the size for.
   * @return {number} The size of the file in bytes.
   */
  fileSize(filename) {
    const filePath = this.filePath(filename);
    const { size } = fse.statSync(filePath);

    return size;
  }

  /**
   * Retrieves metadata information for a given file.
   *
   * @param {string} filename - The name of the file for which metadata is to be retrieved.
   * @return {FileMetadata} An object containing metadata of the file.
   */
  fileMetadata(filename) {
    const filepath = this.filePath(filename);
    const size = this.fileSize(filename);
    const ext = path.extname(filename).slice(1);
    const mimetype = mime.lookup(ext || '') || '';

    return { filepath, mimetype, originalFileName: filename, size };
  }

  /**
   * Uploads a file to the upload service with associated metadata.
   *
   * @param {FileMetadata} file - The file to be uploaded.
   * @param {string} name - The name of the file used for metadata such as alternative text, caption, and filename.
   * @return {Promise<Object>} - A promise resolving to the response from the upload service.
   */
  static async upload(file, name) {
    return app
      .plugin('upload')
      .service('upload')
      .upload({
        files: file,
        data: {
          fileInfo: {
            alternativeText: `An image uploaded to Strapi called ${name}`,
            caption: name,
            name,
          },
        },
      });
  }

  /**
   * Synchronizes a list of files by checking whether they already exist and uploading them if they do not.
   *
   * @param {string[]} files - An array of file names to be synchronized.
   * @return {Object|Array} - Returns a single file object if only one file is processed,
   *                          otherwise an array of processed file objects containing both existing and newly uploaded files.
   */
  async sync(files) {
    const existingFiles = [];
    const uploadedFiles = [];

    const filesBackup = [...files];

    for (const filename of filesBackup) {
      // Check if the file already exists in Strapi
      const match = await strapi
        .query(FILE_UID)
        // Try finding the file by name without its extension
        .findOne({
          where: {
            name: filename.replace(/\..*$/, ''),
          },
        });

      // File exists, don't upload it
      if (match) {
        existingFiles.push(match);
      }

      // File doesn't exist, upload it
      else {
        const metadata = this.fileMetadata(filename);
        const filenameWithoutExtension = filename.replace(/\.[^.]*$/, '');

        const [file] = await FileHandler.upload(metadata, filenameWithoutExtension);

        uploadedFiles.push(file);
      }
    }

    const processedFiles = [...existingFiles, ...uploadedFiles];

    // If there is only one file, then return only that file
    return processedFiles.length === 1 ? processedFiles[0] : processedFiles;
  }
}

/**
 * Initializes and configures a Strapi app.
 * It compiles the Strapi app, loads it, seeds the database with initial data, and performs cleanup before exiting.
 *
 * @overview
 * This function is responsible for:
 * - Compiling and initializing a Strapi app.
 * - Setting the logging level of the app.
 * - Seeding the app's database with example content, if it is the first run.
 * - Cleaning up and shutting down the app gracefully.
 *
 * @async
 *
 * @example
 * // Run the main function to set up and configure the Strapi app
 * main()
 *   .then(() => console.log("Setup completed successfully"))
 *   .catch((error) => console.error("An error occurred during initialization:", error));
 *
 * @throws {Error} If the Strapi app fails to load, data seeding fails, or the cleanup process encounters an error.
 */
async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedExampleApp();

  await app.destroy();

  process.exit(0);
}

// UTILS

/**
 * Seeds the example app by importing seed data and initializing API tokens.
 * This operation is performed only if it is the first run.
 *
 * @return {Promise<void>} A promise that resolves when the seeding process is complete.
 */
async function seedExampleApp() {
  const shouldImportSeedData = await isFirstRun();

  if (!shouldImportSeedData) {
    console.log(
      'Seed data has already been imported. It cannot be imported again without clearing the database first.'
    );
    process.exit(0);
  }

  try {
    console.log('Importing the seed data...');
    await importSeedData();

    console.log('Initializing API tokens...');
    await createDefaultAPITokens();

    console.log('The app has been seeded successfully');
  } catch (error) {
    console.error('Could not import seed data');
    console.error(error);
  }
}

/**
 * Checks if this is the first execution of the "init" setup process using the core store.
 *
 * @note If the setup has not been previously run, it updates the store to mark the setup as initialized.
 *
 * @return {Promise<boolean>} A promise that resolves to `true` if it is the first run, or `false` otherwise.
 */
async function isFirstRun() {
  const pluginStore = app.store({
    environment: app.config.environment,
    type: 'type',
    name: 'setup',
  });

  const initHasRun = await pluginStore.get({ key: 'initHasRun' });

  if (!initHasRun) {
    await pluginStore.set({ key: 'initHasRun', value: true });
  }

  return !initHasRun;
}

// PERMISSIONS

/**
 * Sets permissions for the public role by updating the Strapi permissions model with the provided actions.
 *
 * @param {Record<string, string[]>} permissions An object defining permissions where keys refer to a controller name and values to an array of its action
 * @return {Promise<void>} A promise that resolves when all permissions have been successfully created.
 *
 * @throws {Error} Throw an error if the public role is not found.
 */
async function setPublicPermissions(permissions) {
  // Find the ID of the public role
  const publicRole = await app.db.query(UP_ROLE_UID).findOne({ where: { type: 'public' } });

  if (!publicRole) {
    throw new Error('Public role not found, exiting...');
  }

  const { id: publicRoleID } = publicRole;

  // Create the new permissions and link them to the public role
  const createPublicPermissionQueries = [];

  Object.keys(permissions).map((controller) => {
    // create, update, delete, etc
    const actions = permissions[controller];

    const queries = actions
      // Map actions to IDs
      .map((action) => `api::${controller}.${controller}.${action}`)
      // Create the permission
      .map((action) => {
        return app.db.query(UP_PERMISSION_UID).create({ data: { action, role: publicRoleID } });
      });

    createPublicPermissionQueries.push(...queries);
  });

  await Promise.all(createPublicPermissionQueries);
}

/**
 * Creates API tokens for specified access types and updates the .env files in demo directories with the generated tokens.
 *
 * @return {Promise<void>} A promise resolving when the API tokens have been created and .env files have been updated.
 */
async function createDefaultAPITokens() {
  const apiTokenService = app.service('admin::api-token');

  const tokenTypes = [
    { name: 'Full Access Token', type: 'full-access' },
    { name: 'Read Only Token', type: 'read-only' },
  ];

  const demoDirectories = findDemoDirectories();
  const envPaths = demoDirectories.map((dir) => path.join(dir, '.env'));

  for (const tokenType of tokenTypes) {
    // Create the token
    let token = await apiTokenService.create({
      name: tokenType.name,
      description: `Token for ${tokenType.type} access`,
      type: tokenType.type,
      lifespan: null,
    });

    console.log(
      `Generated a new API Token named "${token.name}" (${token.type}): ${token.accessKey}`
    );

    // Update .env files
    const envKey = `${tokenType.type.toUpperCase().replace('-', '_')}_TOKEN`;

    for (const envPath of envPaths) {
      updateEnvFile(envPath, envKey, token.accessKey);
    }
  }
}

// DATA

/**
 * Imports seed data into the app by setting public permissions
 * for specific models and creating initial entries for them
 *
 * @return {Promise<void>} Resolves when all seed data has been successfully imported.
 */
async function importSeedData() {
  // Allow public "find one" queries on every model
  await setPublicPermissions({
    article: ['findOne'],
    category: ['findOne'],
    author: ['findOne'],
    global: ['findOne'],
    about: ['findOne'],
  });

  // Create all entries
  await importCategories();
  await importAuthors();
  await importArticles();
  await importGlobal();
  await importAbout();
}

/**
 * Creates a new entry for the specified model in the database.
 *
 * @param {Object} options - The options for creating the entry.
 * @param {string} options.model - The name of the model for which the entry is created.
 * @param {Object} options.entry - The data object representing the entry to be created.
 *
 * @return {Promise<void>} A promise that resolves when the entry has been successfully created, or rejects with an error if the operation fails.
 */
async function createEntry({ model, entry }) {
  const uid = `api::${model}.${model}`;

  try {
    await app.documents(uid).create({ data: entry });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

/**
 * Updates the given blocks (dynamic zone) by synchronizing files associated with them and modifying their structures accordingly.
 *
 * Handles specific types of blocks like media and slider, ensuring relevant files are updated or uploaded.
 *
 * Blocks not recognized by the function are returned as-is.
 *
 * @param {Array<Object>} blocks - An array of block objects to be processed. Each block contains a `__component` property indicating its type.
 *
 * @return {Promise<Array<Object>>} A promise resolving to an array of updated block objects with synchronized file data.
 */
async function updateBlocks(blocks) {
  const updatedBlocks = [];

  for (const block of blocks) {
    switch (block.__component) {
      case 'shared.media':
        const uploadedFiles = await fileHandler.sync([block.file]);

        // Copy the block to not mutate directly
        const clonedMedia = { ...block };

        // Replace the filename on the block with the actual file
        clonedMedia.file = uploadedFiles;

        updatedBlocks.push(clonedMedia);
        break;
      case 'shared.slider':
        // Get files already uploaded to Strapi or upload new files
        const existingAndUploadedFiles = await fileHandler.sync(block.files);

        // Copy the block to not mutate directly
        const clonedSlider = { ...block };

        // Replace the file names on the block with the actual files
        clonedSlider.files = existingAndUploadedFiles;

        // Push the updated block
        updatedBlocks.push(clonedSlider);
        break;
      default:
        // Push the block as is
        updatedBlocks.push(block);
        break;
    }
  }

  return updatedBlocks;
}

/**
 * Imports articles by processing their blocks, synchronizing their cover images,
 * and creating new entries with the necessary updates.
 *
 * @return {Promise<void>} Resolves when all articles have been successfully imported.
 */
async function importArticles() {
  for (const article of articles) {
    const cover = await fileHandler.sync([`${article.slug}.jpg`]);
    const updatedBlocks = await updateBlocks(article.blocks);

    await createEntry({
      model: 'article',
      entry: {
        ...article,
        // Overrides
        blocks: updatedBlocks,
        cover,
        // Make sure it is not a draft
        publishedAt: Date.now(),
      },
    });
  }
}

/**
 * Imports and synchronizes global settings including favicon and default share image.
 *
 * Retrieves the global "favicon" and "share" image, synchronizes them,
 * and creates or updates the global entry with the modified SEO and publishing settings.
 *
 * @return {Promise<Object>} A promise that resolves to the created or updated global entry object.
 */
async function importGlobal() {
  const favicon = await fileHandler.sync(['favicon.png']);
  const shareImage = await fileHandler.sync(['default-image.png']);

  return createEntry({
    model: 'global',
    entry: {
      ...global,
      // Overrides
      defaultSeo: { ...global.defaultSeo, shareImage },
      favicon,
      // Make sure it is not a draft
      publishedAt: Date.now(),
    },
  });
}

/**
 * Imports and updates the "about" entry by modifying its blocks and ensuring the entry is not in draft status.
 *
 * @return {Promise<void>} A promise that resolves when the "about" entry has been successfully imported and updated.
 */
async function importAbout() {
  const updatedBlocks = await updateBlocks(about.blocks);

  await createEntry({
    model: 'about',
    entry: {
      ...about,
      // Overrides
      blocks: updatedBlocks,
      // Make sure it is not a draft
      publishedAt: Date.now(),
    },
  });
}

/**
 * Imports a list of categories by creating entries for each category.
 *
 * @return {Promise<void>} A promise that resolves when all categories have been imported.
 */
async function importCategories() {
  for (const category of categories) {
    await createEntry({ model: 'category', entry: category });
  }
}

/**
 * Imports authors into the system by processing their data, synchronizing their avatar files,
 * and creating entries for each author in the specified model.
 *
 * @return {Promise<void>} A promise that resolves when all authors have been successfully processed and imported.
 */
async function importAuthors() {
  for (const author of authors) {
    const avatar = await fileHandler.sync([author.avatar]);

    await createEntry({ model: 'author', entry: { ...author, avatar } });
  }
}

// ENV

/**
 * Updates or adds a key-value pair in the specified environment (.env) file.
 *
 * If the key already exists, its value is updated; else it is appended at the end of the file.
 *
 * @param {string} filePath - The path to the environment file.
 * @param {string} key - The environment variable key to update or add.
 * @param {string} value - The value to set for the environment variable key.
 * @return {void}
 */
function updateEnvFile(filePath, key, value) {
  const fileExists = fse.existsSync(filePath);

  if (!fileExists) {
    console.error(
      `Couldn't add the ${key} ENV variable to "${filePath}" because the file doesn't exist`
    );
    return;
  }

  const env = fse.readFileSync(filePath, 'utf8');
  const envLines = env.split('\n');

  const keyIndex = envLines.findIndex((line) => line.startsWith(`${key}=`));

  // The key already exists, update it
  if (keyIndex !== -1) {
    envLines[keyIndex] = `${key}=${value}`;
  }
  // The key doesn't exist, create it
  else {
    envLines.push(`${key}=${value}`);
  }

  // Save the modified env content back to the file
  const updatedEnv = envLines.join('\n');
  fse.writeFileSync(filePath, updatedEnv, 'utf8');
}

// UTILS

/**
 * Finds and returns the paths of all demo directories within the demo root folder
 *
 * Only includes directories that aren't hidden
 *
 * @return {string[]} An array of relative paths to the demo directories.
 */
function findDemoDirectories() {
  return fse
    .readdirSync(DEMO_FOLDER_PATH, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => !dirent.name.startsWith('.'))
    .map((dirent) => path.join(DEMO_FOLDER_PATH, dirent.name));
}

// ENTRYPOINT

/** @type {Strapi} */
let app;

const fileHandler = new FileHandler();

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
