import SvgIcon, { IconProps } from './SvgIcon';

export default function XIcon(props: IconProps) {
  return (
    <SvgIcon {...props} stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </SvgIcon>
  );
}