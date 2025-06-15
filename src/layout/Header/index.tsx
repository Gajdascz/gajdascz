import { useState } from 'react';
import { styled } from 'styled-components';
import { BREAKPOINTS, PAGE_PADDING } from 'shared/constants';
import StyledLogo from './StyledLogo';
import { IoSettingsSharp, IoMoonSharp, IoSunnySharp } from 'react-icons/io5';
import { useThemeSync } from 'shared/hooks/useThemeSync';
import { Icon, Switch, Dropdown, NavLink } from 'shared/components/index';
import { createUnderlineAnimation } from 'shared/animations/underline';
const SETTINGS_ICON_SIZE = '2em';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: ${BREAKPOINTS.sm}) {
    gap: 10px;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderNavLink = styled(NavLink)`
  ${createUnderlineAnimation()}
`;

const StyledSettingsIcon = styled(IoSettingsSharp)`
  width: ${SETTINGS_ICON_SIZE};
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: fill 0.5s ease-in-out;
  &:hover {
    fill: ${({ theme }) => theme.colors.tertiary};
  }
`;

const AppsToggle = styled.p`
  ${createUnderlineAnimation()}
`;

type Dropdowns = false | 'settings' | 'apps';

export default function Header() {
  const { toggle, theme } = useThemeSync();

  const [open, setOpen] = useState<Dropdowns>(false);
  const manageOpen = (clicked: Dropdowns) => {
    if (open === clicked) setOpen(false);
    else setOpen(clicked);
  };
  return (
    <StyledHeader>
      <StyledLogo />
      <HeaderNavLink to='/Pokemem/'>Pokemem</HeaderNavLink>
      <Dropdown
        $open={open === 'settings'}
        $setOpen={() => manageOpen('settings')}
        $topOffset={`calc(${SETTINGS_ICON_SIZE} + ${PAGE_PADDING} + 11px)`}
        $rightOffset={PAGE_PADDING}
        $borderWidth='2px'
        $borderRadius='0.5em'
        $themeColor='primary'
        toggle={<Icon svg={<StyledSettingsIcon />} />}
      >
        <Switch
          onClick={toggle}
          $isOn={theme === 'dark'}
          icon0={<IoSunnySharp />}
          icon1={<IoMoonSharp />}
          style={{ margin: '0.5em' }}
        />
      </Dropdown>
    </StyledHeader>
  );
}
