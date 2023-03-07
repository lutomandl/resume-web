import { ReactNode, SVGProps } from 'react';
import clsx from 'clsx';

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
  size?: number;
}

export type IconProps = Omit<SvgIconProps, 'children'>;

export default function SvgIcon({
  children,
  size,
  className,
  viewBox = '0 0 24 24',
  focusable = false,
  role = 'img',
  ...other
}: SvgIconProps) {
  const props = {
    viewBox,
    focusable,
    role,
    ...other,
  };

  return (
    <svg
      width={size}
      height={size}
      className={clsx('icon', className)}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}
