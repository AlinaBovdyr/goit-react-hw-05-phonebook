import React from 'react';
import PropTypes from 'prop-types';
import s from './Notice.module.css'

const Notice = ({text}) => {
    return (
        <div className={s.container}>
            <p className={s.notice}>{text}</p>
        </div>
    );
};

Notice.propTypes = {
    text: PropTypes.string,
};

export default Notice;