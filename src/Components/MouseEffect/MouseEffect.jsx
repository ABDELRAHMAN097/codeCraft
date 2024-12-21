import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MouseEffect = () => {
  const mouseEffectRef = useRef(null);
  const circleRef = useRef(null);
  const circleFollowRef = useRef(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Set initial opacity to 0 for hidden elements
    const hiddenElements = [circleRef.current, circleFollowRef.current];
    hiddenElements.forEach((el) => {
      el.style.opacity = "0";
    });

    // Simulate loading complete after some time
    const loadingTimer = setTimeout(() => {
      setLoadingComplete(true);
      hiddenElements.forEach((el) => {
        el.style.opacity = "1";
      });
    }, 2000); // Set your loading time

    // Initialize GSAP animation
    gsap.set(circleRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(circleFollowRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(circleRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(circleRef.current, "y", { duration: 0.6, ease: "power3" });

    const xFollow = gsap.quickTo(circleFollowRef.current, "x", { duration: 0.6, ease: "power3" });
    const yFollow = gsap.quickTo(circleFollowRef.current, "y", { duration: 0.6, ease: "power3" });

    // Mouse move handler
    const onMouseMove = (event) => {
      if (!loadingComplete) return;

      xTo(event.clientX);
      yTo(event.clientY);

      xFollow(event.clientX);
      yFollow(event.clientY);

      mouseEffectRef.current.style.opacity = "1";
    };

    window.addEventListener('mousemove', onMouseMove);

    // Cleanup on unmount
    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [loadingComplete]);

  return (
    <div className="mouse-effect" ref={mouseEffectRef}>
      <div className="circle" ref={circleRef}></div>
      <div className="circle-follow" ref={circleFollowRef}></div>
    </div>
  );
};

export default MouseEffect;
