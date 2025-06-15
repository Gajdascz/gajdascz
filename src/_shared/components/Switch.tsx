import { styled } from "styled-components";

const StyledSwitchSlider = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $on }) => ($on ? "translateX(100%)" : "translateX(0)")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSwitch = styled.button`
  position: relative;
  width: 3em;
  height: 1.5em;
  background-color: ${({ theme }) => theme.colors.surface0};
  border: none;
  border-radius: 1em;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  padding: 0;
  overflow: hidden;
  & svg {
    fill: ${({ theme }) => theme.colors.onPrimary};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.muted};
    & svg {
      fill: ${({ theme }) => theme.colors.onMuted};
    }
  }
`;

interface ToggleButtonProps<S0, S1> extends React.ComponentProps<"button"> {
  icon0: React.ReactNode;
  icon1: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  $isOn: boolean;
}
export default function Switch<S0 extends string, S1 extends string>({
  icon0,
  icon1,
  onClick,
  children,
  $isOn,
  ...rest
}: ToggleButtonProps<S0, S1>) {
  return (
    <StyledSwitch
      {...rest}
      onClick={onClick}
      role="switch"
      aria-checked={$isOn}
      type="button"
    >
      <StyledSwitchSlider $on={$isOn}>
        {$isOn ? icon1 : icon0}
      </StyledSwitchSlider>
      {children}
    </StyledSwitch>
  );
}
