"use client";

import { useState } from "react";
import { uiLabel } from "@/lib/ui-language";

export function PasswordInput({
  id,
  name,
  required,
  minLength,
  maxLength,
  autoComplete,
  placeholder,
  fresh = false,
}: {
  id?: string;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  placeholder?: string;
  fresh?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [locked, setLocked] = useState(fresh);
  return (
    <span className="password-input">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={fresh ? value : undefined}
        readOnly={fresh && locked}
        data-lpignore={fresh ? 'true' : undefined}
        data-1p-ignore={fresh ? 'true' : undefined}
        onFocus={fresh ? () => { if (locked) { setValue(''); setLocked(false); } } : undefined}
        onChange={fresh ? event => setValue(event.target.value) : undefined}
      />
      <button
        type="button"
        className="password-input__toggle"
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
        {...uiLabel(
          visible ? "隐藏密码" : "显示密码",
          visible ? "Hide password" : "Show password",
        )}
      >
        {visible ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 3l18 18" />
            <path d="M10.6 10.7a2 2 0 0 0 2.8 2.8" />
            <path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c5 0 9 4.5 9 7 0 .9-.6 2.1-1.7 3.2" />
            <path d="M6.2 6.7C4 8.3 3 10.1 3 12c0 2.5 4 7 9 7 1.3 0 2.6-.3 3.7-.8" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
            <circle cx="12" cy="12" r="2.6" />
          </svg>
        )}
      </button>
    </span>
  );
}
