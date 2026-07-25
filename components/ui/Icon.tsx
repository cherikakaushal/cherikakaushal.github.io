import type { LucideIcon, LucideProps } from 'lucide-react';

type IconProps = Omit<LucideProps, 'ref'> & {
  icon: LucideIcon;
};

export function Icon({ icon: Glyph, size = 18, strokeWidth = 1.75, 'aria-hidden': ariaHidden, ...props }: IconProps) {
  return <Glyph aria-hidden={ariaHidden ?? true} size={size} strokeWidth={strokeWidth} {...props} />;
}
