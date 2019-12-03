import React, { useRef, useEffect, useState } from 'react';
import './LazyImg.css';

export function LazyImg(props: {
  lazySrc: string;
  className?: string;
  alt?: string;
}) {
  const img = useRef(null);
  const [inView, entry] = useIntersectionObserver(img);
  useEffect(() => {
      if(inView){
        preload(img.current, props.lazySrc)
        .then(() => entry.disconnect());
      }

    },
    [props.lazySrc, inView, entry]
  );

  return (
    <div className={(props.className ? props.className : '') + ' lazy-img'}>
      <img ref={img} alt={props.alt} />
    </div>
  );
}

function useIntersectionObserver(ref: any) {
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

function applyImage(target: HTMLImageElement, src: string){
  return new Promise(resolve => {
    target.src = src;
    target.onload = () => resolve();
  })
};

function fetchImage(url: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
};

function preload(targetEl: Element, src: string) {
  return fetchImage(src)
  .then(() => applyImage(targetEl as HTMLImageElement, src))
  .then(()=>targetEl.classList.add('loaded'));
};

