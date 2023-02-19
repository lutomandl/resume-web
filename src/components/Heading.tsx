import React from 'react';

interface HeadingProps {
  element?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'right';
  children: React.ReactNode;
  elementProps?: React.HTMLAttributes<HTMLElement>;
}

export default function Heading({
  element = 'h1',
  align = 'left',
  children,
  ...elementProps
}: HeadingProps) {
  return React.createElement(
    element,
    { className: `heading heading--${align}`, ...elementProps },
    children
  );
}
