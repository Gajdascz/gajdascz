import { styled } from "styled-components";

export default styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  gap: 0.5em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadii.base};
  padding: 0.5em 1em;
  font-size: ${({ theme }) => theme.typography.fontSizeBase};
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.onSecondary};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.onMuted};
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.onTertiary};
    transform: scale(0.98);
    transition: transform 0.1s ease-in-out;
  }
  &:disabled:active {
    background-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.onMuted};
    transform: none;
    transition: none;
  }
  &:disabled:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.onMuted};
  }
`;
