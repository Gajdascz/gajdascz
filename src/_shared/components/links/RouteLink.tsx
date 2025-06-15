import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link).attrs(
  ({ target, rel = 'noopener noreferrer', ...rest }) => ({
    target,
    rel,
    ...rest
  })
)``;
