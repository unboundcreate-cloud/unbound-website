import { useInView } from "react-intersection-observer";

export function useScrollTrigger(threshold = 0.2) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return { ref, inView };
}
