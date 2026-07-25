import type { AnchorHTMLAttributes, ReactNode } from 'react';

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  showArrow?: boolean;
};

export function TextLink({ children, showArrow = true, className = '', ...props }: TextLinkProps) {
  return (
    <a className={`ds-link ${className}`.trim()} {...props}>
      <span>{children}</span>
      {showArrow && <span className="ds-link-arrow" aria-hidden="true">↗</span>}
    </a>
  );
}
