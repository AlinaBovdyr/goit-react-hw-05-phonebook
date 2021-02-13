import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ value, onChangeFilter }) {
  return (
    <div className={s.container}>
      <label className={s.field}>
        <span className={s.label}>Find contacts by name:</span>
        <input
          className={s.input}
          type="text"
          name="filter"
          value={value}
          onChange={e => onChangeFilter(e.target.value)}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

export default Filter;
