// eslint-disable-next-line no-unused-vars
// Logo.js
import React from 'react';
import logo from '../assets/one.avif';
import PropTypes from 'prop-types';

function Logo({ width }) {
    return (
        <img
            src={logo}
            alt="DevUI Logo"
            width={width}
        />
    );
}
Logo.propTypes = {
    width: PropTypes.string.isRequired,
};

export default Logo;