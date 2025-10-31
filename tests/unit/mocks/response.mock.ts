import { vi } from 'vitest';

export const mockResponse = (status: number, statusText: string): Response => ({
  status,
  statusText,
  headers: new Headers(),
  ok: status >= 200 && status < 300,
  redirected: false,
  type: 'basic',
  url: 'https://example.com',
  clone: vi.fn(),
  body: null,
  bodyUsed: false,
  text: vi.fn().mockResolvedValue(''),
  json: vi.fn().mockResolvedValue({}),
  blob: vi.fn().mockResolvedValue(new Blob()),
  bytes: vi.fn().mockResolvedValue(new Uint8Array()),
  formData: vi.fn().mockResolvedValue(new FormData()),
  arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
});
