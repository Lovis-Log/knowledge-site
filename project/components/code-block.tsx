import type { ComponentPropsWithoutRef } from 'react';
import { CopyButton } from './copy-button';

export function CodeBlock({ code, children, ...props }: ComponentPropsWithoutRef<'pre'> & { code: string }) {
  return <div className="code-block">
    <CopyButton value={code} />
    <pre {...props}>{children}</pre>
  </div>;
}
