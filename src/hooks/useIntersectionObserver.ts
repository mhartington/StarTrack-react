import { useState, useEffect } from 'react'

export function useIntersectionObserver(ref: React.MutableRefObject<HTMLElement>) {
  const [state, setState] = useState({
    inView: false,
    triggered: false,
    entry: undefined
  });

  const observer = new IntersectionObserver((entries, observerInstance) => {
    // checks to see if the element is intersecting
    if (entries[0].intersectionRatio > 0) {
      // if it is update the state, we set triggered as to not re-observe the element
      setState({
        inView: true,
        triggered: true,
        entry: observerInstance
      });
      // unobserve the element
      observerInstance.unobserve(ref.current);
    }
  });

  useEffect(() => {
    // check that the element exists, and has not already been triggered
    if (ref.current && !state.triggered) {
      observer.observe(ref.current);
    }
  });

  return [state.inView, state.entry];
}
