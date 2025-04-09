import { CategoryCard } from '@/components/CategoryCard.tsx';
import { CTA } from '@/components/CTA.tsx';
import { QueryParamsPicker } from '@/components/QueryParamsPicker.tsx';
import { QueryPreview } from '@/components/QueryPreview.tsx';
import { useCollection } from '@/hooks/useCollection.ts';
import { Layout } from '@/layouts/Layout.tsx';
import type { Category, QueryParam } from '@/types.ts';
import { DEFAULT_COLLECTION_QUERIES } from '@/utils/constants.ts';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CollectionDemo: React.FC = () => {
  const categories = useCollection('categories');
  const [documents, setDocuments] = useState<Category[]>([]);
  const [query, setQuery] = useState<Record<string, unknown>>({});
  const [queryParams, setQueryParams] = useState<Record<QueryParam, boolean>>({
    populate: false,
    sort: false,
    fields: false,
    filters: false,
  });

  useEffect(() => {
    setQuery(buildQuery(queryParams));
  }, [queryParams]);

  const onQueryChange = (param: string, checked: boolean) => {
    setQueryParams((prev) => ({ ...prev, [param]: checked }));
  };

  const fetchCategories = async () => {
    try {
      const { data } = await categories.find(query);
      setDocuments(data as unknown as Category[]);
      toast.success(`${data.length} categories fetched successfully`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${error}`);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <CTA
          value={documents.length ? 'Reload Categories' : 'Fetch Categories'}
          onClick={fetchCategories}
        />
        <QueryParamsPicker queryParams={queryParams} onQueryChange={onQueryChange} />
        <QueryPreview query={query} />
        <div className="mt-16 grid grid-cols-3 gap-10 w-full max-w-5xl">
          {documents.map((category) => (
            <div
              key={category.id}
              className="p-10 rounded-lg bg-[var(--bg-secondary)] hover:shadow-[0px_0px_70px_0px_var(--neon-orange)] hover:scale-105 transition duration-300"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

function buildQuery(queryParams: Record<QueryParam, boolean>): Record<string, unknown> {
  return Object.entries(queryParams)
    .filter(([, enabled]) => enabled)
    .reduce(
      (acc, [param]) => ({ ...acc, [param]: DEFAULT_COLLECTION_QUERIES[param as QueryParam] }),
      {}
    );
}
