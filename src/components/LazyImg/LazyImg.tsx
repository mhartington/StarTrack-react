import React, { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './LazyImg.css';

export function LazyImg(props: {lazySrc: string; className?: string; alt?: string; } = {lazySrc: "./assets/imgs/default.jpeg"}) {
  const img = useRef<HTMLImageElement>(null);

  const [inView, entry] = useIntersectionObserver(img);
  useEffect(
    () => {
      if (inView) {
        preload(img.current, props.lazySrc).then(() => entry.disconnect());
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


function applyImage(target: HTMLImageElement, src: string) {
  return new Promise(resolve => {
    target.src = src;
    target.onload = () => resolve();
  });
}

function fetchImage(url: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
}

function preload(targetEl: Element, src: string) {
  return fetchImage(src)
    .then(() => applyImage(targetEl as HTMLImageElement, src))
    .then(() => targetEl.classList.add('loaded'));
}
