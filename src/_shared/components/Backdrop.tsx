import { useEffect } from "react";
import styled from "styled-components";

const StyledBackdrop = styled.div<BackdropProps>`
  position: fixed;
  z-index: ${({ theme, $zIndex = "overlay" }) => theme.zIndex[$zIndex]};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${({ theme, $opacity = "moderate" }) =>
    `rgba(0,0,0,${theme.opacity[$opacity]})`};
`;

interface BackdropProps {
  children?: React.ReactNode;
  $opacity?: "transparent" | "subtle" | "moderate" | "strong" | "opaque";
  $zIndex?:
    | "behind"
    | "base"
    | "low"
    | "medium"
    | "high"
    | "sidebar"
    | "overlay"
    | "modal"
    | "tooltip"
    | "notification"
    | "top"
    | "override";
  onClick: (e: React.MouseEvent | KeyboardEvent) => void;
}
export default function Backdrop({
  children,
  $opacity = "moderate",
  $zIndex = "overlay",
  onClick,
}: BackdropProps) {
  const handleClick = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) onClick(e);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClick(e);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClick]);

  return (
    <StyledBackdrop $opacity={$opacity} $zIndex={$zIndex} onClick={handleClick}>
      {children}
    </StyledBackdrop>
  );
}
