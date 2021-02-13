import React from 'react';
import s from './Container.module.css';

const Container = ({ children }) => (
  <div className={s.container}>
    <h1 className={s.mainTitle}>Phonebook</h1>
    <div className={s.childContainer}>{children}</div>
  </div>
);

export default Container;
