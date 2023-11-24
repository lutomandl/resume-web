import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-scroll';
import useClickOutsideListener from '../hooks/useClickOutsideListener';
import XIcon from './icons/XIcon';
import Typography from './Typography';
import { MenuItems } from '../types';

interface MenuProps {
  items: MenuItems;
}

export default function Menu({ items }: MenuProps) {
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
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ ease: 'anticipate', delay: 1, duration: 2 }}
    >
      <nav
        className={clsx('menu', {
          'menu--open': isOpen,
        })}
        ref={wrapperRef}
      >
        <div
          className={clsx('menu__icon', {
            'menu__icon--open': isOpen,
          })}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <div
          className={clsx('menu__overlay', {
            'menu__overlay--open': isOpen,
          })}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isOpen && (
            <XIcon className="menu__x" onClick={() => setIsOpen(false)} />
          )}
          <div
            className={clsx('menu__list', {
              'menu__list--open': isOpen,
            })}
          >
            {Object.entries(items).map(([key, value]) => (
              <Link
                key={key}
                className="menu__item"
                activeClass="active"
                to={key}
                spy
                smooth
                offset={-70}
                duration={500}
              >
                <Typography variant="menu" element="span">
                  {value}
                </Typography>
              </Link>
            ))}
            <a href="/assets/CV.pdf" target="_blank" className="menu__item">
              <Typography variant="menu" element="span">
                CV
              </Typography>
            </a>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
