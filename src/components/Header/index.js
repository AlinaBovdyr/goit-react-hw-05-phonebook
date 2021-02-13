import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../UI/IconButton/IconButton';
import { ReactComponent as AddIcon } from '../../icons/plus.svg';
import s from './Header.module.css';

const Header = ({onClick}) => {
    return (
        <div className={s.wrapper}>
          <h2 className={s.title}>Contacts</h2>
          <IconButton
            className={s.addBtn}
            onClick={onClick}
            aria-label="Add contact"
            title="Add contact"
          >
            <AddIcon width="16" height="16" fill="#fff" />
          </IconButton>
        </div>
    );
};

Header.propTypes = {
    onClick: PropTypes.func,
}


export default Header;
