import { useState, useEffect } from "react";

const useIsLargeScreen = (): boolean => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeScreen;
};

export default useIsLargeScreen;
