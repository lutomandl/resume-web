import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useClickOutsideListener from '../hooks/useClickOutsideListener';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const wrapperRef = useRef(null);
  useClickOutsideListener(wrapperRef, handleClickOutside);

  return (
    <header
      className={clsx('menu', {
        'menu--open': isOpen,
      })}
      ref={wrapperRef}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="menu__container"
      >
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ ease: 'anticipate', delay: 4, duration: 2 }}
        >
          <Link onClick={handleMenuItemClick} to="/">
            <div
              className={clsx('menu__icon', {
                'menu__icon--open': isOpen,
              })}
            ></div>
          </Link>
        </motion.div>
        <nav
          className={clsx('menu__list', {
            'menu__list--open': isOpen,
          })}
        >
          <Link
            onClick={handleMenuItemClick}
            className="menu__item"
            to="/about"
          >
            About
          </Link>
          <Link
            onClick={handleMenuItemClick}
            className="menu__item"
            to="/projects"
          >
            Projects
          </Link>
          <Link
            onClick={handleMenuItemClick}
            className="menu__item"
            to="/experience"
          >
            Exeprience
          </Link>
          <Link
            onClick={handleMenuItemClick}
            className="menu__item"
            to="/contact"
          >
            Contact
          </Link>
          <a
            onClick={handleMenuItemClick}
            href="/public/assets/CV.pdf"
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
