import { Nav } from '@/components/Nav.tsx';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <main className="pt-20">{children}</main>
    </>
  );
};
