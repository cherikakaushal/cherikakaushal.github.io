import type { HTMLAttributes, ReactNode } from 'react';
import { Container } from './Container';

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function Section({ children, className = '', ...props }: SectionProps) {
  return (
    <section className={`ds-section ${className}`.trim()} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="ds-section-header">
      <div>
        <p className="ds-eyebrow">{eyebrow}</p>
        <h2 className="ds-heading">{title}</h2>
      </div>
      {description && <p className="ds-section-copy">{description}</p>}
    </header>
  );
}
