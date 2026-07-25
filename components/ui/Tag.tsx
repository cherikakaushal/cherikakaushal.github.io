import type { HTMLAttributes, ReactNode } from 'react';

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function Tag({ children, className = '', ...props }: TagProps) {
  return (
    <span className={`ds-tag ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
