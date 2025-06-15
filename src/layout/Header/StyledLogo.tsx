import { styled } from "styled-components";
import Logo from "shared/components/Logo";

export default styled(Logo).attrs(({ theme }) => ({
  leftBracketProps: {
    fill: theme.colors.secondary,
    className: "header-logo-left-bracket",
  },
  rightBracketProps: {
    fill: theme.colors.secondary,
    className: "header-logo-right-bracket",
  },
  gProps: { fill: theme.colors.primary, className: "header-logo-g" },
}))`
  width: 3em;
  cursor: pointer;
  &:hover {
    .header-logo-left-bracket,
    .header-logo-right-bracket {
      animation: bracket-swap 2s ease-in-out infinite alternate;
    }
    .header-logo-g {
      animation: g-swap 2s ease-in-out infinite alternate;
    }
  }
  @keyframes bracket-swap {
    0% {
      fill: ${({ theme }) => theme.colors.secondary};
    }
    50% {
      fill: ${({ theme }) => theme.colors.tertiary};
    }
    100% {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  @keyframes g-swap {
    0% {
      fill: ${({ theme }) => theme.colors.primary};
    }
    50% {
      fill: ${({ theme }) => theme.colors.secondary};
    }
    100% {
      fill: ${({ theme }) => theme.colors.tertiary};
    }
  }
`;
