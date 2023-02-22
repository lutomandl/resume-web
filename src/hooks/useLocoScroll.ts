import LocomotiveScroll from 'locomotive-scroll';
import { RefObject, useEffect } from 'react';

export default function useLocoScroll(
  start: boolean,
  ref: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!start) return;

    const locoScroll = new LocomotiveScroll({
      el: ref.current as HTMLElement,
      smooth: true,
      multiplier: 1,
      class: 'is-reveal',
    });
  }, [ref, start]);
}
