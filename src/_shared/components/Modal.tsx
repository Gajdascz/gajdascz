import { createPortal } from "react-dom";
import { styled } from "styled-components";
import Backdrop from "./Backdrop";

const ModalContainer = styled.dialog<{
  $isOpen: boolean;
  $align?: "center" | "start" | "end";
  $justify?: "center" | "start" | "end";
  $width?: string;
  $height?: string;
  $padding?: string;
}>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: ${({ $align }) => $align ?? "center"};
  justify-content: ${({ $justify }) => $justify ?? "center"};
  min-width: 320px;
  min-height: 420px;
  max-width: 95vw;
  max-height: 95vh;
  width: ${({ $width }) => $width ?? "auto"};
  height: ${({ $height }) => $height ?? "auto"};
  background: ${({ theme }) => theme.colors.surface1};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  color: ${({ theme }) => theme.colors.onSurface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadii.base};
  padding: ${({ theme }) => theme.spacing.md};
`;

const CloseButton = styled.button`
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  width: min-content;
  height: min-content;
  font-size: ${({ theme }) => theme.typography.fontSizeDouble};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.1em;
  &:hover {
    color: ${({ theme }) => theme.colors.tertiary};
    transform: scale(1.1);
    transition:
      transform 0.2s ease,
      color 0.2s ease;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

interface ModalProps extends React.ComponentPropsWithoutRef<"dialog"> {
  onClose: (...args: any[]) => void;
  onOpen?: (...args: any[]) => void;
  children?: React.ReactNode;
  $isOpen: boolean;
  $closeButtonContent?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hideCloseButton?: boolean;
  $align?: "center" | "start" | "end";
  $justify?: "center" | "start" | "end";
  $width?: string;
  $height?: string;
  $padding?: string;
}

export default function Modal({
  $isOpen,
  onClose,
  onOpen,
  $closeButtonContent,
  children,
  header,
  footer,
  hideCloseButton = false,
  $align,
  $justify,
  $width,
  $height,
  $padding,
  ...rest
}: ModalProps) {
  const modalContent = (
    <div>
      {$isOpen && <Backdrop onClick={onClose} />}
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-hidden={!$isOpen}
        data-open={$isOpen}
        $isOpen={$isOpen}
        $align={$align}
        $justify={$justify}
        $width={$width}
        $height={$height}
        $padding={$padding}
        {...rest}
      >
        {!hideCloseButton && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <CloseButton onClick={onClose} aria-label="Close modal">
              {$closeButtonContent ?? "×"}
            </CloseButton>
          </div>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </div>
  );

  return (
    <>
      {typeof window !== "undefined" &&
        createPortal(
          modalContent,
          document.getElementById("root") ?? document.body,
        )}
    </>
  );
}
