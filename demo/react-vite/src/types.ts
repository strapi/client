export interface File {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: Record<string, FileFormat>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileFormat {
  ext: string;
  hash: string;
  height: number;
  width: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: File | null;
  createdAt: string;
  updatedAt: string;
}

export type QueryParam = 'populate' | 'fields' | 'sort' | 'filters';
