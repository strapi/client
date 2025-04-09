import React from 'react';

type CTAProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CTA: React.FC<CTAProps> = (props) => {
  return (
    <div className="relative inline-flex group">
      <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-pink)] to-[var(--neon-orange)] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
      <button
        className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-transform duration-200 bg-gray-900 font-pj rounded-xl hover:cursor-pointer focus:outline-none focus:ring-0 active:scale-95"
        role="button"
        {...props}
      >
        {props.value}
      </button>
    </div>
  );
};
