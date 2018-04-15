// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import { Form, Button, Icon, message } from 'antd'
import FormField from './FormField'
import PlaceStore from '../stores/PlaceStore'
import ProgressStore from '../stores/ProgressStore'
import './form.css'
import classNames from 'classnames'

type Props = {
  form: Object,
  onCancel: Function
}

@observer
class CreateOpenPlaceBooking extends React.Component<Props> {
  onSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        PlaceStore.createPlace(values).then(ProgressStore.setPending)
      } else {
        let total = []

        Object.entries(err).forEach(([key, s]) => {
          total = [...total, ...s.errors]
        })

        const rows = total.map((t) => <div>{t.message}</div>)
        message.warning(rows)
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form
    const { onCancel } = this.props

    const fields = [
      {
        label: 'Telefonnummer',
        name: 'phoneNumber',
        initialValue: '0734119576',
        inputType: 'tel',
        rules: [
          {
            len: 10,
            message: 'Telefonnummer måste vara 10 siffror'
          }
        ]
      },
      {
        label: 'Adress',
        name: 'address',
        initialValue: 'Kungsgatan 44',
        inputType: '',
        rules: [
          {
            min: 10,
            message: 'Ogiltig adress'
          }
        ]
      },
      {
        label: 'Postkod',
        name: 'zip',
        initialValue: '11137',
        inputType: 'tel',
        rules: [
          {
            len: 5,
            message: 'Postkod måste vara 5 siffror'
          }
        ]
      },
      {
        label: 'Ort',
        name: 'city',
        initialValue: 'Stockholm',
        inputType: '',
        rules: [
          {
            min: 3,
            message: 'Ogiltig stad'
          }
        ]
      }
    ]
    return (
      <Form className={classNames('wrapper')} onSubmit={this.onSubmit}>
        <h2>Dina uppgifter</h2>
        <p>
          Tack för ditt stöd! Fyll i dina uppgifter så kommer du få ett sms med
          en kod för att publicera var du erbjuder hjälp!
        </p>
        {fields.map((f, i) =>
          getFieldDecorator(f.name, {
            validateTrigger: 'onBlur',
            rules: [
              ...f.rules,
              {
                required: true,
                message: `${f.label} är obligatoriskt`
              }
            ]
          })(
            <FormField
              error={getFieldError(f.name)}
              inputType={f.inputType}
              placeholder={f.label}
            />
          )
        )}

        {getFieldDecorator('extras')(
          <FormField type="textarea" placeholder="Meddelande (frivilligt)" />
        )}

        <Icon
          className="pass-close"
          fontSize={20}
          onClick={onCancel}
          type="close"
        />

        <Button
          type="primary"
          className="secondButton"
          loading={PlaceStore.isBusy}
          htmlType="submit"
        >
          Skicka
        </Button>
      </Form>
    )
  }
}

export default Form.create({})(CreateOpenPlaceBooking)
