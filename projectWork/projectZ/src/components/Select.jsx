
import React from 'react';
import PropTypes from 'prop-types';
import SelectComponent from './SelectComponent';

const Select = React.forwardRef(({ 
  options = [], 
  label = '', 
  className = '', 
  ...rest 
}, ref) => {
  return (
    <SelectComponent 
      options={options}
      label={label}
      className={className}
      {...rest}
      ref={ref}
    />
  );
});

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  label: PropTypes.string,
  className: PropTypes.string,
};

Select.displayName = 'Select';

export default Select;