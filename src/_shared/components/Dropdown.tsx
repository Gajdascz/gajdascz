import React from 'react';
import type { IconBaseProps } from 'react-icons/lib';
import { styled } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

export interface DropdownContainerProps extends React.ComponentProps<'div'> {
  toggle?: React.ReactNode;
  children?: React.ReactNode;
  $setOpen: (fn: (prev: boolean) => boolean) => void;
  $open: boolean;
  $topOffset: string;
  $rightOffset: string;
  $borderWidth: string;
  $borderRadius: string;
  $themeColor: 'primary' | 'secondary' | 'tertiary' | 'onSurface';
  $backgroundSurfaceLevel?: '0' | '1' | '2' | '3';
}
const DropdownContainer = styled.div<DropdownContainerProps>`
  display: flex;
  transform-origin: top;
  overflow: hidden;
  width: fit-content;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  transition: all 0.5s ease-in-out;

  top: ${({ $topOffset }) => $topOffset};
  right: ${({ $rightOffset }) => $rightOffset};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  border: ${({ $borderWidth, $themeColor, theme }) =>
    `${$borderWidth} solid ${theme.colors[$themeColor]}`};
  background-color: ${({ theme, $backgroundSurfaceLevel = '3' }) =>
    theme.colors[`surface${$backgroundSurfaceLevel}`]};
  box-shadow: ${({ theme }) => theme.elevation.low};

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) => ($open ? 'scaleY(1)' : 'scaleY(0)')};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};

  & > * {
    padding: 0.33em 1em;
    &:last-child {
      margin-bottom: 1px;
    }
  }
`;
const FallBackToggle = styled(GiHamburgerMenu)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  fill: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.elevation.low};
  &:hover {
    fill: ${({ theme }) => theme.colors.secondary};
  }
  &.open {
    fill: ${({ theme }) => theme.colors.secondary};
    &:hover {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default function Dropdown({
  $open,
  $topOffset,
  $rightOffset,
  $borderRadius,
  $borderWidth,
  $themeColor,
  children,
  toggle = <FallBackToggle />,
  $setOpen,
  containerProps
}: DropdownContainerProps & {
  containerProps?: React.ComponentProps<'div'>;
  iconProps?: React.SVGProps<IconBaseProps>;
}) {
  return (
    <div {...containerProps}>
      <div
        role='button'
        tabIndex={0}
        onClick={(e) => $setOpen((prev: boolean) => !prev)}
        aria-expanded={$open}
        aria-label='Toggle dropdown'
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ')
            $setOpen((prev: boolean) => !prev);
        }}
      >
        {toggle}
      </div>
      {children && (
        <DropdownContainer
          $open={$open}
          $setOpen={$setOpen}
          $topOffset={$topOffset}
          $rightOffset={$rightOffset}
          $borderRadius={$borderRadius}
          $borderWidth={$borderWidth}
          $themeColor={$themeColor}
          $backgroundSurfaceLevel='3'
        >
          {children}
        </DropdownContainer>
      )}
    </div>
  );
}
