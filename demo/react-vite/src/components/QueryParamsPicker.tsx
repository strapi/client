import React from 'react';

interface QueryParamsPickerProps {
  queryParams: Record<string, boolean>;
  onQueryChange: (param: string, checked: boolean) => void;
}

export const QueryParamsPicker: React.FC<QueryParamsPickerProps> = ({
  queryParams,
  onQueryChange,
}) => (
  <div className="flex flex-wrap justify-start gap-4 mt-15 ">
    {Object.keys(queryParams).map((param) => (
      <label key={param} className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="appearance-none h-5 w-5 border border-gray-400 rounded-lg checked:bg-gradient-to-tl checked:from-[var(--neon-pink)] checked:to-[var(--neon-orange)] checked:border-transparent checked:shadow-[0px_0px_25px_0px_var(--neon-orange)] transition duration-360"
          checked={queryParams[param]}
          onChange={(event) => onQueryChange(param, event.target.checked)}
        />
        <span className="capitalize text-sm font-medium text-text-primary">{param}</span>
      </label>
    ))}
  </div>
);
