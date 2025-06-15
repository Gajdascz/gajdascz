import { css } from 'styled-components';

export const createUnderlineAnimation = () => css`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.tertiary};
    transition:
      transform 0.5s ease-in-out,
      background-color 0.5s ease-in-out;
  }
  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
  &.active {
    color: ${({ theme }) => theme.colors.secondary};
    &::after {
      transform: translateX(-50%) scaleX(1);
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
  &.active:hover::after {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`;
