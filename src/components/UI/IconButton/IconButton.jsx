import React from 'react';
import PropTypes from 'prop-types';
import s from './IconButton.module.css';

const IconButton = ({ children, className, onClick, ...restProps }) => {
  const classList = [className, s.button].join(' ');

  return (
    <button
      type="button"
      className={classList}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = {
  className: '',
  children: null,
  onClick: () => null,
};

IconButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
