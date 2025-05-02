
import React from 'react';
import PropTypes from 'prop-types';

const SelectComponent = React.forwardRef(({ options, label, className, ...rest }, ref) => {
    return (
        <div className={className}>
            <label>{label}</label>
            <select ref={ref} {...rest}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});

SelectComponent.displayName = 'SelectComponent';

SelectComponent.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    })),
    label: PropTypes.string,
    className: PropTypes.string,
};

export default SelectComponent;