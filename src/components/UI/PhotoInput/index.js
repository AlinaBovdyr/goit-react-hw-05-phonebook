import React from 'react';
import PropTypes from 'prop-types';
import s from './PhotoInput.module.css';

const PhotoInput = ({ className, value, onChange, ...restProps }) => {
    const classList = [className, s.input].join(' ');

    return (
        <input
            type="file"
            name="photo"
            value={value}
            className={classList}
            onChange={onChange}
            {...restProps}
        />
    );
};

PhotoInput.defaultProps = {
  className: '',
    onChange: () => null,
};

PhotoInput.propTypes = {
  className: PropTypes.string,
    onChange: PropTypes.func,
  value: PropTypes.string,
};

export default PhotoInput;