import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  element?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?:
    | 'paragraph'
    | 'heading-bold'
    | 'heading-regular'
    | 'heading-light'
    | 'menu';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function Typography({
  children,
  element = 'p',
  align = 'left',
  variant = 'paragraph',
  className,
  ...props
}: TypographyProps) {
  const Component = element;

  return (
    <Component
      className={`typography typography--${variant} typography--${align} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
