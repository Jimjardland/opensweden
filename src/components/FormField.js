// @flow
import * as React from 'react'
import classNames from 'classnames'

type Props = {
  onChange: Function,
  placeholder?: string,
  value?: string,
  type: string,
  inputType: string,
  pattern?: string
}

const FormField = ({
  onChange,
  value,
  placeholder,
  inputType,
  type = 'input',
  error
}: Props) => (
  <div
    className={classNames('field', {
      'field-filled': Boolean(value),
      'field-error': error
    })}
  >
    {type === 'input' && (
      <input
        value={value}
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    )}

    {type === 'textarea' && (
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
    <span className="focus-input" />
  </div>
)

export default FormField
