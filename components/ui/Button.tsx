import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'quiet';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function Button(props: ButtonProps | LinkButtonProps) {
  const { children, variant = 'primary', className = '', ...rest } = props;
  const classes = `ds-button ${className}`.trim();

  if ('href' in props && props.href) {
    return (
      <a className={classes} data-variant={variant} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} data-variant={variant} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
