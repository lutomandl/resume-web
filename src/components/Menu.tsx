import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useClickOutsideListener from '../hooks/useClickOutsideListener';
import { RouteType } from '../types';
import XIcon from './icons/XIcon';

interface MenuProps {
  routes: RouteType[] | null;
}

export default function Menu({ routes }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
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
          transition={{ ease: 'anticipate', delay: 3.8, duration: 2 }}
        >
          <Link to="/">
            <div
              className={clsx('menu__icon', {
                'menu__icon--open': isOpen,
              })}
            />
          </Link>
        </motion.div>
        <nav
          className={clsx('menu__list', {
            'menu__list--open': isOpen,
          })}
        >
          {routes?.map(({ attributes }) => (
            <Link
              key={attributes?.pathName}
              className="menu__item"
              to={attributes?.pathName || 'error'}
            >
              {attributes?.heading}
            </Link>
          ))}
          <a href="/assets/CV.pdf" target="_blank" className="menu__item">
            CV
          </a>
          {isOpen && (
            <XIcon
              className="menu__x"
              size={40}
              onClick={() => setIsOpen(false)}
            />
          )}
        </nav>
      </div>
    </header>
  );
}
