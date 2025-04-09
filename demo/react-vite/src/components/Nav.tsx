import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Nav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { emoji: '🏠', text: 'Home', href: '/', color: 'var(--neon-green)' },
    { emoji: '📚', text: 'Collections', href: '/demos/collections', color: 'var(--neon-pink)' },
    { emoji: '📁', text: 'Files', href: '/demos/files', color: 'var(--neon-yellow)' },
  ];

  return (
    <nav className="w-full bg-[var(--bg-secondary)] border-b border-[var(--bg-tertiary)] backdrop-blur-2xl">
      <div className="flex flex-row justify-center items-center space-x-6 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group relative px-6 py-4 text-[var(--text-secondary)] transition-all duration-300 ease-in-out hover:text-[${item.color}] ${
                isActive ? `text-[${item.color}]` : ''
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`text-xl transition-all duration-300 group-hover:scale-125 group-hover:animate-pulse ${
                    isActive ? 'scale-125' : ''
                  }`}
                >
                  {item.emoji}
                </span>
                <span className="relative font-medium">
                  {item.text}
                  <span
                    className={`-bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_${item.color}]`}
                    style={{ backgroundColor: item.color }}
                  />
                </span>
              </span>
              {isActive && (
                <span
                  className="absolute inset-0 opacity-10 rounded"
                  style={{ backgroundColor: item.color }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
