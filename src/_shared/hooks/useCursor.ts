import { useEffect, useState } from "react";

export const useCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) =>
      setPosition({ x: event.clientX, y: event.clientY });
    const handleMouseDown = () => setPressed(true);
    const handleMouseUp = () => setPressed(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return { position, pressed };
};
