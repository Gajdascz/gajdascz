import { styled } from 'styled-components';
import { FaRegCopyright } from 'react-icons/fa';
import { DiGithubFull, DiNpm } from 'react-icons/di';
import Link from 'shared/components/links/RouteLink';
import Icon from 'shared/components/Icon';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const StyledCopyright = styled.div`
  display: flex;
  height: min-content;
  width: fit-content;
  gap: 5px;
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: ${({ theme }) => theme.typography.fontSizeSm};
  cursor: default;
  & svg {
    align-self: center;
    width: 0.75em;
    height: 0.75em;
  }
`;
const StyledSocialLinks = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  & svg {
    fill: ${({ theme }) => theme.colors.onSurface};
    width: 3em;
    height: 3em;
    &:hover {
      fill: ${({ theme }) => theme.colors.tertiary};
    }
  }
`;
export default function Footer() {
  return (
    <StyledFooter>
      <StyledCopyright>
        2025
        <FaRegCopyright />
        Nolan Gajdascz
      </StyledCopyright>
      <StyledSocialLinks>
        <Link to='https://github.com/gajdascz/gajdascz'>
          <Icon svg={<DiGithubFull />} />
        </Link>
        <Link to='https://www.npmjs.com/~gajdascz'>
          <Icon svg={<DiNpm />} />
        </Link>
      </StyledSocialLinks>
    </StyledFooter>
  );
}
