import { useEffect, useRef } from "react";

function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  handler: (event: WindowEventMap[K]) => void,
  element: HTMLElement | Document | Window | null = typeof window !==
  "undefined"
    ? window
    : null
) {
    const savedHandler = useRef<(event: WindowEventMap[K]) => void | null>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element) return;

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event as WindowEventMap[K]);
      }
    };

    element.addEventListener(eventType, eventListener);
    return () => element.removeEventListener(eventType, eventListener);
  }, [eventType, element]);
}

export default useEventListener;
