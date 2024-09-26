import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const animationGSAP = (target, animationDep, scrollDep) => {
  gsap.to(target, {
    ...animationDep,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollDep,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animProps
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animProps,
      ease: "power2.inOut",
    },
    "<"
  );
  timeline.to(
    secondTarget,
    {
      ...animProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
