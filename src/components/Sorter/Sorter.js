import s from './Sorter.module.css';
import PropTypes from 'prop-types';

const Sort = {
  ABC: 'abc',
  DATE: 'id',
};

function Sorter({ value, onRadioChange }) {
  return (
    <div className={s.container}>
      <p className={s.subtitle}>Sort by:</p>
      <div className={s.inputWrapper}>
        <label className={s.label}>
          <input
            className={s.input}
            type="radio"
            name="id"
            value={Sort.DATE}
            onChange={onRadioChange}
            checked={value === Sort.DATE}
          />
          <span>date</span>
        </label>
        <label className={s.label}>
          <input
            className={s.input}
            type="radio"
            name="abc"
            value={Sort.ABC}
            onChange={onRadioChange}
            checked={value === Sort.ABC}
          />
          <span>name</span>
        </label>
      </div>
    </div>
  );
}

Sorter.propTypes = {
  value: PropTypes.string,
  onRadioChange: PropTypes.func,
};

export default Sorter;
