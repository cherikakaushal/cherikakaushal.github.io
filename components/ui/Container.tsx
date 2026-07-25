import type { HTMLAttributes, ReactNode } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  width?: 'content' | 'reading';
};

export function Container({ children, width = 'content', className = '', ...props }: ContainerProps) {
  return (
    <div className={`ds-container ${className}`.trim()} data-width={width} {...props}>
      {children}
    </div>
  );
}
