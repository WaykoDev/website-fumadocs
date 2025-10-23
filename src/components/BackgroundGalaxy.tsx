"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Galaxy from "@/components/Galaxy";
import WhiteGalaxy from "@/components/WhiteGalaxy";

export default function BackgroundGalaxy() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid flash/SSR mismatch
  return resolvedTheme === "dark" ? <Galaxy /> : <WhiteGalaxy />;
}
