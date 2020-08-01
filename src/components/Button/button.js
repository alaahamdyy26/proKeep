import React from 'react';
import PropTypes from 'prop-types';

import './button.scss'

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default function Button({onClick, title, type}) {
  return (
    <button
      className="btn"
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  )
}