import Fade from '@material-ui/core/Fade';
import MaterialMenu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { useIsAdmin } from '../hooks/authentication';
import useTranslation from 'next-translate/useTranslation';
import useLogout from '../hooks/logout';

interface IProps {
  anchorElement: HTMLElement;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

const StyledMenu = withStyles({
  paper: {
    minWidth: '225px',
    padding: '1rem 2rem',
  },
})((props: MenuProps) => (
  <MaterialMenu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export const Menu: FC<IProps> = ({ anchorElement, isVisible, setVisible }) => {
  const hideMenu = useCallback(() => setVisible(false), [setVisible]);

  const closeMenu = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const isAdmin = useIsAdmin();

  const { t } = useTranslation();

  const logout = useLogout();

  return (
    <StyledMenu
      id="fade-menu"
      anchorEl={anchorElement}
      // keepMounted
      open={isVisible}
      onClose={hideMenu}
      TransitionComponent={Fade}
      className="min-w-full"
    >
      <MenuItem onClick={closeMenu}>
        <Link className="w-full text-lg" href="/profile">
          {t('menu-profile')}
        </Link>
      </MenuItem>

      <MenuItem onClick={closeMenu}>
        <Link className="w-full text-lg" href="https://opencampus.gitbook.io/faq/">
          {t('menu-faq')}
        </Link>
      </MenuItem>

      {isAdmin && (
        <MenuItem onClick={closeMenu}>
          <Link className="w-full text-lg" href="/user-management">
            {t('menu-administration-user')}
          </Link>
        </MenuItem>
      )}

      {isAdmin && (
        <MenuItem onClick={closeMenu}>
          <Link className="w-full text-lg" href="/courses">
            {t('menu-administration-courses')}
          </Link>
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem onClick={closeMenu}>
          <Link className="w-full text-lg" href="/achievements">
              {t('menu-administration-achievement')}
          </Link>
        </MenuItem>
      )}

      {isAdmin && (
        <MenuItem onClick={closeMenu}>
          <Link className="w-full text-lg" href="/programs">
              {t('menu-administration-programs')}
          </Link>
        </MenuItem>
      )}

      <MenuItem onClick={() => logout()}>
        <button className="w-full text-lg text-left">{t('menu-logout')}</button>
      </MenuItem>
    </StyledMenu>
  );
};
