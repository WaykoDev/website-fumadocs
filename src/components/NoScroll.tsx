"use client";

import { useEffect } from "react";

export default function NoScroll() {
  useEffect(() => {
    const checkAndApplyOverflow = () => {
      const canScroll = document.documentElement.scrollHeight > window.innerHeight + 1;

      if (canScroll) {
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
        document.body.style.setProperty('overflow', 'auto', 'important');
      } else {
        document.documentElement.style.setProperty('overflow', 'hidden', 'important');
        document.body.style.setProperty('overflow', 'hidden', 'important');
      }
    };

    checkAndApplyOverflow();
    window.addEventListener("resize", checkAndApplyOverflow);
    const timeoutId = setTimeout(checkAndApplyOverflow, 200);

    return () => {
      window.removeEventListener("resize", checkAndApplyOverflow);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
