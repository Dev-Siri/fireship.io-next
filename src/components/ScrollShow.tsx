"use client";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  repeat?: boolean;
  delay?: number;
  start?: string;
}

function ScrollShow({ delay = 200, start = "right", repeat = true, children }: Props) {
  const [visible, setVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          if (repeat) setVisible(false);
        }
      });
    });

    observer.observe(ref.current!);

    return () => observer?.disconnect();
  }, [ref, repeat]);

  function getClassName() {
    let className = start;
    if (visible) {
      className += " scroll-show-visible";
    }
    return className;
  }

  return (
    <div ref={ref} className={getClassName()} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default ScrollShow;
