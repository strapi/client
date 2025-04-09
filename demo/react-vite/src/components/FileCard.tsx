import type { File } from '@/types.ts';
import { BASE_URL } from '@/utils/constants.ts';
import React from 'react';

interface FileCardProps {
  file: File;
}

export const FileCard: React.FC<FileCardProps> = ({ file }) => (
  <div
    key={file.id}
    className="p-4 bg-[var(--bg-secondary)] shadow-lg rounded-lg border border-[var(--bg-tertiary)] hover:shadow-[0px_0px_70px_0px_var(--neon-orange)] hover:scale-105 transition duration-300"
  >
    <img
      src={`${BASE_URL}${file.url}`}
      alt={file.alternativeText || file.name}
      className="w-full h-32 object-cover rounded"
    />
    <h2 className="mt-2 text-lg font-semibold text-white capitalize">{file.name}</h2>
    <p className="text-sm text-gray-300">Size: {file.size} KB</p>
  </div>
);
