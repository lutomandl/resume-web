import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useClickOutsideListener from '../hooks/useClickOutsideListener';

export default function Menu() {
  const [isFixedOpen, setIsFixedOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHoverOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHoverOpen(false);
  };

  const handleMenuIconClick = () => {
    setIsFixedOpen(!isFixedOpen);
    setIsHoverOpen(!isHoverOpen);
  };

  const handleMenuItemClick = () => {
    setIsFixedOpen(false);
    setIsHoverOpen(false);
  };

  const handleClickOutside = () => {
    setIsFixedOpen(false);
    setIsHoverOpen(false);
  };

  const wrapperRef = useRef(null);
  useClickOutsideListener(wrapperRef, handleClickOutside);

  return (
    <header
      className={clsx('menu', {
        'menu--open': isFixedOpen || isHoverOpen,
      })}
      ref={wrapperRef}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="menu__container"
      >
        <div
          className={clsx('menu__icon', {
            'menu__icon--open': isFixedOpen || isHoverOpen,
          })}
          onClick={handleMenuIconClick}
        ></div>
        <nav
          className={clsx('menu__list', {
            'menu__list--open': isFixedOpen || isHoverOpen,
          })}
        >
          <Link onClick={handleMenuItemClick} className="menu__item" to="/">
            About
          </Link>
          <Link onClick={handleMenuItemClick} className="menu__item" to="/">
            Projects
          </Link>
          <Link onClick={handleMenuItemClick} className="menu__item" to="/">
            Exeprience
          </Link>
          <Link onClick={handleMenuItemClick} className="menu__item" to="/">
            Contact
          </Link>
          <a
            onClick={handleMenuItemClick}
            href="cv.pdf"
            target="_blank"
            className="menu__item"
          >
            CV
          </a>
        </nav>
      </div>
    </header>
  );
}
