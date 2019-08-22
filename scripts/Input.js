import React from 'react'

const Input = (props) => {
  const {
    type,
    name,
    required,
    pattern,
    minLength,
    maxLength,
    id = type,
    onInput,
    list = ""
  } = props;

  return (
    <React.Fragment>
      <input type={type} id={id}
             onInput={onInput}
             required
             pattern={pattern}
             minLength={minLength}
             maxLength={maxLength}
             list={list}
      />
      <label className='label'
             htmlFor={id}
             id={id + 'Label'}
      >
        {name}
      </label>
    </React.Fragment>
  )
}

export default Input;