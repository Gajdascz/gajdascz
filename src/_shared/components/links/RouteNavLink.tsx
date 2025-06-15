import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

export default styled(NavLink).attrs(
  ({ target, rel = 'noopener noreferrer', ...rest }) => ({
    target,
    rel,
    ...rest
  })
)`
  position: relative;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 1.2em;
  padding: 0.15em 0.25em;
  transition: color 0.5s ease-in-out;
  &:hover,
  &.active:hover {
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;
