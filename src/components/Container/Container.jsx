import React from 'react';
import { CSSTransition } from 'react-transition-group';
import s from './Container.module.css';

const Container = ({ children }) => (
  <div className={s.container}>
    <div className={s.titleWrapper}>
      <CSSTransition in={true} appear={true} classNames={s} timeout={500}>
        <h1 className={s.mainTitle}>Phonebook</h1>
      </CSSTransition>
    </div>
    <div className={s.childContainer}>{children}</div>
  </div>
);

export default Container;
