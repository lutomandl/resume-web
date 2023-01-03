import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx('menu', {
        'menu--open': isOpen,
      })}
    >
      <div
        className={clsx('menu__icon', {
          'menu__icon--open': isOpen,
        })}
      ></div>
      <nav
        className={clsx('menu__list', {
          'menu__list--open': isOpen,
        })}
      >
        <Link className="menu__item" to="/">
          About
        </Link>
        <Link className="menu__item" to="/">
          Projects
        </Link>
        <Link className="menu__item" to="/">
          Exeprience
        </Link>
        <Link className="menu__item" to="/">
          Contact
        </Link>
        <Link className="menu__item" to="/">
          CV
        </Link>
      </nav>
    </div>
  );
}
