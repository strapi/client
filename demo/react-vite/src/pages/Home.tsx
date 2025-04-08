import { Layout } from '@/layouts/Layout.tsx';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center px-4 mt-32">
        <h1 className="text-5xl font-bold mb-4 max-w-2xl text-[var(--text-primary)]">
          Welcome to the <span className="text-[var(--neon-pink)]">@strapi/client</span> demo!
        </h1>
        <p className="my-10 text-3xl max-w-5xl text-[var(--text-secondary)]">
          The goal of this project is to showcase the features offered by the{' '}
          <span className="text-[var(--neon-pink)]">@strapi/client</span> SDK in the context of a
          React application, including collection type managers, files management, and advanced
          query options.
        </p>
      </div>
    </Layout>
  );
};
