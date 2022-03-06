import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import s from './index.module.scss';
import headerMenu from '@/constants/header';
import {useEffect, useState} from 'react';
export default function Header() {
  const [currentPath, setCurrentPath] = useState('');
  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const nav = useNavigate();
  return (
    <div id={s.header}>
      <div className={s.menu}>
        {headerMenu.map(item => (
          <div
            className={
              s.menuItem + (currentPath === item.path ? ' ' + s.isActive : '')
            }
            onClick={() => nav(item.path)}
            key={item.text}
          >
            <i className={'iconfont ' + item.icon}></i>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
