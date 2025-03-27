import { FileResponse } from '../../src/files/types';

// Mock file data for testing
export const mockFile: FileResponse = {
  id: 1,
  documentId: 'doc123',
  name: 'test-file.jpg',
  alternativeText: 'Test image',
  caption: 'A test image caption',
  width: 800,
  height: 600,
  hash: 'hash_12345',
  ext: '.jpg',
  mime: 'image/jpeg',
  url: 'https://example.com/uploads/test-file.jpg',
  size: 12345,
  provider: 'local',
  previewUrl: null,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

// Mock file list for testing
export const mockFiles = [
  mockFile,
  {
    ...mockFile,
    id: 2,
    name: 'another-file.pdf',
    ext: '.pdf',
    mime: 'application/pdf',
    url: 'https://example.com/uploads/another-file.pdf',
    width: 0,
    height: 0,
  },
];
