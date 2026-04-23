import React, { InputHTMLAttributes } from 'react';

interface QuietInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const QuietInput: React.FC<QuietInputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-on-surface">
        {label}
      </label>
      <input 
        className={`quiet-input ${error ? 'border-error-container bg-error-container text-on-error-container' : ''}`}
        {...props} 
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
};
