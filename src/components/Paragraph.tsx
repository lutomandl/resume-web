import { HTMLAttributes } from 'react';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  align?: 'left' | 'right';
}

export default function Paragraph({
  align = 'left',
  children,
  ...elementProps
}: ParagraphProps) {
  return (
    <article className={`paragraph paragraph--${align}`}>
      <p {...elementProps}>{children}</p>
    </article>
  );
}
