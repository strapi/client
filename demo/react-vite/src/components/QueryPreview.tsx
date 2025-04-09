import React from 'react';

interface QueryPreviewProps {
  query: Record<string, unknown>;
}

export const QueryPreview: React.FC<QueryPreviewProps> = ({ query }) => (
  <div className="mt-6 w-full max-w-4xl p-4 bg-[var(--bg-primary)] rounded shadow-lg">
    <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Query Preview</h3>
    <pre className="bg-[var(--bg-secondary)] p-4 rounded text-sm font-mono text-[var(--text-secondary)]">
      {JSON.stringify(query, null, 2)}
    </pre>
  </div>
);
