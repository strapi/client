import { FileCard } from '@/components/FileCard.tsx';

import type { File } from '@/types.ts';
import React from 'react';

interface FileGalleryProps {
  files: File[];
}

export const FileGallery: React.FC<FileGalleryProps> = ({ files }) => (
  <div className="mt-16 grid grid-cols-3 gap-10 w-full max-w-4xl">
    {files.map((file) => (
      <FileCard file={file} key={file.id} />
    ))}
  </div>
);
