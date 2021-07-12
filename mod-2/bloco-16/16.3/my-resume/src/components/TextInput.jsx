import React from 'react';

class TextInput extends React.Component {
  render() {
    const { name, placeholder, maxLength, value, onBlur, onChange, type, validator } = this.props;

    return(
      <input 
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        validator={validator}
        required
      />
    );
  }
}

export default TextInput;
