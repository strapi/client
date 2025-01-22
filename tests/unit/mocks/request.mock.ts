export const mockRequest = (method: string, url: string): Request => ({
  method,
  url,
  headers: new Headers(),
  redirect: 'follow',
  clone: jest.fn(),
  body: null,
  bodyUsed: false,
  cache: 'default',
  credentials: 'same-origin',
  integrity: '',
  keepalive: false,
  mode: 'same-origin',
  referrer: '',
  referrerPolicy: 'no-referrer',
  destination: '',
  signal: AbortSignal.any([]),
  arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
  blob: jest.fn().mockResolvedValue(new Blob()),
  bytes: jest.fn().mockResolvedValue(new Uint8Array()),
  formData: jest.fn().mockResolvedValue(new FormData()),
  text: jest.fn().mockResolvedValue(''),
  json: jest.fn().mockResolvedValue({}),
});
