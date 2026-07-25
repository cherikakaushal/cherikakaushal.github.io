import type { HTMLAttributes, ReactNode } from 'react';

type Gap = '1' | '2' | '3' | '4' | '6' | '8';

type StackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  gap?: Gap;
};

export function Stack({ children, gap = '2', className = '', ...props }: StackProps) {
  return (
    <div className={`ds-stack ${className}`.trim()} data-gap={gap} {...props}>
      {children}
    </div>
  );
}

export function Cluster({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ds-cluster ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
