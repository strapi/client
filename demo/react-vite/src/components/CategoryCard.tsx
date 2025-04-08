import type { Category } from '@/types.ts';
import { BASE_URL } from '@/utils/constants';
import React from 'react';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <>
    <h2 className="text-xl font-bold text-text-primary capitalize mb-2">{category.name}</h2>
    {category.image && (
      <img
        src={`${BASE_URL}${category.image.url}`}
        alt={category.image.alternativeText ?? category.name}
        className="w-full h-auto mb-4 rounded-lg shadow-md"
      />
    )}
    <p className="text-sm text-text-secondary mb-1">Slug: {category.slug ?? 'N/A'}</p>
    <p className="text-xs text-[var(--text-secondary)]">
      Created At: {category.createdAt ? new Date(category.createdAt).toLocaleString() : 'N/A'}
    </p>
  </>
);
