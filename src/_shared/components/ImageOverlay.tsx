import styled from 'styled-components';
import Button from './Button';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.surface1};
  color: var(--color-on-surface);
  border-radius: var(--border-radius);
  border: var(--border);
  padding: 1em;
  gap: var(--space-small);
  width: fit-content;
  height: min-content;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
`;

const OverlayButton = styled(Button)`
  width: 33%;
  padding-top: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => theme.borderRadii.base} solid
    ${({ theme }) => theme.colors.primary};
`;

interface ImageOverlayProps {
  headerText?: string;
  bodyText?: string;
  action?: {
    type: 'button' | 'link';
    to?: string;
    onClick?: (e: React.MouseEvent) => void;
    text: string;
  };
}
export default function ImageOverlay({
  headerText,
  bodyText,
  action,
  ...rest
}: ImageOverlayProps) {
  return (
    <Container {...rest}>
      {headerText && <h2>{headerText}</h2>}
      {bodyText && <p>{bodyText}</p>}
      {action && (
        <OverlayButton onClick={action.onClick}>{action.text}</OverlayButton>
      )}
    </Container>
  );
}
