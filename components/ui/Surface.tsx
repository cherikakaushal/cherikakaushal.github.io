import type { HTMLAttributes, ReactNode } from 'react';

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

export function Surface({ children, interactive = false, className = '', ...props }: SurfaceProps) {
  return (
    <div className={`ds-surface ${className}`.trim()} data-interactive={interactive} {...props}>
      {children}
    </div>
  );
}
