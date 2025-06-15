import { styled } from "styled-components";
import type React from "react";

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    fill: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: fill 0.5s ease-in-out;
    &:hover {
      fill: ${({ theme }) => theme.colors.tertiary};
    }
  }
`;

export default function Icon({
  svg,
  ...props
}: React.PropsWithChildren & { svg: React.ReactNode }) {
  return <IconWrapper {...props}>{svg}</IconWrapper>;
}
