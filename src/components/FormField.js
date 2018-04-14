// @flow
import * as React from 'react'
import classNames from 'classnames'

type Props = {
  onChange: Function,
  placeholder?: string,
  value?: string,
  type: string
}

const FormField = ({ onChange, value, placeholder, type = 'input' }: Props) => (
  <div className={classNames('field', { 'field-filled': Boolean(value) })}>
    {type === 'input' && (
      <input
        value={value}
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
