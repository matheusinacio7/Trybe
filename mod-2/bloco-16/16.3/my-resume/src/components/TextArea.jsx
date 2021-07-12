import React from 'react';

class TextArea extends React.Component {
  render() {
    const { name, onChange, onMouseOver, maxLength, value, placeholder } = this.props;

    return (
      <textarea 
        name={name}
        cols="30"
        rows="10"
        onChange={onChange}
        onMouseOver={onMouseOver}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        required
      ></textarea>
    );
  }
}

export default TextArea;
