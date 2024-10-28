// components/LoadingBar.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface LoadingBarProps {
  color?: string;
  height?: number;
  initialProgress?: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({
  color = "bg-blue-600",
  height = 2,
  initialProgress = 0,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(initialProgress);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    const startLoading = () => {
      setLoading(true);
      setProgress(0);
      progressInterval = setInterval(() => {
        setProgress((prevProgress: number) => {
          if (prevProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prevProgress + 10;
        });
      }, 200);
    };

    const completeLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
      clearInterval(progressInterval);
    };

    startLoading();
    const timeout = setTimeout(completeLoading, 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]); // Trigger on route changes

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ease-out ${color}`}
        style={{
          width: `${progress}%`,
          height: `${height}px`,
          transition: "width 200ms ease",
        }}
      />
    </div>
  );
};

export default LoadingBar;
