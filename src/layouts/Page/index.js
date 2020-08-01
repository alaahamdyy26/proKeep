import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

Page.propTypes = {
  children: PropTypes.element.isRequired
};

function Page({ children }) {
  return (
    <div className="page">
      {children}
    </div>
  );
}

export default Page;