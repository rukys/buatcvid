'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
  maxTags?: number;
}

export default function TagInput({
  tags,
  onChange,
  suggestions = [],
  label,
  placeholder = 'Ketik skill lalu tekan Enter...',
  error,
  hint,
  wrapperClassName,
  maxTags = 15,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  // Handle adding tag via Enter or Comma keys
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleBlur = () => {
    addTag(inputValue);
  };

  const addTag = (value: string) => {
    const trimmed = value.trim().replace(/,$/, '');
    if (trimmed === '') return;
    
    // Prevent duplicates and respect max tags count
    if (!tags.includes(trimmed) && tags.length < maxTags) {
      const updated = [...tags, trimmed];
      onChange(updated);
      setInputValue('');
    } else if (tags.includes(trimmed)) {
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    const updated = tags.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const addSuggestion = (skill: string) => {
    if (!tags.includes(skill) && tags.length < maxTags) {
      onChange([...tags, skill]);
    }
  };

  // Filter out suggestions that are already added
  const activeSuggestions = suggestions.filter((s) => !tags.includes(s));

  return (
    <div className={cn('flex flex-col text-left space-y-2', wrapperClassName)}>
      {/* Label */}
      {label && (
        <label className="text-gray-700 text-sm font-semibold">
          {label}
        </label>
      )}

      {/* Input container wrapper */}
      <div
        className={cn(
          'w-full bg-white border-[1.5px] rounded-sm p-2 flex flex-wrap gap-2 transition-all duration-150 outline-none',
          error
            ? 'border-error-500 focus-within:ring-4 focus-within:ring-error-50'
            : 'border-gray-200 focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-50'
        )}
      >
        {/* Render Active Tag Chips */}
        {tags.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full animate-[pop_150ms_ease]"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-gray-400 hover:text-error-500 p-0.5 rounded-full hover:bg-gray-200/50 transition-colors"
              aria-label={`Hapus skill ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* Text Input inside field */}
        <input
          type="text"
          className="flex-grow min-w-[120px] bg-transparent text-gray-800 text-base py-1 px-1.5 focus:outline-none placeholder-gray-400"
          placeholder={tags.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={tags.length >= maxTags}
        />
      </div>

      {/* Error / Hint Messages */}
      {error && (
        <p className="text-error-500 text-xs flex items-center gap-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {!error && hint && (
        <p className="text-gray-500 text-xs leading-relaxed">{hint}</p>
      )}

      {/* Suggestions Box */}
      {activeSuggestions.length > 0 && tags.length < 10 && (
        <div className="pt-2 space-y-1.5">
          <span className="text-xs font-semibold text-gray-500">
            Saran keahlian yang relevan dengan posisimu:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeSuggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSuggestion(skill)}
                className="inline-flex items-center gap-1 bg-primary-50 border border-dashed border-primary-300 hover:bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>{skill}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
